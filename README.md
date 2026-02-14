# 🎾 Beach Tennis Manager: A Revolução na Gestão de Torneios

O **Beach Tennis Manager** é um ecossistema digital de alta performance projetado para transformar a experiência de torneios de Beach Tennis. Mais do que um simples marcador de pontos, é uma plataforma de sincronização em tempo real que conecta organizadores, árbitros e atletas através de uma interface premium e intuitiva.

---

## � A Ideia & Visão de Produto

O projeto nasceu de uma necessidade latente no mercado de eventos esportivos: **a eliminação do papel e do delay.** 

Tradicionalmente, torneios sofrem com a demora na atualização de resultados e a confusão na gestão de quadras. Nossa visão foi criar um "sistema nervoso central" para o evento, onde:
1.  **O Árbitro é a autoridade digital:** Munido apenas de um celular, ele atualiza o mundo sobre o que acontece na quadra em milissegundos.
2.  **A Arena é viva:** As TVs do evento não são mais estáticas; elas narram visualmente o drama dos jogos ao vivo.
3.  **O Público está conectado:** Através de QR Codes, cada espectador tem um placar de bolso, sentindo a energia do torneio em tempo real.

O foco é a **Experiência do Usuário (UX)**, utilizando gatilhos mentais de performance e uma estética inspirada em marcas de luxo digital (Stripe, Linear, KarCash).

---

## 🛠️ Tecnologias Aplicadas

O sistema foi construído com o que há de mais moderno no ecossistema JavaScript para garantir escalabilidade e latência zero:

-   **Frontend:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) (Velocidade e reatividade)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn/UI](https://ui.shadcn.com/) (Design consistente e responsivo)
-   **Backend & Real-time:** [Firebase Realtime Database](https://firebase.google.com/docs/database) (WebSockets para sincronização instantânea)
-   **Icons & Visual:** [Lucide React](https://lucide.dev/)
-   **Lógica de Sincronização:** Técnica proprietária de *Multi-Path Data Sync* para espelhamento de dados entre partidas e quadras.

---

## 🚀 Principais Módulos

### 1. Painel Administrativo (O Cérebro)
Gestão global de categorias, atletas, arenas e quadras. Permite gerar chaves de eliminatórias e grupos com um clique e monitorar cada disputa em tempo real.

### 2. Interface do Árbitro (A Operação)
Design otimizado para operação sob luz solar, com botões de alta precisão e travas de segurança por dispositivo (Device Lock), garantindo que apenas o árbitro responsável altere o placar.

### 3. Arena Panel (A Emoção)
Modo carrossel dinâmico para TVs e telões. Alterna automaticamente entre as partidas "Ao Vivo", exibindo placares com contraste agressivo para legibilidade máxima em grandes ambientes.

### 4. Public View (O Engajamento)
Visão simplificada e elegante para atletas e torcedores, acessível via QR Code, sem necessidade de download ou login.

---

## 🛡️ Segurança e Robustez

-   **Lock de Dispositivo:** Cada partida em andamento é "selada" no dispositivo do árbitro inicial, evitando interferências acidentais.
-   **Gestão de Contingência:** O Admin possui autoridade para liberar partidas travadas remotamente em casos de falha de hardware na quadra.
-   **Integridade de Placar:** Persistência de dados ultra-resiliente, permitindo retomar de onde parou mesmo após perda de sinal de internet.

---

## 💻 Como Iniciar

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure as variáveis do [Firebase](https://console.firebase.google.com/)
4. Rode em desenvolvimento: `npm run dev`

---
© 2026 **Módulo Web**. Fundado por Cláudio Soares.
*Transformando ideias em produtos digitais de alta performance.*
