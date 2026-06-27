import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown,
  ArrowLeft,
  ExternalLink,
  Github,
  Instagram,
  Languages,
  LockKeyhole,
  Moon,
  Plus,
  RefreshCw,
  ShieldCheck,
  UserPlus,
  X,
} from 'lucide-react';
import './styles.css';

const chapters = [
  {
    id: 'aess',
    sigla: 'AESS',
    nome: 'Aerospace and Electronic Systems Society',
    logo: '/assets/chapters/aess.png',
    darkLogo: '/assets/chapters/dark/aess.png',
    descricao: {
      pt: 'Capítulo voltado a sistemas aeroespaciais, aviação, eletrônica embarcada e tecnologias aplicadas a ambientes complexos.',
      en: 'Chapter focused on aerospace systems, aviation, embedded electronics, and technologies applied to complex environments.',
    },
    instagram: '',
    president: { nome: 'Brendo Almeida', foto: '/assets/presidents/brendo-almeida.jpg' },
  },
  {
    id: 'aps',
    sigla: 'AP-S',
    nome: 'Antennas and Propagation Society',
    logo: '/assets/chapters/aps.png',
    darkLogo: '/assets/chapters/dark/aps.png',
    descricao: {
      pt: 'Capítulo dedicado ao estudo de antenas, propagação eletromagnética, radiofrequência e comunicações sem fio.',
      en: 'Chapter dedicated to antennas, electromagnetic propagation, radio frequency, and wireless communications.',
    },
    instagram: '',
    president: { nome: 'Pedro Fuzimoto', foto: '/assets/presidents/pedro-fuzimoto.png' },
  },
  {
    id: 'comsoc',
    sigla: 'ComSoc',
    nome: 'Communications Society',
    logo: '/assets/chapters/comsoc.png',
    darkLogo: '/assets/chapters/dark/comsoc.png',
    descricao: {
      pt: 'Capítulo focado em redes, telecomunicações, conectividade, protocolos e tecnologias que sustentam sistemas de comunicação.',
      en: 'Chapter focused on networks, telecommunications, connectivity, protocols, and the technologies behind communication systems.',
    },
    instagram: '',
    president: { nome: 'Pedro Fuzimoto', foto: '/assets/presidents/pedro-fuzimoto.png' },
  },
  {
    id: 'cs',
    sigla: 'CS',
    nome: 'Computer Society',
    logo: '/assets/chapters/cs.png',
    darkLogo: '/assets/chapters/dark/cs.png',
    descricao: {
      pt: 'Capítulo dedicado à computação, software, inteligência artificial, segurança, sistemas e formação técnica em tecnologia.',
      en: 'Chapter dedicated to computing, software, artificial intelligence, security, systems, and technical training in technology.',
    },
    instagram: '',
    github: 'https://github.com/CSIEEEUFJF',
    president: { nome: 'Rafael Lago', foto: '/assets/presidents/rafael-lago.png' },
  },
  {
    id: 'edsoc',
    sigla: 'EdSoc',
    nome: 'Education Society',
    logo: '/assets/chapters/edsoc.png',
    darkLogo: '/assets/chapters/dark/edsoc.png',
    descricao: {
      pt: 'Capítulo voltado à educação em engenharia, aprendizagem, metodologias de ensino e iniciativas de capacitação técnica.',
      en: 'Chapter focused on engineering education, learning, teaching methodologies, and technical training initiatives.',
    },
    instagram: '',
    president: { nome: 'Fabrício Prata', foto: '/assets/presidents/fabricio-prata.png' },
  },
  {
    id: 'ias',
    sigla: 'IAS',
    nome: 'Industry Applications Society',
    logo: '/assets/chapters/ias.png',
    darkLogo: '/assets/chapters/dark/ias.png',
    descricao: {
      pt: 'Capítulo que conecta aplicações industriais, automação, máquinas elétricas, processos produtivos e tecnologia aplicada.',
      en: 'Chapter that connects industrial applications, automation, electric machines, production processes, and applied technology.',
    },
    instagram: 'https://www.instagram.com/ieeeiasufjf/',
    president: { nome: 'Lauro Abdallah', foto: '/assets/presidents/lauro-abdallah.png' },
  },
  {
    id: 'pes',
    sigla: 'PES',
    nome: 'Power & Energy Society',
    logo: '/assets/chapters/pes.png',
    darkLogo: '/assets/chapters/dark/pes.png',
    descricao: {
      pt: 'Capítulo voltado à energia elétrica, sistemas de potência, geração, transmissão, distribuição e transição energética.',
      en: 'Chapter focused on electric energy, power systems, generation, transmission, distribution, and the energy transition.',
    },
    instagram: 'https://www.instagram.com/ieeepesufjf/',
    president: { nome: 'Pedro Temponi', foto: '/assets/presidents/pedro-temponi.jpg' },
  },
  {
    id: 'ras',
    sigla: 'RAS',
    nome: 'Robotics and Automation Society',
    logo: '/assets/chapters/ras.jpg',
    darkLogo: '/assets/chapters/dark/ras.png',
    descricao: {
      pt: 'Capítulo focado em robótica, automação, sistemas embarcados, controle, percepção e projetos práticos multidisciplinares.',
      en: 'Chapter focused on robotics, automation, embedded systems, control, perception, and practical multidisciplinary projects.',
    },
    instagram: 'https://www.instagram.com/ras.ieee.ufjf/',
    github: 'https://github.com/RASIEEEUFJF',
    president: { nome: 'Endhel Andrade', foto: '/assets/presidents/endhel-andrade.jpg' },
  },
  {
    id: 'sight',
    sigla: 'SIGHT',
    nome: 'Special Interest Group on Humanitarian Technology',
    logo: '/assets/chapters/sight.png',
    darkLogo: '/assets/chapters/dark/sight.png',
    descricao: {
      pt: 'Grupo voltado à tecnologia humanitária, impacto social, acessibilidade, sustentabilidade e soluções para comunidades.',
      en: 'Group focused on humanitarian technology, social impact, accessibility, sustainability, and solutions for communities.',
    },
    instagram: 'https://www.instagram.com/ieeesightufjf/',
    president: { nome: 'Carlos Alexandre', foto: '/assets/presidents/carlos-alexandre.png' },
  },
  {
    id: 'vts',
    sigla: 'VTS',
    nome: 'Vehicular Technology Society',
    logo: '/assets/chapters/vts.webp',
    darkLogo: '/assets/chapters/dark/vts.png',
    descricao: {
      pt: 'Capítulo dedicado à mobilidade, sistemas veiculares, transporte inteligente, comunicação veicular e tecnologias automotivas. No Ramo Estudantil IEEE UFJF, é uma parceria com a equipe RAMPAGE BAJA.',
      en: 'Chapter dedicated to mobility, vehicular systems, intelligent transportation, vehicular communication, and automotive technologies. At the IEEE UFJF Student Branch, it is a partnership with the RAMPAGE BAJA team.',
    },
    instagram: 'https://www.instagram.com/rampagebaja/',
    president: {
      nome: 'RAMPAGE BAJA',
      foto: '/assets/presidents/rampage-baja.png',
      label: {
        pt: 'Equipe parceira',
        en: 'Partner team',
      },
    },
  },
  {
    id: 'wie',
    sigla: 'WIE',
    nome: 'Women in Engineering',
    logo: '/assets/chapters/wie.png',
    darkLogo: '/assets/chapters/dark/wie.png',
    descricao: {
      pt: 'Grupo de afinidade dedicado a fortalecer a presença, permanência e liderança de mulheres nas engenharias e tecnologia.',
      en: 'Affinity group dedicated to strengthening the presence, retention, and leadership of women in engineering and technology.',
    },
    instagram: 'https://www.instagram.com/ieeewieufjf/',
    president: { nome: 'Camila Porto', foto: '/assets/presidents/camila-porto.png' },
  },
];

const boardMembers = [
  {
    role: {
      pt: 'Presidente',
      en: 'President',
    },
    name: 'Pedro Fuzimoto',
    photo: '/assets/presidents/pedro-fuzimoto.png',
  },
  {
    role: {
      pt: 'Vice-Presidente',
      en: 'Vice President',
    },
    name: 'Lauro Abdallah',
    photo: '/assets/presidents/lauro-abdallah.png',
  },
  {
    role: {
      pt: 'Secretário',
      en: 'Secretary',
    },
    name: 'Pedro Temponi',
    photo: '/assets/presidents/pedro-temponi.jpg',
  },
  {
    role: {
      pt: 'Tesoureiro',
      en: 'Treasurer',
    },
    name: 'Fabrício Prata',
    memberName: 'Fabrício',
    photo: '/assets/presidents/fabricio-prata.png',
  },
];

const projects = [
  {
    id: 'atas',
    name: 'Sistema Interno',
    chapter: 'Ramo',
    url: 'https://interno.ieeeufjf.com.br',
    displayUrl: 'interno.ieeeufjf.com.br',
    description: {
      pt: 'Atas, tarefas, calendario e membros do Ramo',
      en: 'Minutes, tasks, calendar, and Branch members',
    },
    preview: '/assets/ramo-ieee-ufjf-blue.svg',
    previewDark: '/assets/ramo-ieee-ufjf.svg',
  },
  {
    id: 'entense',
    name: 'ENTENSE',
    chapter: 'Ramo',
    url: 'https://entense.ieeeufjf.com.br',
    displayUrl: 'entense.ieeeufjf.com.br',
    description: {
      pt: 'Encontro de Tecnologias e Engenharia',
      en: 'Technology and Engineering Meeting',
    },
    preview: '/assets/projects/entense-preview.png',
  },
  {
    id: 'helpieee',
    name: 'HELPIEEE',
    chapter: 'Ramo',
    url: 'https://help.ieeeufjf.com.br',
    displayUrl: 'help.ieeeufjf.com.br',
    description: {
      pt: 'Guia do Calouro',
      en: 'Freshman Guide',
    },
    preview: '/assets/projects/helpieee-preview.png',
  },
];

const ATAS_MEMBERS_API_URLS = [
  '/api/atas-site-members',
  'https://interno.ieeeufjf.com.br/api/site-members',
];

const ATAS_PROJECTS_API_URLS = [
  '/api/atas-site-projects',
  'https://interno.ieeeufjf.com.br/api/site-projects',
];

const chapterOptions = [
  { key: 'AESS', label: 'Aerospace and Electronic Systems Society' },
  { key: 'APS', label: 'Antennas and Propagation Society' },
  { key: 'CS', label: 'Computer Society' },
  { key: 'EdSoc', label: 'Education Society' },
  { key: 'IAS', label: 'Industry Applications Society' },
  { key: 'MTTS', label: 'Microwave Theory and Technology Society' },
  { key: 'PES', label: 'Power & Energy Society' },
  { key: 'RAS', label: 'Robotics and Automation Society' },
  { key: 'Ramo', label: 'Ramo Estudantil IEEE UFJF' },
  { key: 'SIGHT', label: 'Special Interest Group on Humanitarian Technology' },
  { key: 'VTS', label: 'Vehicular Technology Society' },
  { key: 'WIE', label: 'Women in Engineering' },
];

const adminChapterOptions = chapterOptions.filter(
  ({ key }) => !['SIGHT', 'WIE'].includes(key),
);

const roleOptions = [
  'Membro',
  'Presidente',
  'Vice-Presidente',
  'Tesoureiro',
  'Webmaster',
  'Secretário',
  'Conselheiro',
];

const roleTranslations = {
  Conselheiro: 'Advisor',
  Membro: 'Member',
  Presidente: 'President',
  Secretário: 'Secretary',
  Tesoureiro: 'Treasurer',
  'Vice-Presidente': 'Vice President',
  Webmaster: 'Webmaster',
};

const ramoMembers = [
  {
    id: 'camila-porto',
    name: 'Camila Porto',
    role: { pt: 'Presidente do Ramo', en: 'Student Branch President' },
    chapters: ['Ramo', 'WIE'],
    photoUrl: '/assets/presidents/camila-porto.png',
    bio: {
      pt: 'Lidera a articulação geral do Ramo, acompanha os grupos técnicos e fortalece iniciativas de acolhimento, representatividade e formação de novas lideranças.',
      en: 'Leads the Student Branch, supports the technical groups, and strengthens initiatives around welcoming new members, representation, and leadership development.',
    },
  },
  {
    id: 'pedro-fuzimoto',
    name: 'Pedro Fuzimoto',
    role: { pt: 'Vice-Presidente', en: 'Vice President' },
    chapters: ['Ramo', 'APS', 'ComSoc'],
    photoUrl: '/assets/presidents/pedro-fuzimoto.png',
    bio: {
      pt: 'Apoia a coordenação executiva do Ramo e atua em frentes ligadas a antenas, propagação, comunicações e integração entre capítulos.',
      en: 'Supports Student Branch coordination and contributes to initiatives connected to antennas, propagation, communications, and chapter integration.',
    },
  },
  {
    id: 'endhel-andrade',
    name: 'Endhel Andrade',
    role: { pt: 'Webmaster e Presidente RAS', en: 'Webmaster and RAS President' },
    chapters: ['Ramo', 'RAS'],
    photoUrl: '/assets/presidents/endhel-andrade.jpg',
    bio: {
      pt: 'Cuida da presença digital do Ramo e lidera projetos de robótica, automação e sistemas embarcados com foco em prototipagem prática.',
      en: 'Maintains the Branch digital presence and leads robotics, automation, and embedded systems projects with a hands-on prototyping focus.',
    },
  },
  {
    id: 'raul-moraes',
    name: 'Raul Moraes',
    role: { pt: 'Secretário', en: 'Secretary' },
    chapters: ['Ramo'],
    photoUrl: '/assets/presidents/raul-moraes.jpg',
    bio: {
      pt: 'Organiza registros, documentos e rotinas administrativas para manter as atividades do Ramo alinhadas e bem acompanhadas.',
      en: 'Organizes records, documents, and administrative routines so the Branch activities stay aligned and easy to follow.',
    },
  },
  {
    id: 'fabricio-prata',
    name: 'Fabrício Prata',
    role: { pt: 'Tesoureiro e Presidente EdSoc', en: 'Treasurer and EdSoc President' },
    chapters: ['Ramo', 'EdSoc'],
    photoUrl: '/assets/presidents/fabricio-prata.png',
    bio: {
      pt: 'Acompanha a gestão financeira e impulsiona ações de educação em engenharia, capacitação técnica e compartilhamento de conhecimento.',
      en: 'Supports financial management and drives engineering education, technical training, and knowledge-sharing initiatives.',
    },
  },
  {
    id: 'brendo-almeida',
    name: 'Brendo Almeida',
    role: { pt: 'Presidente AESS', en: 'AESS President' },
    chapters: ['AESS'],
    photoUrl: '/assets/presidents/brendo-almeida.jpg',
    bio: {
      pt: 'Conduz atividades sobre sistemas aeroespaciais, eletrônica embarcada e tecnologias aplicadas a ambientes complexos.',
      en: 'Leads activities around aerospace systems, embedded electronics, and technologies applied to complex environments.',
    },
  },
  {
    id: 'rafael-lago',
    name: 'Rafael Lago',
    role: { pt: 'Presidente CS', en: 'CS President' },
    chapters: ['CS'],
    photoUrl: '/assets/presidents/rafael-lago.png',
    bio: {
      pt: 'Coordena iniciativas de computação, software, inteligência artificial e formação técnica para estudantes interessados em tecnologia.',
      en: 'Coordinates computing, software, artificial intelligence, and technical training initiatives for students interested in technology.',
    },
  },
  {
    id: 'lauro-abdallah',
    name: 'Lauro Abdallah',
    role: { pt: 'Presidente IAS', en: 'IAS President' },
    chapters: ['IAS'],
    photoUrl: '/assets/presidents/lauro-abdallah.png',
    bio: {
      pt: 'Aproxima o Ramo de aplicações industriais, automação, máquinas elétricas e tecnologia aplicada a processos produtivos.',
      en: 'Connects the Branch with industrial applications, automation, electric machines, and technology applied to production processes.',
    },
  },
  {
    id: 'pedro-temponi',
    name: 'Pedro Temponi',
    role: { pt: 'Presidente PES', en: 'PES President' },
    chapters: ['PES'],
    photoUrl: '/assets/presidents/pedro-temponi.jpg',
    bio: {
      pt: 'Promove estudos e projetos sobre energia elétrica, sistemas de potência, distribuição e transição energética.',
      en: 'Promotes studies and projects on electric energy, power systems, distribution, and the energy transition.',
    },
  },
  {
    id: 'carlos-alexandre',
    name: 'Carlos Alexandre',
    role: { pt: 'Presidente SIGHT', en: 'SIGHT President' },
    chapters: ['SIGHT'],
    photoUrl: '/assets/presidents/carlos-alexandre.png',
    bio: {
      pt: 'Lidera ações de tecnologia humanitária, impacto social, acessibilidade e soluções voltadas a comunidades.',
      en: 'Leads humanitarian technology, social impact, accessibility, and community-oriented solution initiatives.',
    },
  },
];

const copy = {
  pt: {
    lang: 'pt-BR',
    hero: {
      aria: 'Ramo Estudantil IEEE UFJF',
      brandAria: 'Universidade Federal de Juiz de Fora IEEE Student Branch',
      universityDesktop: 'Universidade Federal de Juiz de Fora',
      universityMobileFirst: 'Universidade Federal',
      universityMobileSecond: 'de Juiz de Fora',
      branch: 'IEEE Student Branch',
      scroll: 'Ir para a navegação',
    },
    nav: {
      aria: 'Navegação principal',
      top: 'Voltar ao topo',
      about: 'O IEEE',
      chapters: 'Capítulos',
      board: 'Diretoria',
      projects: 'Projetos',
      members: 'Membros',
      internal: 'Atas',
      contact: 'Contato',
      enableDark: 'Ativar modo escuro',
      disableDark: 'Desativar modo escuro',
      languageButton: 'EN',
      languageLabel: 'Alterar texto para inglês',
    },
    about: {
      eyebrow: 'O IEEE',
      title: 'Advancing Technology for Humanity',
      logoAlt: 'Logo IEEE',
      paragraphs: [
        'Fundado em 1963, o Instituto de Engenheiros Eletricistas e Eletrônicos é a maior organização profissional do mundo dedicada ao avanço da tecnologia em benefício da humanidade. Com origens no final do século XIX, o IEEE atualmente tem cerca de 500 mil membros ativos, divididos em 349 seções, que estão espalhadas por 10 regiões.',
        'Na Universidade Federal de Juiz de Fora, o IEEE tem presença forte desde a década de 1980, com Ramo Estudantil formado em 1991. Atualmente, o Ramo tem 9 capítulos técnicos ativos, além dos grupos de afinidade WIE (Women in Engineering) e SIGHT (Special Interest Group in Humanitarian Technology).',
      ],
    },
    chapters: {
      eyebrow: 'Capítulos e Grupos de Afinidade',
      title: 'Nossos capítulos',
      detailsId: 'chapter-detail-title',
      openDetails: (name) => `Abrir detalhes de ${name}`,
      close: 'Fechar detalhes do capítulo',
      linksLabel: 'Links do capítulo',
      comingSoon: 'em breve',
      presidentFallback: 'Presidente',
      logoAlt: (name) => `Logo ${name}`,
      photoAlt: (name) => `Foto de ${name}`,
    },
    board: {
      eyebrow: 'Diretoria do Ramo',
      title: 'Nossa diretoria',
      photoAlt: (name) => `Foto de ${name}`,
    },
    projects: {
      eyebrow: 'Projetos',
      title: 'Nossos projetos',
      open: (name) => `Abrir projeto ${name}`,
      previewAlt: (name) => `Preview do projeto ${name}`,
    },
    members: {
      eyebrow: 'Membros do Ramo',
      title: 'Quem faz o Ramo acontecer',
      description:
        'Conheça as pessoas que mantêm capítulos, projetos, eventos e rotinas internas em movimento no Ramo Estudantil IEEE UFJF.',
      openDetails: (name) => `Abrir detalhes de ${name}`,
      close: 'Fechar detalhes do membro',
      empty: 'Nenhum membro cadastrado no site ainda.',
      photoAlt: (name) => `Foto de ${name}`,
    },
    admin: {
      eyebrow: 'Rota oculta',
      title: 'Administração de membros',
      description:
        'Use a autenticação do sistema de atas para gerenciar apenas os membros que aparecem no site. Estes registros são separados dos usuários do Atas.',
      back: 'Voltar ao site',
      loginTitle: 'Entrar com o sistema de atas',
      loginDescription: 'Use o mesmo usuário do painel de atas IEEE.',
      username: 'Nome de usuário',
      password: 'Senha',
      login: 'Entrar',
      logout: 'Sair',
      statusIdle: 'Aguardando autenticação.',
      statusChecking: 'Verificando sessão do sistema de atas.',
      statusLogged: (name) => `Sessão ativa como ${name}.`,
      statusCreated: 'Membro do site cadastrado. Se publicado, ele aparecerá na página pública.',
      statusUpdated: 'Membro do site atualizado.',
      statusRemoved: 'Membro removido do site.',
      statusError: 'Não foi possível concluir a ação.',
      formTitle: 'Adicionar membro ao site',
      editFormTitle: 'Editar membro do site',
      formDescription:
        'Use este painel para adicionar membros na página pública, atualizar foto, cargo e biografia, ou remover perfis da área de membros.',
      fullName: 'Nome completo',
      role: 'Cargo / função',
      chapters: 'Capítulos vinculados',
      photoUrl: 'URL da foto',
      photoCrop: 'Recorte da foto',
      photoCropHorizontal: 'Horizontal',
      photoCropVertical: 'Vertical',
      photoCropZoom: 'Zoom',
      photoCropCenter: 'Centralizar foto',
      photoPreview: 'Prévia da foto',
      photoPreviewEmpty: 'Adicione uma URL para visualizar o recorte.',
      bio: 'Mini biografia',
      publish: 'Publicar no site',
      create: 'Cadastrar membro',
      creating: 'Cadastrando...',
      update: 'Salvar alterações',
      updating: 'Salvando...',
      cancelEdit: 'Cancelar edição',
      edit: 'Editar',
      removeFromSite: 'Remover da página',
      reorderPreviewTitle: 'Prévia da ordem',
      dragMember: (name) => `Reordenar ${name}`,
      refresh: 'Atualizar membros',
      usersTitle: 'Membros cadastrados no site',
      noUsers: 'Nenhum membro do site carregado ainda.',
      published: 'Publicado',
      hidden: 'Oculto',
      proxyHint:
        'Ambiente local conectado ao sistema interno publicado em interno.ieeeufjf.com.br apenas para autenticação e armazenamento dos membros do site.',
    },
    contact: {
      eyebrow: 'Contato',
      title: 'Fale com o Ramo',
      locationLabel: 'Nossa localização',
      location: 'Faculdade de Engenharia - Universidade Federal de Juiz de Fora',
      mapLabel: 'Mapa do Ramo Estudantil IEEE UFJF',
      mapTitle: 'Mapa do Ramo Estudantil IEEE UFJF',
    },
  },
  en: {
    lang: 'en',
    hero: {
      aria: 'IEEE UFJF Student Branch',
      brandAria: 'Federal University of Juiz de Fora IEEE Student Branch',
      universityDesktop: 'Federal University of Juiz de Fora',
      universityMobileFirst: 'Federal University',
      universityMobileSecond: 'of Juiz de Fora',
      branch: 'IEEE Student Branch',
      scroll: 'Go to navigation',
    },
    nav: {
      aria: 'Main navigation',
      top: 'Back to top',
      about: 'IEEE',
      chapters: 'Chapters',
      board: 'Board',
      projects: 'Projects',
      members: 'Members',
      internal: 'Minutes',
      contact: 'Contact',
      enableDark: 'Enable dark mode',
      disableDark: 'Disable dark mode',
      languageButton: 'PT',
      languageLabel: 'Change text to Portuguese',
    },
    about: {
      eyebrow: 'IEEE',
      title: 'Advancing Technology for Humanity',
      logoAlt: 'IEEE logo',
      paragraphs: [
        'Founded in 1963, the Institute of Electrical and Electronics Engineers is the world’s largest professional organization dedicated to advancing technology for humanity. With origins in the late 19th century, IEEE currently has around 500,000 active members across 349 sections in 10 regions.',
        'At the Federal University of Juiz de Fora, IEEE has had a strong presence since the 1980s, with its Student Branch founded in 1991. Today, the Branch has 9 active technical chapters, in addition to the WIE (Women in Engineering) and SIGHT (Special Interest Group in Humanitarian Technology) affinity groups.',
      ],
    },
    chapters: {
      eyebrow: 'Chapters and Affinity Groups',
      title: 'Our chapters',
      detailsId: 'chapter-detail-title',
      openDetails: (name) => `Open details for ${name}`,
      close: 'Close chapter details',
      linksLabel: 'Chapter links',
      comingSoon: 'coming soon',
      presidentFallback: 'President',
      logoAlt: (name) => `${name} logo`,
      photoAlt: (name) => `Photo of ${name}`,
    },
    board: {
      eyebrow: 'Student Branch Board',
      title: 'Our board',
      photoAlt: (name) => `Photo of ${name}`,
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Our projects',
      open: (name) => `Open ${name} project`,
      previewAlt: (name) => `${name} project preview`,
    },
    members: {
      eyebrow: 'Branch members',
      title: 'The people behind the Branch',
      description:
        'Meet the people keeping chapters, projects, events, and internal routines moving at the IEEE UFJF Student Branch.',
      openDetails: (name) => `Open details for ${name}`,
      close: 'Close member details',
      empty: 'No members registered on the site yet.',
      photoAlt: (name) => `Photo of ${name}`,
    },
    admin: {
      eyebrow: 'Hidden route',
      title: 'Member administration',
      description:
        'Use the minutes system authentication to manage only the members shown on the site. These records are separate from minutes system users.',
      back: 'Back to site',
      loginTitle: 'Sign in with the minutes system',
      loginDescription: 'Use the same account from the IEEE minutes panel.',
      username: 'Username',
      password: 'Password',
      login: 'Sign in',
      logout: 'Sign out',
      statusIdle: 'Waiting for authentication.',
      statusChecking: 'Checking the minutes system session.',
      statusLogged: (name) => `Active session as ${name}.`,
      statusCreated: 'Site member created. If published, they will appear on the public page.',
      statusUpdated: 'Site member updated.',
      statusRemoved: 'Member removed from the site.',
      statusError: 'The action could not be completed.',
      formTitle: 'Add member to the site',
      editFormTitle: 'Edit site member',
      formDescription:
        'Use this panel to add members to the public page, update photo, role, biography, or remove profiles from the members area.',
      fullName: 'Full name',
      role: 'Role',
      chapters: 'Linked chapters',
      photoUrl: 'Photo URL',
      photoCrop: 'Photo crop',
      photoCropHorizontal: 'Horizontal',
      photoCropVertical: 'Vertical',
      photoCropZoom: 'Zoom',
      photoCropCenter: 'Center photo',
      photoPreview: 'Photo preview',
      photoPreviewEmpty: 'Add a URL to preview the crop.',
      bio: 'Mini biography',
      publish: 'Publish on the site',
      create: 'Create member',
      creating: 'Creating...',
      update: 'Save changes',
      updating: 'Saving...',
      cancelEdit: 'Cancel editing',
      edit: 'Edit',
      removeFromSite: 'Remove from page',
      reorderPreviewTitle: 'Order preview',
      dragMember: (name) => `Reorder ${name}`,
      refresh: 'Refresh members',
      usersTitle: 'Members registered on the site',
      noUsers: 'No site members loaded yet.',
      published: 'Published',
      hidden: 'Hidden',
      proxyHint:
        'Local environment connected to the published internal system at interno.ieeeufjf.com.br only for authentication and site-member storage.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Talk to the Branch',
      locationLabel: 'Our location',
      location: 'School of Engineering - Federal University of Juiz de Fora',
      mapLabel: 'Map of the IEEE UFJF Student Branch',
      mapTitle: 'Map of the IEEE UFJF Student Branch',
    },
  },
};

const mapsEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4558.946106024073!2d-43.37522762383733!3d-21.778392998521973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x989ba3d97601f7%3A0xcf9f2fb389a7f742!2sRamo%20Estudantil%20IEEE%20UFJF!5e1!3m2!1sen!2sbr!4v1779591238371!5m2!1sen!2sbr';

function App() {
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window === 'undefined') {
      return '/';
    }

    return window.location.pathname;
  });
  const [publishedMembers, setPublishedMembers] = useState([]);
  const [publishedProjects, setPublishedProjects] = useState(projects);
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') {
      return 'pt';
    }

    return window.localStorage.getItem('language') === 'en' ? 'en' : 'pt';
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem('theme') === 'dark';
  });
  const chapterDetailRef = useRef(null);
  const memberDetailRef = useRef(null);
  const selectedChapter = useMemo(
    () => chapters.find((chapter) => chapter.id === selectedChapterId),
    [selectedChapterId],
  );
  const selectedMember = useMemo(
    () => publishedMembers.find((member) => member.id === selectedMemberId),
    [publishedMembers, selectedMemberId],
  );
  const visibleBoardMembers = useMemo(
    () =>
      boardMembers.map((boardMember) => {
        const publishedMember = findPublishedMemberByName(
          publishedMembers,
          boardMember.memberName || boardMember.name,
        );

        return {
          ...boardMember,
          member: publishedMember,
          photo: publishedMember?.photoUrl || boardMember.photo,
        };
      }),
    [publishedMembers],
  );
  const t = copy[language];

  useEffect(() => {
    if (!selectedChapter || !chapterDetailRef.current) {
      return undefined;
    }

    const focusTimer = window.setTimeout(() => {
      chapterDetailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      chapterDetailRef.current?.focus({ preventScroll: true });
    }, 80);

    return () => window.clearTimeout(focusTimer);
  }, [selectedChapter]);

  useEffect(() => {
    if (!selectedMember || !memberDetailRef.current) {
      return undefined;
    }

    const focusTimer = window.setTimeout(() => {
      memberDetailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      memberDetailRef.current?.focus({ preventScroll: true });
    }, 80);

    return () => window.clearTimeout(focusTimer);
  }, [selectedMember]);

  useEffect(() => {
    if (selectedMemberId && !selectedMember) {
      setSelectedMemberId(null);
    }
  }, [selectedMember, selectedMemberId]);

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light';
    window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.lang = t.lang;
    window.localStorage.setItem('language', language);
  }, [language, t.lang]);

  useEffect(() => {
    const handlePathChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePathChange);

    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  useEffect(() => {
    let active = true;

    async function loadMembers() {
      try {
        let remoteMembers = [];

        for (const endpoint of ATAS_MEMBERS_API_URLS) {
          try {
            const response = await fetch(endpoint, { cache: 'no-store' });
            if (!response.ok) {
              throw new Error('members-api-unavailable');
            }

            const payload = await response.json();
            remoteMembers = Array.isArray(payload.members)
              ? payload.members.map(normalizeRemoteMember).filter(Boolean)
              : [];
            break;
          } catch {
            remoteMembers = [];
          }
        }

        if (!active) {
          return;
        }

        setPublishedMembers(remoteMembers);
      } catch {
        if (active) {
          setPublishedMembers([]);
        }
      }
    }

    loadMembers();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function loadProjects() {
      let remoteProjects = [];

      for (const endpoint of ATAS_PROJECTS_API_URLS) {
        try {
          const response = await fetch(endpoint, { cache: 'no-store' });
          if (!response.ok) {
            throw new Error('projects-api-unavailable');
          }

          const payload = await response.json();
          remoteProjects = Array.isArray(payload.projects)
            ? payload.projects.map(normalizeRemoteProject).filter(Boolean)
            : [];
          break;
        } catch {
          remoteProjects = [];
        }
      }

      if (active && remoteProjects.length) {
        setPublishedProjects(remoteProjects);
      }
    }

    loadProjects();
    return () => {
      active = false;
    };
  }, []);

  if (currentPath === '/admin') {
    return (
      <AdminPage
        isDarkMode={isDarkMode}
        language={language}
        setIsDarkMode={setIsDarkMode}
        setLanguage={setLanguage}
        t={t}
      />
    );
  }

  return (
    <main>
      <section className="hero" id="topo" aria-label={t.hero.aria}>
        <div className="hero__content">
          <div className="hero-brand" aria-label={t.hero.brandAria}>
            <img
              className="hero-brand__mark"
              src="/assets/ramo-ieee-ufjf.svg"
              alt=""
              aria-hidden="true"
              decoding="async"
              fetchPriority="high"
            />
            <div className="hero-brand__text">
              <h1>
                <span className="desktop-line">{t.hero.universityDesktop}</span>
                <span className="mobile-line">{t.hero.universityMobileFirst}</span>
                <span className="mobile-line">{t.hero.universityMobileSecond}</span>
              </h1>
              <p>{t.hero.branch}</p>
            </div>
          </div>
          <a className="hero__scroll" href="#navegacao" aria-label={t.hero.scroll}>
            <ArrowDown aria-hidden="true" size={22} />
          </a>
        </div>
      </section>

      <div className="nav-anchor" id="navegacao" aria-hidden="true" />
      <nav className="mini-nav" aria-label={t.nav.aria}>
        <a className="mini-nav__brand" href="#topo" aria-label={t.nav.top}>
          <span className="mini-nav__mark" aria-hidden="true" />
          <span className="mini-nav__brand-text">
            <strong>{t.hero.universityDesktop}</strong>
            <span>{t.hero.branch}</span>
          </span>
        </a>
        <div className="mini-nav__menu">
          <div className="mini-nav__links">
            <a href="#o-ieee">{t.nav.about}</a>
            <a href="#capitulos">{t.nav.chapters}</a>
            <a href="#diretoria">{t.nav.board}</a>
            <a href="#projetos">{t.nav.projects}</a>
            <a href="#membros">{t.nav.members}</a>
            <a href="https://interno.ieeeufjf.com.br" target="_blank" rel="noreferrer">
              {t.nav.internal}
            </a>
            <a href="#contato">{t.nav.contact}</a>
          </div>
          <div className="mini-nav__actions">
            <button
              className="mini-nav__language"
              type="button"
              onClick={() =>
                setLanguage((currentLanguage) => (currentLanguage === 'pt' ? 'en' : 'pt'))
              }
              aria-label={t.nav.languageLabel}
            >
              <Languages aria-hidden="true" size={17} />
              <span>{t.nav.languageButton}</span>
            </button>
            <button
              className="mini-nav__theme"
              type="button"
              onClick={() => setIsDarkMode((currentTheme) => !currentTheme)}
              aria-label={isDarkMode ? t.nav.disableDark : t.nav.enableDark}
              aria-pressed={isDarkMode}
            >
              <Moon aria-hidden="true" size={18} />
            </button>
          </div>
        </div>
      </nav>

      <section className="about-ieee" id="o-ieee" aria-labelledby="o-ieee-title">
        <div className="section-heading">
          <span>{t.about.eyebrow}</span>
          <div className="about-ieee__title-row">
            <h2 id="o-ieee-title">{t.about.title}</h2>
            <img
              className="about-ieee__logo"
              src={isDarkMode ? '/assets/chapters/dark/ieee.png' : '/assets/chapters/ieee.webp'}
              alt={t.about.logoAlt}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="about-ieee__layout">
          <div className="about-ieee__copy">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="chapters" id="capitulos" aria-labelledby="capitulos-title">
        <div className="section-heading">
          <span>{t.chapters.eyebrow}</span>
          <h2 id="capitulos-title">{t.chapters.title}</h2>
        </div>

        <div className="chapter-grid">
          {chapters.map(({ id, sigla, nome, logo, darkLogo }) => (
            <button
              className={`chapter-card chapter-card--${id} ${
                selectedChapterId === id ? 'chapter-card--active' : ''
              }`}
              key={id}
              type="button"
              onClick={() => setSelectedChapterId(id)}
              aria-expanded={selectedChapterId === id}
              aria-controls="chapter-detail"
              aria-label={t.chapters.openDetails(nome)}
            >
              {logo ? (
                <img
                  className={`chapter-card__logo chapter-card__logo--${id}`}
                  src={isDarkMode && darkLogo ? darkLogo : logo}
                  alt={t.chapters.logoAlt(nome)}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="chapter-card__placeholder" aria-hidden="true">
                  {sigla}
                </span>
              )}
            </button>
          ))}
        </div>

        {selectedChapter && (
          <article
            className="chapter-detail"
            id="chapter-detail"
            ref={chapterDetailRef}
            tabIndex={-1}
            aria-labelledby="chapter-detail-title"
            aria-live="polite"
          >
            <button
              className="chapter-detail__close"
              type="button"
              onClick={() => setSelectedChapterId(null)}
              aria-label={t.chapters.close}
            >
              <X aria-hidden="true" size={20} />
            </button>

            <div className="chapter-detail__main">
              <div className="chapter-detail__logo-wrap">
                {selectedChapter.logo ? (
                  <img
                    className="chapter-detail__logo"
                    src={
                      isDarkMode && selectedChapter.darkLogo
                        ? selectedChapter.darkLogo
                        : selectedChapter.logo
                    }
                    alt={t.chapters.logoAlt(selectedChapter.sigla)}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="chapter-detail__placeholder">{selectedChapter.sigla}</span>
                )}
              </div>

              <div className="chapter-detail__copy">
                <span>{selectedChapter.nome}</span>
                <h3 id="chapter-detail-title">{selectedChapter.sigla}</h3>
                <p>{selectedChapter.descricao[language]}</p>

                <div className="chapter-detail__links" aria-label={t.chapters.linksLabel}>
                  <ChapterLink
                    href={selectedChapter.instagram}
                    icon={<Instagram aria-hidden="true" size={18} />}
                    label="Instagram"
                    comingSoon={t.chapters.comingSoon}
                  />
                  {'github' in selectedChapter && (
                    <ChapterLink
                      href={selectedChapter.github}
                      icon={<Github aria-hidden="true" size={18} />}
                      label="GitHub"
                      comingSoon={t.chapters.comingSoon}
                    />
                  )}
                </div>
              </div>
            </div>

            <aside
              className="president-card"
              aria-label={`${getLocalizedText(
                selectedChapter.president.label,
                language,
                t.chapters.presidentFallback,
              )} ${
                selectedChapter.sigla
              }`}
            >
              {selectedChapter.president.foto ? (
                <img
                  className="president-card__photo"
                  src={selectedChapter.president.foto}
                  alt={t.chapters.photoAlt(selectedChapter.president.nome)}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="president-card__photo president-card__photo--empty">
                  <span>{selectedChapter.sigla}</span>
                </div>
              )}
              <div>
                <span>
                  {getLocalizedText(
                    selectedChapter.president.label,
                    language,
                    t.chapters.presidentFallback,
                  )}
                </span>
                <strong>{selectedChapter.president.nome}</strong>
              </div>
            </aside>
          </article>
        )}
      </section>

      <section className="board" id="diretoria" aria-labelledby="diretoria-title">
        <div className="section-heading">
          <span>{t.board.eyebrow}</span>
          <h2 id="diretoria-title">{t.board.title}</h2>
        </div>

        <div className="board-grid">
          {visibleBoardMembers.map(({ role, name, photo, member }) => (
            <article className="board-card" key={`${role.pt}-${name}`}>
              <div className="board-card__photo-wrap">
                {photo ? (
                  <img
                    className="board-card__photo"
                    src={photo}
                    alt={t.board.photoAlt(name)}
                    style={member ? getMemberPhotoStyle(member) : undefined}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="board-card__placeholder" aria-hidden="true">
                    {getInitials(name)}
                  </div>
                )}
              </div>
              <div className="board-card__copy">
                <span>{role[language]}</span>
                <strong>{name}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="projects" id="projetos" aria-labelledby="projetos-title">
        <div className="section-heading">
          <span>{t.projects.eyebrow}</span>
          <h2 id="projetos-title">{t.projects.title}</h2>
        </div>

        <div className="projects-grid">
          {publishedProjects.map(({ id, name, chapter, url, description, preview, previewDark }) => {
            const previewSrc = (isDarkMode && previewDark ? previewDark : preview) || '/assets/ramo-ieee-ufjf-blue.svg';
            const ProjectCardTag = url ? 'a' : 'article';
            const linkProps = url
              ? { href: url, rel: 'noreferrer', target: '_blank' }
              : {};

            return (
              <ProjectCardTag
                className={`project-card project-card--${id}`}
                key={id}
                aria-label={t.projects.open(name)}
                {...linkProps}
              >
                <div className="project-card__preview">
                  <img
                    className="project-card__image"
                    src={previewSrc}
                    alt={t.projects.previewAlt(name)}
                    loading="lazy"
                    decoding="async"
                />
              </div>
              <div className="project-card__copy">
                  <span className="project-card__tag">{chapter}</span>
                  <strong>{name}</strong>
                  <p>{description[language]}</p>
                </div>
                {url ? <ExternalLink className="project-card__icon" aria-hidden="true" size={20} /> : null}
              </ProjectCardTag>
            );
          })}
        </div>
      </section>

      <section className="members" id="membros" aria-labelledby="membros-title">
        <div className="section-heading">
          <span>{t.members.eyebrow}</span>
          <h2 id="membros-title">{t.members.title}</h2>
        </div>

        <div className="member-roster" aria-label={t.members.description}>
          {publishedMembers.length ? (
            publishedMembers.map((member) => (
              <button
                className={`member-tile ${
                  selectedMemberId === member.id ? 'member-tile--active' : ''
                }`}
                key={member.id}
                type="button"
                onClick={() => setSelectedMemberId(member.id)}
                aria-expanded={selectedMemberId === member.id}
                aria-controls="member-detail"
                aria-label={t.members.openDetails(member.name)}
              >
                {member.photoUrl ? (
                  <img
                    className="member-tile__photo"
                    src={member.photoUrl}
                    alt={t.members.photoAlt(member.name)}
                    style={getMemberPhotoStyle(member)}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="member-tile__placeholder" aria-hidden="true">
                    {getInitials(member.name)}
                  </span>
                )}
              </button>
            ))
          ) : (
            <p className="member-empty">{t.members.empty}</p>
          )}
        </div>

        {selectedMember && (
          <article
            className="chapter-detail member-detail"
            id="member-detail"
            ref={memberDetailRef}
            tabIndex={-1}
            aria-labelledby="member-detail-title"
            aria-live="polite"
          >
            <button
              className="chapter-detail__close"
              type="button"
              onClick={() => setSelectedMemberId(null)}
              aria-label={t.members.close}
            >
              <X aria-hidden="true" size={20} />
            </button>

            <div className="chapter-detail__main member-detail__main">
              <div className="member-detail__photo-wrap">
                {selectedMember.photoUrl ? (
                  <img
                    className="member-detail__photo"
                    src={selectedMember.photoUrl}
                    alt={t.members.photoAlt(selectedMember.name)}
                    style={getMemberPhotoStyle(selectedMember)}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="member-detail__placeholder">
                    {getInitials(selectedMember.name)}
                  </span>
                )}
              </div>

              <div className="chapter-detail__copy">
                <span>{getRoleLabel(selectedMember.role, language)}</span>
                <h3 id="member-detail-title">{selectedMember.name}</h3>
                <p>{getLocalizedText(selectedMember.bio, language, '')}</p>
              </div>
            </div>
          </article>
        )}
      </section>

      <section className="contact" id="contato" aria-labelledby="contato-title">
        <div className="section-heading">
          <span>{t.contact.eyebrow}</span>
          <h2 id="contato-title">{t.contact.title}</h2>
        </div>

        <div className="contact__layout">
          <div className="contact__copy">
            <span>{t.contact.locationLabel}</span>
            <h2>{t.contact.location}</h2>
            <a
              className="contact__instagram"
              href="https://instagram.com/ieeeufjf"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram aria-hidden="true" size={18} />
              @ieeeufjf
            </a>
          </div>

          <div className="contact__map" aria-label={t.contact.mapLabel}>
            <iframe
              src={mapsEmbedUrl}
              title={t.contact.mapTitle}
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function AdminPage({ isDarkMode, language, setIsDarkMode, setLanguage, t }) {
  const [auth, setAuth] = useState({ checking: true, user: null });
  const [loginForm, setLoginForm] = useState({ password: '', username: '' });
  const [memberForm, setMemberForm] = useState(createAdminMemberForm);
  const [projectForm, setProjectForm] = useState(createAdminProjectForm);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [siteMembers, setSiteMembers] = useState([]);
  const [siteProjects, setSiteProjects] = useState([]);
  const [draggedMemberId, setDraggedMemberId] = useState(null);
  const [status, setStatus] = useState({ tone: 'loading', text: t.admin.statusChecking });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const isOrderingRef = useRef(false);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    setAuth((current) => ({ ...current, checking: true }));
    setStatus({ tone: 'loading', text: t.admin.statusChecking });

    try {
      const response = await fetch('/api/atas-auth?action=me', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(await readAdminApiError(response, t.admin.statusError));
      }

      const payload = await readAdminJson(response, t.admin.proxyHint);
      const user = payload.user || null;
      setAuth({ checking: false, user });
      setStatus({
        tone: user ? 'success' : 'idle',
        text: user ? t.admin.statusLogged(user.name) : t.admin.statusIdle,
      });

      if (user?.canManageMembers) {
        await loadSiteMembers();
        await loadSiteProjects();
      }
    } catch (error) {
      setAuth({ checking: false, user: null });
      setStatus({ tone: 'error', text: error.message || t.admin.statusError });
    }
  }

  async function loadSiteMembers() {
    setIsLoadingUsers(true);

    try {
      const response = await fetch('/api/atas-site-members', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(await readAdminApiError(response, t.admin.statusError));
      }

      const payload = await readAdminJson(response, t.admin.proxyHint);
      const normalizedMembers = Array.isArray(payload.members)
        ? payload.members.map(normalizeAdminMember).filter(Boolean)
        : [];
      setSiteMembers(normalizedMembers);
      setDraggedMemberId(null);
    } catch (error) {
      setStatus({ tone: 'error', text: error.message || t.admin.statusError });
    } finally {
      setIsLoadingUsers(false);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ tone: 'loading', text: t.admin.statusChecking });

    try {
      const response = await fetch('/api/atas-auth', {
        body: JSON.stringify(loginForm),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(await readAdminApiError(response, t.admin.statusError));
      }

      const payload = await readAdminJson(response, t.admin.proxyHint);
      setAuth({ checking: false, user: payload.user || null });
      setLoginForm({ password: '', username: '' });
      setStatus({
        tone: 'success',
        text: payload.user ? t.admin.statusLogged(payload.user.name) : t.admin.statusIdle,
      });
      if (payload.user?.canManageMembers) {
        await loadSiteMembers();
        await loadSiteProjects();
      } else {
        setSiteMembers([]);
        setSiteProjects([]);
      }
    } catch (error) {
      setStatus({ tone: 'error', text: error.message || t.admin.statusError });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/atas-auth', { method: 'DELETE' });
    setAuth({ checking: false, user: null });
    setSiteMembers([]);
    setSiteProjects([]);
    setStatus({ tone: 'idle', text: t.admin.statusIdle });
  }

  function updateMemberForm(field, value) {
    setMemberForm((current) => ({ ...current, [field]: value }));
  }

  function updatePhotoCrop(field, value) {
    updateMemberForm(field, Number(value));
  }

  function resetMemberForm() {
    setEditingMemberId(null);
    setMemberForm(createAdminMemberForm());
  }

  function startEditMember(member) {
    setEditingMemberId(member.id);
    setMemberForm(createAdminMemberForm(member));
    setStatus({
      tone: 'idle',
      text:
        language === 'en'
          ? `Editing ${member.name}.`
          : `Editando ${member.name}.`,
    });
  }

  function toggleMemberChapter(chapterKey) {
    setMemberForm((current) => {
      const selected = new Set(current.chapters);
      if (selected.has(chapterKey)) {
        selected.delete(chapterKey);
      } else {
        selected.add(chapterKey);
      }

      return { ...current, chapters: [...selected] };
    });
  }

  async function handleSaveMember(event) {
    event.preventDefault();
    const isEditing = Boolean(editingMemberId);
    const nextPosition = isEditing
      ? memberForm.position
      : siteMembers.reduce((maxPosition, member) => Math.max(maxPosition, Number(member.position) || 0), -1) + 1;
    setIsSubmitting(true);
    setStatus({ tone: 'loading', text: isEditing ? t.admin.updating : t.admin.creating });

    try {
      const response = await fetch(
        isEditing
          ? `/api/atas-site-members?id=${encodeURIComponent(editingMemberId)}`
          : '/api/atas-site-members',
        {
          body: JSON.stringify(buildAdminMemberPayload(memberForm, { position: nextPosition })),
          headers: { 'Content-Type': 'application/json' },
          method: isEditing ? 'PATCH' : 'POST',
        },
      );

      if (!response.ok) {
        throw new Error(await readAdminApiError(response, t.admin.statusError));
      }

      resetMemberForm();
      setStatus({ tone: 'success', text: isEditing ? t.admin.statusUpdated : t.admin.statusCreated });
      await loadSiteMembers();
    } catch (error) {
      setStatus({ tone: 'error', text: error.message || t.admin.statusError });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleMemberDragStart(event, memberId) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', String(memberId));
    setDraggedMemberId(memberId);
  }

  function handleMemberDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  async function handleMemberDrop(event, targetMemberId) {
    event.preventDefault();
    const sourceId = draggedMemberId || event.dataTransfer.getData('text/plain');
    setDraggedMemberId(null);

    if (!sourceId || String(sourceId) === String(targetMemberId)) {
      return;
    }

    const targetIndex = siteMembers.findIndex((member) => String(member.id) === String(targetMemberId));
    await commitMemberOrderToIndex(sourceId, targetIndex);
  }

  async function commitMemberOrderToIndex(memberId, targetIndex) {
    if (isOrderingRef.current) {
      return;
    }

    const currentIndex = siteMembers.findIndex((member) => String(member.id) === String(memberId));
    if (currentIndex < 0 || targetIndex < 0 || targetIndex >= siteMembers.length || targetIndex === currentIndex) {
      return;
    }

    const reorderedMembers = [...siteMembers];
    const [movedMember] = reorderedMembers.splice(currentIndex, 1);
    reorderedMembers.splice(targetIndex, 0, movedMember);
    const positionedMembers = reorderedMembers.map((member, index) => ({ ...member, position: index }));

    isOrderingRef.current = true;
    setIsSubmitting(true);
    setStatus({ tone: 'loading', text: t.admin.updating });
    setSiteMembers(positionedMembers);
    setDraggedMemberId(null);

    try {
      await Promise.all(
        positionedMembers.map((member) =>
          fetch(`/api/atas-site-members?id=${encodeURIComponent(member.id)}`, {
            body: JSON.stringify({ position: member.position }),
            headers: { 'Content-Type': 'application/json' },
            method: 'PATCH',
          }).then(async (response) => {
            if (!response.ok) {
              throw new Error(await readAdminApiError(response, t.admin.statusError));
            }
          }),
        ),
      );

      setStatus({ tone: 'success', text: t.admin.statusUpdated });
      await loadSiteMembers();
    } catch (error) {
      setStatus({ tone: 'error', text: error.message || t.admin.statusError });
      await loadSiteMembers();
    } finally {
      isOrderingRef.current = false;
      setIsSubmitting(false);
    }
  }

  async function handleRemoveMember(member) {
    setIsSubmitting(true);
    setStatus({ tone: 'loading', text: t.admin.updating });

    try {
      const response = await fetch(`/api/atas-site-members?id=${encodeURIComponent(member.id)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(await readAdminApiError(response, t.admin.statusError));
      }

      if (editingMemberId === member.id) {
        resetMemberForm();
      }

      setStatus({ tone: 'success', text: t.admin.statusRemoved });
      await loadSiteMembers();
    } catch (error) {
      setStatus({ tone: 'error', text: error.message || t.admin.statusError });
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateProjectForm(field, value) {
    setProjectForm((current) => ({ ...current, [field]: value }));
  }

  function resetProjectForm() {
    setEditingProjectId(null);
    setProjectForm(createAdminProjectForm());
  }

  function startEditProject(project) {
    setEditingProjectId(project.id);
    setProjectForm(createAdminProjectForm(project));
    setStatus({
      tone: 'idle',
      text: language === 'en' ? `Editing ${project.title}.` : `Editando ${project.title}.`,
    });
  }

  async function loadSiteProjects() {
    try {
      const response = await fetch('/api/atas-site-projects', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(await readAdminApiError(response, t.admin.statusError));
      }

      const payload = await readAdminJson(response, t.admin.proxyHint);
      const normalizedProjects = Array.isArray(payload.projects)
        ? payload.projects.map(normalizeAdminProject).filter(Boolean)
        : [];
      setSiteProjects(normalizedProjects);
    } catch (error) {
      setStatus({ tone: 'error', text: error.message || t.admin.statusError });
    }
  }

  async function handleSaveProject(event) {
    event.preventDefault();
    const isEditing = Boolean(editingProjectId);
    const nextPosition = isEditing
      ? projectForm.position
      : siteProjects.reduce((maxPosition, project) => Math.max(maxPosition, Number(project.position) || 0), -1) + 1;
    setIsSubmitting(true);
    setStatus({ tone: 'loading', text: isEditing ? t.admin.updating : t.admin.creating });

    try {
      const response = await fetch(
        isEditing
          ? `/api/atas-site-projects?id=${encodeURIComponent(editingProjectId)}`
          : '/api/atas-site-projects',
        {
          body: JSON.stringify(buildAdminProjectPayload(projectForm, { position: nextPosition })),
          headers: { 'Content-Type': 'application/json' },
          method: isEditing ? 'PATCH' : 'POST',
        },
      );

      if (!response.ok) {
        throw new Error(await readAdminApiError(response, t.admin.statusError));
      }

      resetProjectForm();
      setStatus({ tone: 'success', text: isEditing ? t.admin.statusUpdated : t.admin.statusCreated });
      await loadSiteProjects();
    } catch (error) {
      setStatus({ tone: 'error', text: error.message || t.admin.statusError });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRemoveProject(project) {
    setIsSubmitting(true);
    setStatus({ tone: 'loading', text: t.admin.updating });

    try {
      const response = await fetch(`/api/atas-site-projects?id=${encodeURIComponent(project.id)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(await readAdminApiError(response, t.admin.statusError));
      }

      if (editingProjectId === project.id) {
        resetProjectForm();
      }

      setStatus({ tone: 'success', text: t.admin.statusRemoved });
      await loadSiteProjects();
    } catch (error) {
      setStatus({ tone: 'error', text: error.message || t.admin.statusError });
    } finally {
      setIsSubmitting(false);
    }
  }

  const canManage = Boolean(auth.user?.canManageMembers);
  const isEditingMember = Boolean(editingMemberId);

  return (
    <main className="admin-page">
      <nav className="admin-nav" aria-label="Administração">
        <a className="admin-nav__back" href="/">
          <ArrowLeft aria-hidden="true" size={18} />
          {t.admin.back}
        </a>
        <div className="admin-nav__actions">
          <button
            className="mini-nav__language"
            type="button"
            onClick={() => setLanguage((currentLanguage) => (currentLanguage === 'pt' ? 'en' : 'pt'))}
            aria-label={t.nav.languageLabel}
          >
            <Languages aria-hidden="true" size={17} />
            <span>{t.nav.languageButton}</span>
          </button>
          <button
            className="mini-nav__theme"
            type="button"
            onClick={() => setIsDarkMode((currentTheme) => !currentTheme)}
            aria-label={isDarkMode ? t.nav.disableDark : t.nav.enableDark}
            aria-pressed={isDarkMode}
          >
            <Moon aria-hidden="true" size={18} />
          </button>
        </div>
      </nav>

      <section className="admin-hero">
        <span>{t.admin.eyebrow}</span>
        <h1>{t.admin.title}</h1>
        <p>{t.admin.description}</p>
        <div className={`admin-status admin-status--${status.tone}`}>
          <ShieldCheck aria-hidden="true" size={18} />
          <strong>{status.text}</strong>
        </div>
      </section>

      <section className="admin-grid">
        <article className="admin-panel">
          <div className="admin-panel__heading">
            <LockKeyhole aria-hidden="true" size={22} />
            <div>
              <span>{t.admin.loginTitle}</span>
              <p>{t.admin.loginDescription}</p>
            </div>
          </div>

          {auth.user ? (
            <div className="admin-session-card">
              <strong>{auth.user.name}</strong>
              <span>@{auth.user.username}</span>
              <div className="admin-session-card__actions">
                <button type="button" onClick={handleLogout}>
                  {t.admin.logout}
                </button>
              </div>
            </div>
          ) : (
            <form className="admin-form" onSubmit={handleLogin}>
              <label>
                <span>{t.admin.username}</span>
                <input
                  value={loginForm.username}
                  onChange={(event) =>
                    setLoginForm((current) => ({ ...current, username: event.target.value }))
                  }
                  autoComplete="username"
                />
              </label>
              <label>
                <span>{t.admin.password}</span>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(event) =>
                    setLoginForm((current) => ({ ...current, password: event.target.value }))
                  }
                  autoComplete="current-password"
                />
              </label>
              <button className="admin-primary-button" disabled={isSubmitting || auth.checking}>
                {t.admin.login}
              </button>
              <p className="admin-hint">{t.admin.proxyHint}</p>
            </form>
          )}
        </article>

        <article className="admin-panel admin-panel--wide">
          <div className="admin-panel__heading">
            <UserPlus aria-hidden="true" size={22} />
            <div>
              <span>{isEditingMember ? t.admin.editFormTitle : t.admin.formTitle}</span>
              <p>{t.admin.formDescription}</p>
            </div>
          </div>

          <form className="admin-member-form" onSubmit={handleSaveMember}>
            <label>
              <span>{t.admin.fullName}</span>
              <input
                value={memberForm.name}
                onChange={(event) => updateMemberForm('name', event.target.value)}
                disabled={!canManage}
                required
              />
            </label>
            <label>
              <span>{t.admin.role}</span>
              <select
                value={memberForm.cargo}
                onChange={(event) => updateMemberForm('cargo', event.target.value)}
                disabled={!canManage}
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {language === 'en' ? translateRole(role, language) : role}
                  </option>
                ))}
              </select>
            </label>
            <label className="admin-member-form__span">
              <span>{t.admin.photoUrl}</span>
              <input
                value={memberForm.photoUrl}
                onChange={(event) => updateMemberForm('photoUrl', event.target.value)}
                disabled={!canManage}
                placeholder="https://..."
              />
            </label>
            <fieldset className="admin-photo-crop" disabled={!canManage}>
              <legend>{t.admin.photoCrop}</legend>
              <div className="admin-photo-crop__grid">
                <div className="admin-photo-crop__preview" aria-label={t.admin.photoPreview}>
                  {memberForm.photoUrl ? (
                    <img
                      src={normalizeImageUrl(memberForm.photoUrl)}
                      alt={t.admin.photoPreview}
                      style={getMemberPhotoStyle(memberForm)}
                    />
                  ) : (
                    <span>{t.admin.photoPreviewEmpty}</span>
                  )}
                </div>
                <div className="admin-photo-crop__controls">
                  <label>
                    <span>{t.admin.photoCropHorizontal}</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={memberForm.photoPositionX}
                      onInput={(event) => updatePhotoCrop('photoPositionX', event.currentTarget.value)}
                      onChange={(event) => updatePhotoCrop('photoPositionX', event.currentTarget.value)}
                    />
                  </label>
                  <label>
                    <span>{t.admin.photoCropVertical}</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={memberForm.photoPositionY}
                      onInput={(event) => updatePhotoCrop('photoPositionY', event.currentTarget.value)}
                      onChange={(event) => updatePhotoCrop('photoPositionY', event.currentTarget.value)}
                    />
                  </label>
                  <label>
                    <span>{t.admin.photoCropZoom}</span>
                    <input
                      type="range"
                      min="100"
                      max="200"
                      step="5"
                      value={memberForm.photoZoom}
                      onInput={(event) => updatePhotoCrop('photoZoom', event.currentTarget.value)}
                      onChange={(event) => updatePhotoCrop('photoZoom', event.currentTarget.value)}
                    />
                  </label>
                  <button
                    className="admin-soft-button"
                    type="button"
                    onClick={() =>
                      setMemberForm((current) => ({
                        ...current,
                        photoPositionX: 50,
                        photoPositionY: 50,
                        photoZoom: 100,
                      }))
                    }
                    disabled={!canManage}
                  >
                    <RefreshCw aria-hidden="true" size={16} />
                    {t.admin.photoCropCenter}
                  </button>
                </div>
              </div>
            </fieldset>
            <label className="admin-member-form__span">
              <span>{t.admin.bio}</span>
              <textarea
                value={memberForm.bio}
                onChange={(event) => updateMemberForm('bio', event.target.value)}
                disabled={!canManage}
                maxLength={600}
                rows={4}
              />
            </label>

            <fieldset className="admin-chapter-list" disabled={!canManage}>
              <legend>{t.admin.chapters}</legend>
              {adminChapterOptions.map((chapter) => (
                <label key={chapter.key}>
                  <input
                    type="checkbox"
                    checked={memberForm.chapters.includes(chapter.key)}
                    onChange={() => toggleMemberChapter(chapter.key)}
                  />
                  <span>{chapter.key}</span>
                </label>
              ))}
            </fieldset>

            <label className="admin-checkbox">
              <input
                type="checkbox"
                checked={memberForm.isPublic}
                onChange={(event) => updateMemberForm('isPublic', event.target.checked)}
                disabled={!canManage}
              />
              <span>{t.admin.publish}</span>
            </label>

            <div className="admin-form-actions">
              <button className="admin-primary-button" disabled={!canManage || isSubmitting}>
                <Plus aria-hidden="true" size={18} />
                {isSubmitting
                  ? isEditingMember
                    ? t.admin.updating
                    : t.admin.creating
                  : isEditingMember
                    ? t.admin.update
                    : t.admin.create}
              </button>
              {isEditingMember ? (
                <button
                  className="admin-soft-button"
                  type="button"
                  onClick={resetMemberForm}
                  disabled={isSubmitting}
                >
                  {t.admin.cancelEdit}
                </button>
              ) : null}
            </div>
          </form>
        </article>

        <article className="admin-panel admin-panel--wide">
          <div className="admin-panel__heading admin-panel__heading--row">
            <div>
              <span>{t.admin.usersTitle}</span>
              <p>
                {siteMembers.length
                  ? `${siteMembers.length} ${language === 'en' ? 'member(s)' : 'membro(s)'}`
                  : t.admin.noUsers}
              </p>
            </div>
            <button className="admin-soft-button" type="button" onClick={loadSiteMembers} disabled={!canManage || isLoadingUsers}>
              <RefreshCw aria-hidden="true" size={16} />
              {t.admin.refresh}
            </button>
          </div>

          {siteMembers.length ? (
            <div className="admin-reorder-preview" aria-label={t.admin.reorderPreviewTitle}>
              <span>{t.admin.reorderPreviewTitle}</span>
              <div className="admin-reorder-preview__grid">
                {siteMembers.map((member, index) => (
                  <button
                    className={`admin-member-order-card ${
                      String(draggedMemberId) === String(member.id) ? 'admin-member-order-card--dragging' : ''
                    }`}
                    key={member.id}
                    type="button"
                    draggable={canManage && !isSubmitting && siteMembers.length > 1}
                    onClick={() => startEditMember(member)}
                    onDragStart={(event) => handleMemberDragStart(event, member.id)}
                    onDragOver={handleMemberDragOver}
                    onDrop={(event) => handleMemberDrop(event, member.id)}
                    onDragEnd={() => setDraggedMemberId(null)}
                    disabled={!canManage || isSubmitting}
                    aria-label={t.admin.dragMember(member.name)}
                  >
                    <span className="admin-member-order-card__photo">
                      {member.photoUrl ? (
                        <img
                          src={member.photoUrl}
                          alt={t.members.photoAlt(member.name)}
                          style={getMemberPhotoStyle(member)}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                        />
                      ) : (
                        <span>{getInitials(member.name)}</span>
                      )}
                      <strong>{index + 1}</strong>
                    </span>
                    <span className="admin-member-order-card__copy">
                      <strong>{member.name}</strong>
                      <small>{translateRole(member.role || 'Membro', language)}</small>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="admin-users-list">
            {siteMembers.length ? (
              siteMembers.map((member) => (
                <div className="admin-user-row" key={member.id}>
                  <div className="admin-user-row__content">
                    <strong>{member.name}</strong>
                    <span>{translateRole(member.role || 'Membro', language)}</span>
                  </div>
                  <div className="admin-user-row__meta">
                    <span>{member.isPublic ? t.admin.published : t.admin.hidden}</span>
                    <span>{member.chapters?.length || 0} cap.</span>
                  </div>
                  <div className="admin-user-row__actions">
                    <button
                      className="admin-soft-button"
                      type="button"
                      onClick={() => startEditMember(member)}
                      disabled={!canManage || isSubmitting}
                    >
                      {t.admin.edit}
                    </button>
                    <button
                      className="admin-danger-button"
                      type="button"
                      onClick={() => handleRemoveMember(member)}
                      disabled={!canManage || isSubmitting}
                    >
                      {t.admin.removeFromSite}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="admin-empty">{t.admin.noUsers}</p>
            )}
          </div>
        </article>

        <article className="admin-panel admin-panel--wide">
          <div className="admin-panel__heading">
            <ExternalLink aria-hidden="true" size={22} />
            <div>
              <span>
                {editingProjectId
                  ? language === 'en' ? 'Edit project' : 'Editar projeto'
                  : language === 'en' ? 'New project' : 'Novo projeto'}
              </span>
              <p>
                {language === 'en'
                  ? 'Create project cards shown on the public website.'
                  : 'Cadastre os cards de projetos exibidos no site público.'}
              </p>
            </div>
          </div>

          <form className="admin-member-form" onSubmit={handleSaveProject}>
            <label>
              <span>{language === 'en' ? 'Title' : 'Título'}</span>
              <input
                value={projectForm.title}
                onChange={(event) => updateProjectForm('title', event.target.value)}
                disabled={!canManage}
                required
              />
            </label>
            <label>
              <span>{language === 'en' ? 'Chapter' : 'Capítulo'}</span>
              <select
                value={projectForm.chapter}
                onChange={(event) => updateProjectForm('chapter', event.target.value)}
                disabled={!canManage}
              >
                {adminChapterOptions.map((chapter) => (
                  <option key={chapter.key} value={chapter.key}>
                    {chapter.key}
                  </option>
                ))}
              </select>
            </label>
            <label className="admin-member-form__span">
              <span>{language === 'en' ? 'Subtitle' : 'Subtítulo'}</span>
              <input
                value={projectForm.subtitle}
                onChange={(event) => updateProjectForm('subtitle', event.target.value)}
                disabled={!canManage}
              />
            </label>
            <label className="admin-member-form__span">
              <span>{language === 'en' ? 'Small image URL' : 'URL da imagem pequena'}</span>
              <input
                value={projectForm.imageUrl}
                onChange={(event) => updateProjectForm('imageUrl', event.target.value)}
                disabled={!canManage}
                placeholder="https://..."
              />
            </label>
            <label className="admin-member-form__span">
              <span>{language === 'en' ? 'Click link' : 'Link ao clicar'}</span>
              <input
                value={projectForm.linkUrl}
                onChange={(event) => updateProjectForm('linkUrl', event.target.value)}
                disabled={!canManage}
                placeholder="https://..."
              />
            </label>
            <label className="admin-checkbox">
              <input
                type="checkbox"
                checked={projectForm.isPublic}
                onChange={(event) => updateProjectForm('isPublic', event.target.checked)}
                disabled={!canManage}
              />
              <span>{t.admin.publish}</span>
            </label>
            <div className="admin-form-actions">
              <button className="admin-primary-button" disabled={!canManage || isSubmitting}>
                <Plus aria-hidden="true" size={18} />
                {editingProjectId
                  ? language === 'en' ? 'Update project' : 'Atualizar projeto'
                  : language === 'en' ? 'Create project' : 'Criar projeto'}
              </button>
              {editingProjectId ? (
                <button
                  className="admin-soft-button"
                  type="button"
                  onClick={resetProjectForm}
                  disabled={isSubmitting}
                >
                  {t.admin.cancelEdit}
                </button>
              ) : null}
            </div>
          </form>

          <div className="admin-users-list">
            {siteProjects.length ? (
              siteProjects.map((project) => (
                <div className="admin-user-row" key={project.id}>
                  <div className="admin-user-row__content">
                    <strong>{project.title}</strong>
                    <span>{project.subtitle}</span>
                  </div>
                  <div className="admin-user-row__meta">
                    <span>{project.chapter}</span>
                    <span>{project.isPublic ? t.admin.published : t.admin.hidden}</span>
                  </div>
                  <div className="admin-user-row__actions">
                    <button
                      className="admin-soft-button"
                      type="button"
                      onClick={() => startEditProject(project)}
                      disabled={!canManage || isSubmitting}
                    >
                      {t.admin.edit}
                    </button>
                    <button
                      className="admin-danger-button"
                      type="button"
                      onClick={() => handleRemoveProject(project)}
                      disabled={!canManage || isSubmitting}
                    >
                      {t.admin.removeFromSite}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="admin-empty">
                {language === 'en' ? 'No projects registered yet.' : 'Nenhum projeto cadastrado ainda.'}
              </p>
            )}
          </div>
        </article>
      </section>
    </main>
  );
}

function ChapterLink({ href, icon, label, comingSoon }) {
  if (!href) {
    return (
      <span className="chapter-link chapter-link--empty">
        {icon}
        {label} {comingSoon}
      </span>
    );
  }

  return (
    <a className="chapter-link" href={href} target="_blank" rel="noreferrer">
      {icon}
      {label}
    </a>
  );
}

function getLocalizedText(value, language, fallback) {
  if (!value) {
    return fallback;
  }

  if (typeof value === 'string') {
    return value;
  }

  return value[language] || value.pt || fallback;
}

function translateRole(role, language) {
  if (language !== 'en') {
    return role;
  }

  return roleTranslations[role] || role;
}

function getRoleLabel(role, language) {
  if (typeof role === 'string') {
    return translateRole(role, language);
  }

  return getLocalizedText(role, language, translateRole('Membro', language));
}

function getGoogleDriveFileId(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    const isGoogleDriveUrl = [
      'docs.google.com',
      'drive.google.com',
      'drive.usercontent.google.com',
    ].includes(host);

    if (!isGoogleDriveUrl) {
      return '';
    }

    const queryId = url.searchParams.get('id')?.trim();
    if (queryId) {
      return queryId;
    }

    const fileMatch = url.pathname.match(/\/file\/d\/([^/]+)/);
    return fileMatch?.[1] ? decodeURIComponent(fileMatch[1]).trim() : '';
  } catch {
    return '';
  }
}

function normalizeImageUrl(value) {
  const cleanValue = String(value || '').trim();
  if (!cleanValue) {
    return '';
  }

  const googleDriveFileId = getGoogleDriveFileId(cleanValue);
  if (googleDriveFileId) {
    return `https://drive.google.com/thumbnail?id=${encodeURIComponent(googleDriveFileId)}&sz=w1000`;
  }

  return cleanValue;
}

function normalizeLinkUrl(value) {
  const cleanValue = String(value || '').trim();
  if (!cleanValue) {
    return '';
  }

  try {
    const url = new URL(cleanValue);
    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : '';
  } catch {
    return cleanValue.startsWith('/') ? cleanValue : '';
  }
}

function normalizeSearchText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function findPublishedMemberByName(members, name) {
  const targetName = normalizeSearchText(name);
  if (!targetName) {
    return null;
  }

  return (
    members.find((member) => normalizeSearchText(member.name) === targetName) ||
    members.find((member) => {
      const memberName = normalizeSearchText(member.name);
      return memberName.includes(targetName) || targetName.includes(memberName);
    }) ||
    null
  );
}

function clampPercentage(value, fallback = 50) {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) {
    return fallback;
  }

  return Math.min(100, Math.max(0, Math.round(numberValue)));
}

function clampPhotoZoom(value, fallback = 100) {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) {
    return fallback;
  }

  return Math.min(200, Math.max(100, Math.round(numberValue)));
}

function getMemberPhotoPosition(member) {
  return {
    x: clampPercentage(member?.photoPositionX),
    y: clampPercentage(member?.photoPositionY),
    zoom: clampPhotoZoom(member?.photoZoom),
  };
}

function getMemberPhotoStyle(member) {
  const { x, y, zoom } = getMemberPhotoPosition(member);
  return {
    objectPosition: `${x}% ${y}%`,
    transform: `scale(${zoom / 100})`,
    transformOrigin: `${x}% ${y}%`,
  };
}

function normalizeRemoteMember(member) {
  if (!member?.name) {
    return null;
  }

  return {
    bio: member.bio || '',
    chapters: Array.isArray(member.chapters) ? member.chapters : [],
    id: `atas-${member.id || member.name}`,
    name: member.name,
    photoUrl: normalizeImageUrl(member.photoUrl),
    photoPositionX: clampPercentage(member.photoPositionX),
    photoPositionY: clampPercentage(member.photoPositionY),
    photoZoom: clampPhotoZoom(member.photoZoom),
    position: Number.isFinite(Number(member.position)) ? Number(member.position) : 0,
    role: member.role || 'Membro',
  };
}

function normalizeRemoteProject(project) {
  if (!project?.title) {
    return null;
  }

  const subtitle = project.subtitle || '';

  return {
    chapter: project.chapter || 'Ramo',
    description: {
      en: subtitle,
      pt: subtitle,
    },
    id: `project-${project.id || project.title}`,
    isPublic: Boolean(project.isPublic),
    name: project.title,
    position: Number.isFinite(Number(project.position)) ? Number(project.position) : 0,
    preview: normalizeImageUrl(project.imageUrl),
    subtitle,
    url: normalizeLinkUrl(project.linkUrl),
  };
}

function normalizeAdminMember(member) {
  if (!member?.name) {
    return null;
  }

  return {
    ...member,
    chapters: Array.isArray(member.chapters) ? member.chapters : [],
    isPublic: Boolean(member.isPublic),
    photoUrl: normalizeImageUrl(member.photoUrl),
    photoPositionX: clampPercentage(member.photoPositionX),
    photoPositionY: clampPercentage(member.photoPositionY),
    photoZoom: clampPhotoZoom(member.photoZoom),
    position: Number.isFinite(Number(member.position)) ? Number(member.position) : 0,
    role: member.role || 'Membro',
  };
}

function normalizeAdminProject(project) {
  if (!project?.title) {
    return null;
  }

  return {
    chapter: project.chapter || 'Ramo',
    id: project.id,
    imageUrl: normalizeImageUrl(project.imageUrl),
    isPublic: Boolean(project.isPublic),
    linkUrl: normalizeLinkUrl(project.linkUrl),
    position: Number.isFinite(Number(project.position)) ? Number(project.position) : 0,
    subtitle: project.subtitle || '',
    title: project.title,
  };
}

function createAdminMemberForm(user) {
  if (user) {
    const chapters = Array.isArray(user.chapters) && user.chapters.length ? user.chapters : ['Ramo'];

    return {
      bio: user.bio || '',
      cargo: user.role || user.cargo || 'Membro',
      chapters,
      isPublic: Boolean(user.isPublic),
      name: user.name || '',
      photoUrl: user.photoUrl || '',
      photoPositionX: clampPercentage(user.photoPositionX),
      photoPositionY: clampPercentage(user.photoPositionY),
      photoZoom: clampPhotoZoom(user.photoZoom),
      position: Number.isFinite(Number(user.position)) ? Number(user.position) : 0,
    };
  }

  return {
    bio: '',
    cargo: 'Membro',
    chapters: ['Ramo'],
    isPublic: true,
    name: '',
    photoUrl: '',
    photoPositionX: 50,
    photoPositionY: 50,
    photoZoom: 100,
    position: 0,
  };
}

function createAdminProjectForm(project) {
  return {
    chapter: project?.chapter || 'Ramo',
    imageUrl: project?.imageUrl || '',
    isPublic: typeof project?.isPublic === 'boolean' ? project.isPublic : true,
    linkUrl: project?.linkUrl || '',
    position: Number.isFinite(Number(project?.position)) ? Number(project.position) : 0,
    subtitle: project?.subtitle || '',
    title: project?.title || '',
  };
}

function buildAdminMemberPayload(form, overrides = {}) {
  const selectedChapters = Array.isArray(form.chapters) && form.chapters.length
    ? form.chapters
    : ['Ramo'];
  return {
    bio: form.bio,
    chapters: selectedChapters,
    isPublic: form.isPublic,
    name: form.name,
    photoUrl: normalizeImageUrl(form.photoUrl),
    photoPositionX: clampPercentage(form.photoPositionX),
    photoPositionY: clampPercentage(form.photoPositionY),
    photoZoom: clampPhotoZoom(form.photoZoom),
    position: Number.isFinite(Number(overrides.position ?? form.position))
      ? Number(overrides.position ?? form.position)
      : 0,
    role: form.cargo,
  };
}

function buildAdminProjectPayload(form, overrides = {}) {
  return {
    chapter: form.chapter || 'Ramo',
    imageUrl: normalizeImageUrl(form.imageUrl),
    isPublic: Boolean(form.isPublic),
    linkUrl: normalizeLinkUrl(form.linkUrl),
    position: Number.isFinite(Number(overrides.position ?? form.position))
      ? Number(overrides.position ?? form.position)
      : 0,
    subtitle: String(form.subtitle || '').trim(),
    title: String(form.title || '').trim(),
    ...overrides,
  };
}

async function readAdminApiError(response, fallback) {
  try {
    const payload = await response.json();
    return payload.detail || fallback;
  } catch {
    return fallback;
  }
}

async function readAdminJson(response, fallback) {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error(fallback);
  }

  return response.json();
}

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

createRoot(document.getElementById('root')).render(<App />);
