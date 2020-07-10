import { LightningElement, api, wire, track} from 'lwc';
import { getRecord, getFieldValue, RecordFieldDataType } from 'lightning/uiRecordApi';
const FIELDS = [
    'Movie__c.Name',
    'Movie__c.Year__c'
];

export default class MovieHighlights extends LightningElement {
    @api recordId;  
    @track isLoaded = false;
    
    @wire(getRecord, {recordId: '$recordId', fields: FIELDS })
    loadMovieHeader({error,data}) {
        if(error){
            const evt = new ShowToastEvent({
                title: "Movie Header Error",
                message: "An error has occured while loading movie data. Please refresh the page!",
                variant: "error",
            });
            this.dispatchEvent(evt);
        }
        else if(data){
            this.name = data.fields.Name.value;
            this.year = data.fields.Year__c.value;

            this.isLoaded = true;
        }
    };

    // get name()  {
    //     this.isLoaded = true;
    //     return getFieldValue(this.mrecord.data, 'Movie__c.Name');
    // }

    // get year()  {
    //     return getFieldValue(this.mrecord.data, 'Movie__c.Year__c');
    // }


    renderedCallback(){
    }
}