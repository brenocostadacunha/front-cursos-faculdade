# Sistema de Autenticação - Documentação

## Visão Geral

Este sistema de autenticação foi desenvolvido para conectar com o backend NestJS através de requisições HTTP. Ele inclui:

- Service de autenticação (`AuthService`)
- Interceptor HTTP para tratamento de requisições
- Hook personalizado para formulário de login
- Integração com o componente de login React

## Estrutura dos Arquivos

```
src/
├── data/
│   ├── services/
│   │   └── auth.service.ts          # Service principal de autenticação
│   ├── interceptors/
│   │   └── http.interceptor.ts      # Interceptor HTTP (opcional)
│   ├── config/
│   │   └── api.config.ts           # Configurações da API
│   ├── hooks/
│   │   ├── pages/auth/
│   │   │   └── useLoginForm.ts     # Hook do formulário de login
│   │   └── common/
│   │       └── useNotification.ts  # Hook para notificações
│   └── auth.ts                     # Interface de autenticação
└── ui/components/Auth/LoginForm/
    ├── LoginForm.tsx               # Componente de login
    └── LoginForm.module.scss       # Estilos do componente
```

## Configuração

### 1. Backend (NestJS)

O sistema espera que o backend tenha os seguintes endpoints:

- `POST /auth/login` - Autenticação do usuário
- `POST /auth/register` - Registro de novo usuário

### 2. Frontend (React)

#### Configuração da URL da API

Altere a URL da API no arquivo `src/data/services/auth.service.ts`:

```typescript
const API_BASE_URL = 'http://localhost:3000'; // Substitua pela URL do seu backend
```

#### Estrutura de Resposta Esperada

**Login (POST /auth/login):**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

**Registro (POST /auth/register):**
```json
{
  "success": true,
  "message": "Usuário registrado com sucesso",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

## Uso

### Componente de Login

O componente `LoginForm` já está configurado para usar o sistema de autenticação:

```tsx
import LoginForm from './ui/components/Auth/LoginForm/LoginForm';

function App() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
```

### Hook de Login

O hook `useLoginForm` fornece todas as funcionalidades necessárias:

```typescript
const {
  email,
  setEmail,
  password,
  setPassword,
  isFormInvalid,
  handleLogin,
  error,
  isLoading
} = useLoginForm();
```

### Verificação de Autenticação

Para verificar se o usuário está autenticado:

```typescript
import { isAuthenticated } from './data/auth';

if (isAuthenticated()) {
  // Usuário está logado
}
```

### Logout

Para fazer logout:

```typescript
import { logout } from './data/auth';

logout(); // Remove token e dados do usuário
```

## Recursos Implementados

### AuthService

- ✅ Login com email e senha
- ✅ Registro de usuário
- ✅ Verificação de autenticação
- ✅ Gestão de token JWT
- ✅ Logout
- ✅ Tratamento de erros HTTP
- ✅ Redirecionamento automático em caso de token expirado

### Interceptor HTTP

- ✅ Adição automática do token de autenticação
- ✅ Tratamento de erros de rede
- ✅ Logs de requisições (modo desenvolvimento)
- ✅ Redirecionamento automático para login em caso de 401

### Componente de Login

- ✅ Formulário responsivo
- ✅ Validação de campos
- ✅ Exibição de erros
- ✅ Estado de loading
- ✅ Integração com React Router

## Personalização

### Alterar Endpoints

Modifique o arquivo `src/data/config/api.config.ts`:

```typescript
const AUTH_CONFIG = {
  loginEndpoint: '/auth/login',        // Endpoint de login
  registerEndpoint: '/auth/register',  // Endpoint de registro
  logoutEndpoint: '/auth/logout',      // Endpoint de logout
  refreshTokenEndpoint: '/auth/refresh', // Endpoint de refresh token
};
```

### Customizar Interceptor

O interceptor pode ser personalizado no arquivo `src/data/interceptors/http.interceptor.ts` para adicionar:

- Headers customizados
- Retry automático
- Cache de requisições
- Transformação de dados

## Troubleshooting

### Erro de CORS

Certifique-se de que o backend está configurado para aceitar requisições do frontend:

```typescript
// No backend NestJS
app.enableCors({
  origin: 'http://localhost:5173', // URL do frontend
  credentials: true,
});
```

### Token Expirado

O sistema automaticamente:
1. Verifica se o token está expirado
2. Remove o token inválido
3. Redireciona para a página de login

### Erro de Rede

O sistema trata erros de rede e exibe mensagens apropriadas ao usuário.

## Próximos Passos

- [ ] Implementar refresh token automático
- [ ] Adicionar remember me
- [ ] Implementar recuperação de senha
- [ ] Adicionar autenticação com redes sociais
- [ ] Implementar middleware de autenticação para rotas protegidas 