import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const movieFields = [
    'Movie__c.Name',
    'Movie__c.Year__c',
    'Movie__c.Plot__c',
    'Movie__c.Actors__c',
    'Movie__c.Trailer__c',
    'Movie__c.Poster__c',
    'Movie__c.Director__c',
    'Movie__c.Rating__c',
    'Movie__c.Rated__c',
    'Movie__c.Country__c'
];

export default class MovieInfo extends LightningElement {
    @api recordId; // Bear Id
    name;
    plot;
    actors;
    year;
    director;
    myIframe;
    rating;
    showTrailer=true;
    ratingVariant;
    poster={src:"", width:250};
	@wire(getRecord, { recordId: '$recordId', fields: movieFields })
	loadMovie({ error, data }) {
		if (error) {
			const evt = new ShowToastEvent({
                title: "Movie Loading Error",
                message: "An error has occured while loading movie data. Please refresh the page!",
                variant: "error",
            });
            this.dispatchEvent(evt);
		} else if (data) {
			this.name = data.fields.Name.value;
			this.plot = data.fields.Plot__c.value;
            this.actors = data.fields.Actors__c.value;
            this.year = data.fields.Year__c.value.toString();
            this.trailer = data.fields.Trailer__c.value;
            this.poster.src = data.fields.Poster__c.value;
            this.director = data.fields.Director__c.value;
            this.rating = data.fields.Rating__c.value;
            this.rated = data.fields.Rated__c.value;
            this.country = data.fields.Country__c.value;

            // Set rating star to error variant (red) if rating < 5
            if(this.rating<5)
                this.ratingVariant = "error";
            else
                this.ratingVariant = "success";
            

            this.myIframe = this.template.querySelector('iframe');
            this.myIframe.setAttribute("allowfullscreen", "allowfullscreen");
		}
    }
}