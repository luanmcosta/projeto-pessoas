# Pessoas Desaparecidas

Sistema de busca e visualização de pessoas desaparecidas, desenvolvido com React, TypeScript e Tailwind CSS.

## Dados do Desenvolvedor

- **Nome**: Luan Mineu Costa
- **Email**: luanmineucosta@gmail.com
- **GitHub**: https://github.com/luanmcosta

## Tecnologias Utilizadas

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router DOM
- Axios
- Vitest (Testing)
- Lucide React (Ícones)

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/luanmcosta/projeto-pessoas.git
cd projeto-pessoas
```

2. Instale as dependências:
```bash
npm install
# ou
yarn
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

O aplicativo estará disponível em `http://localhost:5173`

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a versão de produção
- `npm run preview` - Visualiza a versão de produção localmente
- `npm run test` - Executa os testes
- `npm run lint` - Executa a verificação de linting

## Funcionalidades

- Listagem de pessoas desaparecidas com paginação
- Filtros por:
  - Nome
  - Status (Desaparecido/Localizado)
  - Sexo
  - Faixa etária
- Visualização detalhada de cada caso
- Formulário para envio de informações sobre pessoas desaparecidas
- Interface responsiva e moderna
- Tratamento de dados ausentes
- Formatação de datas no padrão brasileiro

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes reutilizáveis
  ├── pages/         # Páginas da aplicação
  ├── services/      # Serviços e chamadas API
  ├── types/         # Definições de tipos TypeScript
  └── main.tsx       # Ponto de entrada da aplicação
```

## API

O projeto utiliza a API Abitus para obter dados sobre pessoas desaparecidas:
- Base URL: `https://abitus-api.geia.vip/v1`
- Endpoints principais:
  - `/pessoas/aberto/filtro` - Listagem com filtros
  - `/pessoas/{id}` - Detalhes de uma pessoa
  - `/pessoas/{id}/informacoes` - Envio de informações

## Testes

O projeto inclui testes unitários utilizando Vitest e Testing Library. Para executar os testes:

```bash
npm run test
```

## Melhorias Futuras

- Implementação de cache de dados
- Melhorias na acessibilidade
- Testes end-to-end
- Integração com mais fontes de dados
- Sistema de notificações para novos casos