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

    function undefinedToEmpty(str: string | undefined): string {
        return str || "";
    }

    function copyResourceDict(original: {[subject: string]: string | undefined}) {
        let newDict: { [subject: string]: string | undefined } = { };
        for (var key in original) {
            newDict[key] = original[key];
        }
        return newDict;
    }

    interface PageState {
        // Given the name of a resource, returns the selected ISSAP code for the resource.
        resourceSelections: {
            [subject: string]: string | undefined;
        };
        ivsAccOptions: string;
    }

    export class Page extends React.Component<ItemViewModel, PageState> {
        constructor(props: ItemViewModel) {
            super(props);
            this.state = {
                resourceSelections: {},
                ivsAccOptions: getAccessibilityString(this.props.accResourceVMs),
            };
            this.saveOptions = this.saveOptions.bind(this);
            this.updateResource = this.updateResource.bind(this);
            this.setSelectionValue = this.setSelectionValue.bind(this);
        }

        updateResource(code: string, label: string) {
            let resources = copyResourceDict(this.state.resourceSelections);
            resources[label] = code;
            this.setState({
                resourceSelections: resources,
                ivsAccOptions: this.state.ivsAccOptions,
            });
        }

        setSelectionValue(model: AccessibilityResourceViewModel): AccessibilityResourceViewModel {
            for (let key in this.state.resourceSelections) {
                if (key === model.label) {
                    model.selectedCode = undefinedToEmpty(this.state.resourceSelections[key]);
                }
            }
            return model;
        }

        saveOptions(event: any): void {
            //Update Cookie with current options
            event.preventDefault();
            console.log("Saved new accessibility options");
            //copy the old accessibility resource view models
            let newAccResourceVms = this.props.accResourceVMs.map(this.setSelectionValue);

            this.setState({
                resourceSelections: this.state.resourceSelections,
                ivsAccOptions: getAccessibilityString(newAccResourceVms),
            });
            console.log(newAccResourceVms);
        }

        render() {
            let ivsUrl: string = this.props.itemViewerServiceUrl.concat(this.state.ivsAccOptions);
            return (
                <div>
                    <ItemFrame baseUrl={this.props.itemViewerServiceUrl}
                        accessibilityString={this.state.ivsAccOptions}
                        url={ivsUrl}/>
                    <ItemAccessibilityModal localAccessibility={this.props.accResourceVMs} updateSelection={this.updateResource} onSave={this.saveOptions} />
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
