
<div align="center">
  <h1>🚀 API de Cadastro de Produtos</h1>
  <p>
    API RESTful para cadastro e gerenciamento de produtos e usuários, desenvolvida com Node.js, Express, TypeScript e baseada nos princípios da Clean Architecture.
  </p>

  <p>
    <img alt="Node.js" src="https://img.shields.io/badge/Node.js-v18%2B-339933?style=for-the-badge&logo=node.js">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.0%2B-3178C6?style=for-the-badge&logo=typescript">
    <img alt="License" src="https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge">
  </p>
</div>

---

## 📖 Índice

- [Visão Geral](#-visão-geral)
- [Arquitetura](#-arquitetura-clean)
- [Tecnologias](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Execução](#-execução)
  - [Com Docker (Recomendado)](#-com-docker-recomendado)
  - [Manual](#-execução-manual)
- [Migrations](#-migrations)
- [Testes](#-testes)
- [Uploads](#-uploads)
- [Cache com Redis](#-cache-com-redis)
- [Providers e Serviços](#-providers-e-serviços)
- [Contribuição](#-contribuição)
- [Licença](#-licença)
- [Contato](#-contato)

---

## 📌 Visão Geral

Esta API serve como base sólida para sistemas de e-commerce, catálogos de produtos ou qualquer aplicação que exija gerenciamento de usuários e produtos.

### Principais recursos:

- **Autenticação via JWT**
- **Cache com Redis**
- **Banco de dados PostgreSQL com TypeORM**
- **Injeção de dependência com tsyringe**
- **Uploads de arquivos (multer)**
- **Envio de e-mails (Ethereal no ambiente de dev)**
- **Validação de dados com class-validator e express-validator**
- **Testes automatizados com Jest**

---

## 🏛️ Arquitetura Clean

O projeto segue os princípios da **Clean Architecture**, priorizando:

- Independência de frameworks
- Separação clara de responsabilidades
- Testabilidade
- Escalabilidade
- Independência de banco de dados ou UI

### 📁 Estrutura de Pastas

```
.
├── src
│   ├── main                  # Inicialização da aplicação, rotas e middlewares
│   │   ├── http
│   │   │   ├── middlewares   # Middlewares (auth, admin, upload)
│   │   │   └── routes        # Rotas da API
│   │   ├── server.ts         # Ponto de entrada
│   │   └── app.ts            # Configuração da instância Express
│   │
│   ├── modules               # Módulos da aplicação (users, products, auth)
│   │   └── users
│   │       ├── application   # Casos de uso e controllers
│   │       ├── domain        # Entidades, interfaces e DTOs
│   │       └── infra         # Implementações com TypeORM
│   │
│   └── shared                # Recursos compartilhados
│       ├── container         # Injeção de dependência (tsyringe)
│       ├── core              # Classes e erros genéricos
│       ├── providers         # Serviços externos (mail, storage, cache)
│       └── infra             # Configuração do TypeORM e migrations
│
├── .env.example              # Exemplo de variáveis de ambiente
├── jest.config.js            # Configuração de testes
└── package.json
```

---

## 🧰 Tecnologias Utilizadas

- Node.js 18+
- TypeScript 5+
- Express
- PostgreSQL + TypeORM
- Redis
- Docker
- Multer
- Jest
- tsyringe
- JWT
- class-validator / express-validator

---

## 🧾 Pré-requisitos

- Node.js v18+
- NPM ou Yarn
- Docker (recomendado)
- PostgreSQL
- Redis

---

## ⚙️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/ismaelczar/cadastro-produtos-api.git
cd cadastro-produtos-api
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o ambiente:

```bash
cp .env.example .env
```

4. Atualize o arquivo `.env` com suas credenciais e configurações.

---

## ▶️ Execução

### 🔄 Com Docker (Recomendado)

Em breve — adicionar instruções de uso com Docker Compose.

### 🛠️ Execução Manual

**Modo de desenvolvimento:**

```bash
npm run dev
```

Servidor rodando em: `http://localhost:3333`

**Modo de produção:**

```bash
npm run build
npm start
```

---

## 🗃️ Migrations

Gerenciamento de schema com TypeORM.

**Criar nova migration:**

```bash
npm run migrate:create -- --name=MinhaMigration
```

**Executar migrations:**

```bash
npm run migrate:up
```

**Reverter última migration:**

```bash
npm run migrate:down
```

---

## 🧪 Testes

Execute todos os testes com:

```bash
npm run test
```

Geração de cobertura de testes disponível na pasta `coverage/`.

---

## 📥 Uploads

- Armazenamento local via `DiskStorageProvider` na pasta `tmp/`.
- Endpoint para upload de avatar:  
  `PATCH /users/me/avatar`

**Recomendação**: Para produção, use provedores como Amazon S3 ou Google Cloud Storage.

---

## 🗄️ Cache com Redis

O cache é utilizado para otimizar consultas, especialmente na listagem de produtos.

- Implementado por meio de `RedisProvider`
- Invalidação manual nos casos de alteração de dados (ex: ao criar um produto, a chave `products-list` é invalidada)

---

## 🔌 Providers e Serviços

Através do `tsyringe`, os seguintes serviços são injetados:

| Abstração                 | Implementação              |
|--------------------------|----------------------------|
| `IUserRepository`        | TypeORM                    |
| `IProductRepository`     | TypeORM                    |
| `IUserTokensRepository`  | TypeORM                    |
| `IHashProvider`          | Bcrypt                     |
| `IMailProvider`          | Ethereal (dev)             |
| `IRedisProvider`         | Redis                      |
| `IStorageProvider`       | Disco local (`tmp/`)       |

---

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

## 🪪 Licença

Distribuído sob a Licença ISC.

---

## 📬 Contato

Desenvolvido por **Ismael Cezar**  
[GitHub - @ismaelczar](https://github.com/ismaelczar)
