🚀 API de Cadastro de Produtos
=================================

Este repositório contém uma API REST para cadastro e gerenciamento de produtos e usuários, construída com Node.js, Express, TypeScript e seguindo os princípios da Clean Architecture.

Desenvolvido por **Ismael Czar** ([@ismaelczar](https://github.com/ismaelczar))

📌 Visão Geral
----------------

Este projeto foi desenvolvido para ser uma base sólida e escalável para aplicações de e-commerce ou catálogos, com as seguintes características:

*   **Segurança**: Autenticação de rotas com JWT.
*   **Cache**: Invalidação e cache de dados com Redis para otimizar a performance.
*   **Banco de Dados**: Integração com PostgreSQL via TypeORM, incluindo sistema de migrations.
*   **Arquitetura Limpa (Clean Architecture)**: Separação clara de responsabilidades entre domínio, aplicação e infraestrutura.
*   **Injeção de Dependência**: Utilização de `tsyringe` para desacoplamento e facilidade nos testes.
*   **Uploads**: Gerenciamento de upload de avatares de usuários com `multer`.
*   **Envio de E-mails**: Provider para envio de e-mails (configurado com Ethereal para desenvolvimento).
*   **Validação**: Validação robusta de payloads de entrada com `express-validator` e `class-validator`.
*   **Testes Automatizados**: Suíte de testes unitários e de integração com Jest.

🗂️ Estrutura de Pastas
-------------------------

O projeto segue uma estrutura baseada em Clean Architecture, organizada da seguinte forma:

```
.
├── src
│   ├── main                  # Configuração do servidor, rotas e middlewares
│   │   ├── http
│   │   │   ├── middlewares   # Middlewares (auth, admin, upload)
│   │   │   └── routes        # Definição das rotas da API
│   │   ├── server.ts         # Ponto de entrada da aplicação
│   │   └── app.ts            # Configuração da aplicação Express
│   │
│   ├── modules               # Domínios da aplicação (users, products, auth)
│   │   └── users
│   │       ├── application   # Casos de Uso (Use Cases) e Controllers
│   │       ├── domain        # Entidades, DTOs e Repositórios (interfaces)
│   │       └── infra         # Implementação dos repositórios e entidades do TypeORM
│   │
│   └── shared                # Código compartilhado entre módulos
│       ├── container         # Configuração da injeção de dependência (tsyringe)
│       ├── core              # Classes e erros base
│       ├── providers         # Implementações de provedores (Cache, Mail, Storage, etc.)
│       └── infra             # Configuração de banco de dados (TypeORM) e migrations
│
├── .env.example              # Arquivo de exemplo para variáveis de ambiente
├── jest.config.js            # Configuração do Jest
└── package.json
```

🛠️ Requisitos
--------------

*   Node.js v18+
*   NPM ou Yarn
*   Docker (Recomendado para rodar as dependências)
*   PostgreSQL
*   Redis

⚙️ Instalação
----------------

1.  Clone o repositório:
    ```bash
    git clone https://github.com/ismaelczar/cadastro-produtos-api.git
    ```

2.  Acesse a pasta do projeto:
    ```bash
    cd cadastro-produtos-api
    ```

3.  Instale as dependências:
    ```bash
    npm install
    ```

4.  Crie o arquivo de variáveis de ambiente a partir do exemplo:
    ```bash
    cp .env.example .env
    ```

5.  Configure as variáveis no arquivo `.env` com suas credenciais (JWT, Redis, PostgreSQL).

▶️ Executando o Projeto
------------------------

### Desenvolvimento

Para rodar o servidor em modo de desenvolvimento com watch mode:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`.

### Produção

Para build e execução em ambiente de produção:

```bash
# 1. Compilar o código TypeScript para JavaScript
npm run build

# 2. Iniciar o servidor
npm start
```

🗃️ Migrations (TypeORM)
-----------------------

O projeto utiliza TypeORM para gerenciar o schema do banco de dados.

*   **Criar uma nova migration:**
    ```bash
    npm run migrate:create -- --name=NomeDaSuaMigration
    ```
    *(O `--` é importante para passar o nome como argumento para o script subjacente).*

*   **Executar as migrations pendentes:**
    ```bash
    npm run migrate:up
    ```

*   **Reverter a última migration executada:**
    ```bash
    npm run migrate:down
    ```

🧪 Testes
----------

Para executar a suíte de testes automatizados com Jest:

```bash
npm run test
```

O Jest está configurado para gerar relatórios de cobertura de código na pasta `coverage/`.

📥 Uploads
-----------

O sistema suporta upload de arquivos, atualmente implementado para o avatar do usuário.

*   **Storage**: Os arquivos são salvos localmente na pasta `tmp` (usando `DiskStorageProvider`). Para produção, é recomendado substituir por um provedor de armazenamento em nuvem (ex: S3, Google Cloud Storage).
*   **Endpoint**: `PATCH /users/me/avatar`

🗄️ Cache com Redis
-------------------

A aplicação utiliza Redis para cache de dados, visando melhorar a performance de consultas frequentes.

*   **Provider**: `RedisProvider` implementa a interface `IRedisProvider`.
*   **Estratégia**: A invalidação do cache é feita manualmente nos casos de uso que alteram os dados. Por exemplo, ao criar um novo produto, o cache da lista de produtos (`products-list`) é removido.

🔌 Conectores e Serviços (Providers)
--------------------------------------

O projeto utiliza injeção de dependência com `tsyringe` para gerenciar os provedores de serviços externos. As seguintes abstrações já estão configuradas em `src/shared/container`:

*   **IUserRepository**: Repositório para operações com usuários.
*   **IProductRepository**: Repositório para operações com produtos.
*   **IUserTokensRepository**: Repositório para gerenciar refresh tokens de usuários.
*   **IHashProvider**: Provedor para hashing de senhas (usando `bcrypt`).
*   **IMailProvider**: Provedor para envio de e-mails (usando `Ethereal` para desenvolvimento).
*   **IRedisProvider**: Provedor para interação com o Redis.
*   **IStorageProvider**: Provedor para armazenamento de arquivos (usando disco local).

📚 Arquitetura Clean
---------------------

A estrutura do projeto é fortemente baseada nos princípios da **Clean Architecture**, promovendo:

*   **Independência de Frameworks**: O núcleo de negócio não depende de detalhes de frameworks (Express, TypeORM).
*   **Testabilidade**: As regras de negócio podem ser testadas sem depender de UI, banco de dados ou qualquer elemento externo.
*   **Independência de UI**.
*   **Independência de Banco de Dados**.

A organização em `modules` com as camadas `domain`, `application` e `infra` reflete essa separação de responsabilidades.

📬 Contato
-----------

Desenvolvido por **Ismael Czar** - GitHub

🪪 Licença
-------------

Distribuído sob a Licença ISC.

