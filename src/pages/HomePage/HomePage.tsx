import React from 'react';
import NavigationBar from '../../ui/components/NavigationBar/NavigationBar';
import HeroSection from '../../ui/components/HeroSection/HeroSection';

const PaginaPrincipal: React.FC = () => {
  const heroTitle = "O Grande Mestre Do Cadastro";
  const heroDescription = `Cansado da bagunça de cadastrar cursos, turmas e áreas?
    Liberte o poder da organização! Com **O Grande Mestre Do Cadastro**,
    gerenciar seus dados educacionais é tão fácil que parece trapaça (no bom sentido!).
    Diga adeus às planilhas e olá para a maestria!`;

  return (
    <>
      <NavigationBar />
      <HeroSection 
        title={heroTitle}
        description={heroDescription}
        cadastroLink="/cursos/cadastro"
        listaLink="/cursos/lista"
      />
    </>
  );
};

export default PaginaPrincipal;