interface FrameProps {
    baseUrl: string;
    accessibilityString: string;
    url: string;
}

interface FrameState {
    url: string;
    accessibilityString: string;
}

class ItemFrame extends React.Component<FrameProps, FrameState> {
    constructor(props: FrameProps) {
        super(props);
        this.state = {
            url: props.baseUrl + props.accessibilityString,
            accessibilityString: props.accessibilityString,
        }
    }

    render() {
        return (
            <div className="itemViewerFrame">
                <iframe id="itemviewer-iframe" className="itemviewer-iframe"
                    src={this.props.url}></iframe>
            </div>
        );
    }
}
