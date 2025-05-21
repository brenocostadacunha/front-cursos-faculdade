import styles from './LoginForm.module.scss';
import { useLoginForm } from '../../../../data/hooks/pages/auth/useLoginForm';
const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isFormInvalid,
    handleLogin,
    error
  } = useLoginForm();

  return (
    <div className={styles.loginHost}>
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.loginContainer}>
          <div className={styles.loginContent}>
            <div className={`${styles.logo} mb-5`}></div>
            <div className="text-center mb-5">
              <div className="fs-3 fw-bold mb-1">Faça Login para acessar</div>
              <div className="fs-5 text-muted">Use suas credenciais da rede.</div>
            </div>

            {error && <div className={styles.authError}>{error}</div>}

            <div className={styles.formGroup}>
              <label htmlFor="login-email" className="font-weight-700">Email</label>
              <input
                id="login-email"
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <div className="d-flex justify-content-between align-items-end mt-4">
                <label htmlFor="login-pass" className="font-weight-700">Senha</label>
                <a href="/auth/recuperar-senha" className={`${styles.forgotPasswordLink} fs-p-12 fw-600`}>
                  Esqueceu sua senha?
                </a>
              </div>
              <input
                id="login-pass"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              className="btn btn-primary w-100 mt-4"
              type="submit"
              disabled={isFormInvalid}
            >
              <span>LOGIN</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
