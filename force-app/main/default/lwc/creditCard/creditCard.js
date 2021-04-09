import { LightningElement, track } from 'lwc';
import CreditCardInfo from '@salesforce/apex/ASDACreditCardController.CreditCardInfo';

export default class CreditCard extends LightningElement {
    @track creditcards;
    @track error;
    accNo = 1080888569;
  

    constructor() {
        super();
        //do something
        CreditCardInfo({ accNo: this.accNo }).then(result => {
            console.log(result);
            this.creditcards = result;
        })
        .catch(error => {
            this.error = error;
        });  
    }
    
    handelChangeEvent(event){  
        this.template.querySelector('c-account-transaction').openModal(event.target.dataset.id,'cc');
    } 
}