import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation, type Location } from 'react-router-dom';
import { login } from '../../../auth';

interface LocationState {
  from: {
    pathname: string;
  };
}

interface LoginFormHook {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isFormInvalid: boolean;
  handleLogin: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  error: string;
  isLoading: boolean;
}

export const useLoginForm = (): LoginFormHook => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const navigate = useNavigate();
  const location = useLocation() as Location & { state?: LocationState };

  const from = location.state?.from?.pathname || '/home';

  const isFormInvalid = !email || !password;

  const handleLogin = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    
    if (isFormInvalid) {
      setError('Preencha todos os campos');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await login(email, password);
      
      if (response.success) {
        navigate(from, { replace: true });
      } else {
        setError('Falha ao fazer login. Verifique suas credenciais.');
      }
    } catch (err: any) {
      setError(err.message || 'Falha ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isFormInvalid,
    handleLogin,
    error,
    isLoading
  };
}; 
