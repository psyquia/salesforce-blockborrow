public with sharing class BorrowerManager {
    public BorrowerManager() {

    }

    @AuraEnabled
    public static ID CreateBorrowerRecord(String name, String email){
        Borrower__c nBorrower = new Borrower__c(
            Name= name,
            Email__c= email
        );

        insert nBorrower;
        return nBorrower.id;
    }

    public static Borrower__c getBorrower(String name){
        return [SELECT Name, Email__c FROM Borrower__c WHERE Name=:name LIMIT 1];
    }

}