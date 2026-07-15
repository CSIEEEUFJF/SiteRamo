# Validacao do site publico - 2026-07-14

## Escopo

- 32 paginas: home, historia, projetos, oportunidades e 12 capitulos, em portugues e ingles.
- 3 APIs publicas: membros, projetos e fotos historicas.
- Viewport desktop de 1180 x 1050 px e viewport mobile de 390 x 844 px.
- Temas claro e escuro.

## Resultado automatizado

Comandos executados:

```bash
npm run build
npm run test:site
```

Resultado: 35 de 35 verificacoes aprovadas, sendo 32 paginas e 3 APIs.

## Verificacao estrutural no navegador

As 32 paginas foram abertas diretamente no navegador e aprovadas nos seguintes criterios:

- exatamente um titulo principal `h1` por pagina: 32/32;
- nenhuma imagem sem atributo `alt`: 32/32;
- nenhum botao, campo, seletor ou area de texto sem rotulo: 32/32;
- idioma do documento coerente com a rota: 32/32;
- nenhum overflow horizontal no viewport desktop: 32/32;
- nenhuma pagina vazia ou capitulo sem projeto, atividade ou plano: 32/32.

A rota inglesa de oportunidades tambem foi verificada em 390 x 844 px sem overflow horizontal.

## Continuidade em setembro de 2026

O workflow `.github/workflows/public-site-health-september-2026.yml` executa a verificacao publica diariamente durante setembro de 2026. Ele apenas consulta as paginas e APIs; nao altera conteudo nem inicia deploy.
