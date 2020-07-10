public with sharing class BorrowRecordManager {

    public BorrowRecordManager() {

    }

    @AuraEnabled
    public static String CreateBorrowRecord(String movieCpyId, String borrowerId){
        
        List<MovieCopy__c> movieCopies = [SELECT BorrowLimit__c, Available__c, Movie__r.TotalBorrows__c, Movie__r.AvailableCopies__c,
                                         CurrentBorrower__c FROM MovieCopy__c WHERE Id=:movieCpyId];

        if(movieCopies.size() <= 0) throw new AuraHandledException('Invalid MovieCopy__c.Id');

        
        MovieCopy__c movieCpy = movieCopies.get(0);

        if(!movieCpy.Available__c){
             throw new AuraHandledException('Movie copy is not available');
        }

        Date today = Date.today();
        BorrowRecord__c nBorrowRecord = new BorrowRecord__c(
            DateBorrowed__c= today,
            DateDue__c= today.addDays((integer)movieCpy.BorrowLimit__c),
            Returned__c= false,
            Borrower__c= borrowerId,
            MovieCopy__c= movieCpyId
        );
        
        
        // TO SET CurrentBorrower__c
        movieCpy.CurrentBorrower__c = borrowerId;
        ++movieCpy.Movie__r.TotalBorrows__c;
        --movieCpy.Movie__r.AvailableCopies__c;

        insert nBorrowRecord;
        update movieCpy;
        update movieCpy.Movie__r;
        
        return nBorrowRecord.Id;
    }

    @AuraEnabled
    public static String ReturnMovieCopy(BorrowRecord__c bRecord){
        if(bRecord.Returned__c == true)
            throw new AuraHandledException('Movie copy already returned');  // Already returned

        // Set returned checkbox
        bRecord.Returned__c = true;

        // Set current borrower of movie copy to NULL
        bRecord.MovieCopy__r.CurrentBorrower__c = NULL;

        // Add 1 to the number of available copies of the movie
        ++bRecord.MovieCopy__r.Movie__r.AvailableCopies__c;
        
        // Update the Borrow Record, Movie Copy, and Movie
        update bRecord;
        update bRecord.MovieCopy__r;
        update bRecord.MovieCopy__r.Movie__r;
        return bRecord.MovieCopy__r.Id;
    }
}