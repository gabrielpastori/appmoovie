const KEY="6f228a124b52956ac305a349079b7f2b"
const LANGUAGE = 'pt-BR';
const REGION = 'BR';
function nowPlaying(){
    var movieIds = [];
    $.getJSON('https://api.themoviedb.org/3/movie/now_playing?api_key='+KEY+'&language='+LANGUAGE+'&region='+REGION).then(function(response){
        console.log(response)
        for(var i=0;i<3;i++){
        
            var eachResult=response.results[i];
            movieIds.push(eachResult.id);
            $($(".slide-image")[i]).attr("src","https://image.tmdb.org/t/p/original"+eachResult.backdrop_path)
            $($(".movie-info h4")[i]).text(eachResult.title);
        }
        console.log(movieIds)
        movieIds.forEach(function(id,index){
            $.getJSON("https://api.themoviedb.org/3/movie/"+id+"?api_key="+KEY).then(function(responseForId){
                $($(".movie-duration")[index]).text("Duração: "+responseForId.runtime+" minutos.");
                var genres="";
                var responseGenresLenght = responseForId.genres.length;
                responseForId.genres.forEach(function(val,idx){
                    genres+=val.name;
                    
                    if(idx==(responseGenresLenght-1)) genres+=".";
                    else genres+=", "
                    
                })
                $($(".movie-genres")[index]).text(genres);
            });
        })
            
    });
    
    
}
nowPlaying();