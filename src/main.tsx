import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { FormContextProvider } from './context/FormContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <FormContextProvider>
    <App />
  </FormContextProvider>,
);
