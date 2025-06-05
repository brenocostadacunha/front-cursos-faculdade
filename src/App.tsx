import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage'; 
import HomePage from './pages/HomePage/HomePage';
import ProtectedRoute from './ui/components/ProtectedRoute/ProtectedRoute'; 
import './ui/styles/global.scss';
import TelaCadastroCurso from './pages/cadastroCurso/telaCadastroCursos'; 
import TelaListaCursos from './pages/edicaoCurso/telaListaCursos';   

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute> 
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cursos/cadastro"
          element={
            <ProtectedRoute> 
              <TelaCadastroCurso />
            </ProtectedRoute>
          }
        />

         <Route
          path="/cursos/lista"
          element={
            <ProtectedRoute> 
              <TelaListaCursos />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;