import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`hero-gradient-background text-white py-5 ${className}`}
      style={{
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
};

export default PageLayout;

