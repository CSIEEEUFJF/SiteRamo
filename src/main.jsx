import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ExternalLink, Github, Instagram, Moon, X } from 'lucide-react';
import './styles.css';

const chapters = [
  {
    id: 'aess',
    sigla: 'AESS',
    nome: 'Aerospace and Electronic Systems Society',
    logo: '/assets/chapters/aess.svg',
    darkLogo: '/assets/chapters/dark/aess.svg',
    descricao:
      'Capítulo voltado a sistemas aeroespaciais, aviação, eletrônica embarcada e tecnologias aplicadas a ambientes complexos.',
    instagram: '',
    president: { nome: 'Brendo Almeida', foto: '' },
  },
  {
    id: 'aps',
    sigla: 'AP-S',
    nome: 'Antennas and Propagation Society',
    logo: '/assets/chapters/aps.svg',
    darkLogo: '/assets/chapters/dark/aps.svg',
    descricao:
      'Capítulo dedicado ao estudo de antenas, propagação eletromagnética, radiofrequência e comunicações sem fio.',
    instagram: '',
    president: { nome: 'Pedro Fuzimoto', foto: '/assets/presidents/pedro-fuzimoto.png' },
  },
  {
    id: 'comsoc',
    sigla: 'ComSoc',
    nome: 'Communications Society',
    logo: '/assets/chapters/comsoc.png',
    darkLogo: '/assets/chapters/dark/comsoc.png',
    descricao:
      'Capítulo focado em redes, telecomunicações, conectividade, protocolos e tecnologias que sustentam sistemas de comunicação.',
    instagram: '',
    president: { nome: 'Pedro Fuzimoto', foto: '/assets/presidents/pedro-fuzimoto.png' },
  },
  {
    id: 'cs',
    sigla: 'CS',
    nome: 'Computer Society',
    logo: '/assets/chapters/cs.jpg',
    darkLogo: '/assets/chapters/dark/cs.png',
    descricao:
      'Capítulo dedicado à computação, software, inteligência artificial, segurança, sistemas e formação técnica em tecnologia.',
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
    descricao:
      'Capítulo voltado à educação em engenharia, aprendizagem, metodologias de ensino e iniciativas de capacitação técnica.',
    instagram: '',
    president: { nome: 'Fabrício Prata', foto: '/assets/presidents/fabricio-prata.png' },
  },
  {
    id: 'ias',
    sigla: 'IAS',
    nome: 'Industry Applications Society',
    logo: '/assets/chapters/ias.png',
    darkLogo: '/assets/chapters/dark/ias.png',
    descricao:
      'Capítulo que conecta aplicações industriais, automação, máquinas elétricas, processos produtivos e tecnologia aplicada.',
    instagram: 'https://www.instagram.com/ieeeiasufjf/',
    president: { nome: 'Lauro Abdallah', foto: '/assets/presidents/lauro-abdallah.png' },
  },
  {
    id: 'pes',
    sigla: 'PES',
    nome: 'Power & Energy Society',
    logo: '/assets/chapters/pes.png',
    darkLogo: '/assets/chapters/dark/pes.png',
    descricao:
      'Capítulo voltado à energia elétrica, sistemas de potência, geração, transmissão, distribuição e transição energética.',
    instagram: 'https://www.instagram.com/ieeepesufjf/',
    president: { nome: 'Pedro Temponi', foto: '' },
  },
  {
    id: 'ras',
    sigla: 'RAS',
    nome: 'Robotics and Automation Society',
    logo: '/assets/chapters/ras.jpg',
    darkLogo: '/assets/chapters/dark/ras.png',
    descricao:
      'Capítulo focado em robótica, automação, sistemas embarcados, controle, percepção e projetos práticos multidisciplinares.',
    instagram: '',
    github: 'https://github.com/RASIEEEUFJF',
    president: { nome: 'Endhel Andrade', foto: '' },
  },
  {
    id: 'sight',
    sigla: 'SIGHT',
    nome: 'Special Interest Group on Humanitarian Technology',
    logo: '/assets/chapters/sight.png',
    darkLogo: '/assets/chapters/dark/sight.png',
    descricao:
      'Grupo voltado à tecnologia humanitária, impacto social, acessibilidade, sustentabilidade e soluções para comunidades.',
    instagram: '',
    president: { nome: 'Carlos Alexandre', foto: '/assets/presidents/carlos-alexandre.png' },
  },
  {
    id: 'vts',
    sigla: 'VTS',
    nome: 'Vehicular Technology Society',
    logo: '/assets/chapters/vts.svg',
    darkLogo: '/assets/chapters/dark/vts.svg',
    descricao:
      'Capítulo dedicado à mobilidade, sistemas veiculares, transporte inteligente, comunicação veicular e tecnologias automotivas. No Ramo Estudantil IEEE UFJF, é uma parceria com a equipe RAMPAGE BAJA.',
    instagram: 'https://www.instagram.com/rampagebaja/',
    president: { nome: 'Matheus Nery', foto: '' },
  },
  {
    id: 'wie',
    sigla: 'WIE',
    nome: 'Women in Engineering',
    logo: '/assets/chapters/wie.png',
    darkLogo: '/assets/chapters/dark/wie.png',
    descricao:
      'Grupo de afinidade dedicado a fortalecer a presença, permanência e liderança de mulheres nas engenharias e tecnologia.',
    instagram: '',
    president: { nome: 'Camila Porto', foto: '' },
  },
];

const boardMembers = [
  {
    role: 'Presidente',
    name: 'Camila Porto',
    photo: '',
  },
  {
    role: 'Vice-Presidente',
    name: 'Pedro Fuzimoto',
    photo: '/assets/presidents/pedro-fuzimoto.png',
  },
  {
    role: 'Webmaster',
    name: 'Endhel Andrade',
    photo: '',
  },
  {
    role: 'Secretário',
    name: 'Raul Moraes',
    photo: '',
  },
  {
    role: 'Tesoureiro',
    name: 'Fabrício Prata',
    photo: '/assets/presidents/fabricio-prata.png',
  },
];

const projects = [
  {
    id: 'entense',
    name: 'ENTENSE',
    url: 'https://entense.ieeeufjf.com.br',
    displayUrl: 'entense.ieeeufjf.com.br',
    description: 'Encontro de Tecnologias e Engenharia',
    preview: '/assets/projects/entense-preview.png',
  },
  {
    id: 'helpieee',
    name: 'HELPIEEE',
    url: 'https://help.ieeeufjf.com.br',
    displayUrl: 'help.ieeeufjf.com.br',
    description: 'Guia do Calouro',
    preview: '/assets/projects/helpieee-preview.png',
  },
];

const mapsEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4558.946106024073!2d-43.37522762383733!3d-21.778392998521973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x989ba3d97601f7%3A0xcf9f2fb389a7f742!2sRamo%20Estudantil%20IEEE%20UFJF!5e1!3m2!1sen!2sbr!4v1779591238371!5m2!1sen!2sbr';

function App() {
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem('theme') === 'dark';
  });
  const detailRef = useRef(null);
  const selectedChapter = useMemo(
    () => chapters.find((chapter) => chapter.id === selectedChapterId),
    [selectedChapterId],
  );

  useEffect(() => {
    if (!selectedChapter || !detailRef.current) {
      return undefined;
    }

    const focusTimer = window.setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      detailRef.current?.focus({ preventScroll: true });
    }, 80);

    return () => window.clearTimeout(focusTimer);
  }, [selectedChapter]);

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light';
    window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <main>
      <section className="hero" id="topo" aria-label="Ramo Estudantil IEEE UFJF">
        <div className="hero__content">
          <div
            className="hero-brand"
            aria-label="Universidade Federal de Juiz de Fora IEEE Student Branch"
          >
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
                <span className="desktop-line">Universidade Federal de Juiz de Fora</span>
                <span className="mobile-line">Universidade Federal</span>
                <span className="mobile-line">de Juiz de Fora</span>
              </h1>
              <p>IEEE Student Branch</p>
            </div>
          </div>
          <a className="hero__scroll" href="#navegacao" aria-label="Ir para a navegação">
            <ArrowDown aria-hidden="true" size={22} />
          </a>
        </div>
      </section>

      <div className="nav-anchor" id="navegacao" aria-hidden="true" />
      <nav className="mini-nav" aria-label="Navegação principal">
        <a className="mini-nav__brand" href="#topo" aria-label="Voltar ao topo">
          <span className="mini-nav__mark" aria-hidden="true" />
          <span className="mini-nav__brand-text">
            <strong>Universidade Federal de Juiz de Fora</strong>
            <span>IEEE Student Branch</span>
          </span>
        </a>
        <div className="mini-nav__links">
          <a href="#capitulos">Capítulos</a>
          <a href="#diretoria">Diretoria</a>
          <a href="#projetos">Projetos</a>
          <a href="#contato">Contato</a>
          <button
            className="mini-nav__theme"
            type="button"
            onClick={() => setIsDarkMode((currentTheme) => !currentTheme)}
            aria-label={isDarkMode ? 'Desativar modo escuro' : 'Ativar modo escuro'}
            aria-pressed={isDarkMode}
          >
            <Moon aria-hidden="true" size={18} />
          </button>
        </div>
      </nav>

      <section className="chapters" id="capitulos" aria-labelledby="capitulos-title">
        <div className="section-heading">
          <span>Capítulos e Grupos de Afinidade</span>
          <h2 id="capitulos-title">Nossos capítulos</h2>
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
              aria-label={`Abrir detalhes de ${nome}`}
            >
              {logo ? (
                <img
                  className={`chapter-card__logo chapter-card__logo--${id}`}
                  src={isDarkMode && darkLogo ? darkLogo : logo}
                  alt={`Logo ${nome}`}
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
            ref={detailRef}
            tabIndex={-1}
            aria-labelledby="chapter-detail-title"
            aria-live="polite"
          >
            <button
              className="chapter-detail__close"
              type="button"
              onClick={() => setSelectedChapterId(null)}
              aria-label="Fechar detalhes do capítulo"
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
                    alt={`Logo ${selectedChapter.sigla}`}
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
                <p>{selectedChapter.descricao}</p>

                <div className="chapter-detail__links" aria-label="Links do capítulo">
                  <ChapterLink
                    href={selectedChapter.instagram}
                    icon={<Instagram aria-hidden="true" size={18} />}
                    label="Instagram"
                  />
                  {'github' in selectedChapter && (
                    <ChapterLink
                      href={selectedChapter.github}
                      icon={<Github aria-hidden="true" size={18} />}
                      label="GitHub"
                    />
                  )}
                </div>
              </div>
            </div>

            <aside className="president-card" aria-label={`Presidente ${selectedChapter.sigla}`}>
              {selectedChapter.president.foto ? (
                <img
                  className="president-card__photo"
                  src={selectedChapter.president.foto}
                  alt={`Foto de ${selectedChapter.president.nome}`}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="president-card__photo president-card__photo--empty">
                  <span>{selectedChapter.sigla}</span>
                </div>
              )}
              <div>
                <span>Presidente</span>
                <strong>{selectedChapter.president.nome}</strong>
              </div>
            </aside>
          </article>
        )}
      </section>

      <section className="board" id="diretoria" aria-labelledby="diretoria-title">
        <div className="section-heading">
          <span>Diretoria do Ramo</span>
          <h2 id="diretoria-title">Nossa diretoria</h2>
        </div>

        <div className="board-grid">
          {boardMembers.map(({ role, name, photo }) => (
            <article className="board-card" key={`${role}-${name}`}>
              <div className="board-card__photo-wrap">
                {photo ? (
                  <img
                    className="board-card__photo"
                    src={photo}
                    alt={`Foto de ${name}`}
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
                <span>{role}</span>
                <strong>{name}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="projects" id="projetos" aria-labelledby="projetos-title">
        <div className="section-heading">
          <span>Projetos</span>
          <h2 id="projetos-title">Nossos projetos</h2>
        </div>

        <div className="projects-grid">
          {projects.map(({ id, name, url, description, preview }) => (
            <a
              className={`project-card project-card--${id}`}
              href={url}
              target="_blank"
              rel="noreferrer"
              key={id}
              aria-label={`Abrir projeto ${name}`}
            >
              <div className="project-card__preview">
                <img
                  className="project-card__image"
                  src={preview}
                  alt={`Preview do projeto ${name}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="project-card__copy">
                <strong>{name}</strong>
                <p>{description}</p>
              </div>
              <ExternalLink className="project-card__icon" aria-hidden="true" size={20} />
            </a>
          ))}
        </div>
      </section>

      <section className="contact" id="contato" aria-labelledby="contato-title">
        <div className="section-heading">
          <span>Contato</span>
          <h2 id="contato-title">Fale com o Ramo</h2>
        </div>

        <div className="contact__layout">
          <div className="contact__copy">
            <span>Nossa localização</span>
            <h2>Faculdade de Engenharia - Universidade Federal de Juiz de Fora</h2>
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

          <div className="contact__map" aria-label="Mapa do Ramo Estudantil IEEE UFJF">
            <iframe
              src={mapsEmbedUrl}
              title="Mapa do Ramo Estudantil IEEE UFJF"
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

function ChapterLink({ href, icon, label }) {
  if (!href) {
    return (
      <span className="chapter-link chapter-link--empty">
        {icon}
        {label} em breve
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
