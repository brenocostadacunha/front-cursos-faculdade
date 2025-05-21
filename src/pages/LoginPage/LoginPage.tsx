import React from 'react';
import AuthLayout from '../../ui/components/Layout/AuthLayout/AuthLayout';
import WelcomeAside from '../../ui/components/Layout/AuthLayout/WelcomeAside';
import LoginForm from '../../ui/components/Auth/LoginForm/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <AuthLayout
      welcomeContent={<WelcomeAside />}
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage; 