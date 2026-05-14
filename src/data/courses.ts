export type Course = {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  level: string;
  lessons: number;
  progress: number;
  modules: string[];
};

export const courses: Course[] = [
  {
    id: '1',
    title: 'React Native Básico',
    category: 'Mobile',
    description: 'Aprenda os fundamentos do React Native e crie aplicativos.',
    duration: '8h',
    level: 'Iniciante',
    lessons: 12,
    progress: 70,
    modules: ['Componentes', 'Estilos', 'Navegação', 'Publicação com Expo'],
  },
  {
    id: '2',
    title: 'JavaScript Moderno',
    category: 'Programação',
    description: 'Conceitos modernos de JavaScript para projetos atuais.',
    duration: '10h',
    level: 'Intermediário',
    lessons: 16,
    progress: 35,
    modules: ['ES6+', 'Funções', 'Arrays', 'Promises'],
  },
  {
    id: '3',
    title: 'Banco de Dados',
    category: 'Back-end',
    description: 'Aprenda modelagem, consultas e organização de dados.',
    duration: '9h',
    level: 'Iniciante',
    lessons: 14,
    progress: 20,
    modules: ['Modelagem', 'SQL básico', 'Relacionamentos', 'Consultas'],
  },
  {
    id: '4',
    title: 'UI/UX Design',
    category: 'Design',
    description: 'Entenda como criar interfaces bonitas e fáceis de usar.',
    duration: '7h',
    level: 'Iniciante',
    lessons: 11,
    progress: 0,
    modules: ['Pesquisa', 'Wireframes', 'Protótipos', 'Teste de usabilidade'],
  },
  {
    id: '5',
    title: 'Git e GitHub',
    category: 'Ferramentas',
    description: 'Controle de versão e uso de repositórios.',
    duration: '6h',
    level: 'Iniciante',
    lessons: 9,
    progress: 100,
    modules: ['Commits', 'Branches', 'Pull requests', 'GitHub Pages'],
  },
  {
    id: '6',
    title: 'Node.js',
    category: 'Back-end',
    description: 'Criação de servidores e APIs com Node.js.',
    duration: '12h',
    level: 'Intermediário',
    lessons: 18,
    progress: 45,
    modules: ['Servidor HTTP', 'Express', 'Rotas', 'Middlewares'],
  },
  {
    id: '7',
    title: 'HTML e CSS',
    category: 'Front-end',
    description: 'Estruturação e estilização de páginas web.',
    duration: '8h',
    level: 'Iniciante',
    lessons: 13,
    progress: 85,
    modules: ['Semântica', 'Flexbox', 'Grid', 'Responsividade'],
  },
  {
    id: '8',
    title: 'APIs REST',
    category: 'Back-end',
    description: 'Criação e consumo de APIs RESTful.',
    duration: '7h',
    level: 'Intermediário',
    lessons: 10,
    progress: 10,
    modules: ['Métodos HTTP', 'Status codes', 'JSON', 'Integrações'],
  },
  {
    id: '9',
    title: 'TypeScript',
    category: 'Programação',
    description: 'JavaScript com tipagem para projetos mais seguros.',
    duration: '9h',
    level: 'Intermediário',
    lessons: 15,
    progress: 55,
    modules: ['Tipos básicos', 'Interfaces', 'Generics', 'React com TS'],
  },
  {
    id: '10',
    title: 'Figma na Prática',
    category: 'Design',
    description: 'Criação de protótipos e interfaces modernas.',
    duration: '6h',
    level: 'Iniciante',
    lessons: 8,
    progress: 0,
    modules: ['Frames', 'Componentes', 'Auto layout', 'Protótipo navegável'],
  },
];
