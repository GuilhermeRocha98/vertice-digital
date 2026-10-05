# Prompt para criação de backend em Java com Spring Boot

Use este prompt para gerar um backend simples em Java com Spring Boot, focado somente na captação das mensagens do formulário da landing page.

---

## Prompt pronto para uso

Crie um projeto em Java com Spring Boot 3 e Java 17, com foco em receber e armazenar os leads enviados pelo formulário da landing page.

Requisitos:

- Projeto inicializado com Spring Boot 3.x
- Estrutura padrão do Spring MVC com pacotes organizados: `controller`, `service`, `dto`, `entity`, `repository`, `config`
- API REST para receber dados do formulário de contato
- Endpoint `POST /api/leads` para criar um novo lead
- Endpoint `GET /api/leads` para listar todos os registros
- Endpoint opcional `GET /api/leads/{id}` para buscar um lead pelo ID
- Permitir CORS para o frontend da landing page
- Persistência em banco de dados em memória usando H2 para facilitar desenvolvimento e testes
- Caso o projeto seja para produção, também pode ser configurado para usar PostgreSQL, mas a versão inicial deve funcionar com H2
- Validar campos obrigatórios: nome, telefone, email, empresa, segmento, tipo de website
- Campos opcionais: mensagem, origem, campanha, termo, landingPage, referrer, createdAt
- O payload deve refletir exatamente os dados enviados pelo formulário da landing page
- Criar classes DTO para entrada e resposta
- Criar entidade JPA com estrutura compatível com o payload do formulário
- Criar repositório Spring Data JPA
- Criar service com lógica simples de cadastro
- Criar controller REST com resposta HTTP adequada
- Retornar `201 Created` quando o lead for cadastrado com sucesso
- Retornar `400 Bad Request` quando os campos obrigatórios estiverem vazios
- Retorna `200 OK` para listagem de leads
- Incluir `application.properties` com configuração do banco H2 e do console H2
- Incluir `spring.h2.console.enabled=true` e caminho do console em `/h2-console`
- Permitir acesso em localhost sem autenticação
- O backend deve ser simples, limpo e pronto para integração com a landing page

Estrutura do payload esperado do formulário:

```json
{
  "name": "João Silva",
  "phone": "(41) 99999-9999",
  "email": "joao@empresa.com",
  "company": "Empresa Exemplo",
  "businessType": "Serviços",
  "websiteType": "Landing Page",
  "message": "Preciso de um site para captar clientes.",
  "source": "google",
  "medium": "cpc",
  "campaign": "site",
  "content": "cta-home",
  "term": "agencia digital",
  "landingPage": "https://site.com",
  "referrer": "https://google.com",
  "createdAt": "2026-09-15T12:00:00.000Z"
}
```

Observações:

- Não criar autenticação, JWT, roles ou dashboard complexos
- Não criar múltiplos módulos
- Não criar integrações com CRM, WhatsApp ou e-mail neste primeiro passo
- O objetivo é somente capturar as mensagens do formulário e armazená-las corretamente
- O backend deve ser funcional, limpo e fácil de testar com Postman ou curl

Além disso, gere:

- um README simples explicando como rodar o projeto
- exemplo de comando `curl` para testar o endpoint
- exemplo de resposta JSON de sucesso
- uma breve explicação de cada classe criada

---

## Versão curta do prompt

Crie um backend Java com Spring Boot 3 e Java 17 para capturar leads de landing page. Crie uma API REST com `POST /api/leads` para receber nome, telefone, email, empresa, segmento, tipo de website, mensagem e campos extras de campanha/utm. Valide os campos obrigatórios, persista em H2 em memória e disponibilize `GET /api/leads` para listar registros. Use arquitetura simples com `controller`, `service`, `dto`, `entity`, `repository`, `config` e `application.properties`. Adicione CORS para o frontend, responda `201 Created` para sucesso, e `400 Bad Request` para erro de validação. Não criar autenticação nem funcionalidades extras. O objetivo é somente captar as mensagens do formulário.

---

## Exemplo de curl para testar

```bash
curl -X POST http://localhost:8080/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "phone": "(41) 99999-9999",
    "email": "joao@empresa.com",
    "company": "Empresa Exemplo",
    "businessType": "Serviços",
    "websiteType": "Landing Page",
    "message": "Preciso de um site para captar clientes.",
    "source": "google",
    "medium": "cpc",
    "campaign": "site",
    "createdAt": "2026-09-15T12:00:00.000Z"
  }'
```

---

## Exemplo de resposta JSON

```json
{
  "id": 1,
  "name": "João Silva",
  "phone": "(41) 99999-9999",
  "email": "joao@empresa.com",
  "company": "Empresa Exemplo",
  "businessType": "Serviços",
  "websiteType": "Landing Page",
  "message": "Preciso de um site para captar clientes.",
  "source": "google",
  "medium": "cpc",
  "campaign": "site",
  "createdAt": "2026-09-15T12:00:00.000Z"
}
```

---

## Observação final

Este prompt foi pensado para gerar um backend mínimo, funcional e pronto para receber o formulário da landing page sem adicionar excesso de complexidade.
