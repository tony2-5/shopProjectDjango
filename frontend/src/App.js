import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Shop from './pages/Shop';
import ProtectedRoute from './components/ProtectedRoute';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

function Logout() {
  localStorage.clear()
  return <Navigate to="/login"></Navigate>
}

function ClearRegister() {
  localStorage.clear()
  return <Register/>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Shop />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={<Login/>}
        />
        <Route
          path="/register"
          element={<ClearRegister/>}
        />
        <Route
          path="/logout"
          element={<Logout/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
