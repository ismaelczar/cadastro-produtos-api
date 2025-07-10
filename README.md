# API de Cadastro de Produtos 🚀

Esta é uma API RESTful desenvolvida em Node.js e TypeScript para gerenciar o cadastro de produtos. O projeto segue princípios de arquitetura limpa e utiliza um conjunto de tecnologias modernas para garantir escalabilidade, manutenibilidade e testabilidade.

---

## Funcionalidades ✨

- CRUD completo de produtos.
- Sistema de autenticação de usuários com JWT (JSON Web Tokens).
- Validação de dados de entrada.
- Upload de imagens de produtos.
- Envio de e-mails transacionais.

---

## Tecnologias Utilizadas 🛠️

- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Express**: Framework para construção de APIs REST.
- **TypeORM**: ORM (Object-Relational Mapper) para interação com o banco de dados.
- **PostgreSQL**: Banco de dados relacional utilizado no projeto.
- **TSyringe**: Biblioteca para injeção de dependência.
- **Jest**: Framework para testes automatizados.
- **Class-validator / Class-transformer**: Para validação e transformação de DTOs.
- **JSON Web Token (JWT)**: Para a implementação de autenticação stateless.
- **Bcrypt**: Para hashing de senhas.
- **Multer**: Middleware para upload de arquivos.
- **Nodemailer**: Para o envio de e-mails.
- **Handlebars**: Template engine para os e-mails.
- **ESLint / Prettier**: Para garantir a qualidade e a padronização do código.

---

## Estrutura do Projeto 📂

O projeto é organizado de forma modular e segue uma arquitetura em camadas, separando as responsabilidades:

- `src/modules`: Cada módulo da aplicação (ex: `products`, `users`) possui seus próprios componentes.
  - `application`: Contém os casos de uso (Use Cases) e a lógica de aplicação.
  - `domain`: Contém as entidades e os DTOs (Data Transfer Objects).
  - `infra`: Contém a implementação da infraestrutura, como repositórios do TypeORM e rotas do Express.
- `src/shared`: Contém código compartilhado por toda a aplicação, como o core da aplicação, tratamento de erros e configurações.

---

## Pré-requisitos 📝

Antes de começar, você vai precisar ter instalado em sua máquina:
- Node.js (versão 18 ou superior)
- Yarn ou npm
- Docker (recomendado para rodar o banco de dados)

---

## Como Rodar o Projeto ▶️

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/ismaelczar/cadastro-produtos-api.git
    cd cadastro-produtos-api
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure o ambiente:**
    - Renomeie o arquivo `.env.example` para `.env`.
    - Preencha as variáveis de ambiente no arquivo `.env` com as suas configurações (banco de dados, segredo do JWT, etc.).

4.  **Configure o TypeORM:**
    - Ao finalizar a instalação, será necessário **renomear** o arquivo `ormconfig.example.json` para `ormconfig.json`.
    - Em seguida, edite o `ormconfig.json` e substitua as informações necessárias (type, host, port, username, password, database) com os dados do seu banco de dados.
    ```json
    {
      "type": "DIGITE_TYPE_AQUI",
      "host": "DIGITE_HOST_AQUI",
      "port": 0,
      "username": "DIGITE_USERNAME_AQUI",
      "password": "DIGITE_PASSWORD_AQUI",
      "database": "DIGITE_DATABASE_AQUI",
      "entities": ["./src/modules/**/infra/typeorm/entities/*.ts"],
      "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
      "cli": {
        "migrationsDir": "./src/shared/infra/typeorm/migrations"
      }
    }
    ```

5.  **Inicie o banco de dados (exemplo com Docker):**
    ```bash
    docker run --name postgres-produtos -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=produtos -p 5432:5432 -d postgres
    ```
    > **Nota:** Certifique-se de que as credenciais no comando acima correspondem às do seu arquivo `.env` e `ormconfig.json`.

6.  **Execute as migrations do banco de dados:**
    Este comando criará as tabelas necessárias na sua base de dados.
    ```bash
    npm run migrate:up
    ```

7.  **Inicie a aplicação:**
    ```bash
    npm run dev
    ```

O servidor estará rodando em `http://localhost:3333`.

---

## Scripts Disponíveis ⚙️

- `npm run dev`: Inicia a aplicação em modo de desenvolvimento com hot-reload.
- `npm run build`: Compila o código TypeScript para JavaScript.
- `npm run start`: Inicia a aplicação em modo de produção (requer a execução do `build` antes).
- `npm test`: Executa os testes automatizados com Jest.
- `npm run migrate:up`: Aplica as migrations pendentes no banco de dados.
- `npm run migrate:down`: Reverte a última migration aplicada.

---

## Endpoints da API (Exemplos) 🌐

A API possui endpoints para gerenciar produtos. Você precisará de um token de autenticação para acessar a maioria deles.

- `POST /users` - Cria um novo usuário.
- `POST /sessions` - Autentica um usuário e retorna um token JWT.
- `GET /products` - Lista todos os produtos.
- `POST /products` - Cria um novo produto (requer autenticação).
- `DELETE /products/:id` - Deleta um produto (requer autenticação).

---

Desenvolvido por Ismael Cézar.
