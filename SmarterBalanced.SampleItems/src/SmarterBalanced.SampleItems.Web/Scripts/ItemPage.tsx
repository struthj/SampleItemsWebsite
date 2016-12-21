namespace ItemPage {

    export interface ItemViewModel {
        itemViewerServiceUrl: string;
        accResourceVMs: AccessibilityResourceViewModel[];
    }

    function getAccessibilityString(accResourceVM: AccessibilityResourceViewModel[]): string {
        let str: string = "?isaap=";
        for (let res of accResourceVM) {
            if (res.selectedCode) {
                str = str.concat(res.selectedCode, ";");
            }
        }
        return str;
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
                    <button type="button" className="accessibility-button btn btn-primary btn-lg" data-toggle="modal" data-target="#modal-container">
                        Accessibility Options
                    </button>
                </div>
            );
        }
    }


}

function initializeItemPage(viewModel: ItemPage.ItemViewModel) {
    ReactDOM.render(<ItemPage.Page {...viewModel} />,
        document.getElementById("item-container") as HTMLElement);
}
