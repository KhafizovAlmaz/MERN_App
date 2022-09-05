import 'materialize-css'
import { Loader } from './components/Loader/Loader';
import { NavBar } from './components/NavBar/NavBar';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes';

function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuth = !!token
  const routes = useRoutes(isAuth)

  if(!ready) {
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuth
    }}>
      {isAuth && <NavBar/>}
    <div className="container">
      {routes}
    </div>
    </AuthContext.Provider>
  );
}

export default App
