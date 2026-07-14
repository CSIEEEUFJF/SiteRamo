# Site do Ramo Estudantil IEEE UFJF

Documentacao principal do projeto `SiteRamo`.

Ultima revisao desta documentacao: `2026-06-28`

## 1. Visao geral

Este repositorio implementa o site publico do **Ramo Estudantil IEEE UFJF**. O site e uma aplicacao React com Vite, preparada para:

- apresentar o Ramo, sua historia, capitulos, diretoria, projetos, membros, contato e localizacao;
- disponibilizar versao em portugues e ingles;
- consumir dados publicos vindos do Sistema Interno, publicado em `interno.ieeeufjf.com.br`;
- exibir projetos, membros, fotos da pagina inicial e fotos historicas cadastrados pela diretoria no Sistema Interno;
- manter paginas estaticas e responsivas para os capitulos;
- preservar identidade visual aprovada do Ramo e fontes locais Formata.

O site foi evoluido para ser leve, direto e navegavel em dispositivos mais simples. Por isso, varias decisoes atuais priorizam renderizacao client-side simples, poucas dependencias e assets locais sempre que possivel.

## 2. Estado atual

Funciona hoje:

- homepage com hero, bloco sobre o IEEE, historia resumida, capitulos, diretoria, projetos, membros, contato e localizacao;
- rotas internas para historia, todos os projetos e paginas individuais de capitulos;
- alternancia de tema claro/escuro;
- alternancia de idioma portugues/ingles;
- navbar responsiva, com menu expansivel em telas menores;
- destaque dinamico da secao visivel na navbar;
- carrossel de logos historicas do Ramo;
- carrossel de fotos historicas importadas do Sistema Interno;
- cards de projetos com tags de capitulo e popup para projetos sem link externo;
- consumo de APIs publicas do Sistema Interno com fallback para dados estaticos;
- metadados e SEO basicos em portugues e ingles;
- sitemap e robots em `public`.

Pontos importantes do estado atual:

- a rota publica `/admin` foi removida; a administracao do conteudo do site fica dentro do Sistema Interno;
- os dados dinamicos vem das rotas `/api/atas-site-*` deste projeto e, como fallback, de `https://interno.ieeeufjf.com.br/api/site-*`;
- as fotos do Google Drive sao normalizadas para thumbnails publicas quando cadastradas pelo Sistema Interno;
- o site e uma SPA com rotas tratadas no cliente e rewrites configurados para Vercel.

## 3. Tecnologias

Principais tecnologias:

- React 19
- Vite 7
- `lucide-react` para icones
- CSS proprio em `src/styles.css`
- fontes Formata locais em `public/@font`
- deploy esperado na Vercel

Scripts disponiveis:

```bash
npm run dev
npm run build
npm run preview
```

## 4. Estrutura do repositorio

Principais diretorios:

- [`src`](./src): aplicacao React, dados estaticos, componentes internos e estilos.
- [`api`](./api): funcoes serverless usadas para espelhar dados publicos vindos do Sistema Interno.
- [`public`](./public): assets publicos, logos, fotos, fontes, `robots.txt` e `sitemap.xml`.
- [`dist`](./dist): build gerado pelo Vite.

Arquivos principais:

- [`src/main.jsx`](./src/main.jsx): aplicacao inteira, dados estaticos, roteamento client-side, paginas e componentes.
- [`src/styles.css`](./src/styles.css): estilos globais, temas, responsividade, carrosseis, cards e modais.
- [`vite.config.js`](./vite.config.js): configuracao de build.
- [`vercel.json`](./vercel.json): rewrites, headers e configuracao de deploy.
- [`index.html`](./index.html): entrada da versao em portugues.
- [`en.html`](./en.html): entrada/metadados da versao em ingles.

## 5. Arquitetura de software

## 5.1 Aplicacao React

A aplicacao e montada em [`src/main.jsx`](./src/main.jsx). O componente principal `App` concentra:

- leitura do caminho atual (`window.location.pathname`);
- normalizacao do idioma por prefixo `/en`;
- alternancia de tema;
- carregamento de dados dinamicos;
- destaque da secao ativa;
- selecao de capitulo, membro e projeto em popups;
- roteamento para homepage, historia, projetos e capitulos.

O site usa dados estaticos como base e substitui partes por dados da API quando disponiveis. Isso evita pagina quebrada caso o Sistema Interno esteja indisponivel.

## 5.2 Estilos e temas

Os estilos ficam em [`src/styles.css`](./src/styles.css).

O tema claro usa fundo claro, texto escuro e azul IEEE. O tema escuro usa paleta escura semelhante ao padrao solicitado para o sistema, com destaques em branco na navbar ativa e azul IEEE em acoes.

Variaveis de tema ficam em `:root` e `:root[data-theme="dark"]`.

## 5.3 Assets

Assets principais:

- `public/assets/ramo-ieee-ufjf.svg`: logo branca do Ramo.
- `public/assets/ramo-ieee-ufjf-blue.svg`: logo azul do Ramo.
- `public/assets/history`: logos historicas usadas no carrossel de historia.
- `public/assets/chapters`: logos claras dos capitulos.
- `public/assets/chapters/dark`: logos para modo escuro.
- `public/assets/projects`: previews estaticos de projetos fixos.
- `public/@font`: fontes Formata locais.

## 6. Paginas e secoes

## 6.1 Homepage

Rota:

- `/`
- `/en`

Secoes principais:

- **Hero**: chamada principal do Ramo e identidade visual.
- **O IEEE**: texto institucional sobre IEEE e Ramo, com blocos de missao, visao e valores.
- **Historia**: resumo historico do Ramo, botao para a pagina completa e carrossel de logos do Ramo.
- **Capitulos**: grade com logos dos capitulos e grupos de afinidade.
- **Diretoria**: membros da diretoria atual.
- **Projetos**: cards de projetos em destaque e botao para ver todos.
- **Membros**: galeria de membros com popup de biografia.
- **Contato**: e-mail e redes sociais.
- **Localizacao**: endereco do Ramo no segundo andar da Faculdade de Engenharia da UFJF e mapa.

Comportamentos:

- a navbar rola para secoes da propria homepage;
- o item ativo da navbar acompanha a secao visivel;
- no mobile, a navbar vira menu expansivel;
- o botao de historia leva para `/historia`;
- o botao de projetos leva para `/projetos`.

## 6.2 Pagina de historia

Rotas:

- `/historia`
- `/en/historia`

Funcoes:

- apresentar a historia institucional do Ramo;
- mostrar a logo atual dinamicamente em azul no tema claro e branca no tema escuro;
- exibir carrossel de logos historicas;
- exibir carrossel de fotos historicas cadastradas no Sistema Interno;
- manter legendas/titulos das fotos historicas;
- ordenar fotos historicas pelo ano extraido/cadastrado no Sistema Interno.

O carrossel de fotos historicas:

- carrega dados de `api/atas-site-history-photos.js`;
- usa loading ball enquanto os dados nao chegam;
- carrega as primeiras fotos com prioridade maior;
- aceita arraste com mouse ou toque;
- mantem animacao automatica lenta.

## 6.3 Pagina de todos os projetos

Rotas:

- `/projetos`
- `/en/projetos`

Funcoes:

- listar todos os projetos publicos;
- manter tags de capitulo acima do nome;
- abrir link externo quando o projeto tiver `linkUrl`;
- abrir popup detalhado quando o projeto nao tiver link externo;
- exibir slideshow de imagens quando o projeto tiver galeria;
- respeitar recorte, zoom e posicao definidos no Sistema Interno.

## 6.4 Paginas de capitulos

Rotas:

- `/capitulos/:id`
- `/en/capitulos/:id`

Capitulos suportados pela estrutura atual:

- AESS
- AP-S
- CAS
- ComSoc
- CS
- EdSoc
- IAS
- PES
- RAS
- SIGHT
- VTS
- WIE

Cada pagina de capitulo pode conter:

- hero com logo e descricao;
- ano de fundacao;
- presidente;
- links externos, como Instagram;
- projetos relacionados ao capitulo;
- popup de projeto no mesmo formato da homepage.

Os projetos relacionados sao puxados do mesmo conjunto de projetos publicos e filtrados por capitulo.

## 6.5 Popups de membros

Na secao de membros da homepage:

- cada card abre uma caixa de biografia;
- o destaque em modo escuro usa branco;
- o scroll enquadra o popup no centro;
- as biografias podem vir do banco do Sistema Interno;
- a traducao pode ser preenchida automaticamente no Sistema Interno usando DeepL.

## 6.6 Popups de capitulos

Na secao de capitulos:

- cada logo abre detalhes do capitulo;
- o usuario pode acessar a subpagina do capitulo quando ela existir;
- a ordem das logos segue a lista definida em `src/main.jsx`.

## 7. Dados dinamicos

## 7.1 Membros do site

Fonte:

- local: `/api/atas-site-members`
- fallback remoto: `https://interno.ieeeufjf.com.br/api/site-members`

Uso:

- substituir/atualizar a galeria de membros;
- exibir biografia em portugues ou ingles;
- posicionar e recortar fotos.

## 7.2 Projetos

Fonte:

- local: `/api/atas-site-projects`
- fallback remoto: `https://interno.ieeeufjf.com.br/api/site-projects`

Uso:

- renderizar projetos da homepage;
- renderizar pagina de todos os projetos;
- relacionar projetos com paginas de capitulos;
- exibir tags de capitulo;
- abrir link externo ou popup.

## 7.3 Fotos historicas

Fonte:

- local: `/api/atas-site-history-photos`
- fallback remoto: `https://interno.ieeeufjf.com.br/api/site-history-photos`

Uso:

- alimentar carrossel de fotos historicas;
- ordenar por ano;
- exibir titulo e descricao quando disponiveis.

## 7.4 Fotos da homepage

As fotos da homepage sao cadastradas no Sistema Interno. O site esta preparado para consumir esse conjunto quando a integracao estiver ativa no layout correspondente.

## 8. APIs serverless do site

## 8.1 `/api/atas-site-members`

Proxy publico para membros publicados no Sistema Interno.

Retorna:

- nome;
- cargo;
- capitulos;
- biografia em portugues;
- biografia em ingles;
- URL da foto;
- posicao e zoom da foto.

## 8.2 `/api/atas-site-projects`

Proxy publico para projetos publicados no Sistema Interno.

Retorna:

- titulo;
- subtitulo;
- descricao;
- capitulo;
- imagem principal;
- link externo;
- galeria;
- flags `showOnHome` e `showOnChapter`;
- posicao e zoom da imagem.

## 8.3 `/api/atas-site-history-photos`

Proxy publico para fotos historicas publicadas no Sistema Interno.

Retorna:

- titulo;
- descricao;
- ano;
- URL da imagem;
- posicao e zoom;
- ordem de exibicao.

## 9. Internacionalizacao

O idioma e controlado por prefixo de rota:

- portugues: `/`
- ingles: `/en`

O conteudo traduzido fica em objetos internos de `src/main.jsx`.

Regras atuais:

- navbar, titulos, botoes e textos institucionais trocam de idioma;
- biografias de membros usam `bio` em portugues e `bioEn` em ingles;
- projetos podem usar conteudo vindo do Sistema Interno;
- SEO possui versao para portugues e ingles via arquivos de entrada/metadados.

## 10. SEO e metadados

Arquivos relevantes:

- [`index.html`](./index.html)
- [`en.html`](./en.html)
- [`public/sitemap.xml`](./public/sitemap.xml)
- [`public/robots.txt`](./public/robots.txt)

Diretrizes atuais:

- em portugues, o nome institucional nos metadados e `Ramo Estudantil IEEE UFJF`;
- a identidade visual pode manter `IEEE Student Branch` no lockup da logo;
- o site deve preservar nomes oficiais de capitulos e sociedades IEEE.

## 11. Responsividade

Regras principais:

- desktop largo: navbar com atalhos visiveis;
- tablets entre aproximadamente 1024 e 1280 px: controles de idioma, tema e menu ficam a direita;
- smartphones: logo completa sem abreviacao e botoes abaixo/alinhados a esquerda;
- conteudos densos empilham em uma coluna;
- cards e popups mantem dimensoes estaveis para evitar saltos visuais.

## 12. Build e deploy

Build local:

```bash
npm install
npm run build
```

Ambiente de desenvolvimento:

```bash
npm run dev
```

Preview local:

```bash
npm run preview
```

Deploy esperado:

- Vercel;
- branch configurada conforme fluxo do projeto;
- rewrites em [`vercel.json`](./vercel.json) para rotas da SPA.

## 13. Variaveis e integracoes externas

O site publico em si nao depende de banco diretamente. Ele consome dados do Sistema Interno por HTTP.

Dependencias externas importantes:

- `interno.ieeeufjf.com.br` para dados dinamicos;
- Google Drive para thumbnails quando os links cadastrados no Sistema Interno apontam para Drive;
- navegador do usuario para renderizacao e tema.

## 14. Fluxos principais

## 14.1 Navegar pela homepage

1. Usuario abre `/`.
2. O site carrega dados estaticos e inicia chamadas para APIs publicas.
3. A navbar acompanha a secao em tela.
4. O usuario pode alternar idioma e tema.
5. Cards de capitulos, membros e projetos podem abrir popups.

## 14.2 Abrir historia completa

1. Usuario clica no CTA da secao de historia.
2. A rota muda para `/historia`.
3. A pagina renderiza texto institucional, logo atual e carrosseis.
4. Fotos historicas sao buscadas em runtime no Sistema Interno.

## 14.3 Abrir projeto

1. Usuario clica em um card de projeto.
2. Se o projeto tiver `linkUrl`, o site abre o link.
3. Se nao tiver `linkUrl`, abre popup com descricao e galeria.

## 14.4 Abrir capitulo

1. Usuario clica em uma logo na secao de capitulos.
2. O site mostra detalhes no popup.
3. Se houver pagina dedicada, o botao leva para `/capitulos/:id`.

## 15. Cuidados de manutencao

### 15.1 Performance

Cuidados:

- evitar bibliotecas grandes sem necessidade;
- comprimir imagens antes de colocar em `public`;
- preferir thumbnails do Google Drive, nao imagens originais enormes;
- manter carrosseis com `overflow` controlado para nao criar barras indesejadas;
- usar `loading="lazy"` em imagens fora da primeira dobra.

### 15.2 Acessibilidade

Cuidados:

- manter `alt` em logos e fotos;
- preservar `aria-label` em botoes de tema, idioma e menu;
- nao esconder informacao apenas por cor;
- garantir contraste adequado em modo claro e escuro.

### 15.3 Conteudo

Cuidados:

- manter `IEEE Student Branch` no lockup visual aprovado;
- usar `Ramo` em textos corridos em portugues quando essa for a decisao editorial;
- revisar textos em ingles sempre que textos em portugues forem alterados;
- evitar mojibake: salvar arquivos como UTF-8.

### 15.4 Dados dinamicos

Cuidados:

- se o Sistema Interno estiver offline, o site deve continuar com fallback estatico sempre que possivel;
- os dados publicados no Sistema Interno precisam estar marcados como publicos;
- imagens do Google Drive precisam estar compartilhadas publicamente para renderizar.

## 16. Checklist rapido de validacao

Depois de mudancas importantes, validar:

1. `npm run build`.
2. Homepage em portugues.
3. Homepage em ingles.
4. Tema claro e tema escuro.
5. Navbar desktop.
6. Navbar mobile.
7. Scroll para secoes da homepage.
8. Rota `/historia`.
9. Rota `/projetos`.
10. Pelo menos uma rota `/capitulos/:id`.
11. Popup de membro.
12. Popup de projeto sem link externo.
13. Projeto com link externo.
14. Carrossel de logos historicas.
15. Carrossel de fotos historicas.
16. Consumo das APIs publicas com Sistema Interno online.
17. Fallback visual quando dados dinamicos demorarem.

## 17. Arquivos mais importantes para manutencao

- [`src/main.jsx`](./src/main.jsx): conteudo, rotas, dados estaticos e componentes.
- [`src/styles.css`](./src/styles.css): temas, layout, responsividade e animacoes.
- [`api/atas-site-members.js`](./api/atas-site-members.js): proxy de membros.
- [`api/atas-site-projects.js`](./api/atas-site-projects.js): proxy de projetos.
- [`api/atas-site-history-photos.js`](./api/atas-site-history-photos.js): proxy de fotos historicas.
- [`public/assets`](./public/assets): imagens e logos.
- [`public/@font`](./public/@font): fontes Formata.
- [`vercel.json`](./vercel.json): deploy e rewrites.

## 18. Relacao com o Sistema Interno

O site publico nao possui painel administrativo proprio. Conteudos dinamicos sao administrados no Sistema Interno, dentro da area de diretoria:

- membros publicados no site;
- projetos publicados no site;
- fotos do slideshow da homepage;
- fotos historicas;
- relacao de projetos com capitulos.

Essa separacao evita uma rota publica de administracao no site e centraliza permissao, login e auditoria no sistema interno.

Este `README.md` deve ser tratado como a documentacao principal e mais completa do site publico.
