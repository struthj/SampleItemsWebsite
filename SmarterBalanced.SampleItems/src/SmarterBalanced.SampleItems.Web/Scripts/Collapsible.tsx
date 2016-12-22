namespace Collapsible {
    interface Props {
        label: string;
        className: string;
        style: React.CSSProperties;
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

        render() {
            const body = this.state.isCollapsed
                ? undefined
                : this.props.children;
            return (
                <div className={this.props.className} style={this.props.style}>
                    <label onClick={() => this.toggleState()}>
                        {(this.state.isCollapsed ? "▶ " : "▼ ") + this.props.label}
                    </label>
                    {body}
                </div>  
            );
        }
    }
}
