public with sharing class MovieTileListController {
    public MovieTileListController() {

    }

    public class MoviePage {
        @AuraEnabled
        public Integer maxPage { get; set; }

        @AuraEnabled
        public Movie__c[] movies { get; set; }
    }

    @AuraEnabled(cacheable=true)
    public static MoviePage getAllMovies(Decimal pageDecimal){
        MoviePage moviePage = new MoviePage();

        Integer pageLength = 9;
        Integer page = (Integer) pageDecimal;
        Integer offset;

        Integer movieTotal = Database.countQuery(
            'SELECT count() FROM Movie__c'
        );

        moviePage.maxPage = (Math.ceil((decimal)movieTotal / (decimal)pageLength)).intValue();
        if (moviePage.maxPage == 0) 
            moviePage.maxPage = 1;
        

        offset = pageLength * ( page - 1);

        moviePage.movies = [SELECT Id, Name, Director__c, Actors__c, Year__c, Plot__c, Poster__c, Rating__c, IsAvailable__c, AvailableCopies__c, NumberOfCopies__c, TotalBorrows__c FROM Movie__c ORDER BY TotalBorrows__c DESC 
        LIMIT 9 OFFSET :offset];
        
        return moviePage;
    }
}