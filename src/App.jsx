import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useUserStore } from './context/userStore';

function App() {
  const fetchMe = useUserStore((state) => state.fetchMe);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
