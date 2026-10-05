This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Para acessar a aplicação a partir de outro dispositivo na mesma rede, execute:

```bash
npm run dev:network
```

Depois, abra `http://IP-DA-MAQUINA:3000` no outro dispositivo. O endereço IPv4 atual pode ser consultado com `ipconfig`.

Esse comando expõe a aplicação somente na rede local. Para acesso pela internet, use um túnel como Cloudflare Tunnel/ngrok ou faça o deploy da aplicação. O formulário também precisa de uma API acessível externamente configurada em `NEXT_PUBLIC_LEAD_API_URL`; o valor padrão `http://localhost:8080/api/leads` funciona apenas na própria máquina.

## Backend de leads

O formulário envia os dados usando `POST http://localhost:8080/api/leads`.

Inicie o backend Spring Boot na porta `8080` antes de testar o formulário. Para alterar o endereço da API, defina `NEXT_PUBLIC_LEAD_API_URL` no ambiente do Next.js.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
