import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/login';
import FormCRUD from './pages/FormCRUD';
import TelaInicial from './components/TelaInicial/TelaInicial';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<TelaInicial />} />
      <Route path="/login" element={<Login />} />
      <Route path="/formulario" element={<FormCRUD />} />
      <Route path="/formList" element={<FormCRUD />} />
    </Routes>
  </Router>
);

export default App;
