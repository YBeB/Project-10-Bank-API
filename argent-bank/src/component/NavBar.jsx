
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import argentBankLogo from '../assets/argentBankLogo.png'

export default function NavBar() {
  const dispatch = useDispatch();
  
  // Récupérer l'état de l'authentification depuis le store
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        {isLoggedIn ? (
          <>
            <a className="main-nav-item" href="/profile">
              <i className="fa fa-user-circle"></i> {user.firstName}
            </a>
            <button className="main-nav-item" onClick={() => dispatch(logout())}>
              <i className="fa fa-sign-out"></i> Sign Out
            </button>
          </>
        ) : (
          <a className="main-nav-item" href="/login">
            <i className="fa fa-user-circle"></i> Sign In
          </a>
        )}
      </div>
    </nav>
  );
}
