import routes from './routes.js'

function route(event) {
  event = event || window.event

  event.preventDefault()

  const path = event.target.getAttribute("href")

  window.history.pushState({}, "", path)

  document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));

  event.target.classList.add('active');

  handle()
}

async function handle(){
  const hash = window.location.hash || '#/';
  const path = hash.replace('#', '');
  const route = routes[path] || routes["/"]
  
  document.body.className = path === '/' ? 'home' : path.slice(1);

  const html = await fetch(route).then((response) => response.text())
  document.getElementById("app").innerHTML = html
}

window.onpopstate = handle
window.route = route

handle()