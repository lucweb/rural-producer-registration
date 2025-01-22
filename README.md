# Aplicação de Cadastro de Produtores Rurais

Esta é uma aplicação backend projetada para gerenciar o cadastro e as informações de produtores rurais. Ela foi construída utilizando **NestJS** com um banco de dados **PostgreSQL** e **Docker** para containerização. A aplicação permite operações CRUD sobre os produtores rurais e é estruturada de maneira modular para manter a escalabilidade e a facilidade de manutenção.

## Funcionalidades

- **Operações CRUD**: Gerenciar registros de produtores rurais (Criar, Ler, Atualizar, Deletar).
- **Integração com PostgreSQL**: Um banco de dados PostgreSQL armazena os dados dos produtores rurais.
- **Aplicação Dockerizada**: A aplicação está totalmente containerizada com Docker para facilitar o deployment.

## Requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados em sua máquina:

- **Docker**: [Instalar Docker](https://www.docker.com/products/docker-desktop)
- **Docker Compose**: [Instalar Docker Compose](https://docs.docker.com/compose/install/)
- **Node.js** (v20 ou superior): [Instalar Node.js](https://nodejs.org/)

## Começando

### Clonando o repositório

```bash
git clone https://github.com/username/rural-producer-registration.git
cd rural-producer-registration
````

## install, Compile and run the project

```bash
# install
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## install, Compile and run the project

```bash
$ sudo docker-compose up --build -d

# remove image and container
$ sudo docker-compose down -v
```


