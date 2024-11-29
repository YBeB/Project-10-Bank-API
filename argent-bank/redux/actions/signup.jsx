import axios from 'axios'
export const signup = (firstName, lastName, email, password) => {
    return async (dispatch) => {
      try {
        await axios.post('http://localhost:3001/api/v1/user/signup', {
          firstName,
          lastName,
          email,
          password
        });
  
        // Inscription réussie, rediriger vers la page de connexion
        dispatch({
          type: 'SIGNUP_SUCCESS'
        });
      } catch (error) {
        dispatch({
          type: 'SIGNUP_FAIL',
          error: error.response ? error.response.data.message : 'Something went wrong'
        });
      }
    };
  };
  