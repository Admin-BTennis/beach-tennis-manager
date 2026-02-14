# 🎾 Beach Tennis Manager - Manual do Usuário

Bem-vindo ao ecossistema digital de alta performance para a gestão de torneios de Beach Tennis. Este documento serve como guia completo para operação, gestão e segurança da plataforma.

---

## 🛠️ Tecnologias de Elite

O **Beach Tennis Manager** foi construído utilizando o que há de mais moderno no desenvolvimento web para garantir velocidade instantânea e confiabilidade:

- **React + Vite:** Uma interface ultra-rápida (Single Page Application) que não recarrega a página.
- **Firebase Realtime Database:** A tecnologia que permite que, no momento em que o árbitro clica em um ponto, a TV da arena atualize em milissegundos.
- **Tailwind CSS + Shadcn/UI:** Design System de alto padrão, garantindo que o sistema seja bonito, funcional e responsivo (funciona em qualquer celular ou tablet).
- **TypeScript:** Segurança no código para evitar erros inesperados durante o torneio.

---

## 🎯 Objetivo do Produto

Nossa missão é eliminar as fichas de papel e a lentidão na comunicação. O sistema conecta o **Organizador**, o **Árbitro** e o **Público** em uma única rede de dados em tempo real, profissionalizando o evento e dando transparência total aos resultados.

---

## 🏛️ Camadas do Sistema

### 1. Camada Administrativa (Gerenciamento)
É o "cérebro" do sistema. Através desta camada, o organizador pode:
- **Atletas Globais:** Cadastrar jogadores uma única vez para uso em qualquer torneio.
- **Arenas e Locais:** Configurar a estrutura física (quantas quadras cada arena possui).
- **Torneios:** Criar eventos, definir categorias e agendar partidas.
- **Controle de Quadras:** Gerenciar quais jogos estão em quais locais e gerar os PINs de acesso para os árbitros.

> **Segurança:** O acesso ao Admin é restrito por e-mail e senha. Mesmo que o link seja descoberto, ninguém entra sem autorização.

### 2. Camada do Árbitro (Controle de Quadra)
Interface otimizada para uso em dispositivos móveis (celulares) sob o sol.
- **Autoridade Máxima:** O árbitro seleciona a partida agendada para sua quadra e inicia o jogo.
- **Placar Realtime:** Pontuação de '0' a 'Game' com um simples toque.
- **Súmula Digital:** Espaço para anotações técnicas, advertências e ocorrências, salvas automaticamente.
- **Finalização:** Ao encerrar, o resultado é enviado imediatamente para o arquivo do torneio.

> **Acesso Seguro:** O árbitro entra no sistema através de um **PIN de 4 dígitos** exclusivo daquela quadra. O PIN pode ser encontrado no Admin, dentro do gerenciamento de quadras da arena.
> **Trava de Dispositivo:** Para evitar interferências, o link do árbitro não permite acesso simultâneo por dois aparelhos na mesma sessão.

### 3. Painel da Arena (Modo Aeroporto)
Uma interface de alto contraste projetada para ser exibida em TVs ou Telões na arena.
- Exibe os jogos em andamento com placares grandes e legíveis.
- Mostra as próximas chamadas e a categoria de cada partida.
- Mantém o público e os atletas informados sem a necessidade de locução constante.

### 4. Link Público (Transparência Total)
Implementamos uma visão pública dedicada para que amigos, clientes e interessados possam acompanhar o andamento dos campeonatos de qualquer lugar do mundo.
- Resultados em tempo real.
- Status das quadras e horários previstos.
- Ideal para ser compartilhado em grupos de WhatsApp e redes sociais.

---

## 🛡️ Segurança e Privacidade

- **Invisível aos Motores de Busca:** O sistema foi configurado para **não aparecer** em buscas do Google ou Bing. Isso garante que apenas pessoas com o link direto acessem a plataforma, mantendo a privacidade do torneio.
- **Acesso Hierárquico:** Ninguém sem login acessa o Admin, e ninguém sem o PIN da quadra acessa o painel do Árbitro.
- **USER_SECURITY.pdf:** Todos os detalhes técnicos de segurança, criptografia e proteção de dados estão listados no PDF enviado em anexo à documentação.

---

## ☁️ Gestão via Firebase

O sistema utiliza o Google Firebase para toda a inteligência de dados. Você pode adicionar novos administradores ou técnicos através do console oficial:

- **Visão Geral do Projeto:** [Firebase Console](https://console.firebase.google.com/project/beach-tennis-manager-9573a/overview)
- **Gestão de Usuários (Login/Senha):** [Firebase Auth - Users](https://console.firebase.google.com/project/beach-tennis-manager-9573a/authentication/users)

---

## ⚠️ Avisos Importantes

1.  **Senhas:** Mantenha suas credenciais administrativas guardadas em lugar seguro. Nunca compartilhe a senha do Admin com árbitros ou terceiros.
2.  **Sessão do Árbitro:** Lembre-se de fazer logout ao final do dia para liberar a sessão da quadra para o próximo turno.

---
© 2026 **Módulo Web**. *Tecnologia a serviço do esporte.*
