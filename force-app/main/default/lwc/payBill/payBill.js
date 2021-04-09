import { LightningElement, track, api } from 'lwc';
import Pay from '@salesforce/apex/PaymentController.Pay';
export default class PayBill extends LightningElement {
    @track amount;
    @track description;
    @track accountNo;    
    value = 'Select';
    isPaymentSuccess = false;

    //Get from API
    get options() {
        return [
            { label: '1080888569', value: 1080888569 }
            // { label: 'Credit Card', value: 'C' },
        ];
    }

    handleChange(event) {     
        this.accountNo = event.detail.value;
        this.value = event.detail.value.toString();
    }

    onAmountChange(event) {
        this.amount = event.detail.value;
    }

    onDescriptionChange(event) {
        this.description = event.detail.value.toString();
    }

    @api
    pay() {
        const isInputsCorrect = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputField) => {
                inputField.reportValidity();
                return validSoFar && inputField.checkValidity();
            }, true);
        if (isInputsCorrect) {  
            this.callPaymentController();
        }
    }

    callPaymentController(){
        console.log(this.accountNo+" "+this.amount+" "+this.description);
        console.log('payment init');
        Pay({ amount: this.amount, description: this.description, accountNo: this.accountNo }).then(result => {        
            if(result == true){
                this.isPaymentSuccess = true;
            }            
        })
        .catch(error => {
            this.error = error;
        }); 
        this.template.querySelector('description').reset();
        this.template.querySelector('amount').reset();
        this.description = null;  
    }

    closeMsgModal(){
        this.isPaymentSuccess = false;
    }
}