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


namespace TestAboutItem {

    interface Props {
        viewModel: AboutItemViewModel;
    }

    interface State {
        allCollapsed: boolean;
    }

    export class AIComponent extends React.Component<Props, State> {
        constructor(props: Props) {
            super(props);
            this.state = {
                allCollapsed: true
            };
        }

        toggleAll() {
            this.setState({
                allCollapsed: !this.state.allCollapsed
            });
        }


        renderExpandableElement(
            label: string,
            className: string,
            key: string,
            body?: JSX.Element,
            children?: Expandable.NodeComponent[]) {
            return (
                <Expandable.NodeComponent
                    label={label}
                    body={body}
                    className={className}
                    children={children}
                    initialState={this.state.allCollapsed}
                    key={key}
                    />
            );
        }

        // TODO...
        renderChildren() {
            // TODO: Construct all children
            const bod = (
                <div>
                    <p>some text for fun</p>
                </div>
                );
            return (
                this.renderExpandableElement("test", "test-elem", "1", bod, undefined)
                );
        }

        render() {
            const label = this.state.allCollapsed ? "▶ Show All" : "▼ Hide All";
            return (
                <div className="more-like-this-container">
                    <button onClick={() => this.toggleAll()}>{label}</button>
                    {this.renderChildren()}
                </div>
            );
        }

    }

}

function initializeExpandable(viewModel: AboutItemViewModel) {
    ReactDOM.render(
        <TestAboutItem.AIComponent viewModel={viewModel} />,
        document.getElementById("more-like-this-container") as HTMLElement
    );
}