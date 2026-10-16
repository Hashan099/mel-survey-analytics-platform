'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import LoadingSpinner from '../app/Components/Utils/LoadingSpinner';
import EmailVerification from '../app/Components/Utils/EmailVerification';

const Protected = ({ children }) => {
  const { user, loading, isServerValidated, isSuperAdmin } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Dev superadmin bypass — skip all auth checks
    if (isSuperAdmin) {
      setIsChecking(false);
      return;
    }

    if (!loading) {
      if (!user) {
        router.push('/auth/login');
      } else if (user && !isServerValidated) {
        router.push('/auth/login');
      } else {
        setIsChecking(false);
      }
    }
  }, [user, isServerValidated, isSuperAdmin, loading, router]);

  if (loading || isChecking) return <LoadingSpinner />;
  /* if (!verifiedUser) return <EmailVerification/> */
  return <>{children}</>;
};

export default Protected;
