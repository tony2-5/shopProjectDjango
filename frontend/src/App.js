import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import Thankyou from './pages/Thankyou';
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
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/thankyou"
          element={
            <ProtectedRoute>
              <Thankyou/>
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
        <Route
          path="/*"
          element={<NotFound/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
