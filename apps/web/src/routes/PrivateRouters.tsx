import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from '@/pages';

export function PrivateRouters() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
