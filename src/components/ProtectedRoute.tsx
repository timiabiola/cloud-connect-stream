
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // Show loading state
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse">
          <div className="w-10 h-10 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-slate-500 mt-4">Loading...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to login page if not authenticated
    return <Navigate to="/auth" replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
