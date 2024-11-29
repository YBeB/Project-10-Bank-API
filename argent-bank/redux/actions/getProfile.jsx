import axios from 'axios';
export const getProfile = (token) => {
    return async (dispatch) => {
      try {
        const response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        dispatch({
          type: 'GET_PROFILE_SUCCESS',
          payload: response.data.body
        });
      } catch (error) {
        dispatch({
          type: 'GET_PROFILE_FAIL',
          error: error.response ? error.response.data.message : 'Something went wrong'
        });
      }
    };
  };
  
  export const updateProfile = (firstName, lastName) => {
    return async (dispatch, getState) => {
      const token = getState().auth.token;
  
      try {
        const response = await axios.put('http://localhost:3001/api/v1/user/profile', {
          firstName,
          lastName
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        dispatch({
          type: 'UPDATE_PROFILE_SUCCESS',
          payload: response.data.body
        });
      } catch (error) {
        dispatch({
          type: 'UPDATE_PROFILE_FAIL',
          error: error.response ? error.response.data.message : 'Something went wrong'
        });
      }
    };
  };
  