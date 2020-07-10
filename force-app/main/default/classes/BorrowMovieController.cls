public with sharing class BorrowMovieController {
    public BorrowMovieController() {

    }

    @AuraEnabled(cacheable=true)
    public static MovieCopy__c[] getMovieCopies(String title){
        return [SELECT Id, CopyNumber__c, Name FROM MovieCopy__c WHERE Available__c=true AND Name=:title ORDER BY CopyNumber__c ASC];
    }

    @AuraEnabled
    public static String borrowMovie(String movieCopyId, String borrowerId){
        
        return BorrowRecordManager.CreateBorrowRecord(movieCopyId, borrowerId);
    }
}
