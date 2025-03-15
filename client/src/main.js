
import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderHome } from './pages/home.js';
import { initRouter } from './router.js';

// Initialize components
renderHeader();
renderFooter();

// Setup routing
initRouter({
  '/': renderHome,
  '/face': () => import('./pages/face.js').then(m => m.renderFace()),
  '/hair': () => import('./pages/hair.js').then(m => m.renderHair()),
  '/body': () => import('./pages/body.js').then(m => m.renderBody()),
  '/wellness': () => import('./pages/wellness.js').then(m => m.renderWellness()),
});
