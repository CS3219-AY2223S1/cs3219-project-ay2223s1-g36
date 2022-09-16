import Router from './routes';
import { AuthProvider } from './hooks/useAuth';

function App() {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
}

export default App;
