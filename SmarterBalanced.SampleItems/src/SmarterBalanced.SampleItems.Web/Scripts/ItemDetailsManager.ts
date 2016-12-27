
namespace ItemDetails {

    export class ItemDetailsManager {

        constructor(url: string, itemDigest: any) {
            initializeItemAccessibility(url);
            initializeAboutItem(itemDigest);
            setTimeout(this.setInitialFocus, 2000);
            // TODO: Attach event listeners to return tab focus to modal upon leaving focus
        }

        setInitialFocus() {
            parent.focus();
        }

    }

}
