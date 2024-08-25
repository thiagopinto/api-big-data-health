# API Big Data Health

![API Big Data Health](https://res.cloudinary.com/dr4vsuqsk/image/upload/v1724611502/xl5vcaj3bgfhvs8gy54s.png)

## Descrição

Este projeto é uma API desenvolvida em NestJS, que implementa um sistema de autenticação de usuários, upload de imagens, listagem de imagens, e deleção de imagens utilizando o Cloudinary para armazenamento. O banco de dados utilizado é o PostgreSQL e a autenticação é feita via JWT (JSON Web Token).

## Funcionalidades

### 1. Autenticação de Usuário
- Implementação de sistema de autenticação utilizando JWT.
- Registro e login de usuários.
- Cada usuário possui suas próprias credenciais (email e senha).

### 2. Upload de Imagem
- Usuários autenticados podem fazer upload de imagens para o Cloudinary.
- As informações sobre a imagem (URL, ID do Cloudinary, etc.) são salvas no banco de dados Postgres e associadas ao usuário que fez o upload.

### 3. Listagem de Imagens
- Usuários autenticados podem listar todas as imagens que eles próprios carregaram, recuperando as informações do banco de dados.

### 4. Deleção de Imagem
- Usuários autenticados podem deletar suas próprias imagens.
- A deleção é refletida tanto no Cloudinary quanto no banco de dados.

### 5. Sincronização
- A aplicação garante que os dados entre o banco de dados Postgres e o Cloudinary estejam sempre sincronizados.
- Em caso de falhas em operações, a API lida com isso para evitar inconsistências nos dados.

## Tecnologias Utilizadas

- **NestJS**: Framework utilizado para construção da API. [Documentação](https://docs.nestjs.com/)
- **Postgres**: Banco de dados utilizado. [Documentação](https://www.postgresql.org/)
- **Cloudinary**: Serviço de armazenamento e gerenciamento de imagens. [Documentação](https://cloudinary.com/)
- **JWT (JSON Web Token)**: Utilizado para autenticação dos usuários.
- **Swagger**: Ferramenta utilizada para documentação da API.

## Documentação da API

A documentação da API é feita com Swagger, que permite a visualização e teste das rotas de forma interativa.

Para acessar a documentação Swagger, após iniciar o projeto, acesse:

## Como Rodar o Projeto

### .env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=<health>
DATABASE_PASSWORD=<secret>
DATABASE_NAME=<health>
DATABASE_SYNCHRONIZE=true

JWT_SECRET=<secret>

CLOUDINARY_CLOUD_NAME=<xxx> 
CLOUDINARY_API_KEY=<123> 
CLOUDINARY_API_SECRET=<xxx-xxx>

### 1. Clone o Repositório

```bash
git clone git@github.com:thiagopinto/api-big-data-health.git
cd api-big-data-health

npm install

npm run migration:run
npm run start:dev

## Como Rodar o Projeto com Docker

### 1. Clonar o Repositório

```bash
git clone git@github.com:thiagopinto/api-big-data-health.git
cd api-big-data-health

mkdir data

docker-compose up -d
