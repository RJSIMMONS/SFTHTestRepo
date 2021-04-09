import { LightningElement, api, track } from 'lwc';
import getUserBasicInfo from '@salesforce/apex/ASDAUserController.getUserBasicInfo';

export default class UserInformationPage extends LightningElement {
    @track user_name;
    @track user_nic;
    @track error;  
    nic = 'ABCD53517V';

    constructor() {
        super();
        //do something
        getUserBasicInfo({nic: this.nic}).then(result => {            
            this.user_name = result.Full_Name__c
            this.user_nic = result.NIC_Number__c;            
        })
        .catch(error => {
            this.error = error;
        });  
    }
}