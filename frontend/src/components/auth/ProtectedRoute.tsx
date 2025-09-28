import { useAuthStore } from '@/store/authStore'
import React from 'react'
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps{
    children:React.ReactNode
}

function ProtectedRoute({children}:ProtectedRouteProps) {
    const { token } = useAuthStore();
     if(token !== null)
        return children
     else
        return <Navigate to="/signin" replace />
}

export default ProtectedRoute;