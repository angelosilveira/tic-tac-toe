# Jogo da Velha (Tic Tac Toe)

Um jogo da velha moderno e interativo construído com React, apresentando uma interface elegante, temas personalizáveis e funcionalidades avançadas.

![Jogo da Velha Preview]

## ✨ Funcionalidades

- 🎮 Gameplay moderno e responsivo
- ⏱️ Timer por jogada (5 segundos)
- 🎯 Sistema de pontuação
- 🎨 Temas personalizáveis
  - Tema Padrão
  - Tema Escuro
  - Tema Neon
  - Tema Pôr do Sol
- 💾 Armazenamento local de pontuações
- ⌨️ Controles por teclado
- 🎆 Animações suaves
- 📱 Design totalmente responsivo

## 🚀 Tecnologias Utilizadas

- React
- CSS Variables para theming
- Local Storage para persistência
- Custom Hooks
- Lucide Icons
- Modern JavaScript (ES6+)

## 🎯 Principais Recursos

### Sistema de Temas

- Múltiplos temas predefinidos
- Personalização de cores
- Transições suaves entre temas
- Persistência da preferência do usuário

### Gameplay

- Timer por jogada
- Indicação visual de vitória
- Sistema de pontuação
- Reinício rápido de partida

### Interface

- Design moderno e limpo
- Feedback visual para ações
- Animações responsivas
- Layout adaptativo

## 🎮 Como Jogar

1. Use o mouse para clicar nas células ou as teclas numéricas (1-9)
2. Complete uma linha, coluna ou diagonal para vencer
3. Faça sua jogada dentro do tempo limite de 5 segundos
4. Use 'R' para reiniciar o jogo
5. Use 'C' para acessar o menu de cores

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/tic-tac-toe.git

# Entre no diretório
cd tic-tac-toe

# Instale as dependências
yarn install

# Inicie o servidor de desenvolvimento
yarn dev
```

## 🎨 Personalização de Temas

O jogo oferece quatro temas predefinidos:

- **Padrão**: Clean e minimalista
- **Escuro**: Modo noturno elegante
- **Neon**: Visual cyberpunk vibrante
- **Pôr do Sol**: Tons quentes e acolhedores

Cada tema pode ser personalizado através do menu de cores, acessível pelo botão flutuante ou pressionando 'C'.

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── ColorMenu/
│   ├── GameBoard/
│   ├── GameStatus/
│   ├── ScoreBoard/
│   ├── Square/
│   └── Timer/
├── hooks/
│   ├── useColorTheme.js
│   ├── useGameLogic.js
│   ├── useLocalStorage.js
│   └── useTimer.js
├── App.jsx
└── App.css
```

## 🎯 Custom Hooks

### useGameLogic

Gerencia a lógica principal do jogo, incluindo:

- Estado do tabuleiro
- Verificação de vitória
- Troca de jogadores
- Reinício do jogo

### useColorTheme

Gerencia o sistema de temas:

- Temas predefinidos
- Personalização de cores
- Persistência de preferências

### useTimer

Controla o timer do jogo:

- Contagem regressiva
- Reset automático
- Jogada automática ao expirar

### useLocalStorage

Gerencia o armazenamento local:

- Salvar pontuações
- Carregar dados salvos
- Reset de dados

## 📱 Responsividade

O jogo é totalmente responsivo e se adapta a diferentes tamanhos de tela:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fork o projeto
2. Criar uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👏 Agradecimentos

- Ícones por [Lucide Icons](https://lucide.dev/)
- Inspiração de design por [Material Design](https://material.io/)

---

Desenvolvido com 💜
