const KEY="a1570fcbcc4fc23b86690ddd459cc15e";
const LANGUAGE = 'pt-BR';
const REGION = 'BR';
$(window).on("load",function(){
    function nowPlaying(){
        var movieIds = [];
        
        $.getJSON('https://api.themoviedb.org/3/movie/now_playing?api_key='+KEY+'&language='+LANGUAGE+'&region='+REGION).then(function(response){
            for(var i=0;i<3;i++){
                var eachResult=response.results[i];
                movieIds.push(eachResult.id);
                $($(".slide-image")[i]).attr("id",eachResult.id);

                $($(".slide-image")[i]).attr("src","https://image.tmdb.org/t/p/original"+eachResult.backdrop_path)
                $($(".movie-info h4")[i]).text(eachResult.title);
            }
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
        $(".slide-image").on("click",function(){
            showModal($(this).attr("id"));
        })
        
        
    }
    nowPlaying();
    function drawMovies(arr){
        $("#search-result").empty();
        $("#search-title").remove();
        $("<h3 id='search-title'>Resultados da busca</h3>").insertBefore("#search-result");
        var limit=6;
        for(var i=0;i<limit;i++){
            if(arr[i].poster_path==null){
                limit++;
            }else{
                var imageUrl = "https://image.tmdb.org/t/p/original"+arr[i].poster_path;
                var img = "<img src="+imageUrl+" class='movie-poster' id="+arr[i].id+"></img>";
                $("#search-result").append(img);
            }
        }
    }
    function formatDate(date) {
        var monthNames = [
          "Janeiro", "Fevereiro", "Março",
          "Abril", "Maio", "Junho", "Julho",
          "Agosto", "Setembro", "Outubro",
          "Novembro", "Dezembro"
        ];
      
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
      
        return day + ' de ' + monthNames[monthIndex] + ', ' + year;
    }
    function formatMoney(number) {
        return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
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
        $(window).scrollTop($(".navbar").height()+$(".rslides").height()+$("#top-rated").height()+$("#chart-wrapper").height()+30);
        if($(this).val()==""){
            $(window).scrollTop("0");
            $("#search-result").empty();
            $("#search-title").remove();
        }else{
            $.getJSON("https://api.themoviedb.org/3/search/movie?api_key="+KEY+"&language="+LANGUAGE+"&query="+$(this).val()).then(function(response){
                arr = response.results;
                drawMovies(arr); 
            });
        }
    });
    function showModal(movieId){
        $('#movieModal').modal('show');
        $.getJSON("https://api.themoviedb.org/3/movie/"+movieId+"?api_key="+KEY+'&language='+LANGUAGE).then(function(response){
            var imageUrl = "https://image.tmdb.org/t/p/original"+response.backdrop_path;
            $(".modal-title").text(response.title);
            $("#modal-poster").attr("src",imageUrl);
            $("#movie-overview").text(response.overview);
            $("#release-date").html("<b>Lançamento:</b> "+formatDate(new Date(response.release_date)));
            $("#movie-revenue").html("<b>Receita:</b> "+formatMoney(response.revenue));
            $("#movie-budget").html("<b>Orçamento:</b> "+formatMoney(response.budget));
            $(".progress-bar").css("width",response.vote_average*10+"%");
            $(".progress-bar").text("Avaliação média: "+response.vote_average);
        })
        $.getJSON("https://api.themoviedb.org/3/movie/"+movieId+"/credits?api_key="+KEY+'&language='+LANGUAGE).then(function(response){
            var filteredCast=response.cast.slice(0,Math.min(response.cast.length,6));
            var movieCast="";
            filteredCast.forEach(function(val,idx){
                movieCast+=val.character;
                
                if(idx==(Math.min(response.cast.length,6)-1)) movieCast+=".";
                else movieCast+=", "
                
            })
            $("#movie-cast").html("<b>Elenco:</b> "+movieCast);
            
            
        })
    }
    $("#search-result").on("click","img",function(){
        
        var movieId=$(this).attr("id");
        showModal(movieId);

        


    })

    
    
});
