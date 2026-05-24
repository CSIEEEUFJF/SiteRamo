import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, CircuitBoard, Network, Rocket, Satellite, Zap } from 'lucide-react';
import './styles.css';

const chapters = [
  { sigla: 'AESS', nome: 'Aerospace and Electronic Systems Society', icon: Satellite },
  { sigla: 'AP-S', nome: 'Antennas and Propagation Society', icon: Network },
  { sigla: 'ComSoc', nome: 'Communications Society', icon: Network },
  { sigla: 'CS', nome: 'Computer Society', icon: CircuitBoard },
  { sigla: 'IAS', nome: 'Industry Applications Society', icon: Zap },
  { sigla: 'PES', nome: 'Power & Energy Society', icon: Zap },
  { sigla: 'RAS', nome: 'Robotics and Automation Society', icon: Rocket },
  { sigla: 'SIGHT', nome: 'Special Interest Group on Humanitarian Technology', icon: CircuitBoard },
  { sigla: 'VTS', nome: 'Vehicular Technology Society', icon: Satellite },
  { sigla: 'WIE', nome: 'Women in Engineering', icon: Network },
];

function App() {
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
          {chapters.map(({ sigla, nome, icon: Icon }) => (
            <article className="chapter-card" key={sigla}>
              <div className="chapter-card__icon" aria-hidden="true">
                <Icon size={24} strokeWidth={1.8} />
              </div>
              <div>
                <h3>{sigla}</h3>
                <p>{nome}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-strip" id="contato" aria-label="Contato">
        <p>Ramo Estudantil IEEE UFJF</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
