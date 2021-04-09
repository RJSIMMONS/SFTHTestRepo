public with sharing class ASADTransactionController {
    @AuraEnabled     
    public static List<ASDATransaction__c> GetAccountTransactionInfo(integer accNo, string dateFrom, string dateTo) {
        try { 
            System.debug('APEX:'+dateFrom+' '+dateTo);            
   
            ASDAAccount__c acc = new ASDAAccount__c();

            if(dateFrom != null && dateTo != null){
                System.debug('FROM TO');    
                Date dtFrm = Date.parse(dateFrom);
                Datetime dttFrm = Datetime.newInstance(dtFrm.year(), dtFrm.month(), dtFrm.day());
                Date dtTo = Date.parse(dateTo);
                Datetime dttTo = Datetime.newInstance(dtTo.year(), dtTo.month(), dtTo.day());             
               
                
                acc = [
                SELECT Account_Number__c, 
                (SELECT Description__c, TransactionAmount__c, TransactionDateTime__c FROM ASDATransactions__r WHERE TransactionDateTime__c >=: dttFrm AND TransactionDateTime__c <=: dttTo order by TransactionDateTime__c DESC) 
                FROM ASDAAccount__c
                WHERE Account_Number__c =: accNo    
                LIMIT 1          
            ][0];
            }
            else{

                //Default - Trancaction during last 3 months only.
                Date today = System.today();            
                today = today.addDays(1);
                Date last_n_month = today.addMonths(-3);
                System.debug(today);
                System.debug(last_n_month);

                acc = [
                SELECT Account_Number__c, 
                (SELECT Description__c, TransactionAmount__c, TransactionDateTime__c FROM ASDATransactions__r WHERE TransactionDateTime__c >=: last_n_month AND TransactionDateTime__c <=: today order by TransactionDateTime__c DESC) 
                FROM ASDAAccount__c
                WHERE Account_Number__c =: accNo    
                LIMIT 1          
            ][0];
            }   
            
            List<ASDATransaction__c> transactionList = new List<ASDATransaction__c>();
            for(ASDATransaction__c accTList : acc.ASDATransactions__r){
                transactionList.add(accTList);
            }                    
            return transactionList;
        } 
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}