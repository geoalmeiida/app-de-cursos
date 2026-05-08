# App de Cursos

Aplicativo mobile desenvolvido com React Native e Expo Router para listar cursos, abrir detalhes e acompanhar o perfil do aluno.

## Funcionalidades

- Tela inicial do aplicativo.
- Listagem de cursos com `FlatList`.
- Navegação por abas entre Home, Cursos e Perfil.
- Navegação em pilha para a tela de detalhes.
- Passagem de parâmetros do curso selecionado para a tela de detalhes.

## Tecnologias

- React Native
- Expo
- Expo Router
- TypeScript

## Estrutura do Projeto

```text
app-de-cursos/
├── app/                       # Rotas e telas do Expo Router
│   ├── (tabs)/
│   │   ├── _layout.tsx        # Navegação por abas
│   │   ├── courses.tsx        # Lista de cursos
│   │   ├── index.tsx          # Home
│   │   └── profile.tsx        # Perfil do aluno
│   ├── _layout.tsx            # Navegação principal em pilha
│   └── details.tsx            # Detalhes do curso
├── src/                       # Código reutilizável do app
│   ├── components/            # Componentes compartilhados
│   ├── constants/             # Constantes visuais e tema
│   ├── data/                  # Dados usados pelas telas
│   └── hooks/                 # Hooks reutilizáveis
├── assets/
│   ├── icons/                 # Ícones do aplicativo e splash
│   ├── images/                # Imagens gerais do app
│   └── screenshots/           # Capturas usadas no README
├── scripts/
├── app.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Como executar

```bash
npm install
npx expo start
```

## Screenshots

### Home

![Home](./assets/screenshots/home.png)

### Cursos

![Cursos](./assets/screenshots/cursos.png)

### Perfil

![Perfil](./assets/screenshots/perfil.png)

### Detalhes

![Detalhes](./assets/screenshots/detalhes.png)

## Desenvolvedores

Geovanna Santos de Almeida - 01815451
