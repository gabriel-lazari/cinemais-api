# 🎬 Cinemais - API de Catálogo e Favoritos

O objetivo é construir uma **API RESTful** para gerenciar o catálogo de mídias (filmes e séries) e a lista de favoritos dos usuários da plataforma **Cinemais**.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **Framework:** NestJS  
  > Escolhi o NestJS por sua arquitetura modular, suporte nativo a TypeScript, injeção de dependências e facilidade em estruturar projetos escaláveis e bem organizados. Isso ajuda a manter boas práticas desde o início, mesmo em projetos pequenos.
- **Banco de Dados:** PostgreSQL (via Docker)  
  > Optei pelo PostgreSQL por ser um banco relacional robusto, amplamente utilizado no mercado e com ótimo suporte a queries complexas. Além disso, a integração com Docker facilita a configuração e execução em qualquer ambiente.
- **Testes:** Jest
  > Escolhi o Jest por sua integração nativa com TypeScript e NestJS, simplicidade na escrita de testes, suporte embutido a mocks, execução rápida em paralelo e relatórios de cobertura de código integrados. Isso garante produtividade e qualidade no desenvolvimento.
- **Containerização:** Docker + Docker Compose
  > Utilizados para padronizar o ambiente de execução, simplificar a configuração e permitir que a aplicação e o banco de dados sejam orquestrados com um único comando (`docker-compose up`). Isso garante portabilidade e consistência entre diferentes ambientes.
- **Qualidade de Código:** ESLint + Prettier
  > O **ESLint** foi configurado para identificar e corrigir problemas de padrão e boas práticas no código, ajudando a manter consistência e evitar erros comuns em TypeScript/NestJS.  
  > O **Prettier** é responsável pela formatação automática do código (quebra de linhas, indentação, aspas, etc.), garantindo legibilidade e padronização entre diferentes desenvolvedores.  
  > Juntos, eles asseguram um código mais limpo, consistente e fácil de manter, reduzindo retrabalho e facilitando revisões.
- **Tratamento de Erros:** Nativos do NestJS  
  > Foi implementado um tratamento de erros robusto e centralizado utilizando filtros globais (`Exception Filters`) e a estrutura padrão do NestJS para garantir respostas consistentes e claras em toda a API.
- **Validação de Dados:** class-validator + Enums  
  > Utilizados para validar entities, DTOs, garantindo integridade e consistência dos dados.  
- **Documentação da API:** Swagger 
  > Integrado para gerar automaticamente uma documentação interativa da API.  
  > Com o Swagger, é possível visualizar todos os endpoints, seus parâmetros, exemplos de requisição e resposta, além de testar as rotas diretamente pelo navegador em uma interface amigável. 
  > A documentação estará disponível em: http://localhost:3000/api
---

## ⚙️Como Rodar o Projeto
### 💻 Rodar localmente (sem Docker)
```js
npm install
npm run start:dev
```
> Obs: será necessário criar um banco PostgreSQL e configurar com as credencias .env
### 🐳 Subir a aplicação com Docker
```js
docker-compose up --build
```
### 🧪 Rodando os Teste
```js
npm run test
```
## 📃 Documentação da API
A documentação interativa da API está disponível via **Swagger** no seguinte endereço após rodar o projeto

🔗 **http://localhost:3000/api**


## 📂 Coleções da API
Para facilitar os testes, disponibilizei uma **collection** com todos os endpoints da API já configurados.
- https://drive.google.com/file/d/1bWeQEUUDF8tSH1tELx89Yb2yNWZG2L-q/view?usp=drive_link
> Basta importar a collection no Postman ou Insomnia e já será possível testar todos os endpoints da API de forma prática.

## 🔑 Configurar variáveis de ambiente
```env
DB_TYPE=postgres
DB_HOST=db
DB_PORT=5432
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=mydb

API_PORT=3000

POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=mydb
```
> Obs: deixei o .env disponivel no projeto

## 📋 Pré-requisitos
- Node.js (>= 18.x)
- Docker
# mecha_flow_api
