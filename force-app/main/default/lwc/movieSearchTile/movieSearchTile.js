import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class MovieTile extends NavigationMixin(LightningElement) {
    @api movie;
    @api nav=false;

    handleMovieClicked(event) {
        if(this.nav){
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    actionName: 'view',
                    recordId: this.movie.Id
                }
            });
        }else{
            event.preventDefault();

            const selectedEvent = new CustomEvent('movieselect', { detail: this.movie });

            this.dispatchEvent(selectedEvent);

        }
        
    }
}