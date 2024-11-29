
import axios from 'axios';
import { loginStart, loginSuccess, loginFail, logoutSuccess, updateProfileSuccess } from '../reducers/authReducer';

// URL de base de l'API, défini dans les variables d'environnement
const API_URL = 'http://localhost:3001/api/v1';

// Action de connexion
export const login = (username, password, rememberMe) => {
  return async (dispatch) => {
    // Déclencher le début de la connexion pour mettre à jour l'état (par exemple, afficher un indicateur de chargement)
    dispatch(loginStart());
    try {
      // Requête pour se connecter et récupérer le token
      const response = await axios.post(`${API_URL}/user/login`, {
        email: username,
        password: password,
      });

      const { token } = response.data.body;

      // Stocker le token selon l'option "Remember Me"
      if (rememberMe) {
        localStorage.setItem('token', token); // Stocker dans localStorage pour persistance
      } else {
        sessionStorage.setItem('token', token); // Stocker dans sessionStorage pour la session en cours
      }

      // Requête pour récupérer le profil de l'utilisateur connecté
      const profileResponse = await axios.post(
        `${API_URL}/user/profile`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Dispatch de l'action loginSuccess avec les données utilisateur
      dispatch(loginSuccess({ user: profileResponse.data.body, token }));
    } catch (error) {
      // En cas d'erreur, dispatch de l'action loginFail avec un message d'erreur approprié
      const errorMessage = error.response ? error.response.data.message : 'Une erreur est survenue. Veuillez réessayer.';
      dispatch(loginFail(errorMessage));
    }
  };
};

// Action de déconnexion
export const logout = () => {
  return (dispatch) => {
    // Supprimer le token du localStorage et du sessionStorage
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    // Dispatch de l'action logoutSuccess pour réinitialiser l'état d'authentification
    dispatch(logoutSuccess());
  };
};

// Action de mise à jour du profil
export const updateProfile = (updatedData) => {
  return async (dispatch) => {
    try {
      // Récupérer le token à partir du localStorage ou du sessionStorage
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');

      // Vérifier si le token est présent
      if (!token) {
        throw new Error('Utilisateur non authentifié');
      }

      // Requête pour mettre à jour les informations du profil
      const response = await axios.put(
        `${API_URL}/user/profile`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Dispatch de l'action updateProfileSuccess avec les nouvelles données utilisateur
      dispatch(updateProfileSuccess(response.data.body));
    } catch (error) {
      // En cas d'erreur, vous pouvez soit déclencher une action d'erreur, soit gérer localement
      console.error('Erreur lors de la mise à jour du profil :', error.response ? error.response.data.message : error.message);
    }
  };
};

export const initializeAuth = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      try {
        // Utiliser le token pour vérifier le profil utilisateur
        const profileResponse = await axios.post(
          `${API_URL}/user/profile`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Si la requête réussit, dispatcher loginSuccess pour mettre à jour l'état Redux
        dispatch(loginSuccess({ user: profileResponse.data.body, token }));
      } catch (error) {
        console.error('Erreur lors de la vérification du token :', error);
        // En cas d'erreur, retirer le token invalide
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        dispatch(loginFail('Session expirée. Veuillez vous reconnecter.'));
      }
    }
  };
};
