import styles from './WelcomeAside.module.scss';

const WelcomeAside = () => {
  return (
    <aside className={styles.wrapWelcome}>
      <div className={styles.welcomeTop}>
        <img src="/assets/logo.svg" alt="Logo" className={styles.logoImg} />
        <div className="fs-36 font-weight-700">Seja Bem Vindo ao Cursos Senac</div>
        <div className="fs-22">O futuro da sua vida Acadêmica.</div>
      </div>
      {}
    </aside>
  );
};

export default WelcomeAside; 