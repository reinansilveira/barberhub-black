# BarberHub Black

Site de demonstração de uma barbearia premium: home com vídeo, agendamento online em etapas, perfil de cada profissional com avaliações, login e painel do profissional.

Roda em **modo demonstração**: os dados (profissionais, serviços, horários livres e avaliações) ficam em `src/site/demo.ts`. O agendamento vai até a confirmação, mas não grava nada.

## Rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Páginas

- `/` home com agendamento embutido
- `/agendar` agendamento em página própria
- `/profissionais/[id]` perfil, agenda e avaliações do profissional
- `/entrar` login (demonstração: é só clicar em Entrar)
- `/painel` painel do profissional

## Ligar um backend

Todas as leituras e o agendamento passam por `src/site/demo.ts` (`listTeam`, `fetchServices`, `fetchSlots`, `fetchAvailableDates`, `bookDemo`, `listReviews`). Para usar uma API, troque essas funções por chamadas HTTP com o mesmo formato de retorno.

## Publicar na Vercel

Importe o repositório na Vercel. Não precisa de variável de ambiente. Opcionais:

- `NEXT_PUBLIC_BUSINESS_WHATSAPP` número do WhatsApp (só dígitos, com 55)
- `NEXT_PUBLIC_BUSINESS_INSTAGRAM` usuário do Instagram

Fotos e vídeo vêm do Pexels e do Unsplash (licença gratuita), carregados por link.
