public with sharing class BorrowerSearchController {
    public BorrowerSearchController() {

    }

    @AuraEnabled(cacheable=true)
    public static Borrower__c[] searchBorrowers(String q, Integer resLimit){
        if(q == '') return NULL;

        String pattern = '%'+q+'%';
        return [SELECT Id, Name, Email__c
                FROM Borrower__c WHERE Name LIKE :pattern OR Email__c LIKE :pattern
                LIMIT :resLimit];
    }
}