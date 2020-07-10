import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class MovieTile extends NavigationMixin(LightningElement) {
    @api movie;
    @api nav=false;

    handleMovieClicked() {
        console.log("has nav");
        if(this.nav){
            console.log("has nav");
            console.log(this.nav);
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    actionName: 'view',
                    recordId: this.movie.Id
                }
            });
        }else{

        }
        
    }

    handleMouseOver() {
        this.dispatchEvent(new CustomEvent('peekenter'));
    }

    handleMouseOut() {
        this.dispatchEvent(new CustomEvent('peekleave'));
    }

    get avatarClass() {
        return (
            'slds-app-launcher__tile-figure symbol '
        );
    }
}