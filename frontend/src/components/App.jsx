import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './notFound';
import Login from './login';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
