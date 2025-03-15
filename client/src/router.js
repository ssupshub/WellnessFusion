
export function initRouter(routes) {
  const app = document.getElementById('app');
  
  function handleRoute() {
    const path = window.location.pathname;
    const route = routes[path] || routes['/'];
    route().then(html => {
      app.innerHTML = html;
    });
  }

  window.addEventListener('popstate', handleRoute);
  document.addEventListener('click', e => {
    if (e.target.matches('a[href^="/"]')) {
      e.preventDefault();
      history.pushState(null, '', e.target.href);
      handleRoute();
    }
  });

  handleRoute();
}
