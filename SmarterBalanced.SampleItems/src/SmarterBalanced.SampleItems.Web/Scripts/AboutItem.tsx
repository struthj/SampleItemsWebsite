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
    // depthOfKnowledge: string; // TODO: Add when supported by xml
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
            if (child == null || !child) {
                return undefined;
            }

            const body = <div>{child}</div>;
            return this.renderSectionElement(body, label);
        } 

        renderSectionElement(child: JSX.Element, label: string, key?: string) {
            return (
                <div key={key}>
                    <Collapsible.CLComponent label={label} className="about-item-section" >
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
            const gradelevel = GradeLevels.toString(this.props.viewModel.grade);
            return this.renderSection(gradelevel, "Target Grade");
        }

        renderRubricEntry(rubricEntry: RubricEntry, key: string) {
            const label = `${rubricEntry.name} (${rubricEntry.scorePoint} points)`;
            const body = (
                <div>
                    {rubricEntry.scorePoint} <br />
                    <div dangerouslySetInnerHTML={{ __html: rubricEntry.value }} />
                </div>
            );
            return this.renderSectionElement(body, label, key);
        }

        renderRubricEntries(rubricEntries: RubricEntry[], parentKey: string) {
            if (rubricEntries == null){
                return undefined;
            }

            let rubricsEntryElems: Array<JSX.Element> = [];
            for (let i = 0; i < rubricEntries.length; i++) {
                const rubricEntry: RubricEntry = rubricEntries[i];
                const key = `${parentKey}-${i}`;
                rubricsEntryElems.push(this.renderRubricEntry(rubricEntry, key));
            }

            return rubricsEntryElems;
        }

        renderSampleResponse(sampleResponse: SampleResponse, key: string) {
            const label = `${sampleResponse.name} (${sampleResponse.scorePoint} Points)`;
            const body = (
                <div className="sample-response">
                    <b>{"Purpose: "}</b> {sampleResponse.purpose} <br />
                    <b>{"Sample Response: "}</b><br/>
                    <div dangerouslySetInnerHTML={{ __html: sampleResponse.sampleContent }} />
                </div>
            );
            return this.renderSectionElement(body, label, key);
        }

        renderSampleResponses(sampleResponses: SampleResponse[], parentKey: string) {
            if (sampleResponses == null) {
                return undefined;
            }

            let sampleResponseElems: Array<JSX.Element> = [];
            for (let i = 0; i < sampleResponses.length; i++) {
                const sampleResponse = sampleResponses[i];
                const key = `${parentKey}-${i}`;
                sampleResponseElems.push(this.renderSampleResponse(sampleResponse, key));
            }

            return sampleResponseElems;

        }

        renderRubricSample(rubricSample: RubricSample, parentKey: string) {
            const label = `Sample Response (Minimum Score: ${rubricSample.minValue}, Maximum Score ${rubricSample.maxValue})`;
            const body = (
                <div>
                    {this.renderSampleResponses(rubricSample.sampleResponses, parentKey)}
                </div>
            );
            return this.renderSectionElement(body, label, parentKey); 
        }

        renderRubricSamples(rubricSamples: RubricSample[], parentKey: string) {
            if (rubricSamples == null) {
                return undefined;
            }

            let rubricsEntryElems: Array<JSX.Element> = [];
            for (let i = 0; i < rubricSamples.length; i++) {
                const rubricSample = rubricSamples[i];
                const key = `${parentKey}-${i}`;
                rubricsEntryElems.push(this.renderRubricSample(rubricSample, key));
            }

            return rubricsEntryElems;
        }

        renderRubric(rubric: Rubric, idx: number) {
            const label = `${rubric.language} Rubric`;
            const key = `${rubric.language}-rubric-${idx}`;
            const body = (
                <div>
                    {this.renderRubricEntries(rubric.rubricEntries, key)} <br />
                    {this.renderRubricSamples(rubric.samples, key)}
                </div>
            );
            return this.renderSectionElement(body, label, key);
        }

        renderRubrics() {
            if (this.props.viewModel.rubrics == null) {
                return undefined;
            }

            let rubricsElems: Array<JSX.Element> = [];
            const rubrics = this.props.viewModel.rubrics;
            for (let i = 0; i < rubrics.length; i++) {
                const rubric = rubrics[i];
                rubricsElems.push(this.renderRubric(rubric, i));
            }
            return rubricsElems;
        }

        render() {
            return (
                <div className="about-item-container">
                    {this.renderCCSS()}
                    {this.renderTarget()}
                    {this.renderTargetGrade()}
                    {this.renderRubrics()}
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