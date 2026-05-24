import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, Github, Instagram, X } from 'lucide-react';
import './styles.css';

const chapters = [
  {
    id: 'aess',
    sigla: 'AESS',
    nome: 'Aerospace and Electronic Systems Society',
    logo: '/assets/chapters/aess.svg',
    descricao:
      'Capitulo voltado a sistemas aeroespaciais, aviacao, eletronica embarcada e tecnologias aplicadas a ambientes complexos.',
    instagram: '',
    president: { nome: 'A definir', foto: '' },
  },
  {
    id: 'aps',
    sigla: 'AP-S',
    nome: 'Antennas and Propagation Society',
    logo: '/assets/chapters/aps.svg',
    descricao:
      'Capitulo dedicado ao estudo de antenas, propagacao eletromagnetica, radiofrequencia e comunicacoes sem fio.',
    instagram: '',
    president: { nome: 'A definir', foto: '' },
  },
  {
    id: 'comsoc',
    sigla: 'ComSoc',
    nome: 'Communications Society',
    logo: '/assets/chapters/comsoc.svg',
    descricao:
      'Capitulo focado em redes, telecomunicacoes, conectividade, protocolos e tecnologias que sustentam sistemas de comunicacao.',
    instagram: '',
    president: { nome: 'A definir', foto: '' },
  },
  {
    id: 'cs',
    sigla: 'CS',
    nome: 'Computer Society',
    logo: '/assets/chapters/cs.jpg',
    descricao:
      'Capitulo dedicado a computacao, software, inteligencia artificial, seguranca, sistemas e formacao tecnica em tecnologia.',
    instagram: '',
    github: '',
    president: { nome: 'A definir', foto: '' },
  },
  {
    id: 'edsoc',
    sigla: 'EdSoc',
    nome: 'Education Society',
    logo: '/assets/chapters/edsoc.png',
    descricao:
      'Capitulo voltado a educacao em engenharia, aprendizagem, metodologias de ensino e iniciativas de capacitacao tecnica.',
    instagram: '',
    president: { nome: 'A definir', foto: '' },
  },
  {
    id: 'ias',
    sigla: 'IAS',
    nome: 'Industry Applications Society',
    logo: '/assets/chapters/ias.png',
    descricao:
      'Capitulo que conecta aplicacoes industriais, automacao, maquinas eletricas, processos produtivos e tecnologia aplicada.',
    instagram: '',
    president: { nome: 'A definir', foto: '' },
  },
  {
    id: 'pes',
    sigla: 'PES',
    nome: 'Power & Energy Society',
    logo: '/assets/chapters/pes.png',
    descricao:
      'Capitulo voltado a energia eletrica, sistemas de potencia, geracao, transmissao, distribuicao e transicao energetica.',
    instagram: '',
    president: { nome: 'A definir', foto: '' },
  },
  {
    id: 'ras',
    sigla: 'RAS',
    nome: 'Robotics and Automation Society',
    logo: '/assets/chapters/ras.jpg',
    descricao:
      'Capitulo focado em robotica, automacao, sistemas embarcados, controle, percepcao e projetos praticos multidisciplinares.',
    instagram: '',
    github: '',
    president: { nome: 'A definir', foto: '' },
  },
  {
    id: 'sight',
    sigla: 'SIGHT',
    nome: 'Special Interest Group on Humanitarian Technology',
    logo: '/assets/chapters/sight.png',
    descricao:
      'Grupo voltado a tecnologia humanitaria, impacto social, acessibilidade, sustentabilidade e solucoes para comunidades.',
    instagram: '',
    president: { nome: 'A definir', foto: '' },
  },
  {
    id: 'vts',
    sigla: 'VTS',
    nome: 'Vehicular Technology Society',
    logo: '/assets/chapters/vts.svg',
    descricao:
      'Capitulo dedicado a mobilidade, sistemas veiculares, transporte inteligente, comunicacao veicular e tecnologias automotivas.',
    instagram: '',
    president: { nome: 'A definir', foto: '' },
  },
  {
    id: 'wie',
    sigla: 'WIE',
    nome: 'Women in Engineering',
    logo: '/assets/chapters/wie.png',
    descricao:
      'Grupo de afinidade dedicado a fortalecer a presenca, permanencia e lideranca de mulheres nas engenharias e tecnologia.',
    instagram: '',
    president: { nome: 'A definir', foto: '' },
  },
];

function App() {
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const selectedChapter = useMemo(
    () => chapters.find((chapter) => chapter.id === selectedChapterId),
    [selectedChapterId],
  );

  return (
    <main>
      <section className="hero" id="topo" aria-label="Ramo Estudantil IEEE UFJF">
        <div className="hero__content">
          <div className="hero-brand" aria-label="Universidade Federal de Juiz de Fora IEEE Student Branch">
            <img
              className="hero-brand__mark"
              src="/assets/ramo-ieee-ufjf.svg"
              alt=""
              aria-hidden="true"
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
          <a className="hero__scroll" href="#navegacao" aria-label="Ir para a navegacao">
            <ArrowDown aria-hidden="true" size={22} />
          </a>
        </div>
      </section>

      <div className="nav-anchor" id="navegacao" aria-hidden="true" />
      <nav className="mini-nav" aria-label="Navegacao principal">
        <a className="mini-nav__brand" href="#topo" aria-label="Voltar ao topo">
          <span className="mini-nav__mark" aria-hidden="true" />
          <span className="mini-nav__brand-text">
            <strong>Universidade Federal de Juiz de Fora</strong>
            <span>IEEE Student Branch</span>
          </span>
        </a>
        <div className="mini-nav__links">
          <a href="#capitulos">Capitulos</a>
          <a href="#contato">Contato</a>
        </div>
      </nav>

      <section className="chapters" id="capitulos" aria-labelledby="capitulos-title">
        <div className="section-heading">
          <span>Capitulos e Grupos de Afinidade</span>
          <h2 id="capitulos-title">Nossos capítulos</h2>
        </div>

        <div className="chapter-grid">
          {chapters.map(({ id, sigla, nome, logo }) => (
            <button
              className={`chapter-card ${selectedChapterId === id ? 'chapter-card--active' : ''}`}
              key={id}
              type="button"
              onClick={() => setSelectedChapterId(id)}
              aria-expanded={selectedChapterId === id}
              aria-controls="chapter-detail"
              aria-label={`Abrir detalhes de ${nome}`}
            >
              {logo ? (
                <img className="chapter-card__logo" src={logo} alt={`Logo ${nome}`} />
              ) : (
                <span className="chapter-card__placeholder" aria-hidden="true">
                  {sigla}
                </span>
              )}
            </button>
          ))}
        </div>

        {selectedChapter && (
          <article className="chapter-detail" id="chapter-detail" aria-live="polite">
            <button
              className="chapter-detail__close"
              type="button"
              onClick={() => setSelectedChapterId(null)}
              aria-label="Fechar detalhes do capitulo"
            >
              <X aria-hidden="true" size={20} />
            </button>

            <div className="chapter-detail__main">
              <div className="chapter-detail__logo-wrap">
                {selectedChapter.logo ? (
                  <img
                    className="chapter-detail__logo"
                    src={selectedChapter.logo}
                    alt={`Logo ${selectedChapter.sigla}`}
                  />
                ) : (
                  <span className="chapter-detail__placeholder">{selectedChapter.sigla}</span>
                )}
              </div>

              <div className="chapter-detail__copy">
                <span>{selectedChapter.nome}</span>
                <h3>{selectedChapter.sigla}</h3>
                <p>{selectedChapter.descricao}</p>

                <div className="chapter-detail__links" aria-label="Links do capitulo">
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

            <aside className="president-card" aria-label={`Presidencia ${selectedChapter.sigla}`}>
              {selectedChapter.president.foto ? (
                <img
                  className="president-card__photo"
                  src={selectedChapter.president.foto}
                  alt={`Foto de ${selectedChapter.president.nome}`}
                />
              ) : (
                <div className="president-card__photo president-card__photo--empty">
                  <span>{selectedChapter.sigla}</span>
                </div>
              )}
              <div>
                <span>Presidencia</span>
                <strong>{selectedChapter.president.nome}</strong>
              </div>
            </aside>
          </article>
        )}
      </section>

      <section className="contact-strip" id="contato" aria-label="Contato">
        <p>Ramo Estudantil IEEE UFJF</p>
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

createRoot(document.getElementById('root')).render(<App />);
