import useAuth from "hooks/useAuth";
import Link from "next/link";
import React, { Fragment, ReactNode } from "react";

// component props interface
interface GuestGuardProps {
  children: ReactNode;
}
const GuestGuard = ({ children }: GuestGuardProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Link href="/dashboard" />;
  }

  return <Fragment>{children}</Fragment>;
};

export default GuestGuard;
