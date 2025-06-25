# 🚀Cadastro de Produtos

Esse repositório contém todos os arquivos referentes ao sistema de cadastro de produtos.

## 📌 Visão Geral

- Segurança por padrão (JWT, CORS, Rate Limit, Helmet)
- Repositórios genéricos com TypeORM
- Testes automatizados

## 🗂️ Estrutura de Pastas

```
.
├── @types                    # Tipagens globais e customizações do Express
├── shared                    # Provedores etc.
│   ├── dtos/errors           # DTOs de erros
│   ├── container             # Inversão de dependência (tsyringe)
│   ├── generic/repositories  # GenericRepository
├── main
│   ├── app.ts                # Criação da aplicação Express
│   ├── server.ts             # Entrada principal
│   ├── http/middlewares      # Middlewares globais
│   ├── http/routes           # Rotas agrupadas por domínio
├── modules                   # Domínios da aplicação (auth, users, mail)
│   ├── example
```

## 🛠️ Requisitos

- Node.js v18+
- Npm
- Docker + Docker Compose
- PostgreSQL (ou use as imagens Docker)

## ⚙️ Instalação

```bash
git clone https://github.com/ismaelczar/cadastro-produtos-api.git
cd cadastro-produtos-api
npm install
cp .env.example .env
```

Configure suas variáveis de ambiente no `.env`.

## ▶️ Executando o Projeto

### Desenvolvimento

```bash
npm run dev
```

### Produção

```bash
npm run build
npm run start
```

## 🧪 Testes

```bash
npm run test
```



## 📚 Arquitetura Clean

- `modules`: separação por domínio (ex: `users`, `auth`)
- `application/useCases`: casos de uso isolados
- `domain/entities` e `domain/dtos`: regras de negócio
- `infra/repositories`: integração com banco


## 🪪 Licença

Distribuído sob a Licença MIT. Veja [LICENSE](./LICENSE) para mais informações.
