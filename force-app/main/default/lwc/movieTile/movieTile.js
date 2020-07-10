import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class MovieTile extends NavigationMixin(LightningElement) {
    @api movie;

    handleMovieClicked() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                actionName: 'view',
                recordId: this.movie.Id
            }
        });
    }

    handleMouseOver() {
        this.dispatchEvent(new CustomEvent('peekenter'));
    }

    handleMouseOut() {
        this.dispatchEvent(new CustomEvent('peekleave'));
    }

    get icon(){
        return (this.movie.IsAvailable__c) ? 'utility:check' : 'utility:close';
    }

    get iconVariant() {
        return (this.movie.IsAvailable__c) ? 'success' : 'error';
    }
}