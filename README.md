# App de Cursos

Aplicativo mobile desenvolvido com React Native e Expo para listar cursos, visualizar detalhes, acompanhar progresso e demonstrar uso de geolocalizacao.

## Funcionalidades

- Tela inicial com apresentacao do aplicativo e resumo de progresso.
- Tela de cursos com listagem usando `FlatList`.
- Busca por nome, descricao ou categoria do curso.
- Filtros por categoria.
- Cards de cursos com imagem, titulo, categoria, duracao, quantidade de aulas, nivel e progresso.
- Tela de detalhes com informacoes completas do curso selecionado.
- Passagem de parametros entre telas usando o `id` do curso.
- Tela de perfil com dados do aluno, progresso geral, estatisticas e endereco por geolocalizacao.
- Botao no perfil para usar a localizacao atual e exibir o endereco encontrado.
- Navegacao por abas entre Inicio, Cursos e Perfil.
- Navegacao em pilha para a tela de detalhes.

## Geolocalizacao

O projeto usa um recurso do dispositivo:

- Geolocalizacao: solicita permissao e exibe o endereco encontrado na tela de perfil.

A permissao foi configurada no `app.json` para Android e iOS.

## Tecnologias Utilizadas

- React Native
- Expo
- Expo Router
- TypeScript
- React Navigation
- Expo Vector Icons
- Expo Location

## Estrutura do Projeto

```text
app-de-cursos/
|-- app/
|   |-- (tabs)/
|   |   |-- _layout.tsx
|   |   |-- courses.tsx
|   |   |-- index.tsx
|   |   `-- profile.tsx
|   |-- _layout.tsx
|   `-- details.tsx
|-- src/
|   |-- components/
|   |   |-- category-filter.tsx
|   |   |-- course-card.tsx
|   |   |-- progress-bar.tsx
|   |   `-- stat-card.tsx
|   |-- constants/
|   |-- data/
|   |-- hooks/
|   `-- types/
|-- assets/
|   |-- icons/
|   |-- images/
|   `-- screenshots/
|-- scripts/
|-- app.json
|-- package.json
|-- package-lock.json
|-- tsconfig.json
`-- README.md
```

## Telas do Aplicativo

- Inicio: mostra a apresentacao do app, resumo dos cursos e progresso geral.
- Cursos: exibe a lista de cursos disponiveis com busca e filtros.
- Detalhes: mostra informacoes completas do curso, modulos, progresso e acoes.
- Perfil: mostra dados do aluno, estatisticas, progresso de estudo e endereco obtido por geolocalizacao.

## Como Instalar

```bash
npm install
```

## Como Executar

```bash
npx expo start
```

Depois de iniciar o Expo, escolha uma das opcoes exibidas no terminal:

- Pressione `w` para abrir no navegador.
- Pressione `a` para abrir no emulador Android.
- Escaneie o QR Code usando o aplicativo Expo Go.

## Criterios Atendidos

- Aplicativo funcional desenvolvido com React Native e Expo.
- 4 telas funcionais.
- Navegacao por abas.
- Navegacao em pilha para detalhes.
- Passagem de parametros entre telas.
- Telas e rotas separadas.
- Componentes reutilizaveis em `src/components`.
- Lista com `FlatList` e 10 cursos.
- Cards com imagem e texto.
- Tela de detalhes com informacoes completas.
- Tela de perfil do aluno.
- Uso de sensor de geolocalizacao na tela de perfil.
- Interface com icones, cores organizadas e layout responsivo.

## Screenshots

### Inicio

![Tela inicial](./assets/screenshots/home.png)

### Cursos

![Tela de cursos](./assets/screenshots/cursos.png)

### Detalhes

![Tela de detalhes](./assets/screenshots/detalhes.png)

### Perfil

![Tela de perfil](./assets/screenshots/perfil.png)

## Desenvolvedores

-Geovanna Santos de Almeida- 01815451
-Josinaldo da Silva Xavier- 01823400
-Isabelle Victoria Galdino Santos- 01808806
-Gabriela Sabino Pinho de Araujo- 01660021
-Gabrielly Rodrigues- 01797929
