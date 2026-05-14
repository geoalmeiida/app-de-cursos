# App de Cursos

Aplicativo mobile desenvolvido com React Native e Expo para listar cursos, visualizar detalhes e acompanhar o progresso do aluno.

## Funcionalidades

- Tela inicial com apresentação do aplicativo e resumo de progresso.
- Tela de cursos com listagem usando `FlatList`.
- Busca por nome, descrição ou categoria do curso.
- Filtros por categoria.
- Cards de cursos com imagem, título, categoria, duração, quantidade de aulas, nível e progresso.
- Tela de detalhes com informações completas do curso selecionado.
- Passagem de parâmetros entre telas usando o `id` do curso.
- Tela de perfil com dados do aluno, progresso geral e estatísticas.
- Navegação por abas entre Início, Cursos e Perfil.
- Navegação em pilha para a tela de detalhes.

## Tecnologias Utilizadas

- React Native
- Expo
- Expo Router
- TypeScript
- React Navigation
- Expo Vector Icons

## Estrutura do Projeto

```text
app-de-cursos/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── courses.tsx
│   │   ├── index.tsx
│   │   └── profile.tsx
│   ├── _layout.tsx
│   └── details.tsx
├── src/
│   ├── components/
│   ├── constants/
│   ├── data/
│   ├── hooks/
│   └── types/
├── assets/
│   ├── icons/
│   ├── images/
│   └── screenshots/
├── scripts/
├── app.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Telas do Aplicativo

- Início: mostra a apresentação do app, resumo dos cursos e progresso geral.
- Cursos: exibe a lista de cursos disponíveis com busca e filtros.
- Detalhes: mostra informações completas do curso, módulos, progresso e ações.
- Perfil: mostra dados do aluno, estatísticas e progresso de estudo.

## Como Instalar

```bash
npm install
```

## Como Executar

```bash
npx expo start
```

Depois de iniciar o Expo, escolha uma das opções exibidas no terminal:

- Pressione `w` para abrir no navegador.
- Pressione `a` para abrir no emulador Android.
- Escaneie o QR Code usando o aplicativo Expo Go.

## Critérios Atendidos

- Aplicativo funcional desenvolvido com React Native e Expo.
- Mínimo de 4 telas funcionais.
- Navegação por abas.
- Navegação em pilha para detalhes.
- Passagem de parâmetros entre telas.
- Cabeçalhos personalizados.
- Lista com `FlatList` e 10 cursos.
- Cards com imagem e texto.
- Tela de detalhes com informações completas.
- Tela de perfil do aluno.
- Interface com ícones, cores organizadas e layout responsivo.

## Screenshots

### Início

![Tela inicial](./assets/screenshots/home.png)

### Cursos

![Tela de cursos](./assets/screenshots/cursos.png)

### Detalhes

![Tela de detalhes](./assets/screenshots/detalhes.png)

### Perfil

![Tela de perfil](./assets/screenshots/perfil.png)

## Desenvolvedora

Geovanna Santos de Almeida  
Matrícula: 01815451
