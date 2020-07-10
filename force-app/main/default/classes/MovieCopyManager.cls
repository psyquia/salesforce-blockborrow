public with sharing class MovieCopyManager {
    public MovieCopyManager() {

    }

    // TO SET CURRENTBORROWER
    // MovieCopy__c movieCpy = [SELECT Id, CurrentBorrower__r.Name FROM MovieCopy__c WHERE CopyNumber__c=2];
    // Borrower__c borr = [SELECT Id FROM Borrower__c LIMIT 1];
    // movieCpy.CurrentBorrower__c = borr.Id;
    // update movieCpy;
    
    public static void DeleteMovieCopyRecord(String title, Integer copyNumber){
        MovieCopy__c copyToDel = [SELECT Name, Movie__r.NumberOfCopies__c, Movie__r.AvailableCopies__c
                                 FROM MovieCopy__c WHERE Name=:title and CopyNumber__c=:copyNumber LIMIT 1];

        --copyToDel.Movie__r.NumberOfCopies__c;

        if(copyToDel.Available__c)
            --copyToDel.Movie__r.AvailableCopies__c;

        delete copyToDel;
    }

    public static MovieCopy__c getMovieCopy(String title, Integer copyNumber){
        return [SELECT Name, Movie__r.TotalBorrows__c, Movie__r.AvailableCopies__c, Movie__r.NumberOfCopies__c, BorrowLimit__c, Available__c 
                            FROM MovieCopy__c 
                            WHERE Name=:title AND CopyNumber__c=:copyNumber];

    }

    public static void CreateMovieCopyRecord(String title){

        Movie__c movieSrc = [SELECT Id, Name, NumberOfCopies__c, AvailableCopies__c FROM Movie__c WHERE Name = :title LIMIT 1];

        if(movieSrc != NULL){
            MovieCopy__c movieCpy = new MovieCopy__c(
                Name= movieSrc.Name,
                CopyNumber__c= movieSrc.NumberOfCopies__c+1,
                Movie__c= movieSrc.Id
            );

            ++movieSrc.NumberOfCopies__c;
            ++movieSrc.AvailableCopies__c;

            insert movieCpy;
            update movieSrc;
        }else{
            throw new AuraHandledException('Movie with name = @param title not found');
        }
    }

}