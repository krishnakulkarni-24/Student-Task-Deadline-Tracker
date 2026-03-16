import {Routes,Route}from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from './pages/Auth';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Toaster position="top-right" />
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
      } 
      />
    </Routes>
    </>
  );
}

export default App;