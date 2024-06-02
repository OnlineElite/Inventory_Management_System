import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from 'react-router-dom'
import {store} from './store'
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store = {store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </QueryClientProvider>
  </BrowserRouter>
);


reportWebVitals();
