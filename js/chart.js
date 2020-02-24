$(window).on("load",function(){
var allMovieInfos=[];

$.ajax({
  method: "GET",
  dataType: "json",
  url: "https://api.themoviedb.org/3/movie/top_rated?api_key="+KEY+"&language="+LANGUAGE+'&region='+REGION+"&page=1",
  async: false, 
  success: function(response) {
    var results = response.results;
  
    for(i=0;i<results.length;i++){
        var movieObj={};
        movieObj['vote_count']=results[i].vote_count;
        movieObj['title']=formatLabel(results[i].title,22);
        allMovieInfos.push(movieObj)
    }
  }
});

function formatLabel(str, maxwidth){
  var sections = [];
  var words = str.split(" ");
  var temp = "";

  words.forEach(function(item, index){
      if(temp.length > 0)
      {
          var concat = temp + ' ' + item;

          if(concat.length > maxwidth){
              sections.push(temp);
              temp = "";
          }
          else{
              if(index == (words.length-1))
              {
                  sections.push(concat);
                  return;
              }
              else{
                  temp = concat;
                  return;
              }
          }
      }

      if(index == (words.length-1))
      {
          sections.push(item);
          return;
      }

      if(item.length < maxwidth) {
          temp = item;
      }
      else {
          sections.push(item);
      }

  });

  return sections;
}

function extractMovieInfos(arr){

  let labels=[]
  let data=[]
  for(var i=0;i<Math.min(6,arr.length);i++){
    labels.push(arr[i].title);
    data.push(arr[i].vote_count);
  }
  return [labels,data];
}
var movieInfos=extractMovieInfos(allMovieInfos);
var movieLabels=movieInfos[0];
var movieData=movieInfos[1];
var horizontalChart = new Chart(document.getElementById("bar-chart-horizontal"), {
  type: 'horizontalBar',
  data: {
    labels: movieLabels,
    datasets: [
      {
        label: "Votos",
        backgroundColor: "#3e95cd",
        data: movieData
      }
    ]
  },
  options: {
    responsive:true,
    maintainAspectRatio:true,
    legend: { display: false },
    scales:{
      yAxes: [{
          display: false 
      }],
      xAxes: [{
        display: true,
        ticks: {
          min: 0
        } 
      }]
    },
    title: {
      display: false,
      text: 'Predicted world population (millions) in 2050'
    }
  }
});

$("#inputGroupSelect01").change(function(){
  var selectedYear = $(this).children("option:selected").val();
  if(selectedYear=="Qualquer Ano"){
    allMovieInfos=[];
    $.ajax({
      method: "GET",
      dataType: "json",
      url: "https://api.themoviedb.org/3/movie/top_rated?api_key="+KEY+"&language="+LANGUAGE+'&region='+REGION+"&page=1",
      async: false, 
      success: function(response) {
        var results = response.results;
        console.log(results)
        for(i=0;i<results.length;i++){
            var movieObj={};
            movieObj['vote_count']=results[i].vote_count;
            movieObj['title']=formatLabel(results[i].title,22);
            allMovieInfos.push(movieObj)
        }
        if($("#inputGroupSelect02 option:selected").text()=="Mais votado"){
          allMovieInfos.sort(function(a,b){
            if(a.vote_count<b.vote_count) return 1;
            if(a.vote_count>b.vote_count) return -1;
            return 0;
          })
        }else{
          allMovieInfos.sort(function(a,b){
            if(a.vote_count<b.vote_count) return -1;
            if(a.vote_count>b.vote_count) return 1;
            return 0;
          })

        }
        var movieInfos=extractMovieInfos(allMovieInfos);
        var movieLabels=movieInfos[0];
        var movieData=movieInfos[1];
        horizontalChart.destroy();
        horizontalChart = new Chart(document.getElementById("bar-chart-horizontal"), { type: 'horizontalBar', data: { labels: movieLabels, datasets: [ { label: "Votos", backgroundColor: "#3e95cd", data: movieData } ] }, options: { responsive:true, maintainAspectRatio:true, legend: { display: false }, scales:{ yAxes: [{ display: false }], xAxes: [{ display: true, ticks: { min: 0 } }] }, title: { display: false, text: 'Predicted world population (millions) in 2050' } }});

      }
    });
  }else{
    allMovieInfos=[];
    $.ajax({
      method: "GET",
      dataType: "json",
      url: "https://api.themoviedb.org/3/movie/top_rated?api_key=6f228a124b52956ac305a349079b7f2b&language=pt-BR&region=BR&page=1&primary_release_year="+selectedYear,
      async: false, 
      success: function(response) {
        var results = response.results;
        for(i=0;i<Math.min(results.length,6);i++){
            var movieObj={};
            movieObj['vote_count']=results[i].vote_count;
            movieObj['title']=formatLabel(results[i].title,22);
            allMovieInfos.push(movieObj)
        }
        if($("#inputGroupSelect02 option:selected").text()=="Mais votado"){
          allMovieInfos.sort(function(a,b){
            if(a.vote_count<b.vote_count) return 1;
            if(a.vote_count>b.vote_count) return -1;
            return 0;
          })
        }else{
          allMovieInfos.sort(function(a,b){
            if(a.vote_count<b.vote_count) return -1;
            if(a.vote_count>b.vote_count) return 1;
            return 0;
          })

        }
        var movieInfos=extractMovieInfos(allMovieInfos);
        var movieLabels=movieInfos[0];
        var movieData=movieInfos[1];
        horizontalChart.destroy();
        
        horizontalChart = new Chart(document.getElementById("bar-chart-horizontal"), { type: 'horizontalBar', data: { labels: movieLabels, datasets: [ { label: "Votos", backgroundColor: "#3e95cd", data: movieData } ] }, options: { responsive:true, maintainAspectRatio:true, legend: { display: false }, scales:{ yAxes: [{ display: false }], xAxes: [{ display: true, ticks: { min: 0 } }] }, title: { display: false, text: 'Predicted world population (millions) in 2050' } }});

      }
    });
  }
});
$("#inputGroupSelect01").trigger("change");
$("#inputGroupSelect02").trigger("change");

$("#inputGroupSelect02").change(function(){
  $("#inputGroupSelect01").trigger("change");

})
});