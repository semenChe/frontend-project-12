import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';

import init from './init.js';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await init());
};

app();
