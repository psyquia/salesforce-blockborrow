public with sharing class MovieManager {

    // DELETE THIS
    public static void PopulateMovies(){
        List<String> movieTitles = new List<String> {'Parasite', 'Good Time', 'White Chicks', 'Disaster Movie', 
                                                    'Superman: Red Son', 'Avengers: Endgame', 'Avatar'};
        for(String title : movieTitles){
            CreateMovieRecord(title);
        }
    }

    // DELETE THIS
    public static void DeleteAllMovies(){
        List<Movie__c> allMovies = [SELECT Id FROM Movie__c];
        
        delete allMovies;
    }

    public MovieManager() {

    }

    public static void updateCopiesZero(){
        List<Movie__c> allMovies = [SELECT Id, NumberOfCopies__c, AvailableCopies__c FROM Movie__c];

        for(Movie__c mov : allMovies){
            mov.put('TotalBorrows__c',0);
        }

        update allMovies;
    }
    

    public static void DeleteMovieRecord(String id){
        Movie__c toDel = [SELECT Name FROM Movie__c WHERE Id__c = :id LIMIT 1];

        delete toDel;
    }

    
    public static void CreateMovieRecord(String title){
        List<Movie__c> old = [SELECT Id, Name FROM Movie__c WHERE Name=:title LIMIT 1];
        if( old.size() > 0){
            throw new AuraHandledException('Movie record already exists');
        }


        String titlewOutSpaces = title.replaceAll(' ','%20');

        Map<String, Object> omdbJSON = getJson('http://www.omdbapi.com/?t=' + titlewOutSpaces + '&plot=full&apikey=%MYKEY%');

        Map<String, Object> movieData = GetMovieMap(omdbJSON);

        if(movieData != null) {
            Movie__c nMovie = new Movie__c(
                Name= (String) movieData.get('Name'),
                Year__c= (Integer) movieData.get('Year'),
                Director__c= (String) movieData.get('Director'),
                Plot__c= (String) movieData.get('Plot'),
                Country__c= (String) movieData.get('Country'),
                Poster__c= (String) movieData.get('Poster'),
                Rated__c= (String) movieData.get('Rated'),
                Rating__c= (Decimal) movieData.get('Rating'),
                Trailer__c= (String) movieData.get('Trailer'),
                Actors__c= (String) movieData.get('Actors'),
                BorrowLimit__c= 14,
                NumberOfCopies__c= 0,
                AvailableCopies__c= 0,
                TotalBorrows__c= 0
            );

            insert nMovie;

        }else{
           throw new AuraHandledException('Movie not found');
        }
    }

    public static void CreateMovieRecord(String title, Integer year){

        if([SELECT Id FROM Movie__c WHERE Name=:title] != NULL)
            throw new AuraHandledException('Movie record already exists');

        String titlewOutSpaces = title.replaceAll(' ','%20');

        Map<String, Object> omdbJSON = getJson('http://www.omdbapi.com/?t=' + titlewOutSpaces + '+&y=' + year.format().remove(',') + '&plot=full&apikey=%MYKEY%');
                        
        Map<String, Object> movieData = GetMovieMap(omdbJSON);

        if(movieData != null) {
            Movie__c nMovie = new Movie__c(
                Name= (String) movieData.get('Name'),
                Year__c= (Integer) movieData.get('Year'),
                Director__c= (String) movieData.get('Director'),
                Plot__c= (String) movieData.get('Plot'),
                Country__c= (String) movieData.get('Country'),
                Poster__c= (String) movieData.get('Poster'),
                Rated__c= (String) movieData.get('Rated'),
                Rating__c= (Decimal) movieData.get('Rating'),
                Trailer__c= (String) movieData.get('Trailer'),
                Actors__c= (String) movieData.get('Actors'),
                BorrowLimit__c= 14,
                NumberOfCopies__c= 0,
                AvailableCopies__c= 0,
                TotalBorrows__c= 0
            );

            insert nMovie;

        }else{
           throw new AuraHandledException('Movie not found');
        }
    }

    public static void CreateMovieRecord(String title, Integer year, Integer borrow_limit){

        if([SELECT Id FROM Movie__c WHERE Name=:title] != NULL) 
            throw new AuraHandledException('Movie record already exists');

        String titlewOutSpaces = title.replaceAll(' ','%20');

        Map<String, Object> omdbJSON = getJson('http://www.omdbapi.com/?t=' + titlewOutSpaces + '+&y=' + year.format().remove(',') + '&plot=full&apikey=%MYKEY%');

        Map<String, Object> movieData = GetMovieMap(omdbJSON);

        if(movieData != null) {
            Movie__c nMovie = new Movie__c(
                Name= (String) movieData.get('Name'),
                Year__c= (Integer) movieData.get('Year'),
                Director__c= (String) movieData.get('Director'),
                Plot__c= (String) movieData.get('Plot'),
                Country__c= (String) movieData.get('Country'),
                Poster__c= (String) movieData.get('Poster'),
                Rated__c= (String) movieData.get('Rated'),
                Rating__c= (Decimal) movieData.get('Rating'),
                Trailer__c= (String) movieData.get('Trailer'),
                Actors__c= (String) movieData.get('Actors'),
                BorrowLimit__c= borrow_limit,
                NumberOfCopies__c= 0,
                AvailableCopies__c= 0,
                TotalBorrows__c= 0
            );

            insert nMovie;

        }else{
           throw new AuraHandledException('Movie not found');
        }
    }


    private static Map<String, Object> getJson(String url){
        Map<String, Object> results = null;

        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(url);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
        if (response.getStatusCode() == 200) {
            // Deserialize the JSON string into collections of primitive data types.
            results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
        }

        return results;

    }

    private static Map<String,Object> GetMovieMap(Map<String, Object> omdb){

        Map<String, Object> result = new Map<String,Object>();

        // Put title in result map
        String title = (String)omdb.get('Title');
        result.put('Name', title);

        // Put year in result map
        Integer year;
        try{
            year = Integer.valueOf(((String) omdb.get('Year')).substring(0,4));
        }catch(exception e){
            throw new AuraHandledException('Cannot convert year to integer; Error Msg: ' + e.getMessage());
        }
        result.put('Year', year);

        // Put director in result map
        result.put('Director', omdb.get('Director'));

        // Put plot in result map
        result.put('Plot', omdb.get('Plot'));

        // Put country in result map
        result.put('Country', omdb.get('Country'));

        // Put poster in result map
        result.put('Poster', omdb.get('Poster'));

        // Put MPAA rating in result map
        result.put('Rated', omdb.get('Rated'));

        // Put actors in result map
        result.put('Actors', omdb.get('Actors'));

        // Put IMDb Rating in result map
        Decimal rating;
        try{
            rating = Decimal.valueOf((String) omdb.get('imdbRating'));
        }catch(exception e){
            throw new AuraHandledException('Cannot convert rating from string to decimal; Cannot convert year to integer; Error Msg: ' + e.getMessage());
        }
        result.put('Rating', rating);

        // Get trailer link from YouTube Search API and place in result map
        Map<String, Object> youtube = getJson('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=' 
                                                    + title.replace(' ','%20') + '%20' + year.format().remove(',') + '%20trailer&key=%MYKEY%');
        
        // odwa
                                                    Map<String, Object> items = (Map <String, Object>) ( (List<Object>)youtube.get('items') ).get(0);
        String videoId = (String) ( (Map <String, Object>)items.get('id') ).get('videoId');

        result.put('Trailer', 'https://www.youtube.com/embed/' + videoId);

        return result;
    }


}