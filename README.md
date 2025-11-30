# 📦 Gerenciador de Pedidos

## 📖 Sobre o Projeto

**Gerenciador de Pedidos** é uma aplicação **Node.js** desenvolvida para otimizar a gestão de pedidos em sistemas de logística. O foco principal é oferecer funcionalidades robustas para criação, rastreamento e atualização de status de pedidos.

O projeto foi construído majoritariamente em **JavaScript** e conta com suporte total a containerização via **Docker**, o que facilita o deploy e a escalabilidade em diferentes ambientes.

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **[Node.js](https://nodejs.org/)**: Runtime para execução do backend.
- **JavaScript**: Linguagem principal utilizada na lógica de negócios.
- **Docker**: Utilizado para containerização, garantindo um deploy consistente e escalável.

## ✨ Funcionalidades Principais

- ✅ **Gestão de Pedidos**: Criação e listagem detalhada de pedidos.
- 🔄 **Controle de Status**: Atualização dinâmica (ex: _pendente_, _em preparo_, _entregue_).
- 🗄️ **Persistência de Dados**: Estrutura preparada para integração com bancos de dados (como MongoDB ou ORMs como Prisma).

## ⚙️ Como Executar

### Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina as seguintes ferramentas:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/) (Opcional, para execução em container)

### 👣 Passo a passo

#### 1. Clone o repositório

```bash
git clone [https://github.com/AnGabSS/gerenciador_de_pedidos.git](https://github.com/AnGabSS/gerenciador_de_pedidos.git)
```

#### 2\. Acesse o diretório do projeto

```bash
cd gerenciador_de_pedidos
```

#### 3\. Instale as dependências

```bash
npm install
```

#### 4\. Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto seguindo o modelo (se houver) e configure suas credenciais (ex: conexão com banco de dados).

#### 5\. Executando a aplicação

**Opção A: Rodando localmente com Node.js**

```bash
npm start
```

**Opção B: Rodando com Docker**

```bash
# Criar a imagem
docker build -t gerenciador-pedidos .

# Executar o container
docker run -p 3000:3000 gerenciador-pedidos
```

_(Nota: Certifique-se de ajustar a porta `-p` conforme a configuração exposta no seu projeto)._
