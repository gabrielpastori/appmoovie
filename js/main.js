const KEY="6f228a124b52956ac305a349079b7f2b"
const LANGUAGE = 'pt-BR';
const REGION = 'BR';
function nowPlaying(){
    $.getJSON('https://api.themoviedb.org/3/movie/now_playing?api_key='+KEY+'&language='+LANGUAGE+'&region='+REGION).then(function(response){
        console.log(response.results[0].backdrop_path)
        for(var i=0;i<3;i++){
            $($(".slide-image")[i]).attr("src","https://image.tmdb.org/t/p/original"+response.results[i].backdrop_path)

        }

            
    });
}
nowPlaying();