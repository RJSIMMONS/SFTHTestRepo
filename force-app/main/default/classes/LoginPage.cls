public without sharing class LoginPage {
@auraEnabled
    public static string GetUser(String username, String password){
        System.debug(username);
        List<ASDAUsers__c> listUser = [SELECT Username__c,Password__c,Full_Name__c FROM ASDAUsers__c WHERE Username__c =: username LIMIT 1];       
        if(listUser.size() == 0){            
            return 'Not Found';
        }
        else{            
            if(listUser[0].Password__c == password ){                
                //return listUser[0];
                //new comment
                return 'Found';
            }
            else{                
                return 'Incorrect Password';
            }  
        }
    }
}