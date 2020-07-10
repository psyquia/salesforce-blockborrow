import { LightningElement, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getAllMovies from '@salesforce/apex/MovieTileListController.getAllMovies';
// import loadFunds from '@salesforce/apex/FundController.getFunds';
// import { registerListener, unregisterAllListeners } from 'c/pubsub';

const PAGE_SIZE = 15;
export default class MovieTileList extends LightningElement {
    error;
    page = 1;
    maxPage=0;
    truev = true;
    canPrevious = false;
    canNext = true;
    @track allMovies;

    _filter = {
        searchKey: '',
        sector: '',
        assetClass: '',
        minYtdReturn: -30,
        maxYtdReturn: 30,
        min1YearReturn: -30,
        max1YearReturn: 30,
        min5YearReturn: -30,
        max5YearReturn: 30
    };

    //@wire(CurrentPageReference) pageRef;

    @wire(getAllMovies,{
        pageDecimal: '$page'
    })
    loadMovies({ error, data }) {
		if (error) {
        }else if(data){
            this.allMovies = data.movies;
            this.maxPage = data.maxPage;
            if(this.page < this.maxPage) this.canNext = true;
        }
    }
    //allMovies;

    handlePagePrevious() {
        this.page = this.page - 1;
        if(this.page == 1) this.canPrevious = false;
        if(this.page < this.maxPage) this.canNext = true;
    }

    handlePageNext() {
        console.log("PREV EVT");
        this.page = this.page + 1;
        if(this.page >= this.maxPage) this.canNext = false;
        if(this.page > 1) this.canPrevious = true;
    }
    /*
    loadMovies({error,data}) {
        if(error){

        }
        else if(data){
            console.log("not null!?");
            this.movies = data.movies;
        }
    }
    */
    
    /*
    connectedCallback() {
        
        registerListener(
            'dreaminvest__fundfilterchange',
            this.handleFundFilterChange,
            this
        );
        registerListener(
            'dreaminvest__returnrangechange',
            this.handleReturnRangeChange,
            this
        );
    }
    

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    

    handleFundFilterChange(event) {
        if (event.searchKey !== undefined) {
            this._filter.searchKey = event.searchKey;
        }
        if (event.assetClass !== undefined) {
            this._filter.assetClass = event.assetClass;
        }
        if (event.sector !== undefined) {
            this._filter.sector = event.sector;
        }
        this._filter = Object.assign({}, this._filter);
        this.page = 1;
    }

    handleReturnRangeChange(event) {
        const filterName = event.filterName;
        const minValue = event.minValue;
        const maxValue = event.maxValue;
        if (filterName === 'ytd-return') {
            this._filter.minYtdReturn = minValue;
            this._filter.maxYtdReturn = maxValue;
        } else if (filterName === '1-year-return') {
            this._filter.min1YearReturn = minValue;
            this._filter.max1YearReturn = maxValue;
        } else if (filterName === '5-year-return') {
            this._filter.min5YearReturn = minValue;
            this._filter.max5YearReturn = maxValue;
        }
        this._filter = Object.assign({}, this._filter);
        this.page = 1;
    }

    handlePeekEnter(event) {
        const popup = this.template.querySelector('c-fund-info-popup');
        popup.show(event.target, event.target.fund);
    }

    handlePeekLeave() {
        const popup = this.template.querySelector('c-fund-info-popup');
        popup.hide();
    }

    */
}