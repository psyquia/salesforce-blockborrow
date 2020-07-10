import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class BorrowerTile extends NavigationMixin(LightningElement) {
    @api borrower;
    @api nav=false;

    handleBorClicked(event) {
        if(this.nav){
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    actionName: 'view',
                    recordId: this.borrower.Id
                }
            });
        }else{
            event.preventDefault();

            // Creates the event with the contact ID data.
            const selectedEvent = new CustomEvent('borselect', { detail: this.borrower });

            // Dispatches the event.
            this.dispatchEvent(selectedEvent);
        }
        
    }
}