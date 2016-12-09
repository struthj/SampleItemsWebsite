namespace ItemPage {
    interface ModalProps {
        localAccessibility: AccessibilityResourceViewModel[];
    }

    interface itemViewModel {
        itemViewerServiceUrl: string;
        itemDigest: ItemDigest;
        localAccessibilityViewModel: LocalAccessibilityViewModel;
    }
    interface ItemDigest {

    }

    interface LocalAccessibilityViewModel {
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
            return ({/* Render the modal */});
        }
    }

    export class ItemPage extends React.Component<itemViewModel, {}> {

        constructor() {
            super();
        }

        render() {
            return ({/* render the  */});
        }
    }
}

function intializeAccessiblityOptions() {

}