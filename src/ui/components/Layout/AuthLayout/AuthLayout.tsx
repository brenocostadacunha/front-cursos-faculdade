import styles from './AuthLayout.module.scss';
const AuthLayout = ({ welcomeContent, children }) => {
  return (
    <div className={styles.host}>
      {welcomeContent}
      <main className={styles.wrapOutlet}>
        <div className={styles.outlet}>
          {children}
        </div>
        <footer className={styles.footer}>
          <nav>
            <a href="#">Ajuda</a>
            <a href="#">Sobre</a>
          </nav>
        </footer>
      </main>
    </div>
  );
};

export default AuthLayout; 
