
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './styles/index.css';
import { initAnalytics } from './firebase';

createRoot(document.getElementById('root')!).render(<App />);

initAnalytics().catch(() => undefined);
  