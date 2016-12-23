namespace Expandable {

    interface Props {
        label: string;
        body?: JSX.Element;
        initialState: boolean;
        children?: NodeComponent[]; 
        className: string;
        style?: React.CSSProperties;
    }

    interface State {
        isCollapsed: boolean;
    }

    export class NodeComponent extends React.Component<Props, State> {
        constructor(props: Props) {
            super(props);
            console.log(props.initialState);
            this.state = {
                isCollapsed: props.initialState
            };
        }

        toggleState() {
            this.setState({
                isCollapsed: !this.state.isCollapsed
            });
        }

        render() {
            let label = "";
            let style = {};
            if (this.state.isCollapsed) {
                label = "▶ " + this.props.label;
                style = {display: "None"}
            }
            else {
                label = "▼ " + this.props.label;
            }

            return (
                <div className={this.props.className} style={this.props.style}>
                    <label onClick={() => this.toggleState()}>
                        {label}
                    </label>
                    <div style={style}>
                        {this.props.body}
                        <ul>
                            {this.props.children}
                        </ul>
                    </div>
                </div>
                );
        }
    }

}
