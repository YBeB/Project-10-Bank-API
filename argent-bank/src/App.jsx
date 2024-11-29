import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Home from './component/Home';
import Login from './component/Login';
import UserProfile from './component/UserProfile';
import NavBar from './component/NavBar';
import { initializeAuth } from '../redux/actions/authActions';

export default function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Appeler initializeAuth au chargement de l'application
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <UserProfile />
            ) : (
              <Login /> // Redirige vers la page de login si l'utilisateur n'est pas authentifié
            )
          }
        />
      </Routes>
    </Router>
  );
}
