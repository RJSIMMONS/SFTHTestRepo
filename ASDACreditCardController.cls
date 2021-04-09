public with sharing class ASDACreditCardController {
    @AuraEnabled(cacheable=true)    

    public static List<ASDACreditcard__c> CreditCardInfo(integer accNo) {
        try {            
            ASDAAccount__c acc = new ASDAAccount__c();
            acc = [
                SELECT Account_Number__c, 
                (SELECT Credit_card_number_T__c, Balance__c, Type__c, Issue_Date__c FROM ASDACreditcards__r) 
                FROM ASDAAccount__c
                WHERE Account_Number__c =: accNo    
                LIMIT 1          
           ][0];
           
           List<ASDACreditcard__c> creaditCardList = new List<ASDACreditcard__c>();
           creaditCardList.add(acc.ASDACreditcards__r);           
           return creaditCardList;
        } 
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
