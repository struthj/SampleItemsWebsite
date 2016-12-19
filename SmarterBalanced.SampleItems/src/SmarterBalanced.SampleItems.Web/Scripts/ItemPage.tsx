namespace ItemPage {
    interface ModalProps {
        localAccessibility: AccessibilityResourceViewModel[];
    }

    export interface ItemViewModel {
        itemViewerServiceUrl: string;
        itemDigest: ItemDigest;
        localAccessibilityViewModel: LocalAccessibilityViewModel;
    }

    export interface LocalAccessibilityViewModel {
        nonApplicableAccessibilityResources: string;
        accessibilityResourceViewModels: AccessibilityResourceViewModel[];
    }

    interface AccessibilityResourceViewModel {
        defaultCode: string;
        description: string;
        disabled: boolean;
        label: string;
        selectedCode: string;
        accessibilityListItems: Selection[];
    }

    interface Selection {
        disabled: boolean;
        selected: boolean;
        label: string;
    }

    interface PageState {
        accessibilityResource: AccessibilityResource;
    }

    interface FrameProps {
        baseUrl: string;
        accessibilityString: string;
    }

    interface FrameState {
        url: string;
        accessibilityString: string;
    }

    class AccessibilityResource implements LocalAccessibilityViewModel {
        nonApplicableAccessibilityResources: string;
        accessibilityResourceViewModels: AccessibilityResourceViewModel[];
        constructor(nonApplicableAccessibilityResources: string,
            accessibilityResourceViewModels: AccessibilityResourceViewModel[]) {
            this.nonApplicableAccessibilityResources = nonApplicableAccessibilityResources;
            this.accessibilityResourceViewModels = accessibilityResourceViewModels;
        }
        getAccessibilityString(): string {
            let str: string = "?isaap=";
            for (let res of this.accessibilityResourceViewModels) {
                if (res.selectedCode) {
                    str = str.concat(res.selectedCode, ";");
                }
            }
            console.log(str);
            return str;
        }
    }


    class ItemAccessibilityModal extends React.Component<ModalProps, {}> {
        
        constructor() {
            super();
        }

        resetOptions() : void {
            //Clear Cookie
        }

        saveOptions(): void {
            //Update Cookie with current options
        }

        render() {
            return (<p>the modal</p>);
        }
    }

    export class Page extends React.Component<ItemViewModel, PageState> {
        constructor(props: ItemViewModel) {
            super(props);
            this.state = {
                accessibilityResource: new AccessibilityResource(
                    props.localAccessibilityViewModel.nonApplicableAccessibilityResources,
                    props.localAccessibilityViewModel.accessibilityResourceViewModels),
            }
        }
        render() {
            return (<ItemFrame baseUrl={this.props.itemViewerServiceUrl}
                accessibilityString={this.state.accessibilityResource.getAccessibilityString()} />);
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

function initializeItemPage(viewModel: {
    itemViewerServiceUrl: string,
    itemDigest: ItemDigest,
    localAccessibilityViewModel: ItemPage.LocalAccessibilityViewModel}) {
    ReactDOM.render(<ItemPage.Page {...viewModel} />,
        document.getElementById("item-container") as HTMLElement);
}