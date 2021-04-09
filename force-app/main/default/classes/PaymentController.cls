global with sharing class PaymentController {
    @AuraEnabled    
    public static boolean Pay(Decimal amount, String description, Integer accountNo) {        
        try {   
            ASDAAccount__c acc = [SELECT Account_Number__c, Balance__c FROM ASDAAccount__c WHERE Account_Number__c =: accountNo LIMIT 1];
            
            if (acc != null)
            {
                ASDAAccount__c updatedAcc = acc;             
                updatedAcc.Balance__c = acc.Balance__c - amount;                              
                update updatedAcc;
            }
            //Register Transaction
            ASDATransaction__c trans = new ASDATransaction__c(ASDAAccount__c = acc.Id, Description__c = description, TransactionAmount__c = amount, TransactionDateTime__c = System.now());
            insert trans; 
            //Call SMS Gateway
            //return utilityController.sendSMS(1080888569);
            return true;
        } 
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}