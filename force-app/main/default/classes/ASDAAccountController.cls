public with sharing class ASDAAccountController {
    @AuraEnabled(cacheable=true)    

    public static List<ASDAAccount__c> AccountInfo(string type, string nic) {
        try {            
            ASDAUsers__c accUsers = new ASDAUsers__c();
            accUsers = [
                SELECT Full_Name__c, 
                (SELECT Account_Number__c, Balance__c, Interest_Rate__c FROM ASDAAccounts__r WHERE Account_Type__c =: type) 
                FROM ASDAUsers__c
                WHERE NIC_Number__c =: nic    
                LIMIT 1          
           ][0];
           
           List<ASDAAccount__c> accList = new List<ASDAAccount__c>();
           accList.add(accUsers.ASDAAccounts__r);           
           return accList;
        } 
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}