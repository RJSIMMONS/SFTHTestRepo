import { LightningElement, track, api } from 'lwc';
import GetAccountTransactionInfo from '@salesforce/apex/ASADTransactionController.GetAccountTransactionInfo';
import GetCCAccountTransactionInfo from '@salesforce/apex/ASDACCTransactionController.GetCCAccountTransactionInfo';
import Description_FIELD from '@salesforce/schema/ASDATransaction__c.Description__c';
import TransactionAmount_FIELD from '@salesforce/schema/ASDATransaction__c.TransactionAmount__c';
import TransactionDateTime_FIELD from '@salesforce/schema/ASDATransaction__c.TransactionDateTime__c';
import Description_FIELD_CC from '@salesforce/schema/ASDACCTransaction__c.Description__c';
import TransactionAmount_FIELD_CC from '@salesforce/schema/ASDACCTransaction__c.TransactionAmount__c';
import TransactionDateTime_FIELD_CC from '@salesforce/schema/ASDACCTransaction__c.TransactionDateTime__c';
//Datatable columns
const COLUMNS_S_T = [
    { label: 'Date & Time', fieldName: TransactionDateTime_FIELD.fieldApiName, type: 'date' },
    { label: 'Discription', fieldName: Description_FIELD.fieldApiName, type: 'text' },
    { label: 'Amount', fieldName: TransactionAmount_FIELD.fieldApiName, type: 'currency' }
];

const COLUMNS_CC_T = [
    { label: 'Date & Time', fieldName: TransactionDateTime_FIELD_CC.fieldApiName, type: 'date' },
    { label: 'Discription', fieldName: Description_FIELD_CC.fieldApiName, type: 'text' },
    { label: 'Amount', fieldName: TransactionAmount_FIELD_CC.fieldApiName, type: 'currency' }
];
export default class AccountTransaction extends LightningElement {
    columns = COLUMNS_S_T;
    cc_columns = COLUMNS_CC_T;
    @track isModalOpen = false;
    @track transactions = [];
    @track cc_transactions = [];
    @track error;
    @track creditCardCondt;
    @track dateFrom;
    @track dateTo;
    accValue;
    accType;
    //accNo = 1080888569;
    //ccNo = '4929292320915831';

    constructor() {
        super();
        //do something         
    }

    @api
    openModal(value, type) {
        this.accValue = value;
        this.accType = type;
        if (type == 'cc') {
            console.log('Credit card');
            console.log(value);
            GetCCAccountTransactionInfo({ ccNo: value, dateFrom: null, dateTo: null }).then(result => {
                console.log(result);
                this.creditCardCondt = true;
                this.cc_transactions = result;
            })
                .catch(error => {
                    this.error = error;
                });
        }
        else {
            console.log("Account Number : " + value)
            GetAccountTransactionInfo({ accNo: value, dateFrom: null, dateTo: null }).then(result => {
                this.creditCardCondt = false;
                this.transactions = result;
            })
                .catch(error => {
                    this.error = error;
                });
        }
        this.isModalOpen = true;
    }

    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
        this.s_transactions = [];
        this.cc_transactions = [];
    }

    searchSpecifyPeriod() {
        console.log(this.accValue+" "+this.dateFrom + " " + this.dateTo);
        if (this.accType == 'cc') {
            console.log('Credit card F T');
        }
        else {
            this.transactions = [];
            var _accValue = parseInt(this.accValue);
            GetAccountTransactionInfo({ accNo: _accValue, dateFrom: this.dateFrom, dateTo: this.dateTo }).then(result => {
                console.log(result);
                this.transactions = result;
            })
                .catch(error => {
                    this.error = error;
                });
        }
    }

    //Assign Date
    datehandler1(event) {       
        this.dateFrom = new Date(event.target.value);
        this.dateFormatter(this.dateFrom,'from');
        console.log(this.dateFrom);
    }
    datehandler2(event) {
        this.dateTo = new Date(event.target.value);
        this.dateFormatter(this.dateTo,'to');
        console.log(this.dateTo);
    }

    dateFormatter(date,type){
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();

        if (dd < 10) {
            dd = `0${dd}`;
        }

        if (mm < 10) {
            mm = `0${mm}`;
        }

        if(type == 'from'){
            this.dateFrom = `${mm}/${dd}/${yyyy}`;
        }
        else{
            this.dateTo = `${mm}/${dd}/${yyyy}`;
        }        
    }

    dateFormatterWithTime(date,type){
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();

        if (dd < 10) {
            dd = `0${dd}`;
        }

        if (mm < 10) {
            mm = `0${mm}`;
        }

        if(type == 'from'){
            this.dateFrom = `${yyyy}-${mm}-${dd}T00:00:00.000Z`;
        }
        else{
            this.dateTo = `${yyyy}-${mm}-${dd}T00:00:00.000Z`;
        }        
    }
}

//this.dateTo = `${yyyy}-${mm}-${dd}`;