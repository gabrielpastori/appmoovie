var home = {template: 
`

`
}
var sobre = {template: 
`



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