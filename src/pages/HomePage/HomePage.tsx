import React from 'react';
import NavigationBar from '../../ui/components/Layout/NavigationBar';
import HomeHeroSection from '../../ui/components/Home/HomeHeroSection';
import heroImage from '../../assets/image/oGrandeMestre.png';

const PaginaPrincipal: React.FC = () => {
  return (
    <>
      <NavigationBar />
      <HomeHeroSection heroImage={heroImage} />
    </>
  );
};

export default PaginaPrincipal;