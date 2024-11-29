// src/components/UserProfile.jsx
import  { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../redux/actions/authActions';

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupérer l'utilisateur connecté depuis le store
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

  // États locaux pour gérer les champs de mise à jour
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  // Si aucun utilisateur n'est connecté, rediriger vers la page de connexion
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Fonction pour gérer la soumission du formulaire de mise à jour
  const handleSubmit = (e) => {
    e.preventDefault();
    // Inclure le lastName existant dans la mise à jour
    dispatch(updateProfile({ firstName, lastName }));
    setEditing(false);
  };

  return (
    <div>

      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back<br />
            {user ? `${firstName} ${lastName}` : 'User'}!
          </h1>
          <button className="edit-button" onClick={() => setEditing(!editing)}>Edit Name</button>
        </div>
        {isLoading && <p>Chargement...</p>}
        {error && <p className="error-message">{error}</p>}

   
        {editing && user && (
          <form onSubmit={handleSubmit} className="edit-form">
            <div className='wrapper-content'>
            <div className="input-wrapper">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                disabled
                style={{ backgroundColor: '#e0e0e0', cursor: 'not-allowed' }}
              />
              </div>
            </div>
            <div className='buttons-edit'>
            <button type="submit" className="save-button">Save</button>
            <button type="button" className="cancel-button" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </form>
        )}


        <section className="accounts">
          <h2 className="sr-only">Accounts</h2>
          <div className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </div>
          <div className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </div>
          <div className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </div>
        </section>
      </main>


      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default UserProfile;
