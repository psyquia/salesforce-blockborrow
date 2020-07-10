import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import CreateBorrowerRecord from '@salesforce/apex/BorrowerManager.CreateBorrowerRecord';

export default class CreateABorrower extends LightningElement {
    name;
    email;
    @track nameText = '';
    @track emailText = '';

    handleKeyUpName(evt) {
        this.nameText = evt.target.value;
    }

    handleKeyUpEmail(evt) {
        this.emailText = evt.target.value;
    }

    handleCreate() {
        if (this.nameText == '' || this.emailText == '') {
            const event = new ShowToastEvent({
                "title": "Empty field/s",
                'variant': 'warning',
                "message": "Please fill out empty fields."
            });
            this.dispatchEvent(event);
            return;
        }
        CreateBorrowerRecord({ name: this.nameText, email: this.emailText })
            .then(result => {
                const event = new ShowToastEvent({
                    "title": "Borrower Created!",
                    'variant': 'success',
                    "message": "{1}",
                    "messageData": [
                        'Salesforce',
                        {
                            url: 'https://playful-shark-km3lm6-dev-ed.lightning.force.com' +
                                '/lightning/r/Borrower__c/' + result + '/view',
                            label: 'Borrower Record created! See it here!'
                        }
                    ]
                });
                this.dispatchEvent(event);
            }).catch(error => {
                console.log(error);
                const event = new ShowToastEvent({
                    "title": "Error!",
                    'variant': 'error',
                    "message": "Something went wrong",
                    "messageData": [error]
                });
                this.dispatchEvent(event);
            })
    }
}