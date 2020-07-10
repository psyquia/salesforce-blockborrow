public with sharing class ReturnMovieController {
    public ReturnMovieController() {

    }
    @AuraEnabled
    public static String ReturnMovie(String borrowRecordId){
        List<BorrowRecord__c> bRecords = [SELECT Id__c, Returned__c, MovieCopy__r.CurrentBorrower__c, MovieCopy__r.Movie__r.AvailableCopies__c
                                            FROM BorrowRecord__c WHERE Id__c=:borrowRecordId];

        if(bRecords.size() <= 0) throw new AuraHandledException('Invalid BorrowRecord__c.Id');

        BorrowRecord__c borrowRecord = bRecords.get(0);

        return BorrowRecordManager.ReturnMovieCopy(borrowRecord);
    }
}
