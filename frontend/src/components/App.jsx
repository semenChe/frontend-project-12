import {
  BrowserRouter, Routes, Route, IndexRedirect,
} from 'react-router-dom';
import NotFound from './notFound';
import Login from './login';

const App = () => (
  <BrowserRouter>
    <Routes>
      <IndexRedirect to="login" />
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
