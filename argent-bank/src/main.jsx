
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from '../redux/store';
import './css/main.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/main.css'

ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <App />
    </Provider>

);
