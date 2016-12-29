interface ModalProps {
    localAccessibility: AccessibilityResourceViewModel[];
    updateSelection(category: string, code: string): void;
    onSave(event: any): void;
}

interface ModalState {
    localAccessibility: AccessibilityResourceViewModel[];
}

interface AccessibilityResourceViewModel {
    defaultCode: string;
    description: string;
    disabled: boolean;
    label: string;
    selectedCode: string;
    selections: Selection[];
}

class ItemAccessibilityModal extends React.Component<ModalProps, ModalState> {

    constructor(props: ModalProps) {
        super(props);
        this.state = {
            localAccessibility: props.localAccessibility,
        }
        this.resetOptions = this.resetOptions.bind(this);
        this.props.updateSelection.bind(this);
    }

    resetOptions(): void {
        //Clear Cookie
    }

    render() {
        let dropdowns = this.state.localAccessibility.map(res => {
            let ddprops: DropdownProps = {
                defaultSelection: res.selectedCode,
                label: res.label,
                selections: res.selections,
                updateSelection: this.props.updateSelection,
            }
            return <DropDown{...ddprops} key={res.label} />;
        });

        return (
            <div className="modal fade" id="modal-container" tabIndex={-1} role="dialog" aria-labelledby="Accessibility Options Modal" aria-hidden="true">
                <div className="modal-dialog accessibility-modal" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">Accessibility Options</h4>
                        </div>
                        <div className="modal-body">
                            <form id="accessibility-form" onSubmit={this.props.onSave}>
                                <div className="accessibility-dropdowns">
                                    {dropdowns}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" form="accessibility-form">Update</button>
                            <button onClick={this.resetOptions} className="btn btn-primary">Reset to Default</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
