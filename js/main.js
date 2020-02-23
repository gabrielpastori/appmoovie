const KEY="6f228a124b52956ac305a349079b7f2b"
const LANGUAGE = 'pt-BR';
const REGION = 'BR';
$(window).on("load",function(){
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
                $.getJSON("https://api.themoviedb.org/3/movie/"+id+"?api_key="+KEY+'&language='+LANGUAGE).then(function(responseForId){
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
    function drawMovies(arr){
        $("#search-result").empty();
        var limit=6;
        for(var i=0;i<limit;i++){
            if(arr[i].poster_path==null){
                limit++;
            }else{
                $("#search-result").append($("<img>").attr("src","https://image.tmdb.org/t/p/original"+arr[i].poster_path));
            }
        }
    }
    $(window).on("scroll",function(){
        if($(window).scrollTop()>10){
            $(".navbar")
            .removeClass("navbar-dark bg-transparent")
            .addClass("navbar-light bg-light")
            
        
        }else{
            $(".navbar")
            .addClass("navbar-dark bg-transparent")
            .removeClass("navbar-light bg-light");
        }
    });
    $("#movie-search").keyup(function(){
        if($(this).val()==""){
            $("#search-result").empty();


            console.log("aaa");
        }else{
            $.getJSON("https://api.themoviedb.org/3/search/movie?api_key="+KEY+"&language="+LANGUAGE+"&query="+$(this).val()).then(function(response){
                arr = response.results;
                drawMovies(arr); 
            });
        }
    });

    

    
    
});
