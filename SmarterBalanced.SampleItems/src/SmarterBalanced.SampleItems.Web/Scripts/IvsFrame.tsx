interface FrameProps {
    baseUrl: string;
    accessibilityString: string;
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

    createUrl(baseUrl: string, bank: string, item: string, accessibilityString: string): string {
        return baseUrl.concat("/item/", bank, "-", item, accessibilityString);
    }

    render() {
        return (
            <div className="itemViewerFrame">
                <iframe id="itemviewer-iframe" className="itemviewer-iframe"
                    src={this.state.url}></iframe>
            </div>
        );
    }
}
