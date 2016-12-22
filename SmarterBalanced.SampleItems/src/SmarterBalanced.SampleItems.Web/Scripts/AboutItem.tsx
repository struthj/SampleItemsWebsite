interface SampleResponse {
    purpose: string;
    scorePoint: string;
    name: string; 
    sampleContent: string;
}

interface RubricSample {
    maxValue: string;
    minValue: string;
    sampleResponses: SampleResponse[];
}

interface RubricEntry {
    scorePoint: string;
    name: string;
    value: string;
}

interface Rubric {
    language: string;
    rubricEntries: RubricEntry[];
    samples: RubricSample[];
}

interface AboutItemViewModel {
    commonCoreStandardsId: string;
    targetId: string;
    grade: GradeLevels;
    rubrics: Rubric[];
    // depthOfKnowledge: string; // TODO: Add to xml
}


namespace AboutItem {

    export interface Props {
        viewModel: AboutItemViewModel;
    }

    export interface State { }

    export class AIComponent extends React.Component<Props, State> {
        constructor(props: Props) {
            super(props);
        }

        renderSection(child: string, label: string) {
            return (
                <div>
                    <Collapsible.CLComponent label={label} className="search-category" style={{ flexGrow: 3 }}>
                        <div>
                            {child}
                        </div>
                    </Collapsible.CLComponent>
                    <br />
                </div>
            );
        } 

        renderCCSS() {
            return this.renderSection(this.props.viewModel.commonCoreStandardsId, "Common Core State Standards");
        }

        renderTarget() {
            return this.renderSection(this.props.viewModel.targetId, "Target");
        }

        renderTargetGrade() {
            return this.renderSection(this.props.viewModel.grade.toString(), "Target Grade");
        }

        renderRubricEntry(rubricEntry: RubricEntry) {
            let label = `${rubricEntry.name} (${rubricEntry.scorePoint} points)`;
            let content = <div dangerouslySetInnerHTML={{ __html: rubricEntry.value }} />;

            return (
                <div>
                    <Collapsible.CLComponent label={label} className="search-category" style={{ flexGrow: 3 }}>
                        <div>
                            {rubricEntry.scorePoint} <br />
                            {content}
                        </div>
                    </Collapsible.CLComponent>
                    <br />
                </div>
                );
        }

        renderRubricEntries(rubricEntries: RubricEntry[]) {
            if (rubricEntries == null){
                return undefined;
            }

            let rubricsEntryElems: Array<JSX.Element> = [];
            for (let i = 0; i < rubricEntries.length; i++) {
                let rubricEntry: RubricEntry = rubricEntries[i];
                rubricsEntryElems.push(this.renderRubricEntry(rubricEntry));
            }

            return rubricsEntryElems;
        }

        renderSampleResponse(sampleResponse: SampleResponse) {
            let label = `${sampleResponse.name} (${sampleResponse.scorePoint} Points)`;
            let content = <div dangerouslySetInnerHTML={{ __html: sampleResponse.sampleContent }} />;

            return (
                <div>
                    <Collapsible.CLComponent label={label} className="search-category" style={{ flexGrow: 3 }}>
                        <div>
                            {`Purpose: ${sampleResponse.purpose}`} <br />
                            {content}
                        </div>
                    </Collapsible.CLComponent>
                    <br />
                </div>
                );
        }

        renderSampleResponses(sampleResponses: SampleResponse[]) {
            if (sampleResponses == null) {
                return undefined;
            }

            let sampleResponseElems: Array<JSX.Element> = [];
            for (let i = 0; i < sampleResponses.length; i++) {
                let sampleResponse = sampleResponses[i];
                sampleResponseElems.push(this.renderSampleResponse(sampleResponse));
            }

            return sampleResponseElems;

        }

        renderRubricSample(rubricSample: RubricSample) {
            let label = `Sample Response (Minimum Score: ${rubricSample.minValue}, Maximum Score ${rubricSample.maxValue})`;
            return (
                <div>
                    <Collapsible.CLComponent label={label} className="search-category" style={{ flexGrow: 3 }}>
                        <div>
                            {this.renderSampleResponses(rubricSample.sampleResponses)}
                        </div>
                    </Collapsible.CLComponent>
                    <br />
                </div>
                );
        }

        renderRubricSamples(rubricSamples: RubricSample[]) {
            if (rubricSamples == null) {
                return undefined;
            }

            let rubricsEntryElems: Array<JSX.Element> = [];
            for (let i = 0; i < rubricSamples.length; i++) {
                let rubricSample = rubricSamples[i];
                rubricsEntryElems.push(this.renderRubricSample(rubricSample));
            }

            return rubricsEntryElems;
        }

        renderRubric(rubric: Rubric) {
            return (
                <div>
                    <Collapsible.CLComponent label={"Rubric"} className="search-category" style={{ flexGrow: 3 }}>
                        <div>
                            {rubric.language}
                            {this.renderRubricEntries(rubric.rubricEntries)} <br />
                            {this.renderRubricSamples(rubric.samples)}
                        </div>
                    </Collapsible.CLComponent>
                    <br />
                </div>
                );
        }

        renderRubrics() {
            if (this.props.viewModel.rubrics == null) {
                return undefined;
            }

            let rubricsElems: Array<JSX.Element> = [];
            let rubrics = this.props.viewModel.rubrics;
            for (let i = 0; i < rubrics.length; i++) {
                let rubric = rubrics[i];
                rubricsElems.push(this.renderRubric(rubric));
            }
            return rubricsElems;
        }

        //TODO: Update style for dropdowns
        render() {
            return (
                <div className="about-item-container">
                    {this.renderCCSS()} <br/>
                    {this.renderTarget()} <br />
                    {this.renderTargetGrade()} <br />
                    {this.renderRubrics()} <br />
                </div>
            );
        }
    }
}

function initializeAboutItem(viewModel: AboutItemViewModel) {
    ReactDOM.render(
        <AboutItem.AIComponent viewModel={viewModel} />,
        document.getElementById("about-item-container") as HTMLElement
    );
}