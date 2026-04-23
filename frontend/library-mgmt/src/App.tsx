import { setupInterceptors } from './services/interceptors'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    setupInterceptors();
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
