public with sharing class ASDACCTransactionController {
    @AuraEnabled(cacheable=true)      
    public static List<ASDACCTransaction__c> GetCCAccountTransactionInfo(string ccNo) {
        try {  
            ASDACreditcard__c cc = new ASDACreditcard__c();
            cc = [
                SELECT Credit_card_number_T__c, 
                (SELECT Description__c, TransactionAmount__c, TransactionDateTime__c FROM ASDACCTransaction__r) 
                FROM ASDACreditcard__c
                WHERE Credit_card_number_T__c =: ccNo    
                LIMIT 1          
            ][0];
            
            List<ASDACCTransaction__c> ccTransactionList = new List<ASDACCTransaction__c>();
            for(ASDACCTransaction__c ccTList : cc.ASDACCTransaction__r){
                ccTransactionList.add(ccTList);
            }
            //transactionList.add(acc.ASDATransactions__r);           
            return ccTransactionList;
        } 
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}