global with sharing class utilityController {
    public static boolean sendSMS(integer accNo) {   
        System.debug('AccNo:'+accNo);
        ASDAAccount__c account = [SELECT Mobile_Number__c FROM ASDAAccount__c WHERE Account_Number__c =: accNo];
        string mobileNo = account.Mobile_Number__c;
        
        Map<String, Object> obj = new Map<String, Object>();
        obj.put('phoneNumber', mobileNo);
        obj.put('accountNumber', '0221-25143-5248-5489');
        obj.put('massage', 'account debited.');  
       
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://app.swaggerhub.com/apis/malakasilva/sms/1.0.0#/default/sendSms');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        // Set the body as a JSON object
        request.setBody(JSON.Serialize(obj));
        HttpResponse response = http.send(request);
        System.debug(response);
        // Parse the JSON response
        if (response.getStatusCode() == 200) {
            System.debug('SMS-OK');            
            return true;
        } 
        else {
            System.debug('The status code returned was not expected: ' +
            response.getStatusCode() + ' ' + response.getStatus());
            return false;
        }
    }
}