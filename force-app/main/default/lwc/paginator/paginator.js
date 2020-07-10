// paginator.js
import { LightningElement, api} from 'lwc';

export default class Paginator extends LightningElement {

    @api canprevious;
    @api cannext;

    previousHandler() {
        this.dispatchEvent(new CustomEvent('previous'));
    }

    nextHandler() {
        this.dispatchEvent(new CustomEvent('next'));
    }
}