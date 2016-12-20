namespace ItemPage {

    export interface ItemViewModel {
        itemViewerServiceUrl: string;
        itemDigest: ItemDigest;
        accResourceVMs: AccessibilityResourceViewModel[];
    }

    function getAccessibilityString(accResourceVM: AccessibilityResourceViewModel[]): string {
        let str: string = "?isaap=";
        for (let res of accResourceVM) {
            if (res.selectedCode) {
                str = str.concat(res.selectedCode, ";");
            }
        }
        console.log(str);
        return str;
    }

    interface AccessibilityResourceViewModel {
        defaultCode: string;
        description: string;
        disabled: boolean;
        label: string;
        selectedCode: string;
        selections: Selection[];
    }



    interface FrameProps {
        baseUrl: string;
        accessibilityString: string;
    }

    interface FrameState {
        url: string;
        accessibilityString: string;
    }

    interface ModalProps {
        localAccessibility: AccessibilityResourceViewModel[];
    }

    interface ModalState {
        localAccessibility: AccessibilityResourceViewModel[];
    }

    class ItemAccessibilityModal extends React.Component<ModalProps, ModalState> {

        constructor(props: ModalProps) {
            super(props);
            this.state = {
                localAccessibility: props.localAccessibility,
            }
        }

        resetOptions() : void {
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
                return <DropDown{...ddprops}/>;
            });

            return (
                <div className="modal fade" id="modal-container" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title" id="myModalLabel">Modal title</h4>
                            </div>
                            <div className="modal-body">
                                <div id="accessibility-dropdowns">
                                    <div>
                                        {dropdowns}
                                    </div>
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

    interface PageState {
        // Given the name of a resource, returns the selected ISSAP code for the resource.
        resourceSelections: {
            [subject: string]: string | undefined;
        }
    }

    export class Page extends React.Component<ItemViewModel, PageState> {
        constructor(props: ItemViewModel) {
            super(props);
            this.state = {
                resourceSelections: {}
            };
        }
        render() {
            return (
                <div>
                    <ItemFrame baseUrl={this.props.itemViewerServiceUrl}
                        accessibilityString={getAccessibilityString(this.props.accResourceVMs)} />
                    <ItemAccessibilityModal localAccessibility={this.props.accResourceVMs} />
                </div>
            );
        }
    }

    export class ItemFrame extends React.Component<FrameProps, FrameState> {
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
}

function initializeItemPage(viewModel: ItemPage.ItemViewModel) {
    ReactDOM.render(<ItemPage.Page {...viewModel} />,
        document.getElementById("item-container") as HTMLElement);
}
