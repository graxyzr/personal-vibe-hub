```markdown
# Personal Productivity Vibe Hub 🚀

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16-0055FF?style=for-the-badge&logo=framer)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

### 🌟 Seu dashboard pessoal de produtividade com estilo Bento e Glassmorphism

</div>

## 📋 Sobre o Projeto

O **Personal Productivity Vibe Hub** é um dashboard moderno e elegante que combina produtividade com design de ponta. Criado para ser o sucessor espiritual de projetos anteriores (Movie Matchmaker e GameQuest), este hub reúne as ferramentas essenciais para o dia a dia em uma interface visualmente impressionante.

### 🎯 Propósito
- Oferecer um espaço personalizado para gerenciar tempo e tarefas
- Combinar funcionalidade com estética de alto nível
- Praticar e demonstrar habilidades modernas de desenvolvimento web
- Criar uma experiência de usuário fluida e agradável

## ✨ Funcionalidades

### 🎨 Design & Experiência
- **Grid Bento**: Layout em grade moderno e flexível
- **Glassmorphism**: Efeitos de vidro com blur e transparência
- **Background Animado**: Gradiente dinâmico que muda suavemente
- **Design Responsivo**: Perfeito em mobile, tablet e desktop

### ⏰ Widgets de Produtividade
- **Relógio Digital**: Hora atualizada em tempo real com data completa
- **Previsão do Tempo**: Dados reais da OpenWeather API com busca por cidade
- **Timer Pomodoro**: Ciclos de foco/pausa para gerenciar seu tempo
- **Notas Rápidas**: Anotações persistentes com localStorage

### ♿ Acessibilidade
- Navegação completa por teclado (Tab, Enter, Esc)
- ARIA labels em todos os elementos interativos
- Alto contraste e estados de foco visíveis
- Tags HTML5 semânticas

### 🔒 Segurança
- Sanitização de inputs para prevenir XSS
- Validação de dados em todos os campos
- Limites de caracteres em notas e buscas
- Variáveis de ambiente para chaves de API

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologias |
|-----------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Linguagem** | TypeScript 5.3 |
| **Estilização** | Tailwind CSS 3.4 |
| **Animações** | Framer Motion 10.16 |
| **Ícones** | Lucide React |
| **Utilitários** | clsx, tailwind-merge |
| **Sanitização** | isomorphic-dompurify |
| **HTTP Client** | Axios |
| **API de Clima** | OpenWeather API |

## 📦 Estrutura do Projeto

```
personal-vibe-hub/
├── app/
│   ├── layout.tsx           
│   ├── page.tsx             
│   └── globals.css          
├── components/
│   ├── layout/
│   │   └── BentoGrid.tsx    
│   ├── ui/
│   │   ├── GlassCard.tsx    
│   │   └── AnimatedBackground.tsx
│   └── widgets/
│       ├── ClockWidget.tsx
│       ├── WeatherWidget.tsx
│       ├── PomodoroWidget.tsx
│       └── NotesWidget.tsx
├── lib/
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   └── useWeatherReal.ts
│   └── utils/
│       ├── index.ts         
│       └── sanitize.ts      
├── types/
│   └── index.ts             
└── public/                  
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta grátis na [OpenWeather API](https://openweathermap.org/api) (opcional)

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/personal-vibe-hub.git
cd personal-vibe-hub
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env.local` na raiz:
```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=sua_chave_aqui
```

4. **Execute em desenvolvimento**
```bash
npm run dev
```

5. **Acesse no navegador**
```
http://localhost:3000
```

### 🔧 Build para produção
```bash
npm run build
npm start
```

## 🎨 Personalização

### Cores e Tema
O background usa gradientes animados que você pode modificar no `AnimatedBackground.tsx`. Atualmente alterna entre:
- 🌤️ Ensolarado: `from-amber-200 to-yellow-500`
- 🌧️ Chuva: `from-slate-700 to-blue-900`
- 🌙 Noite: `from-indigo-900 to-black`

### Widgets
Cada widget é independente e pode ser facilmente modificado ou removido. Para adicionar um novo widget:
1. Crie o componente em `components/widgets/`
2. Importe e adicione ao `BentoGrid` no `page.tsx`

## 📱 Responsividade

O layout se adapta perfeitamente:
- **Mobile**: 1 coluna
- **Tablet**: 2 colunas
- **Desktop**: 3-4 colunas

## 🔮 Próximos Passos

- [ ] Adicionar widget de calendário integrado com Google Calendar
- [ ] Implementar tema claro/escuro com toggle
- [ ] Adicionar gráficos de produtividade
- [ ] Integrar com Spotify para música de foco
- [ ] Widget de lista de tarefas (todo list)
- [ ] PWA para instalação no celular

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

**Greice Braga Pereira**
- GitHub: [@graxyzr](https://github.com/graxyzr)
- LinkedIn: [Greice Braga Pereira](https://www.linkedin.com/in/greice-pereira-b04a04318/)

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [OpenWeather](https://openweathermap.org/)

---