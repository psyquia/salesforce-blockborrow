import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import getMovieCopies from '@salesforce/apex/BorrowMovieController.getMovieCopies';
import borrowMovie from '@salesforce/apex/BorrowMovieController.borrowMovie';
export default class BorrowAMovie extends LightningElement {
    @track queryTerm;
    @track value;
    @track selectedMovie;
    @track selectedBorrower;
    @track newBorrower = false;
    @track options = [{ value: '', label: 'Select a movie copy' }];
    error;
    style;
    ready = { movie: false, borrower: false, copy: false };

    handleNewOrOld() {
        this.newBorrower = !this.newBorrower;
    }

    handleConfirm() {
        if (this.ready.movie && this.ready.borrower && this.ready.copy) {
            console.log(this.value);
            console.log(this.selectedBorrower.Id);
            borrowMovie({ movieCopyId: this.value, borrowerId: this.selectedBorrower.Id })
                .then(result => {
                    const event = new ShowToastEvent({
                        "title": "Success!",
                        'variant': 'success',
                        "message": "{1}",
                        "messageData": [
                            'Salesforce',
                            {
                                url: 'https://playful-shark-km3lm6-dev-ed.lightning.force.com' +
                                    '/lightning/r/BorrowRecord__c/' + result + '/view',
                                label: 'Borrow Record created! See it here!'
                            }
                        ]
                    });
                    this.dispatchEvent(event);
                    this.value = '';
                    this.selectedBorrower = undefined;
                    this.selectedMovie = undefined;

                }).catch(error => {
                    const event = new ShowToastEvent({
                        "title": "Error!",
                        'variant': 'error',
                        "message": "Something went wrong",
                        "messageData": [error]
                    });
                    this.dispatchEvent(event);
                })
        } else {
            const event = new ShowToastEvent({
                "title": "Missing Fields!",
                'variant': 'warning',
                "message": "Please fill out all required fields",
            });
            this.dispatchEvent(event);
        }
    }

    handleMovieSelect(evt) {
        this.selectedMovie = evt.detail;
        this.ready.movie = true;
        getMovieCopies({ title: this.selectedMovie.Name })
            .then(result => {
                this.options = [];
                if (!result.length)
                    this.options.push({ value: '', label: 'No Available Copies!' });
                else {
                    for (var i = 0; i < result.length; i++) {
                        this.options.push({ value: result[i].Id, label: 'Copy ' + result[i].CopyNumber__c.toString() })
                    }
                }
            })
            .catch(error => {
                this.error = error;
                console.log(this.error);
            });
    }

    handleBorSelect(evt) {
        this.selectedBorrower = evt.detail;
        this.ready.borrower = true;
    }

    handleKeyUp(evt) {
        this.queryTerm = evt.target.value;
    }


    handleChange(event) {
        this.value = event.detail.value;
        if (this.value != '')
            this.ready.copy = true;

        console.log(this.ready);
    }
}