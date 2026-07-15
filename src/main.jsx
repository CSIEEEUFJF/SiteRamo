import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown,
  ArrowLeft,
  Bell,
  CalendarDays,
  ExternalLink,
  Github,
  Instagram,
  Languages,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Moon,
  RefreshCw,
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
    president: { nome: 'Pedro de Oliveira Fuzimoto', foto: '/assets/presidents/pedro-fuzimoto.png' },
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
    president: {
      nome: 'Rafael Ferreira Campos',
      foto: '',
      label: {
        pt: 'Presidente',
        en: 'Chair',
      },
    },
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
    instagram: 'https://www.instagram.com/ieeecs.ufjf/',
    github: 'https://github.com/CSIEEEUFJF',
    president: { nome: 'Rafael Lago', foto: '/assets/presidents/rafael-lago.png' },
  },
  {
    id: 'cas',
    sigla: 'CASS',
    nome: 'Circuits and Systems Society',
    logo: '/assets/chapters/cas.png',
    darkLogo: '/assets/chapters/dark/cas-white-transparent.png',
    descricao: {
      pt: 'Capítulo voltado ao estudo de circuitos, sistemas eletrônicos, processamento de sinais, integração de hardware e tecnologias de sistemas embarcados.',
      en: 'Chapter focused on circuits, electronic systems, signal processing, hardware integration, and embedded systems technologies.',
    },
    instagram: '',
    president: { nome: 'Arthur Araújo Martins', foto: '' },
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
    instagram: 'https://www.instagram.com/ieeescolasufjf/',
    president: { nome: 'Fabrício Prata Rodrigues', foto: '/assets/presidents/fabricio-prata.png' },
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
    president: { nome: 'Mariana Guimarães Machado', foto: '' },
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
    president: { nome: 'Nicolas Augusto de Oliveira Ávila', foto: '' },
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
    president: { nome: 'Endhel Andrade de Jesus', foto: '/assets/presidents/endhel-andrade.jpg' },
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
    president: { nome: 'Carlos Alexandre de Almeida Pires Vital', foto: '/assets/presidents/carlos-alexandre.png' },
  },
  {
    id: 'vts',
    sigla: 'VTS',
    nome: 'Vehicular Technology Society',
    logo: '/assets/chapters/vts.webp',
    darkLogo: '/assets/chapters/dark/vts.png',
    descricao: {
      pt: 'Capítulo dedicado à mobilidade, sistemas veiculares, transporte inteligente, comunicação veicular e tecnologias automotivas.',
      en: 'Chapter dedicated to mobility, vehicular systems, intelligent transportation, vehicular communication, and automotive technologies.',
    },
    instagram: '',
    president: { nome: 'Matheus Nery', foto: '' },
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
    president: { nome: 'Maria Eduarda de Sá Amorim Pereira', foto: '' },
  },
];

const chapterPages = {
  aess: {
    foundation: '2026',
    email: 'ramo.ieeeufjf@gmail.com',
    oldSiteUrl: 'https://edu.ieee.org/br-ufjf/',
    body: {
      pt: [
        'O Capítulo Estudantil IEEE Aerospace and Electronic Systems Society UFJF reúne estudantes interessados em sistemas aeroespaciais, eletrônica embarcada, sensoriamento, navegação, controle e tecnologias aplicadas a ambientes complexos.',
        'Fundado em 2026, o capítulo atua para aproximar a comunidade acadêmica de temas estratégicos em engenharia, incentivando estudos, projetos técnicos e atividades de formação voltadas a sistemas eletrônicos avançados.',
      ],
      en: [
        'The IEEE Aerospace and Electronic Systems Society Student Branch Chapter at UFJF brings together students interested in aerospace systems, embedded electronics, sensing, navigation, control, and technologies applied to complex environments.',
        'Founded in 2026, the chapter connects the academic community with strategic engineering topics, encouraging studies, technical projects, and training activities focused on advanced electronic systems.',
      ],
    },
    projects: {
      pt: [
        {
          title: 'Ciclo de estudos em sistemas aeroespaciais',
          text: 'Plano 2026.2: encontros introdutórios sobre sensoriamento, navegação e eletrônica embarcada, com definição de um primeiro protótipo demonstrativo.',
        },
      ],
      en: [
        {
          title: 'Aerospace systems study cycle',
          text: '2026.2 plan: introductory meetings on sensing, navigation, and embedded electronics, followed by the definition of a first demonstration prototype.',
        },
      ],
    },
  },
  aps: {
    foundation: '2026',
    email: 'ramo.ieeeufjf@gmail.com',
    oldSiteUrl: 'https://edu.ieee.org/br-ufjf/',
    body: {
      pt: [
        'O Capítulo Estudantil IEEE Antennas and Propagation Society UFJF é dedicado ao estudo de antenas, propagação eletromagnética, radiofrequência, micro-ondas e comunicações sem fio.',
        'Fundado em 2026, o AP-S UFJF busca desenvolver projetos, capacitações e atividades acadêmicas que aproximem estudantes de aplicações práticas em telecomunicações, sistemas radiantes e tecnologias de conectividade.',
      ],
      en: [
        'The IEEE Antennas and Propagation Society Student Branch Chapter at UFJF is dedicated to antennas, electromagnetic propagation, radio frequency, microwaves, and wireless communications.',
        'Founded in 2026, AP-S UFJF aims to develop projects, training activities, and academic initiatives that bring students closer to practical applications in telecommunications, radiating systems, and connectivity technologies.',
      ],
    },
    projects: {
      pt: [
        {
          title: 'Oficina introdutória de antenas',
          text: 'Plano 2026.2: atividade prática sobre fundamentos de antenas, propagação e medição, preparando uma trilha inicial de capacitação para novos membros.',
        },
      ],
      en: [
        {
          title: 'Introductory antenna workshop',
          text: '2026.2 plan: a practical activity on antenna, propagation, and measurement fundamentals, establishing an initial training path for new members.',
        },
      ],
    },
  },
  comsoc: {
    foundation: '2016',
    email: 'ramo.ieeeufjf@gmail.com',
    oldSiteUrl: 'https://edu.ieee.org/br-ufjf/',
    body: {
      pt: [
        'O Capítulo Estudantil IEEE Communications Society UFJF atua na área de redes, telecomunicações, conectividade, protocolos e tecnologias que sustentam sistemas modernos de comunicação.',
        'Fundado em 2016, o ComSoc UFJF incentiva o estudo e a aplicação de tecnologias de comunicação por meio de projetos, capacitações, discussões técnicas e integração entre estudantes interessados em infraestrutura digital.',
      ],
      en: [
        'The IEEE Communications Society Student Branch Chapter at UFJF works with networks, telecommunications, connectivity, protocols, and technologies that support modern communication systems.',
        'Founded in 2016, ComSoc UFJF encourages the study and application of communication technologies through projects, training, technical discussions, and integration among students interested in digital infrastructure.',
      ],
    },
    projects: {
      pt: [
        {
          title: 'Ciclo de redes e conectividade',
          text: 'Plano 2026.2: encontros sobre redes, protocolos e telecomunicações, com uma demonstração prática de monitoramento e diagnóstico de conectividade.',
        },
      ],
      en: [
        {
          title: 'Networks and connectivity cycle',
          text: '2026.2 plan: meetings on networks, protocols, and telecommunications, including a practical connectivity monitoring and diagnostics demonstration.',
        },
      ],
    },
  },
  cas: {
    foundation: '2016',
    email: 'ramo.ieeeufjf@gmail.com',
    oldSiteUrl: 'https://edu.ieee.org/br-ufjf/',
    body: {
      pt: [
        'O Capítulo Estudantil IEEE Circuits and Systems Society UFJF é voltado ao estudo de circuitos, sistemas eletrônicos, processamento de sinais, integração de hardware e tecnologias de sistemas embarcados.',
        'Fundado em 2016, o CASS UFJF promove atividades técnicas e projetos que conectam teoria e prática em eletrônica, automação, sistemas digitais e soluções de engenharia para problemas reais.',
      ],
      en: [
        'The IEEE Circuits and Systems Society Student Branch Chapter at UFJF focuses on circuits, electronic systems, signal processing, hardware integration, and embedded systems technologies.',
        'Founded in 2016, CASS UFJF promotes technical activities and projects that connect theory and practice in electronics, automation, digital systems, and engineering solutions for real problems.',
      ],
    },
    projects: {
      pt: [
        {
          title: 'Laboratório de circuitos e sistemas embarcados',
          text: 'Plano 2026.2: oficina de prototipagem que integra circuitos, aquisição de sinais e microcontroladores em uma aplicação de bancada documentada.',
        },
      ],
      en: [
        {
          title: 'Circuits and embedded systems lab',
          text: '2026.2 plan: a prototyping workshop combining circuits, signal acquisition, and microcontrollers in a documented bench-top application.',
        },
      ],
    },
  },
  edsoc: {
    foundation: '2025',
    email: 'ramo.ieeeufjf@gmail.com',
    oldSiteUrl: 'https://edu.ieee.org/br-ufjf/',
    body: {
      pt: [
        'O Capítulo Estudantil IEEE Education Society UFJF é dedicado à educação em engenharia, aprendizagem, metodologias de ensino e iniciativas de capacitação técnica.',
        'Fundado em 2025, o EdSoc UFJF trabalha para aproximar estudantes de práticas educacionais, desenvolvimento de materiais, ações em escolas e projetos que fortaleçam a formação técnica dentro e fora da universidade.',
      ],
      en: [
        'The IEEE Education Society Student Branch Chapter at UFJF is dedicated to engineering education, learning, teaching methodologies, and technical training initiatives.',
        'Founded in 2025, EdSoc UFJF connects students with educational practices, material development, school outreach, and projects that strengthen technical education inside and outside the university.',
      ],
    },
    projects: {
      pt: [
        {
          title: 'Oficina de educação em engenharia',
          text: 'Plano 2026.2: criação e teste de uma atividade didática curta para apoiar ações de capacitação técnica e aproximação com escolas.',
        },
      ],
      en: [
        {
          title: 'Engineering education workshop',
          text: '2026.2 plan: creation and testing of a short learning activity to support technical training and outreach initiatives with schools.',
        },
      ],
    },
  },
  ras: {
    foundation: '2009',
    email: 'ieee.ras@engenharia.ufjf.br',
    oldSiteUrl: 'https://edu.ieee.org/br-ufjf/nucleos/capitulos/ras/',
    body: {
      pt: [
        'O IEEE RAS UFJF é um capítulo técnico estudantil da área de robótica e automação. Filiado à IEEE Robotics and Automation Society, foi o primeiro capítulo estudantil da RAS no Brasil, fundado em 14 de maio de 2009.',
        'O capítulo desenvolve projetos técnicos, educacionais e motivacionais na área da robótica e automação para a comunidade acadêmica e externa. Suas iniciativas educacionais incentivam jovens a ingressarem na Engenharia e no campo de Ciências Exatas, além de oferecer capacitações em ferramentas como LaTeX, MATLAB e programação.',
      ],
      en: [
        'IEEE RAS UFJF is a student technical chapter focused on robotics and automation. Affiliated with the IEEE Robotics and Automation Society, it was the first RAS student chapter in Brazil, founded on May 14, 2009.',
        'The chapter develops technical, educational, and motivational projects in robotics and automation for both the academic community and external audiences. Its educational initiatives encourage young people to pursue engineering and exact sciences, while also offering training in tools such as LaTeX, MATLAB, and programming.',
      ],
    },
    projects: {
      pt: [
        {
          title: 'Elevador Didático',
          text: 'Réplica funcional voltada ao ensino de robótica, reunindo comunicação, programação e saídas de controle em uma estrutura inspirada em sistemas industriais.',
        },
        {
          title: 'Lego NXT 2.0',
          text: 'Montagens com diferentes funções para incentivar crianças a se interessarem por Engenharia em escolas e feiras de ciências.',
        },
        {
          title: 'Braço Robótico',
          text: 'Sistema com motores DC, Arduino UNO e comando via Bluetooth, usado em apresentações e atividades práticas.',
        },
        {
          title: 'Seguidor de Linha',
          text: 'Carro autônomo de alta performance com sensores de refletância, microcontrolador e motores, voltado ao cenário competitivo de robótica.',
        },
      ],
      en: [
        {
          title: 'Educational Elevator',
          text: 'A functional model for teaching robotics, combining communication, programming, and control outputs in a structure inspired by industrial systems.',
        },
        {
          title: 'Lego NXT 2.0',
          text: 'Different robotic assemblies used to encourage children to explore engineering in schools and science fairs.',
        },
        {
          title: 'Robotic Arm',
          text: 'A system using DC motors, an Arduino UNO, and Bluetooth control, used in demonstrations and practical activities.',
        },
        {
          title: 'Line Follower',
          text: 'A high-performance autonomous car with reflectance sensors, a microcontroller, and motors, aimed at robotics competitions.',
        },
      ],
    },
  },
  ias: {
    foundation: '2017',
    email: 'ieee.ias@engenharia.ufjf.br',
    oldSiteUrl: 'https://edu.ieee.org/br-ufjf/nucleos/capitulos/ias/',
    body: {
      pt: [
        'O IEEE IAS UFJF é um capítulo técnico estudantil sobre aplicações industriais, fundado em 10 de junho de 2017 e filiado à IEEE Industry Applications Society.',
        'O capítulo surgiu da demanda dos estudantes por maior contato com a área profissional, tornando-se um caminho de interação entre indústria e academia. Suas atividades envolvem aplicações da engenharia elétrica e eletrônica, com enfoque no desenvolvimento de dispositivos e sistemas de baixo custo para a indústria.',
      ],
      en: [
        'IEEE IAS UFJF is a student technical chapter focused on industrial applications, founded on June 10, 2017 and affiliated with the IEEE Industry Applications Society.',
        'The chapter emerged from students’ demand for closer contact with professional practice, becoming a bridge between industry and academia. Its activities involve electrical and electronic engineering applications, with emphasis on low-cost devices and systems for industrial contexts.',
      ],
    },
    projects: {
      pt: [
        {
          title: 'Aquecedor Solar de Baixo Custo',
          text: 'Construção de um painel de captação solar para aquecer água de forma sustentável, usando materiais baratos e acessíveis.',
        },
        {
          title: 'Visitas Técnicas',
          text: 'Atividades de integração estudantil-profissional, aproximando membros de ambientes reais de trabalho e pesquisa.',
        },
        {
          title: 'Organização de Eventos',
          text: 'Participação na organização de eventos técnicos, como a COBEP, ampliando contato com empresas, investidores e pesquisadores.',
        },
      ],
      en: [
        {
          title: 'Low-Cost Solar Heater',
          text: 'Construction of a solar collection panel to heat water sustainably with affordable and accessible materials.',
        },
        {
          title: 'Technical Visits',
          text: 'Student-professional integration activities that bring members closer to real work and research environments.',
        },
        {
          title: 'Event Organization',
          text: 'Participation in technical events such as COBEP, expanding contact with companies, investors, and researchers.',
        },
      ],
    },
  },
  pes: {
    foundation: '2002',
    email: 'ieeepes.ufjf@gmail.com',
    oldSiteUrl: 'https://edu.ieee.org/br-ufjf/pes/',
    body: {
      pt: [
        'O IEEE PES UFJF é um capítulo técnico estudantil na área de potência e energia. Fundado em 1º de agosto de 2002, foi o primeiro capítulo estudantil IEEE do Brasil e é filiado à IEEE Power & Energy Society.',
        'Seu objetivo é disseminar conhecimento científico em potência e energia, desenvolvendo habilidades em planejamento, construção, instalação, pesquisa e operação de equipamentos e sistemas. O capítulo atua em temas como geração, transmissão, distribuição e fontes renováveis de energia elétrica.',
      ],
      en: [
        'IEEE PES UFJF is a student technical chapter focused on power and energy. Founded on August 1, 2002, it was the first IEEE student chapter in Brazil and is affiliated with the IEEE Power & Energy Society.',
        'Its goal is to disseminate scientific knowledge in power and energy, developing skills in planning, construction, installation, research, and operation of equipment and systems. The chapter works with generation, transmission, distribution, and renewable energy sources.',
      ],
    },
    projects: {
      pt: [
        {
          title: 'Ação Solidária de Conserto de Equipamentos',
          text: 'Ação de reparo de eletrodomésticos e eletroeletrônicos para famílias atingidas por chuvas em Juiz de Fora, em parceria com a TPF Soluções.',
        },
        {
          title: 'Projeto Biodigestor',
          text: 'Pesquisa e desenvolvimento de biodigestor em parceria com o IEEE SIGHT UFJF, a partir de resultados no Desafio Biomassa.',
        },
        {
          title: 'Projeto RES',
          text: 'Iniciativa para divulgar fontes renováveis de energia a estudantes do ensino básico e públicos leigos, usando kits didáticos de energia solar, eólica e eletrólise.',
        },
        {
          title: 'Smart City',
          text: 'Maquete de cidade inteligente movida por fontes renováveis, usada para estudar distribuição e proporções entre fontes renováveis e não renováveis.',
        },
      ],
      en: [
        {
          title: 'Solidary Equipment Repair Action',
          text: 'Repair action for home appliances and electronics from families affected by heavy rains in Juiz de Fora, in partnership with TPF Soluções.',
        },
        {
          title: 'Biodigester Project',
          text: 'Research and development of a biodigester in partnership with IEEE SIGHT UFJF, following results from the Biomass Challenge.',
        },
        {
          title: 'RES Project',
          text: 'Initiative to present renewable energy sources to basic education students and general audiences using educational kits for solar, wind, and electrolysis concepts.',
        },
        {
          title: 'Smart City',
          text: 'A smart city model powered by renewable sources, used to study distribution systems and the balance between renewable and non-renewable sources.',
        },
      ],
    },
  },
  cs: {
    foundation: '2026',
    email: 'ieee.csufjf@gmail.com',
    oldSiteUrl: 'https://edu.ieee.org/br-ufjf/cs/',
    body: {
      pt: [
        'O Capítulo Estudantil IEEE Computer Society da Universidade Federal de Juiz de Fora, fundado em 25 de março de 2026, é dedicado à promoção da excelência acadêmica e profissional na área de computação.',
        'O capítulo tem como missão disseminar conhecimento científico e tecnológico, estimulando competências em planejamento, projeto, desenvolvimento, implementação e operação de sistemas computacionais, além de pesquisa aplicada e inovação tecnológica.',
        'Por meio de projetos técnicos, atividades acadêmicas e iniciativas colaborativas, o capítulo busca formar profissionais preparados para desafios contemporâneos em engenharia de software, sistemas embarcados, redes de computadores e tecnologias emergentes.',
      ],
      en: [
        'The IEEE Computer Society Student Branch Chapter at the Federal University of Juiz de Fora, founded on March 25, 2026, is dedicated to promoting academic and professional excellence in computing.',
        'The chapter’s mission is to disseminate scientific and technological knowledge, encouraging skills in planning, design, development, implementation, and operation of computing systems, as well as applied research and technological innovation.',
        'Through technical projects, academic activities, and collaborative initiatives, the chapter aims to prepare professionals for contemporary challenges in software engineering, embedded systems, computer networks, and emerging technologies.',
      ],
    },
    projects: {
      pt: [
        {
          title: 'Projetos de software',
          text: 'Desenvolvimento de sistemas e ferramentas digitais para o Ramo e para a comunidade acadêmica.',
        },
        {
          title: 'Pesquisa aplicada',
          text: 'Iniciativas em tecnologias emergentes, engenharia de software, sistemas embarcados e redes de computadores.',
        },
      ],
      en: [
        {
          title: 'Software projects',
          text: 'Development of systems and digital tools for the Branch and the academic community.',
        },
        {
          title: 'Applied research',
          text: 'Initiatives in emerging technologies, software engineering, embedded systems, and computer networks.',
        },
      ],
    },
  },
  wie: {
    foundation: '2005',
    email: 'ieee.wieufjf@gmail.com',
    oldSiteUrl: 'https://edu.ieee.org/br-ufjf/nucleos/grupos/wie/',
    body: {
      pt: [
        'O IEEE WIE UFJF é um grupo de afinidade estudantil filiado ao IEEE Women in Engineering. Suas atividades começaram em 2004 e sua fundação oficial ocorreu em 2 de dezembro de 2005, sendo o primeiro grupo IEEE WIE brasileiro.',
        'O grupo tem como missão promover e manter mulheres nas áreas de Ciências e Engenharias, inspirando futuras profissionais a seguirem seus interesses acadêmicos. Em parceria com capítulos do Ramo e segmentos estudantis da UFJF, desenvolve projetos humanitários, educativos e de incentivo para Juiz de Fora e região.',
      ],
      en: [
        'IEEE WIE UFJF is a student affinity group affiliated with IEEE Women in Engineering. Its activities began in 2004 and it was officially founded on December 2, 2005, becoming the first IEEE WIE group in Brazil.',
        'The group’s mission is to promote and retain women in science and engineering, inspiring future professionals to pursue their academic interests. In partnership with Branch chapters and UFJF student groups, it develops humanitarian, educational, and motivational projects for Juiz de Fora and the region.',
      ],
    },
    projects: {
      pt: [
        {
          title: 'Circuito Científico',
          text: 'Laboratório de ciências acessível, em parceria com o IEEE SIGHT UFJF, que estimula estudantes da educação básica a se interessarem por exatas.',
        },
        {
          title: 'De Engenheira para Futura Engenheira',
          text: 'Divulgação de histórias de mulheres graduandas e graduadas em Engenharia, mostrando trajetórias, obstáculos e possibilidades de carreira.',
        },
        {
          title: 'Motiva WIE',
          text: 'Eventos, palestras, treinamentos e intervenções de incentivo para meninas e meninos da engenharia.',
        },
        {
          title: 'Mutirão Tecnológico',
          text: 'Ações voltadas a mulheres em vulnerabilidade social, levando conhecimento técnico diretamente à sociedade.',
        },
      ],
      en: [
        {
          title: 'Science Circuit',
          text: 'An accessible science lab, in partnership with IEEE SIGHT UFJF, that encourages basic education students to explore STEM fields.',
        },
        {
          title: 'From Engineer to Future Engineer',
          text: 'Sharing stories from undergraduate and graduated women in Engineering, highlighting paths, challenges, and career possibilities.',
        },
        {
          title: 'Motiva WIE',
          text: 'Events, lectures, training sessions, and interventions designed to motivate engineering students.',
        },
        {
          title: 'Technology Task Force',
          text: 'Actions aimed at women in vulnerable contexts, bringing technical knowledge directly to society.',
        },
      ],
    },
  },
  sight: {
    foundation: '2018',
    email: 'ieee.sight@engenharia.ufjf.br',
    oldSiteUrl: 'https://edu.ieee.org/br-ufjf/nucleos/grupos/sight/',
    body: {
      pt: [
        'O IEEE SIGHT UFJF é um grupo de afinidade estudantil voltado a ações sociais e projetos técnicos de cunho humanitário e sustentável. Criado em 2016, teve sua fundação oficial perante o IEEE SIGHT em 18 de dezembro de 2018.',
        'Seu objetivo é colocar estudantes de graduação em contato com a população e suas carências, usando o conhecimento desenvolvido na universidade para gerar impacto social. O grupo valoriza empatia, solidariedade, trabalho em equipe, comprometimento e orgulho de ser IEEE SIGHT.',
      ],
      en: [
        'IEEE SIGHT UFJF is a student affinity group focused on social actions and technical projects with humanitarian and sustainable impact. Created in 2016, it was officially founded within IEEE SIGHT on December 18, 2018.',
        'Its goal is to connect undergraduate students with communities and their needs, using university knowledge to generate social impact. The group values empathy, solidarity, teamwork, commitment, and pride in being IEEE SIGHT.',
      ],
    },
    projects: {
      pt: [
        {
          title: 'Projeto HumanizAÇÃO',
          text: 'Iniciativa em comunidades vulneráveis com frentes de civil, elétrica, conscientização ambiental, atividades para crianças e rodas de conversa com adolescentes.',
        },
        {
          title: 'Domótica',
          text: 'Projeto em parceria com a CAS para desenvolver aplicações de automação residencial voltadas à autonomia de pessoas com limitações físicas.',
        },
        {
          title: 'MATLAB',
          text: 'Capacitação de membros para ministrar minicursos e apoiar alunos de graduação no domínio da ferramenta.',
        },
        {
          title: 'Campanhas Sociais',
          text: 'Campanhas como Doe Futuros e Campanha do Agasalho, arrecadando materiais escolares e roupas para pessoas em vulnerabilidade.',
        },
      ],
      en: [
        {
          title: 'HumanizAÇÃO Project',
          text: 'Initiative in vulnerable communities with civil, electrical, environmental awareness, children’s activities, and conversation circles with teenagers.',
        },
        {
          title: 'Home Automation',
          text: 'Project in partnership with CAS to develop residential automation applications focused on autonomy for people with physical limitations.',
        },
        {
          title: 'MATLAB',
          text: 'Training members to teach short courses and support undergraduate students in using the tool.',
        },
        {
          title: 'Social Campaigns',
          text: 'Campaigns such as Doe Futuros and the Winter Clothing Campaign, collecting school supplies and clothes for vulnerable communities.',
        },
      ],
    },
  },
  vts: {
    foundation: '2025',
    email: 'ramo.ieeeufjf@gmail.com',
    oldSiteUrl: 'https://edu.ieee.org/br-ufjf/',
    body: {
      pt: [
        'O Capítulo Estudantil IEEE Vehicular Technology Society UFJF é dedicado à mobilidade, sistemas veiculares, transporte inteligente, comunicação veicular e tecnologias automotivas.',
        'Fundado em 2025, o VTS UFJF aproxima o Ramo de projetos e discussões sobre engenharia veicular, conectando estudantes a temas como projeto mecânico, eletrônica, transporte inteligente e inovação em mobilidade.',
      ],
      en: [
        'The IEEE Vehicular Technology Society Student Branch Chapter at UFJF is dedicated to mobility, vehicular systems, intelligent transportation, vehicular communication, and automotive technologies.',
        'Founded in 2025, VTS UFJF connects the Branch with projects and discussions in vehicular engineering, linking students to topics such as mechanical design, electronics, intelligent transportation, and mobility innovation.',
      ],
    },
    projects: {
      pt: [
        {
          title: 'Grupo de estudos em mobilidade inteligente',
          text: 'Plano 2026.2: encontros sobre eletrônica veicular, comunicação entre veículos e transporte inteligente, culminando em uma proposta de demonstração técnica.',
        },
      ],
      en: [
        {
          title: 'Intelligent mobility study group',
          text: '2026.2 plan: meetings on vehicular electronics, vehicle communications, and intelligent transportation, culminating in a technical demonstration proposal.',
        },
      ],
    },
  },
};

const chapterBoards = {
  aps: [
    { role: { pt: 'Presidente', en: 'Chair' }, name: 'Pedro de Oliveira Fuzimoto' },
    { role: { pt: 'Vice-Presidente', en: 'Vice-Chair' }, name: 'Maria Eduarda de Sá Amorim Pereira' },
    { role: { pt: 'Tesoureiro(a)', en: 'Treasurer' }, name: 'Fabrício Prata Rodrigues' },
    { role: { pt: 'Orientador', en: 'Advisor' }, name: 'Ulysses Roberto Chaves Vitor' },
  ],
  cas: [
    { role: { pt: 'Presidente', en: 'Chair' }, name: 'Arthur Araújo Martins' },
    { role: { pt: 'Vice-Presidente', en: 'Vice-Chair' }, name: 'Endhel Andrade de Jesus' },
    { role: { pt: 'Tesoureiro(a)', en: 'Treasurer' }, name: 'Fabrício Prata Rodrigues' },
  ],
  comsoc: [
    { role: { pt: 'Presidente', en: 'Chair' }, name: 'Rafael Ferreira Campos' },
    { role: { pt: 'Tesoureiro(a)', en: 'Treasurer' }, name: 'Fabrício Prata Rodrigues' },
    { role: { pt: 'Orientador', en: 'Advisor' }, name: 'João Lucas de Castro Santos' },
  ],
  edsoc: [
    { role: { pt: 'Presidente', en: 'Chair' }, name: 'Fabrício Prata Rodrigues' },
    { role: { pt: 'Vice-Presidente', en: 'Vice-Chair' }, name: 'Endhel Andrade de Jesus' },
    { role: { pt: 'Secretário(a)', en: 'Secretary' }, name: 'Breno Lamha Barbosa' },
    { role: { pt: 'Tesoureiro(a)', en: 'Treasurer' }, name: 'Fabrício Prata Rodrigues' },
    { role: { pt: 'Orientador', en: 'Advisor' }, name: 'Luis Henrique Lopes Lima' },
  ],
  ias: [
    { role: { pt: 'Presidente', en: 'Chair' }, name: 'Mariana Guimarães Machado' },
    { role: { pt: 'Vice-Presidente', en: 'Vice-Chair' }, name: 'Lauro Abdallah Ritti de Oliveira' },
    { role: { pt: 'Secretário(a)', en: 'Secretary' }, name: 'Conrado Simões Silva' },
    { role: { pt: 'Tesoureiro(a)', en: 'Treasurer' }, name: 'Fabrício Prata Rodrigues' },
    { role: { pt: 'Orientador', en: 'Advisor' }, name: 'Leonardo Willer de Oliveira' },
  ],
  pes: [
    { role: { pt: 'Presidente', en: 'Chair' }, name: 'Nicolas Augusto de Oliveira Ávila' },
    { role: { pt: 'Vice-Presidente', en: 'Vice-Chair' }, name: 'João Paulo Nazareth da Silva' },
    { role: { pt: 'Tesoureiro(a)', en: 'Treasurer' }, name: 'Thalita Mello e Silva' },
    { role: { pt: 'Orientador', en: 'Advisor' }, name: 'Alexandre Haruiti Anzai' },
  ],
  ras: [
    { role: { pt: 'Presidente', en: 'Chair' }, name: 'Endhel Andrade de Jesus' },
    { role: { pt: 'Vice-Presidente', en: 'Vice-Chair' }, name: 'Arthur Araújo Martins' },
    { role: { pt: 'Secretário(a)', en: 'Secretary' }, name: 'Breno Lamha Barbosa' },
    { role: { pt: 'Tesoureiro(a)', en: 'Treasurer' }, name: 'Livia Lourenço Nadalin' },
    { role: { pt: 'Orientador', en: 'Advisor' }, name: 'André Luís Marques Marcato' },
  ],
  wie: [
    { role: { pt: 'Presidente', en: 'Chair' }, name: 'Maria Eduarda de Sá Amorim Pereira' },
    { role: { pt: 'Vice-Presidente', en: 'Vice-Chair' }, name: 'Mariana Guimarães Machado' },
    { role: { pt: 'Secretário(a)', en: 'Secretary' }, name: 'Thalita Mello e Silva' },
    { role: { pt: 'Tesoureiro(a)', en: 'Treasurer' }, name: 'Livia Lourenço Nadalin' },
    { role: { pt: 'Orientadora', en: 'Advisor' }, name: 'Letícia Costa Martins' },
  ],
  sight: [
    { role: { pt: 'Presidente', en: 'Chair' }, name: 'Carlos Alexandre de Almeida Pires Vital' },
    { role: { pt: 'Secretário(a)', en: 'Secretary' }, name: 'Carlos Alexandre de Almeida Pires Vital' },
    { role: { pt: 'Tesoureiro(a)', en: 'Treasurer' }, name: 'Fabrício Prata Rodrigues' },
    { role: { pt: 'Orientador', en: 'Advisor' }, name: 'Luis Henrique Lopes Lima' },
  ],
};

const boardMembers = [
  {
    role: {
      pt: 'Presidente',
      en: 'Chair',
    },
    name: 'Pedro Fuzimoto',
    photo: '/assets/presidents/pedro-fuzimoto.png',
  },
  {
    role: {
      pt: 'Vice-Presidente',
      en: 'Vice-Chair',
    },
    name: 'Pedro Temponi',
    photo: '/assets/presidents/pedro-temponi.jpg',
  },
  {
    role: {
      pt: 'Secretário',
      en: 'Secretary',
    },
    name: 'Lauro Abdallah',
    photo: '/assets/presidents/lauro-abdallah.png',
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
  {
    role: {
      pt: 'Webmaster',
      en: 'Webmaster',
    },
    name: 'Thalita Mello',
  },
];

const projects = [
  {
    id: 'atas',
    name: 'Sistema Interno',
    nameTranslations: {
      pt: 'Sistema Interno',
      en: 'Internal System',
    },
    chapter: 'CS',
    url: 'https://interno.ieeeufjf.com.br/demo',
    displayUrl: 'interno.ieeeufjf.com.br/demo',
    description: {
      pt: 'Sistema para gerenciamento do Ramo',
      en: 'System for branch management',
    },
    preview: '/assets/ramo-ieee-ufjf-blue.svg',
    previewDark: '/assets/ramo-ieee-ufjf.svg',
    showOnChapter: false,
    showOnHome: true,
  },
  {
    id: 'entense',
    name: 'ENTENSE',
    chapter: 'IAS',
    url: 'https://entense.ieeeufjf.com.br',
    displayUrl: 'entense.ieeeufjf.com.br',
    description: {
      pt: 'Encontro de Tecnologias e Engenharia',
      en: 'Technology and Engineering Meeting',
    },
    preview: '/assets/projects/entense-preview.png',
    showOnChapter: false,
    showOnHome: true,
  },
  {
    id: 'helpieee',
    name: 'HELPIEEE',
    chapter: 'EdSoc',
    url: 'https://help.ieeeufjf.com.br',
    displayUrl: 'help.ieeeufjf.com.br',
    description: {
      pt: 'Guia do Calouro',
      en: 'Freshman Guide',
    },
    preview: '/assets/projects/helpieee-preview.png',
    showOnChapter: false,
    showOnHome: true,
  },
];

const historyLogoSlides = [
  {
    src: '/assets/history/ramo-2005.jpg',
    alt: {
      pt: 'Logo histórica do Ramo Estudantil IEEE UFJF em 2005',
      en: 'Historical IEEE UFJF Student Branch logo from 2005',
    },
  },
  {
    src: '/assets/history/logo-ate-2018.png',
    alt: {
      pt: 'Logo do Ramo Estudantil IEEE UFJF usada até 2018',
      en: 'IEEE UFJF Student Branch logo used until 2018',
    },
  },
  {
    src: '/assets/history/logo-2018-2026.png',
    alt: {
      pt: 'Logo do Ramo Estudantil IEEE UFJF usada entre 2018 e 2026',
      en: 'IEEE UFJF Student Branch logo used from 2018 to 2026',
    },
  },
  {
    src: '/assets/ramo-ieee-ufjf-blue.svg',
    alt: {
      pt: 'Logo atual do Ramo Estudantil IEEE UFJF',
      en: 'Current IEEE UFJF Student Branch logo',
    },
  },
];

const ATAS_MEMBERS_API_URLS = [
  'https://interno.ieeeufjf.com.br/api/site-members',
  '/api/atas-site-members',
];

const ATAS_PROJECTS_API_URLS = [
  'https://interno.ieeeufjf.com.br/api/site-projects',
  '/api/atas-site-projects',
];

const ATAS_HISTORY_PHOTOS_API_URLS = [
  'https://interno.ieeeufjf.com.br/api/site-history-photos',
  '/api/atas-site-history-photos',
];

const HOME_SECTION_IDS = [
  'o-ieee',
  'historia',
  'eventos',
  'capitulos',
  'diretoria',
  'projetos',
  'membros',
  'contato',
  'localizacao',
];

const roleTranslations = {
  Conselheiro: 'Advisor',
  Membro: 'Member',
  Presidente: 'Chair',
  Secretário: 'Secretary',
  Tesoureiro: 'Treasurer',
  'Vice-Presidente': 'Vice-Chair',
  Webmaster: 'Webmaster',
};

const ramoMembers = [
  {
    id: 'camila-porto',
    name: 'Camila Porto',
    role: { pt: 'Presidente do Ramo', en: 'Student Branch Chair' },
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
    role: { pt: 'Vice-Presidente', en: 'Vice-Chair' },
    chapters: ['Ramo', 'APS'],
    photoUrl: '/assets/presidents/pedro-fuzimoto.png',
    bio: {
      pt: 'Apoia a coordenação executiva do Ramo e atua em frentes ligadas a antenas, propagação e integração entre capítulos.',
      en: 'Supports Student Branch coordination and contributes to initiatives connected to antennas, propagation, and chapter integration.',
    },
  },
  {
    id: 'rafael-campos',
    name: 'Rafael Ferreira Campos',
    role: { pt: 'Presidente ComSoc', en: 'ComSoc Chair' },
    chapters: ['ComSoc'],
    bio: {
      pt: 'Lidera iniciativas do capítulo ComSoc voltadas a redes, telecomunicações, conectividade e tecnologias de comunicação.',
      en: 'Leads ComSoc chapter initiatives around networks, telecommunications, connectivity, and communication technologies.',
    },
  },
  {
    id: 'endhel-andrade',
    name: 'Endhel Andrade',
    role: { pt: 'Webmaster e Presidente RAS', en: 'Webmaster and RAS Chair' },
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
    role: { pt: 'Tesoureiro', en: 'Treasurer' },
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
    role: { pt: 'Presidente AESS', en: 'AESS Chair' },
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
    role: { pt: 'Presidente CS', en: 'CS Chair' },
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
    role: { pt: 'Secretário', en: 'Secretary' },
    chapters: ['Ramo'],
    photoUrl: '/assets/presidents/lauro-abdallah.png',
    bio: {
      pt: 'Organiza registros, documentos e rotinas administrativas para manter as atividades do Ramo alinhadas e bem acompanhadas.',
      en: 'Organizes records, documents, and administrative routines so the Branch activities stay aligned and easy to follow.',
    },
  },
  {
    id: 'mariana-guimaraes',
    name: 'Mariana Guimarães',
    role: { pt: 'Presidente IAS', en: 'IAS Chair' },
    chapters: ['IAS'],
    bio: {
      pt: 'Lidera iniciativas do capítulo IAS voltadas a aplicações industriais, automação, máquinas elétricas e tecnologia aplicada.',
      en: 'Leads IAS chapter initiatives around industrial applications, automation, electric machines, and applied technology.',
    },
  },
  {
    id: 'matheus-nery',
    name: 'Matheus Nery',
    role: { pt: 'Presidente VTS', en: 'VTS Chair' },
    chapters: ['VTS'],
    bio: {
      pt: 'Lidera iniciativas do capítulo VTS voltadas a mobilidade, sistemas veiculares, transporte inteligente e tecnologias automotivas.',
      en: 'Leads VTS chapter initiatives around mobility, vehicular systems, intelligent transportation, and automotive technologies.',
    },
  },
  {
    id: 'pedro-temponi',
    name: 'Pedro Temponi',
    role: { pt: 'Vice-Presidente', en: 'Vice-Chair' },
    chapters: ['Ramo', 'PES'],
    photoUrl: '/assets/presidents/pedro-temponi.jpg',
    bio: {
      pt: 'Apoia a coordenação executiva do Ramo e acompanha iniciativas de integração entre diretoria, capítulos e membros.',
      en: 'Supports Student Branch coordination and follows initiatives that connect the board, chapters, and members.',
    },
  },
  {
    id: 'thalita',
    name: 'Thalita Mello',
    role: { pt: 'Webmaster', en: 'Webmaster' },
    chapters: ['Ramo'],
    bio: {
      pt: 'Cuida da presença digital do Ramo e apoia a atualização das informações públicas do site.',
      en: 'Maintains the Branch digital presence and supports updates to public website information.',
    },
  },
  {
    id: 'carlos-alexandre',
    name: 'Carlos Alexandre',
    role: { pt: 'Presidente SIGHT', en: 'SIGHT Chair' },
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
    seo: {
      title: 'Ramo Estudantil IEEE UFJF | A casa do IEEE na UFJF',
      description:
        'Conheça o Ramo Estudantil IEEE UFJF, seus capítulos técnicos, grupos de afinidade, diretoria, projetos e canais de contato na Universidade Federal de Juiz de Fora.',
      ogLocale: 'pt_BR',
      ogTitle: 'Ramo Estudantil IEEE UFJF',
      ogDescription:
        'Capítulos técnicos, grupos de afinidade, projetos e iniciativas de engenharia, tecnologia e impacto social na UFJF.',
      imageAlt: 'Logo do Ramo Estudantil IEEE UFJF',
    },
    hero: {
      aria: 'Ramo',
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
      opportunities: 'Oportunidades',
      events: 'Eventos',
      chapters: 'Capítulos',
      board: 'Diretoria',
      projects: 'Projetos',
      members: 'Membros',
      history: 'História',
      location: 'Localização',
      contact: 'Contato',
      enableDark: 'Ativar modo escuro',
      disableDark: 'Desativar modo escuro',
      languageButton: 'EN',
      languageLabel: 'Alterar texto para inglês',
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
      skip: 'Pular para o conteúdo',
    },
    about: {
      eyebrow: 'O IEEE',
      title: 'Advancing Technology for Humanity',
      logoAlt: 'Logo IEEE',
      paragraphs: [
        'O IEEE é uma organização sem fins lucrativos presente em mais de 160 países, com centenas de milhares de membros e atuação global na inovação tecnológica e na excelência profissional em benefício da humanidade.',
        'Na Universidade Federal de Juiz de Fora, o Ramo reúne estudantes e docentes em projetos técnicos, educacionais e sociais, difundindo os benefícios do IEEE para a vida acadêmica e profissional.',
        'Nossas atividades conectam capítulos técnicos, grupos de afinidade, eventos, ações sociais, cursos, competições e parcerias internas e externas para transformar conhecimento em impacto.',
      ],
      highlights: [
        {
          label: 'Missão',
          text: 'Promover conhecimento prático e teórico para transformar estudantes da UFJF em profissionais qualificados por meio de projetos e cursos.',
        },
        {
          label: 'Visão',
          text: 'Ser uma organização estudantil de referência e grande importância para o desenvolvimento acadêmico dentro da UFJF.',
        },
        {
          label: 'Valores',
          text: 'Trabalho em equipe, união, desenvolvimento humano, criatividade, proatividade, inovação e orgulho de ser IEEE.',
        },
      ],
      opportunitiesCta: 'Ver oportunidades do IEEE',
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
    events: {
      eyebrow: 'Eventos e calendário',
      title: 'Atividades abertas do Ramo',
      description:
        'Agenda verificada de eventos, oportunidades e chamadas abertas para estudantes acompanharem ou integrarem atividades do IEEE.',
      calendarLabel: 'Agenda de eventos e chamadas com data, modalidade e inscrição',
      eventAction: 'Ver inscrição',
      dateLabel: 'Data',
      formatLabel: 'Modalidade',
      registrationLabel: 'Inscrição',
      cards: [
        {
          period: '13–15 ago 2026',
          date: '13 a 15 de agosto de 2026',
          format: 'Presencial · CEFET/RJ, Rio de Janeiro',
          registration: 'Inscrições abertas no site do evento',
          title: 'IEEE IES SYP Congress 2026',
          text: 'Congresso internacional para estudantes e jovens profissionais, com workshops, painéis, visitas técnicas e networking em eletrônica industrial.',
          url: 'https://syp-congress.ieee-ies.org/',
        },
        {
          period: 'Até 15 set 2026',
          date: 'Prazo em 15 de setembro de 2026',
          format: 'Online · formulário de candidatura',
          registration: 'Para integrantes de projetos EPICS in IEEE financiados',
          title: 'EPICS in IEEE Travel Grant',
          text: 'Auxílio de até US$ 1.000 para estudantes apresentarem projetos EPICS in IEEE em conferências ou workshops do IEEE.',
          url: 'https://epics.ieee.org/resources/epics-in-ieee-travel-grant-program/',
        },
        {
          period: '2026.2',
          date: 'Inscrições em fluxo contínuo',
          format: 'Online · contato com a diretoria',
          registration: 'Formulário disponível nesta página',
          title: 'Recrutamento e voluntariado',
          text: 'Canal permanente para estudantes interessados em eventos, comunicação, projetos técnicos, ações sociais e gestão do Ramo.',
          url: '#voluntariado',
        },
      ],
      ctas: {
        joinIeee: {
          label: 'Associe-se ao IEEE',
          text: 'Acesse a membresia global do IEEE.',
        },
        joinBranch: {
          label: 'Entrar no IEEE UFJF',
          text: 'Fale com o Ramo para começar.',
        },
        talk: {
          label: 'Fale conosco',
          text: 'Envie dúvidas, propostas ou parcerias.',
        },
        volunteer: {
          label: 'Ser voluntário',
          text: 'Participe da organização das atividades.',
        },
        follow: {
          label: 'Siga nossos eventos',
          text: 'Acompanhe chamadas e registros no Instagram.',
        },
      },
      volunteerForm: {
        eyebrow: 'Recrutamento e voluntariado',
        title: 'Encontre seu espaço no IEEE UFJF',
        description:
          'Conte brevemente seus interesses para que a diretoria encaminhe seu contato ao capítulo ou frente de trabalho mais adequada.',
        nameLabel: 'Nome completo',
        emailLabel: 'E-mail',
        interestLabel: 'Área de interesse',
        interestPlaceholder: 'Selecione uma área',
        interests: [
          'Capítulos técnicos',
          'Projetos e desenvolvimento',
          'Eventos e capacitações',
          'Comunicação e design',
          'Ações sociais e voluntariado',
          'Gestão do Ramo',
        ],
        messageLabel: 'Mensagem',
        messagePlaceholder: 'Conte quais temas, experiências ou atividades despertam seu interesse.',
        consent: 'Autorizo o uso destes dados apenas para retorno sobre participação no IEEE UFJF.',
        submit: 'Preparar contato',
        privacy: 'O contato é preparado para envio direto ao e-mail institucional do Ramo.',
      },
    },
    board: {
      eyebrow: 'Diretoria do Ramo',
      title: 'Nossa diretoria',
      photoAlt: (name) => `Foto de ${name}`,
    },
    projects: {
      eyebrow: 'Projetos',
      title: 'Nossos projetos',
      allProjectsTitle: 'Todos os projetos do Ramo',
      allProjectsIntro:
        'Conheça projetos desenvolvidos pelo Ramo, capítulos técnicos e grupos de afinidade.',
      allProjectsCta: 'Ver todos os projetos do Ramo',
      back: 'Voltar ao site',
      open: (name) => `Abrir projeto ${name}`,
      openDetails: (name) => `Abrir detalhes de ${name}`,
      close: 'Fechar detalhes do projeto',
      previewAlt: (name) => `Preview do projeto ${name}`,
      galleryLabel: 'Fotos do projeto',
      galleryPhotoLabel: (index) => `Foto ${index + 1}`,
    },
    members: {
      eyebrow: 'Membros do Ramo',
      title: 'Quem faz o Ramo acontecer',
      description:
        'Conheça as pessoas que mantêm capítulos, projetos, eventos e rotinas internas em movimento no Ramo.',
      openDetails: (name) => `Abrir detalhes de ${name}`,
      close: 'Fechar detalhes do membro',
      empty: 'Nenhum membro cadastrado no site ainda.',
      photoAlt: (name) => `Foto de ${name}`,
    },

    history: {
      eyebrow: 'História',
      title: 'História do Ramo Estudantil IEEE UFJF',
      homeTitle: 'Conheça nossa história',
      homeTeaser:
        'Fundado em 1991, o Ramo Estudantil IEEE UFJF foi o primeiro ramo estudantil IEEE fundado no estado de Minas Gerais. Nos seus 35 anos de história, o Ramo teve mais de 1500 membros, e tem atualmente 10 capítulos ativos, além de dois grupos de afinidade.',
      homeCta: 'Quer conhecer mais a história do Ramo Estudantil IEEE UFJF? Clique aqui!',
      intro:
        'Esta página está preparada para reunir a memória institucional do Ramo, suas gestões, projetos, conquistas, identidades visuais e registros fotográficos ao longo dos anos.',
      back: 'Voltar ao site',
      timelineTitle: 'Uma trajetória construída por estudantes',
      currentLogoLabel: 'Logo atual do Ramo Estudantil IEEE UFJF',
      paragraphs: [
        'Durante a década de 1980, diversos professores e estudantes da Universidade Federal de Juiz de Fora se reuniam para tentar trazer o material da revista IEEE Spectrum para a Universidade.',
        'Foi nesse contexto que, em 1991, professores e estudantes de pós graduação em Engenharia Elétrica se uniram para fundar o Ramo Estudantil IEEE UFJF, o primeiro do estado de Minas Gerais. Ao longo de 35 anos, o Ramo Estudantil IEEE UFJF teve mais de 1500 membros, e atualmente conta com 10 capítulos ativos, além de dois grupos de afinidade.',
        'O Ramo Estudantil IEEE UFJF é um espaço de aprendizado, desenvolvimento e integração entre estudantes, professores e profissionais da área de engenharia elétrica, computação e tecnologia. Ao longo dos anos, o Ramo tem promovido diversos projetos, eventos e atividades que contribuem para a formação acadêmica e profissional dos seus membros.',
      ],
      logosTitle: 'Logos do Ramo',
      logosDescription:
        'Com 35 anos de história, o Ramo Estudantil IEEE UFJF teve diferentes logos e identidades visuais.',
      photosTitle: 'Fotos históricas',
      photosLoading: 'Carregando fotos históricas',
      photosEmpty: 'Nenhuma foto histórica publicada ainda.',
      photosDescription:
        '',
    },

    opportunities: {
      eyebrow: 'Oportunidades',
      title: 'Oportunidades do IEEE',
      intro:
        'Conheça caminhos para aproveitar melhor a rede global do IEEE: bolsas, premiações, competições, publicações, eventos, programas de voluntariado e desenvolvimento de liderança.',
      back: 'Voltar ao site',
      externalCta: 'Acessar portal IEEE Students',
      live: {
        eyebrow: 'Atualização automática',
        title: 'Oportunidades em destaque',
        fundingTitle: 'Bolsas, auxílios e premiações',
        fundingDescription:
          'Oportunidades publicadas pelo IEEE Students, atualizadas diretamente da fonte oficial.',
        eventsTitle: 'Próximos eventos da IEEE Região 9',
        eventsDescription:
          'Atividades futuras na América Latina e no Caribe com data, modalidade e acesso à inscrição.',
        resourcesTitle: 'Catálogos e recursos permanentes',
        resourcesDescription:
          'Atalhos oficiais para explorar outras oportunidades em toda a rede IEEE.',
        loading: 'Consultando as fontes oficiais do IEEE...',
        empty: 'Nenhuma oportunidade foi encontrada nas fontes oficiais neste momento.',
        unavailable:
          'A atualização automática está temporariamente indisponível. Os catálogos oficiais continuam acessíveis abaixo.',
        partial:
          'Uma das fontes oficiais está temporariamente indisponível; os demais resultados seguem atualizados.',
        updatedLabel: 'Atualizado em',
        sourceLabel: 'Fontes oficiais: IEEE Students e IEEE Região 9',
        openFunding: 'Ver oportunidade',
        openEvent: 'Ver evento e inscrição',
        dateLabel: 'Data',
        formatLabel: 'Modalidade',
        locationLabel: 'Local',
        categories: {
          award: 'Premiação',
          fellowship: 'Bolsa',
          funding: 'Financiamento',
          grant: 'Auxílio',
          scholarship: 'Bolsa de estudos',
          travelGrant: 'Auxílio de viagem',
        },
        formats: {
          hybrid: 'Híbrido',
          inPerson: 'Presencial',
          virtual: 'Online',
        },
      },
      cards: [
        {
          title: 'Bolsas e premiações',
          text: 'Programas que reconhecem estudantes, projetos, pesquisa, liderança e trajetórias de destaque dentro da comunidade IEEE.',
          url: 'https://students.ieee.org/membership-benefits/ieee-benefits/funds-and-awards/',
        },
        {
          title: 'Auxílios de viagem e financiamento',
          text: 'Catálogo de Travel Grants, bolsas e fundos para apoiar participação estudantil em conferências, projetos e atividades IEEE.',
          url: 'https://students.ieee.org/student-opportunities/',
        },
        {
          title: 'Competições e desafios',
          text: 'Desafios técnicos e atividades estudantis para transformar conhecimento em soluções reais, protótipos e experiências práticas.',
          url: 'https://students.ieee.org/student-opportunities/contests-for-students/',
        },
        {
          title: 'Eventos e conferências',
          text: 'Oportunidades para participar de eventos regionais e internacionais, apresentar trabalhos e se conectar com profissionais da área.',
          url: 'https://www.ieee.org/conferences/',
        },
        {
          title: 'Voluntariado e liderança',
          text: 'Espaços para desenvolver gestão, comunicação, organização de eventos e impacto social em uma comunidade global.',
          url: 'https://students.ieee.org/volunteer/',
        },
        {
          title: 'Publicações e pesquisa',
          text: 'Acesso a ecossistemas de publicação, pesquisa e conhecimento técnico para apoiar a formação acadêmica e profissional.',
          url: 'https://www.ieee.org/publications/',
        },
        {
          title: 'Benefícios para membros',
          text: 'Recursos de carreira, comunidades técnicas, descontos, redes profissionais e benefícios associados à membresia IEEE.',
          url: 'https://www.ieee.org/membership/benefits/',
        },
      ],
    },

    contact: {
      eyebrow: 'Contato',
      title: 'Fale com o Ramo',
      description:
        'É importante que o Ramo esteja em contato com a comunidade, seja para novos projetos, parcerias, oportunidades, dúvidas ou sugestões sobre o IEEE e nossas atividades.',
      locationLabel: 'Nossa localização',
      location: 'Segundo andar da Faculdade de Engenharia da Universidade Federal de Juiz de Fora.',
      visit:
        'Para marcar uma visita ou conversar sobre uma parceria, entre em contato conosco por e-mail, redes sociais ou diretamente com os capítulos e grupos de afinidade.',
      emailLabel: 'E-mail',
      emails: ['ramo.ieeeufjf@gmail.com'],
      suggestionLabel: 'Sugestões',
      suggestionText: 'Tem alguma sugestão sobre o site? Entre em contato conosco',
      suggestionEmails: ['rafael.nick@computer.org', 'thalita.mello@estudante.ufjf.br'],
      socialLabel: 'Redes sociais',
      mapLabel: 'Mapa do Ramo',
      mapTitle: 'Mapa do Ramo',
    },
  },
  en: {
    lang: 'en',
    seo: {
      title: 'Ramo Estudantil IEEE UFJF | IEEE at UFJF',
      description:
        'Meet Ramo Estudantil IEEE UFJF, its technical chapters, affinity groups, board, projects, and contact channels at the Federal University of Juiz de Fora.',
      ogLocale: 'en_US',
      ogTitle: 'Ramo Estudantil IEEE UFJF',
      ogDescription:
        'Technical chapters, affinity groups, projects, and engineering, technology, and social impact initiatives at UFJF.',
      imageAlt: 'Ramo Estudantil IEEE UFJF logo',
    },
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
      opportunities: 'Opportunities',
      events: 'Events',
      chapters: 'Chapters',
      board: 'Board',
      projects: 'Projects',
      members: 'Members',
      history: 'History',
      location: 'Location',
      contact: 'Contact',
      enableDark: 'Enable dark mode',
      disableDark: 'Disable dark mode',
      languageButton: 'PT',
      languageLabel: 'Change text to Portuguese',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      skip: 'Skip to content',
    },
    about: {
      eyebrow: 'IEEE',
      title: 'Advancing Technology for Humanity',
      logoAlt: 'IEEE logo',
      paragraphs: [
        'IEEE is a nonprofit organization present in more than 160 countries, with hundreds of thousands of members and global work in technological innovation and professional excellence for the benefit of humanity.',
        'At the Federal University of Juiz de Fora, the IEEE Student Branch brings together students and faculty in technical, educational, and social projects, spreading the benefits of IEEE throughout academic and professional life.',
        'Our activities connect technical chapters, affinity groups, events, social actions, courses, competitions, and internal and external partnerships to turn knowledge into impact.',
      ],
      highlights: [
        {
          label: 'Mission',
          text: 'Promote practical and theoretical knowledge to help UFJF students become qualified professionals through projects and courses.',
        },
        {
          label: 'Vision',
          text: 'Be a reference student organization with strong importance for academic development within UFJF.',
        },
        {
          label: 'Values',
          text: 'Teamwork, unity, human development, creativity, proactivity, innovation, and pride in being IEEE.',
        },
      ],
      opportunitiesCta: 'View IEEE opportunities',
    },
    chapters: {
      eyebrow: 'Chapters and Affinity Groups',
      title: 'Our chapters',
      detailsId: 'chapter-detail-title',
      openDetails: (name) => `Open details for ${name}`,
      close: 'Close chapter details',
      linksLabel: 'Chapter links',
      comingSoon: 'coming soon',
      presidentFallback: 'Chair',
      logoAlt: (name) => `${name} logo`,
      photoAlt: (name) => `Photo of ${name}`,
    },
    events: {
      eyebrow: 'Events and calendar',
      title: 'Open Student Branch activities',
      description:
        'A verified schedule of events, opportunities, and open calls for students to follow or join IEEE activities.',
      calendarLabel: 'Event and call schedule with date, format, and registration',
      eventAction: 'View registration',
      dateLabel: 'Date',
      formatLabel: 'Format',
      registrationLabel: 'Registration',
      cards: [
        {
          period: '13–15 Aug 2026',
          date: 'August 13–15, 2026',
          format: 'In person · CEFET/RJ, Rio de Janeiro',
          registration: 'Registration open on the event website',
          title: 'IEEE IES SYP Congress 2026',
          text: 'An international congress for students and young professionals featuring workshops, panels, technical visits, and industrial electronics networking.',
          url: 'https://syp-congress.ieee-ies.org/',
        },
        {
          period: 'By 15 Sep 2026',
          date: 'Deadline: September 15, 2026',
          format: 'Online · application form',
          registration: 'For participants in funded EPICS in IEEE projects',
          title: 'EPICS in IEEE Travel Grant',
          text: 'Up to US$1,000 in support for students presenting EPICS in IEEE projects at IEEE conferences or workshops.',
          url: 'https://epics.ieee.org/resources/epics-in-ieee-travel-grant-program/',
        },
        {
          period: '2026.2',
          date: 'Rolling applications',
          format: 'Online · direct contact with the board',
          registration: 'Form available on this page',
          title: 'Recruitment and volunteering',
          text: 'An ongoing channel for students interested in events, communication, technical projects, social initiatives, and Branch management.',
          url: '#voluntariado',
        },
      ],
      ctas: {
        joinIeee: {
          label: 'Join IEEE',
          text: 'Access IEEE global membership.',
        },
        joinBranch: {
          label: 'Join IEEE UFJF',
          text: 'Talk to the Student Branch to get started.',
        },
        talk: {
          label: 'Talk to us',
          text: 'Send questions, proposals, or partnerships.',
        },
        volunteer: {
          label: 'Become a volunteer',
          text: 'Help organize activities and initiatives.',
        },
        follow: {
          label: 'Follow our events',
          text: 'Track calls and highlights on Instagram.',
        },
      },
      volunteerForm: {
        eyebrow: 'Recruitment and volunteering',
        title: 'Find your place at IEEE UFJF',
        description:
          'Tell us briefly about your interests so the board can direct your contact to the most relevant chapter or workstream.',
        nameLabel: 'Full name',
        emailLabel: 'Email',
        interestLabel: 'Area of interest',
        interestPlaceholder: 'Select an area',
        interests: [
          'Technical chapters',
          'Projects and development',
          'Events and training',
          'Communication and design',
          'Social initiatives and volunteering',
          'Student Branch management',
        ],
        messageLabel: 'Message',
        messagePlaceholder: 'Share the topics, experiences, or activities that interest you.',
        consent: 'I authorize these details to be used only for a reply about joining IEEE UFJF.',
        submit: 'Prepare contact',
        privacy: 'The contact is prepared for direct delivery to the Student Branch institutional email.',
      },
    },
    board: {
      eyebrow: 'Student Branch Board',
      title: 'Our board',
      photoAlt: (name) => `Photo of ${name}`,
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Our projects',
      allProjectsTitle: 'All Branch projects',
      allProjectsIntro:
        'Explore projects developed by the Branch, technical chapters, and affinity groups.',
      allProjectsCta: 'See all Branch projects',
      back: 'Back to site',
      open: (name) => `Open ${name} project`,
      openDetails: (name) => `Open details for ${name}`,
      close: 'Close project details',
      previewAlt: (name) => `${name} project preview`,
      galleryLabel: 'Project photos',
      galleryPhotoLabel: (index) => `Photo ${index + 1}`,
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

    history: {
      eyebrow: 'History',
      title: 'History of IEEE UFJF Student Branch',
      homeTitle: 'Discover our history',
      homeTeaser:
        'Founded in 1991, IEEE UFJF Student Branch was the first IEEE student branch founded in the state of Minas Gerais. Across its 35 years of history, the Branch has had more than 1,500 members and currently has 10 active chapters, as well as two affinity groups.',
      homeCta: 'Want to learn more about the history of IEEE UFJF Student Branch? Click here!',
      intro:
        'This page is prepared to bring together the Branch institutional memory, its boards, projects, achievements, visual identities, and photographic records over the years.',
      back: 'Back to site',
      timelineTitle: 'A journey built by students',
      currentLogoLabel: 'Current IEEE UFJF Student Branch logo',
      paragraphs: [
        'During the 1980s, several professors and students from the Federal University of Juiz de Fora met to try to bring IEEE Spectrum magazine materials to the University.',
        'In this context, in 1991, professors and graduate students in Electrical Engineering came together to found IEEE UFJF Student Branch, the first one in the state of Minas Gerais. Over 35 years, IEEE UFJF Student Branch has had more than 1,500 members and currently has 10 active chapters, as well as two affinity groups.',
        'IEEE UFJF Student Branch is a space for learning, development, and integration among students, professors, and professionals in electrical engineering, computing, and technology. Over the years, the Branch has promoted several projects, events, and activities that contribute to the academic and professional development of its members.',
      ],
      logosTitle: 'Branch logos',
      logosDescription:
        'Across 35 years of history, IEEE UFJF Student Branch has had different logos and visual identities.',
      photosTitle: 'Historical photos',
      photosLoading: 'Loading historical photos',
      photosEmpty: 'No historical photos published yet.',
      photosDescription: '',
    },

    opportunities: {
      eyebrow: 'Opportunities',
      title: 'IEEE opportunities',
      intro:
        'Discover ways to make the most of the IEEE global network: scholarships, awards, competitions, publications, events, volunteering programs, and leadership development.',
      back: 'Back to site',
      externalCta: 'Open IEEE Students portal',
      live: {
        eyebrow: 'Automatically updated',
        title: 'Featured opportunities',
        fundingTitle: 'Grants, scholarships, and awards',
        fundingDescription:
          'Opportunities published by IEEE Students and updated directly from the official source.',
        eventsTitle: 'Upcoming IEEE Region 9 events',
        eventsDescription:
          'Upcoming activities across Latin America and the Caribbean with dates, formats, and registration access.',
        resourcesTitle: 'Permanent catalogs and resources',
        resourcesDescription:
          'Official shortcuts for exploring more opportunities across the IEEE network.',
        loading: 'Checking official IEEE sources...',
        empty: 'No opportunities are currently listed by the official sources.',
        unavailable:
          'Automatic updates are temporarily unavailable. The official catalogs remain accessible below.',
        partial:
          'One official source is temporarily unavailable; the remaining results are still up to date.',
        updatedLabel: 'Updated',
        sourceLabel: 'Official sources: IEEE Students and IEEE Region 9',
        openFunding: 'View opportunity',
        openEvent: 'View event and registration',
        dateLabel: 'Date',
        formatLabel: 'Format',
        locationLabel: 'Location',
        categories: {
          award: 'Award',
          fellowship: 'Fellowship',
          funding: 'Funding',
          grant: 'Grant',
          scholarship: 'Scholarship',
          travelGrant: 'Travel grant',
        },
        formats: {
          hybrid: 'Hybrid',
          inPerson: 'In person',
          virtual: 'Online',
        },
      },
      cards: [
        {
          title: 'Scholarships and awards',
          text: 'Programs that recognize students, projects, research, leadership, and outstanding paths within the IEEE community.',
          url: 'https://students.ieee.org/membership-benefits/ieee-benefits/funds-and-awards/',
        },
        {
          title: 'Travel Grants and Funding',
          text: 'A catalog of travel grants, scholarships, and funds supporting student participation in IEEE conferences, projects, and activities.',
          url: 'https://students.ieee.org/student-opportunities/',
        },
        {
          title: 'Competitions and challenges',
          text: 'Technical challenges and student activities that turn knowledge into real solutions, prototypes, and hands-on experience.',
          url: 'https://students.ieee.org/student-opportunities/contests-for-students/',
        },
        {
          title: 'Events and conferences',
          text: 'Opportunities to attend regional and international events, present work, and connect with professionals in the field.',
          url: 'https://www.ieee.org/conferences/',
        },
        {
          title: 'Volunteering and leadership',
          text: 'Spaces to develop management, communication, event organization, and social impact skills in a global community.',
          url: 'https://students.ieee.org/volunteer/',
        },
        {
          title: 'Publications and research',
          text: 'Access to publication, research, and technical knowledge ecosystems that support academic and professional growth.',
          url: 'https://www.ieee.org/publications/',
        },
        {
          title: 'Member benefits',
          text: 'Career resources, technical communities, discounts, professional networks, and benefits connected to IEEE membership.',
          url: 'https://www.ieee.org/membership/benefits/',
        },
      ],
    },

    contact: {
      eyebrow: 'Contact',
      title: 'Talk to the Branch',
      description:
        'The IEEE UFJF Student Branch values close contact with the community, whether for new projects, partnerships, opportunities, questions, or suggestions about IEEE and our activities.',
      locationLabel: 'Our location',
      location: 'Second floor of the School of Engineering at the Federal University of Juiz de Fora.',
      visit:
        'To schedule a visit or discuss a partnership, contact us by e-mail, social media, or directly through our chapters and affinity groups.',
      emailLabel: 'E-mail',
      emails: ['ramo.ieeeufjf@gmail.com'],
      suggestionLabel: 'Suggestions',
      suggestionText: 'Do you have a suggestion about the website? Contact us',
      suggestionEmails: ['rafael.nick@computer.org', 'thalita.mello@estudante.ufjf.br'],
      socialLabel: 'Social media',
      mapLabel: 'Map of the IEEE UFJF Student Branch',
      mapTitle: 'Map of the IEEE UFJF Student Branch',
    },
  },
};

const mapsEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4558.946106024073!2d-43.37522762383733!3d-21.778392998521973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x989ba3d97601f7%3A0xcf9f2fb389a7f742!2sRamo%20Estudantil%20IEEE%20UFJF!5e1!3m2!1sen!2sbr!4v1779591238371!5m2!1sen!2sbr';

const ieeeJoinUrl = 'https://www.ieee.org/membership/join/';
const branchJoinMailto = 'mailto:ramo.ieeeufjf@gmail.com?subject=Quero%20participar%20do%20IEEE%20UFJF';
const branchVolunteerMailto = 'mailto:ramo.ieeeufjf@gmail.com?subject=Quero%20ser%20voluntario%20do%20IEEE%20UFJF';
const branchContactMailto = 'mailto:ramo.ieeeufjf@gmail.com';
const branchInstagramUrl = 'https://www.instagram.com/ieeeufjf/';

function setMetaContent(selector, content) {
  const meta = document.querySelector(selector);
  if (meta && content) {
    meta.setAttribute('content', content);
  }
}

function setLinkHref(selector, href) {
  const link = document.querySelector(selector);
  if (link && href) {
    link.setAttribute('href', href);
  }
}

function stripLanguagePrefix(pathname) {
  if (pathname === '/en') {
    return '/';
  }

  return pathname.startsWith('/en/') ? pathname.slice(3) || '/' : pathname;
}

function localizedPath(language, path = '/') {
  if (language !== 'en') {
    return path;
  }

  return path === '/' ? '/en' : `/en${path}`;
}

function localizedHash(language, hash) {
  return language === 'en' ? `/en${hash}` : hash;
}

function alternateLanguagePath(currentPath, nextLanguage) {
  const cleanPath = stripLanguagePrefix(currentPath);
  return localizedPath(nextLanguage, cleanPath);
}

function absoluteSiteUrl(path = '/') {
  return `https://ieeeufjf.com.br${path === '/' ? '/' : path}`;
}

function runAfterFirstPaint(callback) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  let idleId = null;
  let timeoutId = null;
  let cancelled = false;

  const run = () => {
    if (cancelled) {
      return;
    }

    callback();
  };

  timeoutId = window.setTimeout(() => {
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(run, { timeout: 1800 });
    } else {
      run();
    }
  }, 350);

  return () => {
    cancelled = true;
    window.clearTimeout(timeoutId);
    if (idleId && 'cancelIdleCallback' in window) {
      window.cancelIdleCallback(idleId);
    }
  };
}

async function fetchJsonWithTimeout(endpoint, options = {}) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), options.timeoutMs || 4500);
  const requestEndpoint = options.cacheBuster === false
    ? endpoint
    : addRequestCacheBuster(endpoint);

  try {
    const response = await fetch(requestEndpoint, {
      cache: options.cache || 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error('api-unavailable');
    }

    return response.json();
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function addRequestCacheBuster(endpoint) {
  try {
    const url = new URL(endpoint, window.location.origin);
    url.searchParams.set('_siteRefresh', String(Date.now()));

    return url.origin === window.location.origin
      ? `${url.pathname}${url.search}${url.hash}`
      : url.toString();
  } catch {
    return endpoint;
  }
}

function projectImageAlt(project, language, slideIndex = null) {
  const name = getProjectName(project, language);
  const subtitle = getLocalizedText(project?.description, language, getProjectSubtitle(project, language));
  const suffix = subtitle ? `: ${subtitle}` : '';
  const prefix = Number.isInteger(slideIndex)
    ? language === 'en' ? `Photo ${slideIndex + 1} from project` : `Foto ${slideIndex + 1} do projeto`
    : language === 'en' ? 'Project image' : 'Imagem do projeto';

  return `${prefix} ${name}${suffix}`.trim();
}

function App() {
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectSlideIndex, setSelectedProjectSlideIndex] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState('o-ieee');
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window === 'undefined') {
      return '/';
    }

    return window.location.pathname;
  });
  const [publishedMembers, setPublishedMembers] = useState([]);
  const [publishedProjects, setPublishedProjects] = useState(projects);
  const [publishedHistoryPhotos, setPublishedHistoryPhotos] = useState([]);
  const [isHistoryPhotosLoading, setIsHistoryPhotosLoading] = useState(true);
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') {
      return 'pt';
    }

    if (window.location.pathname === '/en' || window.location.pathname.startsWith('/en/')) {
      return 'en';
    }

    return 'pt';
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem('theme') === 'dark';
  });
  const chapterDetailRef = useRef(null);
  const memberDetailRef = useRef(null);
  const projectDetailRef = useRef(null);
  const selectedChapter = useMemo(
    () => chapters.find((chapter) => chapter.id === selectedChapterId),
    [selectedChapterId],
  );
  const selectedMember = useMemo(
    () => publishedMembers.find((member) => member.id === selectedMemberId),
    [publishedMembers, selectedMemberId],
  );
  const selectedProject = useMemo(
    () => publishedProjects.find((project) => project.id === selectedProjectId),
    [publishedProjects, selectedProjectId],
  );
  const homepageProjects = useMemo(
    () => publishedProjects.filter((project) => project.showOnHome !== false),
    [publishedProjects],
  );
  const selectedChapterPresidentMember = useMemo(
    () => findPublishedMemberByName(publishedMembers, selectedChapter?.president?.nome),
    [publishedMembers, selectedChapter],
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
          bio: publishedMember?.bio || boardMember.bio,
          member: publishedMember,
          photo: publishedMember?.photoUrl || boardMember.photo,
        };
      }),
    [publishedMembers],
  );
  const t = copy[language];
  const contentPath = stripLanguagePrefix(currentPath);
  const nextLanguage = language === 'pt' ? 'en' : 'pt';
  const selectedProjectPreviewSrc = selectedProject
    ? getProjectPreviewSrc(selectedProject, isDarkMode)
    : '';
  const selectedMemberBio = selectedMember ? getLocalizedText(selectedMember.bio, language, '') : '';
  const selectedProjectGallery = useMemo(
    () =>
      selectedProject
        ? getUniqueUrls([...(selectedProject.galleryImages || []), selectedProjectPreviewSrc])
        : [],
    [selectedProject, selectedProjectPreviewSrc],
  );
  const selectedProjectSlide =
    selectedProjectGallery[selectedProjectSlideIndex] || selectedProjectPreviewSrc;

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
    if (!selectedProject || !projectDetailRef.current) {
      return undefined;
    }

    const focusTimer = window.setTimeout(() => {
      projectDetailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      projectDetailRef.current?.focus({ preventScroll: true });
    }, 80);

    return () => window.clearTimeout(focusTimer);
  }, [selectedProject]);

  useEffect(() => {
    setSelectedProjectSlideIndex(0);
  }, [selectedProjectId]);

  useEffect(() => {
    if (selectedProjectGallery.length <= 1) {
      return undefined;
    }

    const slideTimer = window.setInterval(() => {
      setSelectedProjectSlideIndex((currentIndex) => (currentIndex + 1) % selectedProjectGallery.length);
    }, 4500);

    return () => window.clearInterval(slideTimer);
  }, [selectedProjectGallery.length]);

  useEffect(() => {
    if (selectedMemberId && !selectedMember) {
      setSelectedMemberId(null);
    }
  }, [selectedMember, selectedMemberId]);

  useEffect(() => {
    if (selectedProjectId && !selectedProject) {
      setSelectedProjectId(null);
    }
  }, [selectedProject, selectedProjectId]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key !== 'Escape') {
        return;
      }

      setSelectedChapterId(null);
      setSelectedMemberId(null);
      setSelectedProjectId(null);
      setIsNavOpen(false);
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    const routeLanguage = currentPath === '/en' || currentPath.startsWith('/en/') ? 'en' : 'pt';
    setLanguage((currentLanguage) => (
      currentLanguage === routeLanguage ? currentLanguage : routeLanguage
    ));
  }, [currentPath]);

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light';
    window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const canonicalPath = localizedPath(language, stripLanguagePrefix(window.location.pathname));
    const canonicalUrl = absoluteSiteUrl(canonicalPath);
    document.documentElement.lang = t.lang;
    window.localStorage.setItem('language', language);
    document.title = t.seo.title;
    setLinkHref('link[rel="canonical"]', canonicalUrl);
    setMetaContent('meta[name="description"]', t.seo.description);
    setMetaContent('meta[property="og:locale"]', t.seo.ogLocale);
    setMetaContent('meta[property="og:title"]', t.seo.ogTitle);
    setMetaContent('meta[property="og:description"]', t.seo.ogDescription);
    setMetaContent('meta[property="og:url"]', canonicalUrl);
    setMetaContent('meta[property="og:image:alt"]', t.seo.imageAlt);
    setMetaContent('meta[name="twitter:title"]', t.seo.ogTitle);
    setMetaContent('meta[name="twitter:description"]', t.seo.description);
  }, [language, t.lang, t.seo]);

  useEffect(() => {
    const handlePathChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePathChange);

    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  useEffect(() => {
    if (contentPath !== '/') {
      return undefined;
    }

    let frameId = null;

    function updateActiveSection() {
      frameId = null;
      const viewportLine = window.innerHeight * 0.38;
      let nextSectionId = HOME_SECTION_IDS[0];

      HOME_SECTION_IDS.forEach((sectionId) => {
        const section = document.querySelector(`[data-section-id="${sectionId}"]`);
        if (!section) {
          return;
        }

        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportLine && rect.bottom > viewportLine * 0.45) {
          nextSectionId = sectionId;
        }
      });

      setActiveSectionId((currentSectionId) =>
        currentSectionId === nextSectionId ? currentSectionId : nextSectionId,
      );
    }

    function requestUpdate() {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [contentPath]);

  useEffect(() => {
    let active = true;

    async function loadMembers() {
      try {
        let remoteMembers = [];

        for (const endpoint of ATAS_MEMBERS_API_URLS) {
          try {
            const payload = await fetchJsonWithTimeout(endpoint);
            const refreshVersion = Date.now();
            remoteMembers = Array.isArray(payload.members)
              ? payload.members.map((member) => normalizeRemoteMember(member, refreshVersion)).filter(Boolean)
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

    const cancelLoad = runAfterFirstPaint(loadMembers);
    return () => {
      active = false;
      cancelLoad();
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function loadHistoryPhotos() {
      let remotePhotos = [];

      for (const endpoint of ATAS_HISTORY_PHOTOS_API_URLS) {
        try {
          const payload = await fetchJsonWithTimeout(endpoint);
          const refreshVersion = Date.now();
          remotePhotos = Array.isArray(payload.photos)
            ? payload.photos.map((photo) => normalizeRemoteHistoryPhoto(photo, refreshVersion)).filter(Boolean)
            : [];
          break;
        } catch {
          remotePhotos = [];
        }
      }

      if (active && remotePhotos.length) {
        setPublishedHistoryPhotos(sortHistoryPhotos(remotePhotos));
      }

      if (active) {
        setIsHistoryPhotosLoading(false);
      }
    }

    const cancelLoad = runAfterFirstPaint(loadHistoryPhotos);
    return () => {
      active = false;
      cancelLoad();
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function loadProjects() {
      let remoteProjects = [];

      for (const endpoint of ATAS_PROJECTS_API_URLS) {
        try {
          const payload = await fetchJsonWithTimeout(endpoint);
          const refreshVersion = Date.now();
          remoteProjects = Array.isArray(payload.projects)
            ? payload.projects.map((project) => normalizeRemoteProject(project, refreshVersion)).filter(Boolean)
            : [];
          break;
        } catch {
          remoteProjects = [];
        }
      }

      if (active) {
        setPublishedProjects(mergePublishedProjects(projects, remoteProjects));
      }
    }

    const cancelLoad = runAfterFirstPaint(loadProjects);
    return () => {
      active = false;
      cancelLoad();
    };
  }, []);

  const chapterPageMatch = contentPath.match(/^\/capitulos\/([^/]+)\/?$/);
  const chapterPageId = chapterPageMatch?.[1];
  const chapterPage = chapterPageId ? chapterPages[chapterPageId] : null;
  const chapterForPage = chapterPageId
    ? chapters.find((chapter) => chapter.id === chapterPageId)
    : null;

  if (contentPath === '/historia' || contentPath === '/historia/') {
    return (
      <HistoryPage
        isDarkMode={isDarkMode}
        language={language}
        setIsDarkMode={setIsDarkMode}
        setLanguage={setLanguage}
        historyPhotos={publishedHistoryPhotos}
        isHistoryPhotosLoading={isHistoryPhotosLoading}
        t={t}
      />
    );
  }

  if (contentPath === '/oportunidades' || contentPath === '/oportunidades/') {
    return (
      <OpportunitiesPage
        isDarkMode={isDarkMode}
        language={language}
        setIsDarkMode={setIsDarkMode}
        setLanguage={setLanguage}
        t={t}
      />
    );
  }

  if (contentPath === '/projetos' || contentPath === '/projetos/') {
    return (
      <ProjectsPage
        isDarkMode={isDarkMode}
        language={language}
        publishedProjects={publishedProjects}
        setIsDarkMode={setIsDarkMode}
        setLanguage={setLanguage}
        t={t}
      />
    );
  }

  if (chapterPageMatch) {
    return (
      <ChapterPage
        chapter={chapterForPage}
        chapterPage={chapterPage}
        isDarkMode={isDarkMode}
        language={language}
        publishedProjects={publishedProjects}
        setIsDarkMode={setIsDarkMode}
        setLanguage={setLanguage}
        t={t}
      />
    );
  }

  return (
    <>
      <a className="skip-link" href={localizedHash(language, '#conteudo-principal')}>
        {t.nav.skip}
      </a>
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
          <a className="hero__scroll" href={localizedHash(language, '#navegacao')} aria-label={t.hero.scroll}>
            <ArrowDown aria-hidden="true" size={22} />
          </a>
        </div>
      </section>

      <div className="nav-anchor" id="navegacao" aria-hidden="true" />
      <nav className={`mini-nav ${isNavOpen ? 'mini-nav--open' : ''}`} aria-label={t.nav.aria}>
        <a className="mini-nav__brand" href={localizedHash(language, '#topo')} aria-label={t.nav.top}>
          <span className="mini-nav__mark" aria-hidden="true" />
          <span className="mini-nav__brand-text">
            <strong>{t.hero.universityDesktop}</strong>
            <span>{t.hero.branch}</span>
          </span>
        </a>
        <div className="mini-nav__menu">
          <div className="mini-nav__actions">
            <button
              className="mini-nav__language"
              type="button"
              onClick={() => {
                setLanguage(nextLanguage);
                setIsNavOpen(false);
                window.history.pushState({}, '', alternateLanguagePath(currentPath, nextLanguage));
                setCurrentPath(window.location.pathname);
              }}
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
            <button
              className="mini-nav__toggle"
              type="button"
              onClick={() => setIsNavOpen((current) => !current)}
              aria-label={isNavOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={isNavOpen}
              aria-haspopup="true"
              aria-controls="site-navigation-links"
            >
              {isNavOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
            </button>
          </div>
        </div>
        <div className="mini-nav__links" id="site-navigation-links" aria-label={t.nav.aria}>
          <a
            className={activeSectionId === 'o-ieee' ? 'mini-nav__link--active' : undefined}
            href={localizedHash(language, '#o-ieee')}
            onClick={() => setIsNavOpen(false)}
            aria-current={activeSectionId === 'o-ieee' ? 'location' : undefined}
          >
            {t.nav.about}
          </a>
          <a
            className={activeSectionId === 'historia' ? 'mini-nav__link--active' : undefined}
            href={localizedHash(language, '#historia')}
            onClick={() => setIsNavOpen(false)}
            aria-current={activeSectionId === 'historia' ? 'location' : undefined}
          >
            {t.nav.history}
          </a>
          <a
            className={activeSectionId === 'eventos' ? 'mini-nav__link--active' : undefined}
            href={localizedHash(language, '#eventos')}
            onClick={() => setIsNavOpen(false)}
            aria-current={activeSectionId === 'eventos' ? 'location' : undefined}
          >
            {t.nav.events}
          </a>
          <a
            className={activeSectionId === 'capitulos' ? 'mini-nav__link--active' : undefined}
            href={localizedHash(language, '#capitulos')}
            onClick={() => setIsNavOpen(false)}
            aria-current={activeSectionId === 'capitulos' ? 'location' : undefined}
          >
            {t.nav.chapters}
          </a>
          <a
            className={activeSectionId === 'diretoria' ? 'mini-nav__link--active' : undefined}
            href={localizedHash(language, '#diretoria')}
            onClick={() => setIsNavOpen(false)}
            aria-current={activeSectionId === 'diretoria' ? 'location' : undefined}
          >
            {t.nav.board}
          </a>
          <a
            className={activeSectionId === 'projetos' ? 'mini-nav__link--active' : undefined}
            href={localizedHash(language, '#projetos')}
            onClick={() => setIsNavOpen(false)}
            aria-current={activeSectionId === 'projetos' ? 'location' : undefined}
          >
            {t.nav.projects}
          </a>
          <a
            className={activeSectionId === 'membros' ? 'mini-nav__link--active' : undefined}
            href={localizedHash(language, '#membros')}
            onClick={() => setIsNavOpen(false)}
            aria-current={activeSectionId === 'membros' ? 'location' : undefined}
          >
            {t.nav.members}
          </a>
          <a
            className={activeSectionId === 'contato' ? 'mini-nav__link--active' : undefined}
            href={localizedHash(language, '#contato')}
            onClick={() => setIsNavOpen(false)}
            aria-current={activeSectionId === 'contato' ? 'location' : undefined}
          >
            {t.nav.contact}
          </a>
          <a
            className={activeSectionId === 'localizacao' ? 'mini-nav__link--active' : undefined}
            href={localizedHash(language, '#localizacao')}
            onClick={() => setIsNavOpen(false)}
            aria-current={activeSectionId === 'localizacao' ? 'location' : undefined}
          >
            {t.nav.location}
          </a>
        </div>
      </nav>

      <section
        className="about-ieee"
        id="conteudo-principal"
        data-section-id="o-ieee"
        aria-labelledby="o-ieee-title"
      >
        <span id="o-ieee" className="section-anchor" aria-hidden="true" />
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
            <a className="section-action-link section-action-link--inline" href={localizedPath(language, '/oportunidades')}>
              {t.about.opportunitiesCta}
            </a>
          </div>
          <div className="about-ieee__highlights" role="list" aria-label={t.about.eyebrow}>
            {t.about.highlights.map((highlight) => (
              <article className="about-ieee__highlight" role="listitem" key={highlight.label}>
                <span>{highlight.label}</span>
                <strong>{highlight.text}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="history-teaser"
        id="historia"
        data-section-id="historia"
        aria-labelledby="historia-home-title"
      >
        <div className="history-teaser__inner">
          <div>
            <span className="section-kicker">{t.history.eyebrow}</span>
            <h2 id="historia-home-title">{t.history.homeTitle}</h2>
            <p>{t.history.homeTeaser}</p>
            <a className="history-teaser__link" href={localizedPath(language, '/historia')}>
              {t.history.homeCta}
            </a>
          </div>
          <aside className="history-teaser__logos" aria-label={t.history.logosTitle}>
            <div className="history-carousel history-carousel--home-logos">
              <div className="history-carousel__track">
                {[...historyLogoSlides, ...historyLogoSlides].map((slide, index) => {
                  const isDuplicate = index >= historyLogoSlides.length;

                  return (
                    <figure
                      className="history-carousel__slide"
                      key={`home-${slide.src}-${index}`}
                      aria-hidden={isDuplicate ? 'true' : undefined}
                    >
                      <img
                        src={slide.src}
                        alt={isDuplicate ? '' : slide.alt[language]}
                        loading="lazy"
                        decoding="async"
                        draggable="false"
                      />
                    </figure>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section
        className="events"
        id="eventos"
        data-section-id="eventos"
        aria-labelledby="eventos-title"
      >
        <div className="section-heading">
          <span>{t.events.eyebrow}</span>
          <h2 id="eventos-title">{t.events.title}</h2>
        </div>

        <div className="events__intro">
          <p>{t.events.description}</p>
        </div>

        <div className="event-calendar" aria-label={t.events.calendarLabel}>
          {t.events.cards.map((event) => {
            const eventHref = event.url.startsWith('#') ? localizedHash(language, event.url) : event.url;
            const isExternalEvent = eventHref.startsWith('http');

            return (
              <article className="event-card" key={`${event.period}-${event.title}`}>
                <div className="event-card__icon" aria-hidden="true">
                  <CalendarDays size={22} />
                </div>
                <div className="event-card__copy">
                  <span>{event.period}</span>
                  <strong>{event.title}</strong>
                  <p>{event.text}</p>
                  <dl className="event-card__meta">
                    <div>
                      <dt>{t.events.dateLabel}</dt>
                      <dd>{event.date}</dd>
                    </div>
                    <div>
                      <dt>{t.events.formatLabel}</dt>
                      <dd>{event.format}</dd>
                    </div>
                    <div>
                      <dt>{t.events.registrationLabel}</dt>
                      <dd>{event.registration}</dd>
                    </div>
                  </dl>
                </div>
                <a
                  className="event-card__link"
                  href={eventHref}
                  target={isExternalEvent ? '_blank' : undefined}
                  rel={isExternalEvent ? 'noreferrer' : undefined}
                >
                  {t.events.eventAction}
                  <ExternalLink aria-hidden="true" size={17} />
                </a>
              </article>
            );
          })}
        </div>

        <div className="event-actions" aria-label={t.events.eyebrow}>
          <a className="event-action" href={ieeeJoinUrl} target="_blank" rel="noreferrer">
            <UserPlus aria-hidden="true" size={22} />
            <span>
              <strong>{t.events.ctas.joinIeee.label}</strong>
              <small>{t.events.ctas.joinIeee.text}</small>
            </span>
          </a>
          <a className="event-action" href={branchJoinMailto}>
            <UserPlus aria-hidden="true" size={22} />
            <span>
              <strong>{t.events.ctas.joinBranch.label}</strong>
              <small>{t.events.ctas.joinBranch.text}</small>
            </span>
          </a>
          <a className="event-action" href={branchContactMailto}>
            <Mail aria-hidden="true" size={22} />
            <span>
              <strong>{t.events.ctas.talk.label}</strong>
              <small>{t.events.ctas.talk.text}</small>
            </span>
          </a>
          <a className="event-action" href={branchVolunteerMailto}>
            <Bell aria-hidden="true" size={22} />
            <span>
              <strong>{t.events.ctas.volunteer.label}</strong>
              <small>{t.events.ctas.volunteer.text}</small>
            </span>
          </a>
          <a className="event-action" href={branchInstagramUrl} target="_blank" rel="noreferrer">
            <Instagram aria-hidden="true" size={22} />
            <span>
              <strong>{t.events.ctas.follow.label}</strong>
              <small>{t.events.ctas.follow.text}</small>
            </span>
          </a>
        </div>

        <VolunteerForm language={language} t={t.events.volunteerForm} />
      </section>

      <section
        className="chapters"
        id="capitulos"
        data-section-id="capitulos"
        aria-labelledby="capitulos-title"
      >
        <div className="section-heading">
          <span>{t.chapters.eyebrow}</span>
          <h2 id="capitulos-title">{t.chapters.title}</h2>
        </div>

        <div className="chapter-grid" aria-label={t.chapters.title}>
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
                <span>{selectedChapter.sigla}</span>
                <h3 id="chapter-detail-title">{selectedChapter.nome}</h3>
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
                  {chapterPages[selectedChapter.id] ? (
                    <a className="chapter-link" href={localizedPath(language, `/capitulos/${selectedChapter.id}`)}>
                      <ExternalLink aria-hidden="true" size={18} />
                      <span>{language === 'pt' ? 'Ver página' : 'Open page'}</span>
                    </a>
                  ) : null}
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
              {(selectedChapterPresidentMember?.photoUrl || selectedChapter.president.foto) ? (
                <div className="president-card__photo-frame">
                  <img
                    className="president-card__photo"
                    src={selectedChapterPresidentMember?.photoUrl || selectedChapter.president.foto}
                    alt={t.chapters.photoAlt(selectedChapter.president.nome)}
                    style={selectedChapterPresidentMember ? getMemberPhotoStyle(selectedChapterPresidentMember) : undefined}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="president-card__photo-frame president-card__photo--empty">
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

      <section
        className="board"
        id="diretoria"
        data-section-id="diretoria"
        aria-labelledby="diretoria-title"
      >
        <div className="section-heading">
          <span>{t.board.eyebrow}</span>
          <h2 id="diretoria-title">{t.board.title}</h2>
        </div>

        <div className="board-grid" role="list" aria-label={t.board.title}>
          {visibleBoardMembers.map(({ role, name, photo, member }) => (
            <article className="board-card" role="listitem" key={`${role.pt}-${name}`}>
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

      <section
        className="projects"
        id="projetos"
        data-section-id="projetos"
        aria-labelledby="projetos-title"
      >
        <div className="section-heading">
          <span>{t.projects.eyebrow}</span>
          <h2 id="projetos-title">{t.projects.title}</h2>
        </div>

        <div className="section-actions">
          <a className="section-action-link" href={localizedPath(language, '/projetos')}>
            {t.projects.allProjectsCta}
          </a>
        </div>

        <div className="projects-grid" aria-label={t.projects.title}>
          {homepageProjects.map((project) => {
            const { id, name, chapter, url, description, preview, previewDark, galleryImages } = project;
            const projectName = getProjectName(project, language);
            const previewSrc = getProjectPreviewSrc({ preview, previewDark, galleryImages }, isDarkMode);
            const hasUrl = Boolean(url);
            const ProjectCardTag = hasUrl ? 'a' : 'button';
            const cardProps = hasUrl
              ? { href: url, rel: 'noreferrer', target: '_blank' }
              : {
                  type: 'button',
                  onClick: () => setSelectedProjectId(id),
                  'aria-controls': 'project-detail',
                  'aria-expanded': selectedProjectId === id,
                };

            return (
              <ProjectCardTag
                className={`project-card project-card--${id} ${
                  hasUrl ? '' : 'project-card--button'
                } ${selectedProjectId === id ? 'project-card--active' : ''}`}
                key={id}
                aria-label={hasUrl ? t.projects.open(projectName) : t.projects.openDetails(projectName)}
                {...cardProps}
              >
                <div className="project-card__preview">
                  <img
                    className="project-card__image"
                    src={previewSrc}
                    alt={projectImageAlt(project, language)}
                    loading="lazy"
                    decoding="async"
                />
              </div>
              <div className="project-card__copy">
                  <span className="project-card__tag">{chapter}</span>
                  <strong>{projectName}</strong>
                  <p>{getLocalizedText(description, language, '')}</p>
                </div>
                {hasUrl ? <ExternalLink className="project-card__icon" aria-hidden="true" size={20} /> : null}
              </ProjectCardTag>
            );
          })}
        </div>

        {selectedProject && (
          <article
            className="chapter-detail project-detail"
            id="project-detail"
            ref={projectDetailRef}
            tabIndex={-1}
            aria-labelledby="project-detail-title"
            aria-live="polite"
          >
            <button
              className="chapter-detail__close"
              type="button"
              onClick={() => setSelectedProjectId(null)}
              aria-label={t.projects.close}
            >
              <X size={20} aria-hidden="true" />
            </button>

            <div className="chapter-detail__main project-detail__main">
              <div className="project-detail__image-wrap">
                <img
                  className="project-detail__image"
                  src={selectedProjectSlide}
                  alt={projectImageAlt(selectedProject, language, selectedProjectSlideIndex)}
                  style={getProjectPhotoStyle(selectedProject)}
                  loading="lazy"
                  decoding="async"
                />
                {selectedProjectGallery.length > 1 ? (
                  <div className="project-detail__slides" aria-label={t.projects.galleryLabel}>
                    {selectedProjectGallery.map((slide, index) => (
                      <button
                        className={`project-detail__dot ${
                          selectedProjectSlideIndex === index ? 'project-detail__dot--active' : ''
                        }`}
                        key={slide}
                        type="button"
                        onClick={() => setSelectedProjectSlideIndex(index)}
                        aria-label={t.projects.galleryPhotoLabel(index)}
                        aria-pressed={selectedProjectSlideIndex === index}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="chapter-detail__copy project-detail__copy">
                <span>{selectedProject.chapter}</span>
                <h3 id="project-detail-title">{getProjectName(selectedProject, language)}</h3>
                {getProjectSubtitle(selectedProject, language) ? (
                  <strong>{getProjectSubtitle(selectedProject, language)}</strong>
                ) : null}
                <p>
                  {getLocalizedText(
                    selectedProject.detailDescription,
                    language,
                    getProjectSubtitle(selectedProject, language),
                  )}
                </p>
              </div>
            </div>
          </article>
        )}
      </section>

      <section
        className="members"
        id="membros"
        data-section-id="membros"
        aria-labelledby="membros-title"
      >
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
                {selectedMemberBio ? <p>{selectedMemberBio}</p> : null}
              </div>
            </div>
          </article>
        )}
      </section>

      <section
        className="contact"
        id="contato"
        data-section-id="contato"
        aria-labelledby="contato-title"
      >
        <div className="section-heading">
          <span>{t.contact.eyebrow}</span>
          <h2 id="contato-title">{t.contact.title}</h2>
        </div>

        <div className="contact__layout">
          <div className="contact__copy">
            <p>{t.contact.description}</p>

            <div className="contact__info-grid">
              <article className="contact__info-card">
                <span>{t.contact.emailLabel}</span>
                <div className="contact__links">
                  {t.contact.emails.map((email) => (
                    <a key={email} href={`mailto:${email}`}>
                      {email}
                    </a>
                  ))}
                </div>
              </article>

              <article className="contact__info-card">
                <span>{t.contact.socialLabel}</span>
                <div className="contact__links">
                  <a href="https://instagram.com/ieeeufjf" target="_blank" rel="noreferrer">
                    <Instagram aria-hidden="true" size={18} />
                    @ieeeufjf
                  </a>
                </div>
              </article>

              <article className="contact__info-card contact__info-card--wide">
                <span>{t.contact.suggestionLabel}</span>
                <p>{t.contact.suggestionText}</p>
                <div className="contact__links">
                  {t.contact.suggestionEmails.map((email) => (
                    <a key={email} href={`mailto:${email}`}>
                      {email}
                    </a>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section
        className="location"
        id="localizacao"
        data-section-id="localizacao"
        aria-labelledby="localizacao-title"
      >
        <div className="section-heading">
          <span>{t.contact.locationLabel}</span>
          <h2 id="localizacao-title">{t.contact.location}</h2>
        </div>

        <div className="location__layout">
          <article className="location__copy">
            <p>{t.contact.visit}</p>
          </article>
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
    </>
  );
}

function OpportunitiesPage({
  isDarkMode,
  language,
  setIsDarkMode,
  setLanguage,
  t,
}) {
  const [liveOpportunities, setLiveOpportunities] = useState({
    events: [],
    funding: [],
    generatedAt: null,
    partial: false,
    status: 'loading',
  });

  useEffect(() => {
    let cancelled = false;

    fetchJsonWithTimeout('/api/ieee-opportunities', {
      cache: 'default',
      cacheBuster: false,
      timeoutMs: 10000,
    })
      .then((payload) => {
        if (!Array.isArray(payload?.funding) || !Array.isArray(payload?.events)) {
          throw new Error('invalid-opportunities-payload');
        }

        if (!cancelled) {
          setLiveOpportunities({
            events: payload.events,
            funding: payload.funding,
            generatedAt: payload.generatedAt || null,
            partial: Boolean(payload.partial),
            status: 'ready',
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLiveOpportunities((current) => ({
            ...current,
            status: 'error',
          }));
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const live = t.opportunities.live;
  const hasLiveResults = liveOpportunities.funding.length > 0
    || liveOpportunities.events.length > 0;
  const updatedAt = formatOpportunityDateTime(liveOpportunities.generatedAt, language);

  return (
    <>
      <a className="skip-link" href="#conteudo-principal">
        {t.nav.skip}
      </a>
      <main className="opportunities-page">
        <SiteNav
          isDarkMode={isDarkMode}
          language={language}
          setIsDarkMode={setIsDarkMode}
          setLanguage={setLanguage}
          t={t}
        />

        <section
          className="opportunities-page__section"
          id="conteudo-principal"
          aria-labelledby="oportunidades-lista-title"
        >
          <div className="section-heading">
            <span>{t.opportunities.eyebrow}</span>
            <h1 id="oportunidades-lista-title">{t.opportunities.title}</h1>
          </div>

          <p className="opportunities-page__intro">{t.opportunities.intro}</p>

          <section
            className="opportunities-live"
            aria-labelledby="oportunidades-destaques-title"
            aria-busy={liveOpportunities.status === 'loading'}
          >
            <div className="opportunities-live__heading">
              <div>
                <span>{live.eyebrow}</span>
                <h2 id="oportunidades-destaques-title">{live.title}</h2>
              </div>
              {updatedAt && liveOpportunities.status === 'ready' ? (
                <p className="opportunities-live__updated">
                  <RefreshCw aria-hidden="true" size={16} />
                  <span>{live.updatedLabel} {updatedAt} · {live.sourceLabel}</span>
                </p>
              ) : null}
            </div>

            {liveOpportunities.status === 'loading' ? (
              <p className="opportunities-feed-status" role="status">
                <RefreshCw aria-hidden="true" size={17} />
                {live.loading}
              </p>
            ) : null}

            {liveOpportunities.status === 'error' ? (
              <p className="opportunities-feed-status opportunities-feed-status--warning" role="status">
                {live.unavailable}
              </p>
            ) : null}

            {liveOpportunities.status === 'ready' && liveOpportunities.partial ? (
              <p className="opportunities-feed-status opportunities-feed-status--warning" role="status">
                {live.partial}
              </p>
            ) : null}

            {liveOpportunities.status === 'ready' && !hasLiveResults ? (
              <p className="opportunities-feed-status" role="status">{live.empty}</p>
            ) : null}

            {liveOpportunities.funding.length > 0 ? (
              <div className="opportunities-live__group">
                <div className="opportunities-live__group-heading">
                  <h2>{live.fundingTitle}</h2>
                  <p>{live.fundingDescription}</p>
                </div>
                <div className="live-opportunities-grid">
                  {liveOpportunities.funding.map((opportunity) => (
                    <a
                      className="live-opportunity-card"
                      href={opportunity.url}
                      key={opportunity.id}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div>
                        <span className="live-opportunity-card__kind">
                          {live.categories[opportunity.category] || live.categories.funding}
                        </span>
                        <h3>{opportunity.title}</h3>
                      </div>
                      {opportunity.description ? <p>{opportunity.description}</p> : null}
                      <div className="live-opportunity-card__footer">
                        <small>{opportunity.source}</small>
                        <span>
                          {live.openFunding}
                          <ExternalLink aria-hidden="true" size={16} />
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}

            {liveOpportunities.events.length > 0 ? (
              <div className="opportunities-live__group">
                <div className="opportunities-live__group-heading">
                  <h2>{live.eventsTitle}</h2>
                  <p>{live.eventsDescription}</p>
                </div>
                <div className="live-opportunities-grid">
                  {liveOpportunities.events.map((event) => (
                    <a
                      className="live-opportunity-card live-opportunity-card--event"
                      href={event.url}
                      key={event.id}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div>
                        <span className="live-opportunity-card__kind">{event.source}</span>
                        <h3>{event.title}</h3>
                      </div>
                      <dl className="live-opportunity-card__meta">
                        <div>
                          <dt>
                            <CalendarDays aria-hidden="true" size={16} />
                            {live.dateLabel}
                          </dt>
                          <dd>
                            <time dateTime={event.startsAt}>
                              {formatOpportunityDateTime(event.startsAt, language)}
                            </time>
                          </dd>
                        </div>
                        <div>
                          <dt>
                            <Monitor aria-hidden="true" size={16} />
                            {live.formatLabel}
                          </dt>
                          <dd>{live.formats[event.format] || live.formats.inPerson}</dd>
                        </div>
                        {event.location ? (
                          <div>
                            <dt>
                              <MapPin aria-hidden="true" size={16} />
                              {live.locationLabel}
                            </dt>
                            <dd>{event.location}</dd>
                          </div>
                        ) : null}
                      </dl>
                      <div className="live-opportunity-card__footer">
                        <small>{event.source}</small>
                        <span>
                          {live.openEvent}
                          <ExternalLink aria-hidden="true" size={16} />
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </section>

          <section className="opportunities-resources" aria-labelledby="oportunidades-recursos-title">
            <div className="opportunities-live__group-heading">
              <h2 id="oportunidades-recursos-title">{live.resourcesTitle}</h2>
              <p>{live.resourcesDescription}</p>
            </div>
            <div className="opportunities-grid">
              {t.opportunities.cards.map((card) => (
                <a className="opportunity-card" href={card.url} key={card.title} target="_blank" rel="noreferrer">
                  <span>{card.title}</span>
                  <p>{card.text}</p>
                  <ExternalLink aria-hidden="true" size={18} />
                </a>
              ))}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

function formatOpportunityDateTime(value, language) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat(language === 'pt' ? 'pt-BR' : 'en-US', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    timeZone: 'America/Sao_Paulo',
    timeZoneName: 'short',
    year: 'numeric',
  }).format(date);
}

function VolunteerForm({ language, t }) {
  function handleSubmit(event) {
    event.preventDefault();

    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    const name = String(values.name || '').trim();
    const email = String(values.email || '').trim();
    const interest = String(values.interest || '').trim();
    const message = String(values.message || '').trim();
    const subject = language === 'pt'
      ? `Interesse em participar do IEEE UFJF - ${name}`
      : `Interest in joining IEEE UFJF - ${name}`;
    const body = language === 'pt'
      ? [
          `Nome: ${name}`,
          `E-mail: ${email}`,
          `Área de interesse: ${interest}`,
          '',
          message || 'Gostaria de receber mais informações sobre como participar.',
        ].join('\n')
      : [
          `Name: ${name}`,
          `Email: ${email}`,
          `Area of interest: ${interest}`,
          '',
          message || 'I would like more information about how to participate.',
        ].join('\n');
    const query = new URLSearchParams({ subject, body });

    window.location.href = `mailto:ramo.ieeeufjf@gmail.com?${query.toString()}`;
  }

  return (
    <div className="volunteer-form" id="voluntariado">
      <div className="volunteer-form__heading">
        <span>{t.eyebrow}</span>
        <h3>{t.title}</h3>
        <p>{t.description}</p>
      </div>

      <form onSubmit={handleSubmit} aria-describedby="volunteer-form-note">
        <div className="volunteer-form__fields">
          <label htmlFor="volunteer-name">
            <span>{t.nameLabel}</span>
            <input id="volunteer-name" name="name" type="text" autoComplete="name" required />
          </label>
          <label htmlFor="volunteer-email">
            <span>{t.emailLabel}</span>
            <input id="volunteer-email" name="email" type="email" autoComplete="email" required />
          </label>
          <label htmlFor="volunteer-interest" className="volunteer-form__field--wide">
            <span>{t.interestLabel}</span>
            <select id="volunteer-interest" name="interest" defaultValue="" required>
              <option value="" disabled>{t.interestPlaceholder}</option>
              {t.interests.map((interest) => (
                <option value={interest} key={interest}>{interest}</option>
              ))}
            </select>
          </label>
          <label htmlFor="volunteer-message" className="volunteer-form__field--wide">
            <span>{t.messageLabel}</span>
            <textarea id="volunteer-message" name="message" rows="4" placeholder={t.messagePlaceholder} />
          </label>
        </div>

        <label className="volunteer-form__consent" htmlFor="volunteer-consent">
          <input id="volunteer-consent" name="consent" type="checkbox" required />
          <span>{t.consent}</span>
        </label>

        <div className="volunteer-form__footer">
          <button type="submit">
            <Mail aria-hidden="true" size={18} />
            {t.submit}
          </button>
          <small id="volunteer-form-note">{t.privacy}</small>
        </div>
      </form>
    </div>
  );
}

function ProjectsPage({
  isDarkMode,
  language,
  publishedProjects,
  setIsDarkMode,
  setLanguage,
  t,
}) {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectSlideIndex, setSelectedProjectSlideIndex] = useState(0);
  const projectDetailRef = useRef(null);
  const allProjects = useMemo(
    () => (publishedProjects || []).filter((project) => project.isPublic !== false),
    [publishedProjects],
  );
  const selectedProject = useMemo(
    () => allProjects.find((project) => project.id === selectedProjectId),
    [allProjects, selectedProjectId],
  );
  const selectedProjectPreviewSrc = selectedProject
    ? getProjectPreviewSrc(selectedProject, isDarkMode)
    : '';
  const selectedProjectGallery = useMemo(
    () =>
      selectedProject
        ? getUniqueUrls([...(selectedProject.galleryImages || []), selectedProjectPreviewSrc])
        : [],
    [selectedProject, selectedProjectPreviewSrc],
  );
  const selectedProjectSlide =
    selectedProjectGallery[selectedProjectSlideIndex] || selectedProjectPreviewSrc;

  useEffect(() => {
    if (!selectedProject || !projectDetailRef.current) {
      return undefined;
    }

    const focusTimer = window.setTimeout(() => {
      projectDetailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      projectDetailRef.current?.focus({ preventScroll: true });
    }, 80);

    return () => window.clearTimeout(focusTimer);
  }, [selectedProject]);

  useEffect(() => {
    setSelectedProjectSlideIndex(0);
  }, [selectedProjectId]);

  useEffect(() => {
    if (selectedProjectGallery.length <= 1) {
      return undefined;
    }

    const slideTimer = window.setInterval(() => {
      setSelectedProjectSlideIndex((currentIndex) => (
        currentIndex + 1
      ) % selectedProjectGallery.length);
    }, 4500);

    return () => window.clearInterval(slideTimer);
  }, [selectedProjectGallery.length]);

  useEffect(() => {
    if (selectedProjectId && !selectedProject) {
      setSelectedProjectId(null);
    }
  }, [selectedProject, selectedProjectId]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setSelectedProjectId(null);
      }
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
    <a className="skip-link" href="#conteudo-principal">
      {t.nav.skip}
    </a>
    <main className="projects-page">
      <SiteNav
        isDarkMode={isDarkMode}
        language={language}
        setIsDarkMode={setIsDarkMode}
        setLanguage={setLanguage}
        t={t}
      />

      <section className="history-page__hero projects-page__hero" id="conteudo-principal">
        <a className="chapter-page__back" href={localizedPath(language, '/#projetos')}>
          <ArrowLeft aria-hidden="true" size={18} />
          {t.projects.back}
        </a>
        <p className="section-kicker">{t.projects.eyebrow}</p>
        <h1>{t.projects.allProjectsTitle}</h1>
        <p>{t.projects.allProjectsIntro}</p>
      </section>

      <section className="projects-page__section" aria-labelledby="todos-projetos-title">
        <div className="section-heading">
          <span>{t.projects.eyebrow}</span>
          <h2 id="todos-projetos-title">{t.projects.title}</h2>
        </div>

        <div className="projects-grid projects-page__grid">
          {allProjects.map((project) => {
            const projectName = getProjectName(project, language);
            const previewSrc = getProjectPreviewSrc(project, isDarkMode);
            const hasUrl = Boolean(project.url);
            const ProjectCardTag = hasUrl ? 'a' : 'button';
            const cardProps = hasUrl
              ? { href: project.url, rel: 'noreferrer', target: '_blank' }
              : {
                  type: 'button',
                  onClick: () => setSelectedProjectId(project.id),
                  'aria-controls': 'all-project-detail',
                  'aria-expanded': selectedProjectId === project.id,
                };

            return (
              <ProjectCardTag
                className={`project-card ${
                  hasUrl ? '' : 'project-card--button'
                } ${selectedProjectId === project.id ? 'project-card--active' : ''}`}
                key={project.id}
                aria-label={hasUrl ? t.projects.open(projectName) : t.projects.openDetails(projectName)}
                {...cardProps}
              >
                <div className="project-card__preview">
                  <img
                    className="project-card__image"
                    src={previewSrc}
                    alt={projectImageAlt(project, language)}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="project-card__copy">
                  <span className="project-card__tag">{project.chapter}</span>
                  <strong>{projectName}</strong>
                  <p>{getLocalizedText(project.description, language, '')}</p>
                </div>
                {hasUrl ? <ExternalLink className="project-card__icon" aria-hidden="true" size={20} /> : null}
              </ProjectCardTag>
            );
          })}
        </div>

        {selectedProject ? (
          <article
            className="chapter-detail project-detail"
            id="all-project-detail"
            ref={projectDetailRef}
            tabIndex={-1}
            aria-labelledby="all-project-detail-title"
            aria-live="polite"
          >
            <button
              className="chapter-detail__close"
              type="button"
              onClick={() => setSelectedProjectId(null)}
              aria-label={t.projects.close}
            >
              <X size={20} aria-hidden="true" />
            </button>

            <div className="chapter-detail__main project-detail__main">
              <div className="project-detail__image-wrap">
                <img
                  className="project-detail__image"
                  src={selectedProjectSlide}
                  alt={projectImageAlt(selectedProject, language, selectedProjectSlideIndex)}
                  style={getProjectPhotoStyle(selectedProject)}
                  loading="lazy"
                  decoding="async"
                />
                {selectedProjectGallery.length > 1 ? (
                  <div className="project-detail__slides" aria-label={t.projects.galleryLabel}>
                    {selectedProjectGallery.map((slide, index) => (
                      <button
                        className={`project-detail__dot ${
                          selectedProjectSlideIndex === index ? 'project-detail__dot--active' : ''
                        }`}
                        key={slide}
                        type="button"
                        onClick={() => setSelectedProjectSlideIndex(index)}
                        aria-label={t.projects.galleryPhotoLabel(index)}
                        aria-pressed={selectedProjectSlideIndex === index}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="chapter-detail__copy project-detail__copy">
                <span>{selectedProject.chapter}</span>
                <h3 id="all-project-detail-title">{getProjectName(selectedProject, language)}</h3>
                {getProjectSubtitle(selectedProject, language) ? (
                  <strong>{getProjectSubtitle(selectedProject, language)}</strong>
                ) : null}
                <p>
                  {getLocalizedText(
                    selectedProject.detailDescription,
                    language,
                    getProjectSubtitle(selectedProject, language),
                  )}
                </p>
              </div>
            </div>
          </article>
        ) : null}
      </section>
    </main>
    </>
  );
}

function HistoryPage({
  historyPhotos,
  isDarkMode,
  isHistoryPhotosLoading,
  language,
  setIsDarkMode,
  setLanguage,
  t,
}) {
  const historyLogoTrackRef = useRef(null);
  const historyLogoDragRef = useRef({
    isDragging: false,
    pointerId: null,
    startOffset: 0,
    startX: 0,
  });
  const historyPhotoTrackRef = useRef(null);
  const historyPhotoDragRef = useRef({
    isDragging: false,
    pointerId: null,
    startOffset: 0,
    startX: 0,
  });

  const getHistoryCarouselTrackOffset = (trackRef) => {
    const track = trackRef.current;
    if (!track) {
      return 0;
    }

    const transform = window.getComputedStyle(track).transform;
    if (!transform || transform === 'none') {
      return 0;
    }

    return new DOMMatrixReadOnly(transform).m41;
  };

  const normalizeHistoryCarouselOffset = (trackRef, offset) => {
    const track = trackRef.current;
    if (!track) {
      return offset;
    }

    const loopDistance = track.scrollWidth / 2;
    if (!loopDistance) {
      return offset;
    }

    let normalized = offset % loopDistance;
    if (normalized > 0) {
      normalized -= loopDistance;
    }

    return normalized;
  };

  const setHistoryCarouselOffset = (trackRef, offsetVariable, offset) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    track.style.setProperty(offsetVariable, `${normalizeHistoryCarouselOffset(trackRef, offset)}px`);
  };

  const createHistoryCarouselDragHandlers = (trackRef, dragRef, offsetVariable, itemCount) => {
    const handlePointerDown = (event) => {
    if (event.button !== undefined && event.button !== 0) {
      return;
    }

    const track = trackRef.current;
    if (!track || itemCount < 2) {
      return;
    }

    const startOffset = getHistoryCarouselTrackOffset(trackRef);
    setHistoryCarouselOffset(trackRef, offsetVariable, startOffset);
    dragRef.current = {
      isDragging: true,
      pointerId: event.pointerId,
      startOffset,
      startX: event.clientX,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add('history-carousel--dragging');
  };

    const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag.isDragging || drag.pointerId !== event.pointerId) {
      return;
    }

    setHistoryCarouselOffset(trackRef, offsetVariable, drag.startOffset + event.clientX - drag.startX);
  };

    const finishDrag = (event) => {
    const drag = dragRef.current;
    if (!drag.isDragging || drag.pointerId !== event.pointerId) {
      return;
    }

    setHistoryCarouselOffset(trackRef, offsetVariable, drag.startOffset + event.clientX - drag.startX);
    dragRef.current = {
      isDragging: false,
      pointerId: null,
      startOffset: 0,
      startX: 0,
    };

    event.currentTarget.classList.remove('history-carousel--dragging');
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

    return {
      onPointerCancel: finishDrag,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: finishDrag,
    };
  };

  const historyLogoDragHandlers = createHistoryCarouselDragHandlers(
    historyLogoTrackRef,
    historyLogoDragRef,
    '--history-logo-offset',
    historyLogoSlides.length,
  );
  const historyPhotoDragHandlers = createHistoryCarouselDragHandlers(
    historyPhotoTrackRef,
    historyPhotoDragRef,
    '--history-photo-offset',
    historyPhotos.length,
  );

  return (
    <>
    <a className="skip-link" href="#conteudo-principal">
      {t.nav.skip}
    </a>
    <main className="history-page">
      <SiteNav
        isDarkMode={isDarkMode}
        language={language}
        setIsDarkMode={setIsDarkMode}
        setLanguage={setLanguage}
        t={t}
      />

      <section className="history-page__section history-page__section--text" id="conteudo-principal">
        <div className="history-page__intro-grid">
          <div>
            <a className="chapter-page__back" href={localizedPath(language, '/')}>
              <ArrowLeft aria-hidden="true" size={18} />
              {t.history.back}
            </a>
            <div className="section-heading">
              <span>{t.history.eyebrow}</span>
              <h1>{t.history.timelineTitle}</h1>
            </div>
            <div className="history-page__copy">
              {t.history.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <aside className="history-page__current-logo" aria-label={t.history.currentLogoLabel}>
            <img
              src={isDarkMode ? '/assets/ramo-ieee-ufjf.svg' : '/assets/ramo-ieee-ufjf-blue.svg'}
              alt={t.history.currentLogoLabel}
            />
          </aside>
        </div>
      </section>

      <section className="history-page__section">
        <div className="section-heading">
          <span>{t.history.eyebrow}</span>
          <h2>{t.history.logosTitle}</h2>
          <p>{t.history.logosDescription}</p>
        </div>
        <div
          className="history-carousel history-carousel--logos"
          aria-label={t.history.logosTitle}
          {...historyLogoDragHandlers}
        >
          <div className="history-carousel__track" ref={historyLogoTrackRef}>
            {[...historyLogoSlides, ...historyLogoSlides].map((slide, index) => {
              const isDuplicate = index >= historyLogoSlides.length;

              return (
                <figure
                  className="history-carousel__slide"
                  key={`${slide.src}-${index}`}
                  aria-hidden={isDuplicate ? 'true' : undefined}
                >
                  <img
                    src={slide.src}
                    alt={isDuplicate ? '' : slide.alt[language]}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  />
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      <section className="history-page__section">
        <div className="section-heading">
          <span>{t.history.eyebrow}</span>
          <h2>{t.history.photosTitle}</h2>
          <p>{t.history.photosDescription}</p>
        </div>
        {isHistoryPhotosLoading ? (
          <div className="history-loading" role="status" aria-live="polite" aria-label={t.history.photosLoading}>
            <span aria-hidden="true" />
          </div>
        ) : historyPhotos.length ? (
          <div
            className="history-carousel history-carousel--photos"
            aria-label={t.history.photosTitle}
            {...historyPhotoDragHandlers}
          >
            <div className="history-carousel__track" ref={historyPhotoTrackRef}>
              {[...historyPhotos, ...historyPhotos].map((slide, index) => {
                const isDuplicate = index >= historyPhotos.length;

                return (
                  <figure
                    className="history-carousel__slide"
                    key={`${slide.src}-${index}`}
                    aria-hidden={isDuplicate ? 'true' : undefined}
                  >
                    <img
                      src={slide.src}
                      alt={isDuplicate ? '' : slide.alt?.[language] || slide.title || t.history.photosTitle}
                      style={getProjectPhotoStyle(slide)}
                      loading={index < Math.min(historyPhotos.length, 8) ? 'eager' : 'lazy'}
                      fetchPriority={index < 4 ? 'high' : 'auto'}
                      decoding="async"
                      draggable="false"
                    />
                    {(slide.title || slide.description) ? (
                      <figcaption className="history-carousel__caption">
                        {slide.year ? <span>{slide.year}</span> : null}
                        {slide.title ? <strong>{slide.title}</strong> : null}
                        {slide.description ? <p>{slide.description}</p> : null}
                      </figcaption>
                    ) : null}
                  </figure>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="history-empty">{t.history.photosEmpty}</p>
        )}
      </section>
    </main>
    </>
  );
}

function ChapterPage({
  chapter,
  chapterPage,
  isDarkMode,
  language,
  publishedProjects,
  setIsDarkMode,
  setLanguage,
  t,
}) {
  if (!chapter || !chapterPage) {
    return (
      <>
      <a className="skip-link" href="#conteudo-principal">
        {t.nav.skip}
      </a>
      <main className="chapter-page">
        <SiteNav
          isDarkMode={isDarkMode}
          language={language}
          setIsDarkMode={setIsDarkMode}
          setLanguage={setLanguage}
          t={t}
        />
        <section className="chapter-page__hero" id="conteudo-principal">
          <p className="section-kicker">{language === 'pt' ? 'Capítulo' : 'Chapter'}</p>
          <h1>{language === 'pt' ? 'Página não encontrada' : 'Page not found'}</h1>
          <a className="chapter-page__back" href={localizedPath(language, '/#capitulos')}>
            <ArrowLeft aria-hidden="true" size={18} />
            {language === 'pt' ? 'Voltar aos capítulos' : 'Back to chapters'}
          </a>
        </section>
      </main>
      </>
    );
  }

  const logoSrc = isDarkMode && chapter.darkLogo ? chapter.darkLogo : chapter.logo;
  const presidentLabel = getLocalizedText(
    chapter.president.label,
    language,
    t.chapters.presidentFallback,
  );
  const chapterBoard = chapterBoards[chapter.id] || [];
  const chapterInitiatives = chapterPage.projects?.[language] || [];
  const relatedProjects = getChapterRelatedProjects(chapter, publishedProjects);
  const [selectedChapterProjectId, setSelectedChapterProjectId] = useState(null);
  const [selectedChapterProjectSlideIndex, setSelectedChapterProjectSlideIndex] = useState(0);
  const chapterProjectDetailRef = useRef(null);
  const selectedChapterProject = useMemo(
    () => relatedProjects.find((project) => project.id === selectedChapterProjectId),
    [relatedProjects, selectedChapterProjectId],
  );
  const selectedChapterProjectPreviewSrc = selectedChapterProject
    ? getProjectPreviewSrc(selectedChapterProject, isDarkMode)
    : '';
  const selectedChapterProjectGallery = useMemo(
    () =>
      selectedChapterProject
        ? getUniqueUrls([...(selectedChapterProject.galleryImages || []), selectedChapterProjectPreviewSrc])
        : [],
    [selectedChapterProject, selectedChapterProjectPreviewSrc],
  );
  const selectedChapterProjectSlide =
    selectedChapterProjectGallery[selectedChapterProjectSlideIndex] || selectedChapterProjectPreviewSrc;

  useEffect(() => {
    if (!selectedChapterProject || !chapterProjectDetailRef.current) {
      return undefined;
    }

    const focusTimer = window.setTimeout(() => {
      chapterProjectDetailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      chapterProjectDetailRef.current?.focus({ preventScroll: true });
    }, 80);

    return () => window.clearTimeout(focusTimer);
  }, [selectedChapterProject]);

  useEffect(() => {
    setSelectedChapterProjectSlideIndex(0);
  }, [selectedChapterProjectId]);

  useEffect(() => {
    if (selectedChapterProjectGallery.length <= 1) {
      return undefined;
    }

    const slideTimer = window.setInterval(() => {
      setSelectedChapterProjectSlideIndex((currentIndex) => (
        currentIndex + 1
      ) % selectedChapterProjectGallery.length);
    }, 4500);

    return () => window.clearInterval(slideTimer);
  }, [selectedChapterProjectGallery.length]);

  useEffect(() => {
    if (selectedChapterProjectId && !selectedChapterProject) {
      setSelectedChapterProjectId(null);
    }
  }, [selectedChapterProject, selectedChapterProjectId]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setSelectedChapterProjectId(null);
      }
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
    <a className="skip-link" href="#conteudo-principal">
      {t.nav.skip}
    </a>
    <main className="chapter-page">
      <SiteNav
        isDarkMode={isDarkMode}
        language={language}
        setIsDarkMode={setIsDarkMode}
        setLanguage={setLanguage}
        t={t}
      />

      <section className="chapter-page__hero" id="conteudo-principal">
        <a className="chapter-page__back" href={localizedPath(language, '/#capitulos')}>
          <ArrowLeft aria-hidden="true" size={18} />
          {language === 'pt' ? 'Voltar aos capítulos' : 'Back to chapters'}
        </a>

        <div className="chapter-page__hero-grid">
          <div>
            <p className="section-kicker">{chapter.sigla}</p>
            <h1>{chapter.nome}</h1>
            <p>{chapter.descricao[language]}</p>
          </div>

          <div className="chapter-page__logo-card">
            {logoSrc ? (
              <img
                src={logoSrc}
                alt={t.chapters.logoAlt(chapter.nome)}
                loading="eager"
                decoding="async"
              />
            ) : (
              <span>{chapter.sigla}</span>
            )}
          </div>
        </div>
      </section>

      <section className="chapter-page__section">
        <div className="chapter-page__copy">
          {chapterPage.body[language].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <aside className="chapter-page__facts" aria-label={language === 'pt' ? 'Dados do capítulo' : 'Chapter facts'}>
          <div>
            <span>{language === 'pt' ? 'Fundação' : 'Founded'}</span>
            <strong>{chapterPage.foundation}</strong>
          </div>
          <div>
            <span>{language === 'pt' ? 'Contato' : 'Contact'}</span>
            <a href={`mailto:${chapterPage.email}`}>{chapterPage.email}</a>
          </div>
          <div>
            <span>{presidentLabel}</span>
            <strong>{chapter.president.nome}</strong>
          </div>
        </aside>
      </section>

      {chapterBoard.length ? (
        <section className="chapter-page__section chapter-page__section--board">
          <div className="section-heading">
            <span>{language === 'pt' ? 'Equipe' : 'Team'}</span>
            <h2>{language === 'pt' ? 'Diretoria do capítulo' : 'Chapter board'}</h2>
          </div>

          <dl
            className="chapter-board"
            aria-label={language === 'pt' ? `Diretoria ${chapter.sigla}` : `${chapter.sigla} board`}
          >
            {chapterBoard.map((member) => (
              <div className="chapter-board__member" key={`${member.role.pt}-${member.name}`}>
                <dt>{getLocalizedText(member.role, language, member.role.pt)}</dt>
                <dd>{member.name}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <section className="chapter-page__section chapter-page__section--stack">
        <div className="section-heading">
          <span>{language === 'pt' ? 'Atuação' : 'Work'}</span>
          <h2>{language === 'pt' ? 'Projetos e iniciativas' : 'Projects and initiatives'}</h2>
        </div>

        {relatedProjects.length ? (
          <>
            <div className="projects-grid chapter-page__projects-grid">
              {relatedProjects.map((project) => {
                const projectName = getProjectName(project, language);
                const previewSrc = getProjectPreviewSrc(project, isDarkMode);

                return (
                  <button
                    className={`project-card project-card--button ${
                      selectedChapterProjectId === project.id ? 'project-card--active' : ''
                    }`}
                    key={project.id}
                    type="button"
                    onClick={() => setSelectedChapterProjectId(project.id)}
                    aria-controls="chapter-project-detail"
                    aria-expanded={selectedChapterProjectId === project.id}
                    aria-label={t.projects.openDetails(projectName)}
                  >
                    <div className="project-card__preview">
                      <img
                        className="project-card__image"
                        src={previewSrc}
                        alt={projectImageAlt(project, language)}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="project-card__copy">
                      <span className="project-card__tag">{project.chapter}</span>
                      <strong>{projectName}</strong>
                      <p>{getLocalizedText(project.description, language, '')}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedChapterProject ? (
              <article
                className="chapter-detail project-detail"
                id="chapter-project-detail"
                ref={chapterProjectDetailRef}
                tabIndex={-1}
                aria-labelledby="chapter-project-detail-title"
                aria-live="polite"
              >
                <button
                  className="chapter-detail__close"
                  type="button"
                  onClick={() => setSelectedChapterProjectId(null)}
                  aria-label={t.projects.close}
                >
                  <X size={20} aria-hidden="true" />
                </button>

                <div className="chapter-detail__main project-detail__main">
                  <div className="project-detail__image-wrap">
                    <img
                      className="project-detail__image"
                      src={selectedChapterProjectSlide}
                      alt={projectImageAlt(selectedChapterProject, language, selectedChapterProjectSlideIndex)}
                      style={getProjectPhotoStyle(selectedChapterProject)}
                      loading="lazy"
                      decoding="async"
                    />
                    {selectedChapterProjectGallery.length > 1 ? (
                      <div className="project-detail__slides" aria-label={t.projects.galleryLabel}>
                        {selectedChapterProjectGallery.map((slide, index) => (
                          <button
                            className={`project-detail__dot ${
                              selectedChapterProjectSlideIndex === index ? 'project-detail__dot--active' : ''
                            }`}
                            key={slide}
                            type="button"
                            onClick={() => setSelectedChapterProjectSlideIndex(index)}
                            aria-label={t.projects.galleryPhotoLabel(index)}
                            aria-pressed={selectedChapterProjectSlideIndex === index}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className="chapter-detail__copy project-detail__copy">
                    <span>{selectedChapterProject.chapter}</span>
                    <h3 id="chapter-project-detail-title">
                      {getProjectName(selectedChapterProject, language)}
                    </h3>
                    {getProjectSubtitle(selectedChapterProject, language) ? (
                      <strong>{getProjectSubtitle(selectedChapterProject, language)}</strong>
                    ) : null}
                    <p>
                      {getLocalizedText(
                        selectedChapterProject.detailDescription,
                        language,
                        getProjectSubtitle(selectedChapterProject, language),
                      )}
                    </p>
                    {selectedChapterProject.url ? (
                      <div className="chapter-detail__links">
                        <a
                          className="chapter-link"
                          href={selectedChapterProject.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink aria-hidden="true" size={18} />
                          {t.projects.open(getProjectName(selectedChapterProject, language))}
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            ) : null}
          </>
        ) : null}

        {chapterInitiatives.length ? (
          <div className="chapter-page__project-grid">
            {chapterInitiatives.map((initiative) => (
              <article className="chapter-page__project" key={initiative.title}>
                <span>{language === 'pt' ? 'Projeto ou plano' : 'Project or plan'}</span>
                <h3>{initiative.title}</h3>
                <p>{initiative.text}</p>
              </article>
            ))}
          </div>
        ) : null}

        {!relatedProjects.length && !chapterInitiatives.length ? (
          <p className="chapter-page__empty">
            {language === 'en'
              ? 'No projects registered for this chapter yet.'
              : 'Nenhum projeto cadastrado para este capítulo ainda.'}
          </p>
        ) : null}
      </section>

    </main>
    </>
  );
}

function SiteNav({ isDarkMode, language, setIsDarkMode, setLanguage, t }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const contentPath =
    typeof window === 'undefined' ? '/' : stripLanguagePrefix(window.location.pathname);
  const isHistoryPage = contentPath === '/historia' || contentPath === '/historia/';
  const isOpportunitiesPage = contentPath === '/oportunidades' || contentPath === '/oportunidades/';
  const isProjectsPage = contentPath === '/projetos' || contentPath === '/projetos/';

  useEffect(() => {
    if (!isNavOpen) {
      return undefined;
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsNavOpen(false);
      }
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isNavOpen]);

  return (
    <nav className={`mini-nav mini-nav--page ${isNavOpen ? 'mini-nav--open' : ''}`} aria-label={t.nav.aria}>
      <a className="mini-nav__brand" href={localizedPath(language, '/')} aria-label={t.nav.top}>
        <span className="mini-nav__mark" aria-hidden="true" />
        <span className="mini-nav__brand-text">
          <strong>{t.hero.universityDesktop}</strong>
          <span>{t.hero.branch}</span>
        </span>
      </a>
      <div className="mini-nav__menu">
        <div className="mini-nav__actions">
          <button
            className="mini-nav__language"
            type="button"
            onClick={() => {
              const nextLanguage = language === 'pt' ? 'en' : 'pt';
              setLanguage(nextLanguage);
              setIsNavOpen(false);
              window.history.pushState({}, '', alternateLanguagePath(window.location.pathname, nextLanguage));
              window.dispatchEvent(new Event('popstate'));
            }}
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
          <button
            className="mini-nav__toggle"
            type="button"
            onClick={() => setIsNavOpen((current) => !current)}
            aria-label={isNavOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={isNavOpen}
            aria-haspopup="true"
            aria-controls="site-page-navigation-links"
          >
            {isNavOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          </button>
        </div>
      </div>
      <div className="mini-nav__links" id="site-page-navigation-links" aria-label={t.nav.aria}>
        <a href={localizedPath(language, '/#o-ieee')} onClick={() => setIsNavOpen(false)}>{t.nav.about}</a>
        <a
          className={isOpportunitiesPage ? 'mini-nav__link--active' : undefined}
          href={localizedPath(language, '/oportunidades')}
          onClick={() => setIsNavOpen(false)}
          aria-current={isOpportunitiesPage ? 'page' : undefined}
        >
          {t.nav.opportunities}
        </a>
        <a
          className={isHistoryPage ? 'mini-nav__link--active' : undefined}
          href={localizedPath(language, '/historia')}
          onClick={() => setIsNavOpen(false)}
          aria-current={isHistoryPage ? 'page' : undefined}
        >
          {t.nav.history}
        </a>
        <a href={localizedPath(language, '/#eventos')} onClick={() => setIsNavOpen(false)}>{t.nav.events}</a>
        <a href={localizedPath(language, '/#capitulos')} onClick={() => setIsNavOpen(false)}>{t.nav.chapters}</a>
        <a href={localizedPath(language, '/#diretoria')} onClick={() => setIsNavOpen(false)}>{t.nav.board}</a>
        <a
          className={isProjectsPage ? 'mini-nav__link--active' : undefined}
          href={localizedPath(language, '/#projetos')}
          onClick={() => setIsNavOpen(false)}
          aria-current={isProjectsPage ? 'page' : undefined}
        >
          {t.nav.projects}
        </a>
        <a href={localizedPath(language, '/#membros')} onClick={() => setIsNavOpen(false)}>{t.nav.members}</a>
        <a href={localizedPath(language, '/#contato')} onClick={() => setIsNavOpen(false)}>{t.nav.contact}</a>
        <a href={localizedPath(language, '/#localizacao')} onClick={() => setIsNavOpen(false)}>{t.nav.location}</a>
      </div>
    </nav>
  );
}

function getChapterRelatedProjects(chapter, publishedProjects) {
  const chapterKeys = new Set(
    [chapter?.sigla, chapter?.id]
      .filter(Boolean)
      .map((value) => String(value).trim().toLowerCase()),
  );
  const seenTitles = new Set();

  return (publishedProjects || [])
    .filter((project) => project.showOnChapter !== false)
    .filter((project) => chapterKeys.has(String(project.chapter || '').trim().toLowerCase()))
    .filter((project) => {
      const key = String(project.name || '').trim().toLowerCase();
      if (!key || seenTitles.has(key)) {
        return false;
      }

      seenTitles.add(key);
      return true;
    });
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

function getProjectName(project, language) {
  return getLocalizedText(project?.nameTranslations, language, project?.name || project?.title || '');
}

function getProjectSubtitle(project, language) {
  return getLocalizedText(project?.subtitle, language, '');
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

function getGoogleDriveFolderId(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    const isGoogleDriveUrl = ['drive.google.com', 'drive.usercontent.google.com'].includes(host);

    if (!isGoogleDriveUrl) {
      return '';
    }

    const queryId = url.searchParams.get('id')?.trim();
    if (queryId) {
      return queryId;
    }

    const folderMatch = url.pathname.match(/\/folders\/([^/]+)/);
    return folderMatch?.[1] ? decodeURIComponent(folderMatch[1]).trim() : '';
  } catch {
    return '';
  }
}

function normalizeImageUrl(value, version) {
  const cleanValue = String(value || '').trim();
  if (!cleanValue) {
    return '';
  }

  const googleDriveFileId = getGoogleDriveFileId(cleanValue);
  if (googleDriveFileId) {
    return getDriveImageProxyUrl(googleDriveFileId, version);
  }

  return addRemoteImageCacheBuster(cleanValue, version);
}

function getDriveImageProxyUrl(fileId, version) {
  const params = new URLSearchParams({
    id: fileId,
  });

  if (version) {
    params.set('v', String(version));
  }

  return `/api/drive-image?${params.toString()}`;
}

function addRemoteImageCacheBuster(value, version) {
  const cleanValue = String(value || '').trim();
  if (!cleanValue || !version) {
    return cleanValue;
  }

  try {
    const url = new URL(cleanValue);
    const host = url.hostname.toLowerCase();
    const isGoogleHostedImage =
      ['drive.google.com', 'drive.usercontent.google.com'].includes(host) ||
      host.endsWith('.googleusercontent.com');

    if (!isGoogleHostedImage) {
      return cleanValue;
    }

    url.searchParams.set('v', String(version));
    return url.toString();
  } catch {
    return cleanValue;
  }
}

function normalizeDriveFolderUrl(value) {
  const cleanValue = String(value || '').trim();
  if (!cleanValue) {
    return '';
  }

  const googleDriveFolderId = getGoogleDriveFolderId(cleanValue);
  if (googleDriveFolderId) {
    return `https://drive.google.com/drive/folders/${encodeURIComponent(googleDriveFolderId)}`;
  }

  try {
    const url = new URL(cleanValue);
    const isDriveHost = ['drive.google.com', 'drive.usercontent.google.com'].includes(
      url.hostname.toLowerCase(),
    );
    return isDriveHost && ['http:', 'https:'].includes(url.protocol) ? url.toString() : '';
  } catch {
    return '';
  }
}

function normalizeGalleryImages(value, version) {
  const rawImages = Array.isArray(value)
    ? value
    : String(value || '')
        .split(/\r?\n|,/)
        .map((item) => item.trim());

  return getUniqueUrls(rawImages.map((imageUrl) => normalizeImageUrl(imageUrl, version)).filter(Boolean)).slice(
    0,
    24,
  );
}

function getUniqueUrls(urls) {
  const uniqueUrls = [];
  const seen = new Set();

  urls.filter(Boolean).forEach((url) => {
    if (seen.has(url)) {
      return;
    }

    seen.add(url);
    uniqueUrls.push(url);
  });

  return uniqueUrls;
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

function getSearchTokens(value) {
  return normalizeSearchText(value).split(/\s+/).filter(Boolean);
}

function hasMatchingNameTokens(memberName, targetName) {
  const memberTokens = getSearchTokens(memberName);
  const targetTokens = getSearchTokens(targetName);

  if (!memberTokens.length || !targetTokens.length) {
    return false;
  }

  return (
    targetTokens.every((token) => memberTokens.includes(token)) ||
    memberTokens.every((token) => targetTokens.includes(token))
  );
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
    members.find((member) => hasMatchingNameTokens(member.name, name)) ||
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

  return Math.min(260, Math.max(100, Math.round(numberValue)));
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

function getProjectPhotoStyle(project) {
  const x = clampPercentage(project?.photoPositionX);
  const y = clampPercentage(project?.photoPositionY);
  const zoom = clampPhotoZoom(project?.photoZoom);

  return {
    objectPosition: `${x}% ${y}%`,
    transform: `scale(${zoom / 100})`,
    transformOrigin: `${x}% ${y}%`,
  };
}

function getProjectPreviewSrc(project, isDarkMode) {
  return (
    (isDarkMode && project?.previewDark ? project.previewDark : project?.preview) ||
    project?.galleryImages?.[0] ||
    '/assets/ramo-ieee-ufjf-blue.svg'
  );
}

function normalizeRemoteMember(member, refreshVersion) {
  if (!member?.name) {
    return null;
  }

  const photoVersion =
    member.photoUpdatedAt || member.photoUpdated_at || member.updatedAt || member.updated_at || refreshVersion;
  const photoUrl = normalizeImageUrl(member.photoUrl, photoVersion);

  return {
    bio: {
      en: member.bioEn || member.bio || '',
      pt: member.bio || '',
    },
    chapters: Array.isArray(member.chapters) ? member.chapters : [],
    id: `atas-${member.id || member.name}`,
    name: member.name,
    photoUrl,
    photoPositionX: clampPercentage(member.photoPositionX),
    photoPositionY: clampPercentage(member.photoPositionY),
    photoZoom: clampPhotoZoom(member.photoZoom),
    position: Number.isFinite(Number(member.position)) ? Number(member.position) : 0,
    role: member.role || 'Membro',
  };
}

function normalizeRemoteProject(project, refreshVersion) {
  if (!project?.title) {
    return null;
  }

  const title = project.title || '';
  const translatedTitle = project.titleEn || title;
  const subtitle = project.subtitle || '';
  const translatedSubtitle = project.subtitleEn || subtitle;
  const detailDescription = project.description || subtitle;
  const translatedDetailDescription = project.descriptionEn || detailDescription;
  const imageVersion =
    project.imageUpdatedAt ||
    project.imageUpdated_at ||
    project.updatedAt ||
    project.updated_at ||
    refreshVersion;
  const galleryImages = normalizeGalleryImages(project.galleryImages, imageVersion);
  const preview = normalizeImageUrl(project.imageUrl, imageVersion) || galleryImages[0] || '';

  return {
    chapter: project.chapter || 'Ramo',
    description: {
      en: translatedSubtitle,
      pt: subtitle,
    },
    detailDescription: {
      en: translatedDetailDescription,
      pt: detailDescription,
    },
    driveFolderUrl: normalizeDriveFolderUrl(project.driveFolderUrl),
    galleryImages,
    id: `project-${project.id || project.title}`,
    isPublic: Boolean(project.isPublic),
    name: title,
    nameTranslations: {
      en: translatedTitle,
      pt: title,
    },
    photoPositionX: clampPercentage(project.photoPositionX),
    photoPositionY: clampPercentage(project.photoPositionY),
    photoZoom: clampPhotoZoom(project.photoZoom),
    position: Number.isFinite(Number(project.position)) ? Number(project.position) : 0,
    preview,
    showOnChapter: typeof project.showOnChapter === 'boolean' ? project.showOnChapter : true,
    showOnHome: typeof project.showOnHome === 'boolean' ? project.showOnHome : true,
    subtitle: {
      en: translatedSubtitle,
      pt: subtitle,
    },
    url: normalizeLinkUrl(project.linkUrl),
  };
}

function normalizeRemoteHistoryPhoto(photo, refreshVersion) {
  const imageVersion =
    photo?.imageUpdatedAt || photo?.imageUpdated_at || photo?.updatedAt || photo?.updated_at || refreshVersion;
  const src = normalizeImageUrl(photo?.imageUrl, imageVersion);
  if (!src) {
    return null;
  }

  const title = String(photo.title || '').trim();
  const description = String(photo.description || '').trim();
  const year = Number.isFinite(Number(photo.year)) ? Number(photo.year) : 0;

  return {
    alt: {
      en: title || 'Historical IEEE UFJF Student Branch photo',
      pt: title || 'Foto histórica do Ramo Estudantil IEEE UFJF',
    },
    description,
    id: `history-photo-${photo.id || src}`,
    photoPositionX: clampPercentage(photo.photoPositionX),
    photoPositionY: clampPercentage(photo.photoPositionY),
    photoZoom: clampPhotoZoom(photo.photoZoom),
    position: Number.isFinite(Number(photo.position)) ? Number(photo.position) : 0,
    src,
    title,
    year,
  };
}

function sortHistoryPhotos(photos) {
  return [...photos].sort((firstPhoto, secondPhoto) => {
    const firstYear = Number(firstPhoto.year) || 9999;
    const secondYear = Number(secondPhoto.year) || 9999;

    if (firstYear !== secondYear) {
      return firstYear - secondYear;
    }

    return (Number(firstPhoto.position) || 0) - (Number(secondPhoto.position) || 0);
  });
}

function mergePublishedProjects(fixedProjects, remoteProjects) {
  const mergedProjects = [...fixedProjects];
  const projectIndexByKey = new Map();

  fixedProjects.forEach((project, index) => {
    [project.id, project.name]
      .map((value) => String(value || '').trim().toLowerCase())
      .filter(Boolean)
      .forEach((key) => projectIndexByKey.set(key, index));
  });

  remoteProjects.forEach((project) => {
    const keys = [
      String(project.id || '').trim().toLowerCase(),
      String(project.name || '').trim().toLowerCase(),
    ].filter(Boolean);
    const existingIndex = keys
      .map((key) => projectIndexByKey.get(key))
      .find((index) => Number.isInteger(index));

    if (Number.isInteger(existingIndex)) {
      mergedProjects[existingIndex] = {
        ...mergedProjects[existingIndex],
        ...project,
        id: mergedProjects[existingIndex].id,
      };
      return;
    }

    mergedProjects.push(project);
    const nextIndex = mergedProjects.length - 1;
    keys.forEach((key) => projectIndexByKey.set(key, nextIndex));
  });

  return mergedProjects;
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
