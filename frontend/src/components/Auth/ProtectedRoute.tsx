'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { CircularProgress, Box } from '@mui/material';
import { RootState } from '../../lib/redux/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isInitialized } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // Wait for initialization to complete before checking auth
    if (isInitialized && !isAuthenticated) {
      console.log('ProtectedRoute: Not authenticated, redirecting to /login');
      router.replace('/login'); // Use replace to avoid adding login to history stack
    }
  }, [isAuthenticated, isInitialized, router]);

  if (!isInitialized) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Render children only if authenticated (or if initialization isn't complete yet, handled above)
  return isAuthenticated ? <>{children}</> : null; // Render null while redirecting
};

export default ProtectedRoute;