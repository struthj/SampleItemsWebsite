interface ModalProps {
    localAccessibility: AccessibilityResourceViewModel[];
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
    }

    resetOptions(): void {
        //Clear Cookie
    }

    saveOptions(): void {
        //Update Cookie with current options
    }

    onChange(selection: Selection): void {
        console.log("I got a selection!");
        console.log(selection);
    }

    render() {
        let dropdowns = this.state.localAccessibility.map(res => {
            let ddprops: DropdownProps = {
                defaultSelection: res.selectedCode,
                label: res.label,
                selections: res.selections,
                onChange: this.onChange
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
                            <div className="accessibility-dropdowns">
                                {dropdowns}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.saveOptions} className="btn btn-primary">Update</button>
                            <button onClick={this.resetOptions} className="btn btn-primary">Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
