# Documentação da Landing Page

Esta documentação explica como a estrutura atual da landing page está organizada e como cada pasta e arquivo funciona.

## Visão geral

O projeto é uma landing page em Next.js 16 com React 19, focada em captar leads para uma agência digital. A página principal reúne seções de apresentação, diferenciais, serviços, processo e formulário de contato.

O fluxo principal é:

1. O usuário preenche o formulário de contato.
2. O componente `LeadForm` monta um payload com os dados do cliente.
3. A função `submitLead()` envia esses dados para um endpoint.
4. Hoje, por padrão, o sistema usa um mock e não envia para backend real.

---

## Estrutura de pastas

### app/

Responsável pela estrutura principal de rotas e metadata do site.

#### app/page.tsx

É a página inicial do site. Ela monta a home em ordem:

- Header
- Hero
- Benefits
- Audience
- Services
- Process
- Differentials
- CtaBanner
- LeadForm
- Footer
- WhatsAppButton

Ou seja, esta página é o “layout completo” da landing page.

#### app/layout.tsx

Define o layout global do projeto.

- aplica a base HTML da aplicação
- define metadata do SEO do site
- usa as fontes Geist do Next.js
- inclui o CSS global `globals.css`

#### app/globals.css

Arquivo global de estilo.

- importa o Tailwind
- define paleta de cores
- define fundo com gradientes
- configura scroll suave
- ajusta textos e seleção

---

### components/

Contém blocos reutilizáveis e as seções da landing page.

#### components/header.tsx

Header fixo do site.

- exibe logo e nome da marca
- menu de navegação
- botão de CTA para “Solicitar orçamento”
- menu mobile responsivo
- muda visual quando a página faz scroll

#### components/footer.tsx

Rodapé do site.

- logo e marca
- links de navegação
- dados de contato
- links para WhatsApp e Instagram

#### components/whatsapp-button.tsx

Botão flutuante do WhatsApp.

- fica fixo no canto inferior direito
- abre o WhatsApp em nova aba
- dispara evento de tracking quando clicado

### components/sections/

Cada arquivo representa uma seção da landing page.

#### hero.tsx

Hero principal do site.

- título principal
- subtítulo
- CTA para contato
- destaque do valor da marca

#### benefits.tsx

Lista de benefícios que a empresa oferece.

#### audience.tsx

Mostra para quem o produto/serviço é voltado.

#### services.tsx

Explica os serviços prestados.

#### process.tsx

Apresenta o processo de trabalho.

#### differentials.tsx

Destaca diferenciais competitivos da agência.

#### cta-banner.tsx

Banner final com chamada para ação.

#### lead-form.tsx

Componente mais importante do fluxo de captação de clientes.

Responsabilidades:

- controlar os campos do formulário
- validar campos obrigatórios
- formatar telefone
- capturar UTMs da URL (`utm_source`, `utm_medium`, etc.)
- incluir informações como página de origem, referrer e timestamp
- enviar os dados usando a função `submitLead()`
- mostrar mensagens de loading, erro e sucesso

O formulário envia um payload com os seguintes campos:

- name
- phone
- email
- company
- businessType
- websiteType
- message
- source
- medium
- campaign
- content
- term
- landingPage
- referrer
- createdAt

---

### lib/

Arquivos utilitários para configuração e acompanhamento de eventos.

#### lib/config.ts

Centraliza as configurações públicas do site.

Exemplos:

- `whatsappNumber`
- `whatsappMessage`
- `instagramUrl`
- `leadApiUrl`
- `gaId`
- `gtmId`
- `metaPixelId`

Observação importante: a API de leads por padrão usa:

- `NEXT_PUBLIC_LEAD_API_URL ?? "/api/mock/leads"`

Ou seja, se a variável de ambiente não estiver configurada, a aplicação usa um valor de mock.

#### lib/tracking.ts

Responsável por eventos de analytics e rastreamento do front-end.

Funções incluídas:

- `trackEvent()`
- `trackCta()`
- `trackLeadStart()`
- `trackLeadSubmitted()`
- `trackWhatsappClick()`

Esses eventos são empurrados para `window.dataLayer` para uso em ferramentas como Google Tag Manager.

---

### services/

#### services/lead.service.ts

É o ponto de envio do formulário.

A lógica atual é:

- pega a URL da API via variável de ambiente
- se `NEXT_PUBLIC_LEAD_API_URL` não existir, usa `/api/mock/leads`
- se o endpoint for `"/api/mock/leads"`, não faz requisição real, apenas retorna sucesso
- se houver uma URL real, executa `fetch(endpoint, { method: "POST" ... })`

Ou seja, hoje esse serviço está em modo de simulação, não em modo de produção.

---

### types/

#### types/lead.ts

Define os tipos do payload e do status do envio.

- `LeadPayload`: modelo do formulário
- `LeadSubmissionStatus`: estados do formulário (`idle`, `loading`, `success`, `error`)

---

### public/

Pasta para arquivos públicos do projeto, como imagens, ícones e assets estáticos.

No caso atual, há pelo menos um ícone usado no header e no rodapé: `public/icon.svg`.

---

### Arquivos raiz

#### package.json

Define:

- nome do projeto
- scripts (`dev`, `build`, `start`, `lint`)
- dependências do Next.js, React e lucide-react

#### next.config.ts

Configuração principal do Next.js.

#### tsconfig.json

Configuração do TypeScript.

#### eslint.config.mjs

Configuração do ESLint.

#### postcss.config.mjs

Configuração do PostCSS/Tailwind.

#### README.md

Documentação inicial do projeto criada pelo scaffold do Next.js.

---

## Fluxo real de dados hoje

O fluxo atual do formulário é este:

1. Usuário preenche os campos do formulário em `LeadForm`.
2. O código monta um objeto com os dados do lead mais informações de campanha.
3. Chama `submitLead()` em `services/lead.service.ts`.
4. A função verifica a variável `NEXT_PUBLIC_LEAD_API_URL`.
5. Se ela não estiver configurada, usa `/api/mock/leads`.
6. Em vez de enviar para um backend real, a função retorna sucesso imediatamente.

Resultado prático:

- o formulário parece funcionar na interface
- os dados não são persistidos em nenhum banco
- não existe armazenamento real em produção hoje

---

## Conclusão

A estrutura da landing page está bem organizada para um site institucional com foco em conversão. O ponto de integração real ainda está pendente: a aplicação front-end já está preparada para enviar leads, mas o backend ainda não existe de forma real.

A próxima etapa ideal é criar uma API em Node/Next ou Java/Spring Boot para receber esse payload, validar e salvar os dados.
