import { LightningElement, track, api } from 'lwc';
import searchBorrowers from '@salesforce/apex/BorrowerSearchController.searchBorrowers';

export default class LightningExampleInputSearch extends LightningElement {
    @api len=5;
    @api tooltip;
    @api nav;

    @track queryTerm;
    @track borrowers;

    @track search=true;
    error;
    queryText;

    handleBorClicked(evt){
        this.queryText= evt.detail.Name;
        this.search=false;
        this.dispatchEvent(new CustomEvent('borselect', {detail: evt.detail}));
    }

    handleKeyUp(evt) {
        this.search=true;
        this.queryTerm = evt.target.value;
        searchBorrowers({q: this.queryTerm, resLimit: this.len})
            .then(result => {
                this.borrowers = result;
            })
            .catch(error => {
                this.error = error;
                console.log(this.error);
            });
    }
    
}