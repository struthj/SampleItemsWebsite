namespace Collapsible {
    interface Props {
        label: string;
        className: string;
        style?: React.CSSProperties;
    }

    interface State {
        isCollapsed: boolean;
    }

    export class CLComponent extends React.Component<Props, State> {
        constructor(props: Props) {
            super(props);
            this.state = {
                isCollapsed: true
            };
        }

        toggleState() {
            this.setState({
                isCollapsed: !this.state.isCollapsed
            });
        }


        renderWithStyle(body: any) {
            return (
                <div className={this.props.className} style={this.props.style}>
                    <label onClick={() => this.toggleState()}>
                        {(this.state.isCollapsed ? "▶ " : "▼ ") + this.props.label}
                    </label>
                    {body}
                </div>
            );
        }

        renderWithoutStyle(body: any) {
            return (
                <div className={this.props.className}>
                    <label onClick={() => this.toggleState()}>
                        {(this.state.isCollapsed ? "▶ " : "▼ ") + this.props.label}
                    </label>
                    {body}
                </div>
            );
        }

        render() {
            const body = this.state.isCollapsed
                ? undefined
                : this.props.children;

            if (this.props.style) {
                return this.renderWithStyle(body);
            }
            else {
                return this.renderWithoutStyle(body);

            }
        }
    }
}
