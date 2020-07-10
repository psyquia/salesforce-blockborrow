import { LightningElement, track, api } from 'lwc';
import getAllMovies from '@salesforce/apex/MovieTileListController.getAllMovies';
import searchMovies from '@salesforce/apex/MovieSearchController.searchMovies';

export default class LightningExampleInputSearch extends LightningElement {
    @api len=5;
    @api tooltip;
    @api nav;

    @track queryTerm;
    @track movieRes;

    queryText;

    search=true;
    error;
    style;
    height;

    handleMovieClicked(evt){
        this.queryText= evt.detail.Name;
        this.search=false;
        this.dispatchEvent(new CustomEvent('movieselect', {detail: evt.detail}));
    }

    handleKeyUp(evt) {
        this.search=true;
        this.queryTerm = evt.target.value;
        searchMovies({q: this.queryTerm, resLimit: this.len})
            .then(result => {
                this.movieRes = result;
                if(result.length){
                    this.height = (result.length > 0) ? result.length * 90  : 90;
                    this.style = 'height : ' + this.height.toString() + ';';
                }
            })
            .catch(error => {
                this.error = error;
                console.log(this.error);
            });
    }
    
}