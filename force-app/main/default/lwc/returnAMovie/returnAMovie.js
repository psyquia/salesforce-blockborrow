import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import ReturnMovie from '@salesforce/apex/ReturnMovieController.ReturnMovie';

export default class ReturnAMovie extends LightningElement {
    name;
    email;
    @track bRecordId = '';

    handleKeyUp(evt) {
        this.bRecordId = evt.target.value;
    }

    handleReturn() {
        if (this.bRecordId == '') {
            const event = new ShowToastEvent({
                "title": "Empty field/s",
                'variant': 'warning',
                "message": "Please fill out empty fields."
            });
            this.dispatchEvent(event);
            return;
        }
        ReturnMovie({ borrowRecordId: this.bRecordId })
            .then(result => {
                const event = new ShowToastEvent({
                    "title": "Movie Returned!",
                    'variant': 'success',
                    "message": "{1}",
                    "messageData": [
                        'Salesforce',
                        {
                            url: 'https://playful-shark-km3lm6-dev-ed.lightning.force.com' +
                                '/lightning/r/MovieCopy__c/' + result + '/view',
                            label: 'Movie copy has been returned! See it here!'
                        }
                    ]
                });
                this.dispatchEvent(event);
            }).catch(error => {
                console.log(error);
                const event = new ShowToastEvent({
                    "title": "Error!",
                    'variant': 'error',
                    "message": "Invalid Id",
                    "messageData": [error]
                });
                this.dispatchEvent(event);
            })
    }
}