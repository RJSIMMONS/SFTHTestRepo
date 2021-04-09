public with sharing class ASDAUserController {
    @AuraEnabled(cacheable=true)
    public static ASDAUsers__c getUserBasicInfo(String nic){      
        try {
            return [
                SELECT Full_Name__c, NIC_Number__c
                FROM ASDAUsers__c
                WHERE NIC_Number__c = :nic  
                LIMIT 1             
           ][0];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }    
}