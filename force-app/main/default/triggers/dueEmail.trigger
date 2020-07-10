trigger dueEmail on BorrowRecord__c (after update) {
    for(BorrowRecord__c br : Trigger.new){
        if(br.IsDue__c == true && br.Returned__c == false) {
            Borrower__c borrower = [SELECT Email__c FROM Borrower__c WHERE Id=:br.Borrower__c LIMIT 1];
            MovieCopy__c movieCpy = [SELECT Name, Movie__r.Poster__c, CopyNumber__c FROM MovieCopy__c WHERE Id=:br.MovieCopy__c LIMIT 1];
            String emailAddr = borrower.Email__c;
            String subject = 'DUE: ' + movieCpy.Name + ' Copy';
            String body = 'Movie copy due';
            String html = '<h1  style="display:inline;"> Blockborrow: Due Movie Alert</h1> <br> <br>'+
                        '<img src="' + movieCpy.Movie__r.Poster__c + '"><br>'+
                        'Movie Title:<b>  ' + movieCpy.Name +'</b>' + 
                        '<br> Copy Number:<b>  ' + movieCpy.CopyNumber__c +
                        '</b> <br> <p>'+
                        'Date Borrowed:  <b>' + br.DateBorrowed__c.format() +
                        '</b><br>Date Due:  <b>' + br.DateDue__c.format() +
                '<br><br> <i> Please return as soon as possible. <br></b> </i> Thank you!  </p> ';

            EmailManager.sendMail(emailaddr, subject, body, html);
        }
    }
}