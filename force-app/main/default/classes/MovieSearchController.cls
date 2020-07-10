public with sharing class MovieSearchController {
    public MovieSearchController() {

    }

    @AuraEnabled(cacheable=true)
    public static Movie__c[] searchMovies(String q, Integer resLimit){
        if(q == '') return NULL;

        String pattern = '%'+q+'%';
        return [SELECT Id, Name, Director__c, Actors__c, Year__c, Plot__c, 
                Poster__c, Rating__c, AvailableCopies__c, NumberOfCopies__c, TotalBorrows__c 
                FROM Movie__c WHERE Name LIKE :pattern
                ORDER BY TotalBorrows__c DESC 
                LIMIT :resLimit];
    }
}