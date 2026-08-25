import { Navigate, Route, Routes } from 'react-router-dom';
import { ForgotPassword, Login, Register } from '@/pages';

export function PublicRouters() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
