// src/redux/store.jsx
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';

// Créez le store Redux en utilisant "configureStore"
const store = configureStore({
  reducer: {
    auth: authReducer,
    // Ajouter d'autres réducteurs ici si nécessaire
  },
  devTools: import.meta.env.MODE !== 'production', // Active les DevTools uniquement en développement
});

export default store;
