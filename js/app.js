var home = {template: 
`
    <div id="home">
            <nav class="navbar navbar-dark bg-transparent" >
                <span class="navbar-text navbar-brand">
                Gabriel Pastori Figueira
                </span>
                <form>
                    <input type="search" placeholder="Search" id="movie-search">

                </form>
            </nav>
            
            <ul class="rslides">
                <li><div class="movie-info"><h4>Movie Title</h4><p class="movie-duration">Duração</p><p class="movie-genres">Categorias</p></div><img class="slide-image" src="" alt=""></li>
                <li><div class="movie-info"><h4>Movie Title</h4><p class="movie-duration">Duração</p><p class="movie-genres">Categorias</p></div><img class="slide-image" src="" alt=""></li>
                <li><div class="movie-info"><h4>Movie Title</h4><p class="movie-duration">Duração</p><p class="movie-genres">Categorias</p></div><img class="slide-image" src="" alt=""></li>
            </ul>
            
            <div id="second-view">
                <div id="top-rated">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect01">Ano</label>
                        </div>
                        <select class="custom-select" id="inputGroupSelect01">
                        <option selected>Qualquer Ano</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                        <option value="2014">2014</option>
                        <option value="2013">2013</option>
                        <option value="2012">2012</option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect02">Ordenar por</label>
                        </div>
                        <select class="custom-select" id="inputGroupSelect02">
                        <option selected>Mais votado</option>
                        <option value="2">Menos votado</option>
                        
                        </select>
                    </div>
                </div>
                <div id="chart-wrapper">
                    <canvas id="bar-chart-horizontal" ></canvas>
                </div>
                
                <div id="search-result">
                  
                </div>
                


            </div>
            
        </div>

`
}
var sobre = {template: 
`
<div>
<router-link to="/">EAE TESTE</router-link>
</div>


`}

var routes = [
  { path: '/', component: home },
  { path: '/sobre', component: sobre },
]

var router = new VueRouter({
  routes
})

var app = new Vue({
  el: '#app',
  router
})