import { LightningElement, track } from 'lwc';
import AccountInfo from '@salesforce/apex/ASDAAccountController.AccountInfo';

export default class FixedDepositAccount extends LightningElement {

    @track accounts;
    @track error;
    type = 'Fixed Deposit';
    nic = 'ABCD53517V';

    constructor() {
        super();
        //do something
        AccountInfo({ type: this.type, nic: this.nic }).then(result => {
            this.accounts = result;
        })
            .catch(error => {
                this.error = error;
            });
    }

    handelChangeEvent(event) {
        this.template.querySelector('c-account-transaction').openModal(event.target.dataset.id,null);
    }
}