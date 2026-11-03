# ADR-002: Arquitetura Front-End com React.js (SPA)

- **Status:** ✅ Aprovado
- **Data:** 15/09/2026
- **Autores:** Equipe TechFlow

---

## 1. Contexto

A disciplina de Frameworks Front-End e o Projeto Integrador II demandam a construção de uma aplicação web interativa, responsiva e de fácil manutenção para atender a múltiplos perfis operacionais (Coordenação, Secretaria, Docente, Manutenção e Público Geral). 

A aplicação precisa exibir quadros de horários dinâmicos, formulários reativos de triagem, relatórios em tempo real e permitir o envio simplificado de sugestões públicas de manutenção a partir de dispositivos móveis ou desktops.

## 2. Decisão

Adotou-se o framework/biblioteca **React.js** estruturado como uma **Single Page Application (SPA)**:
- Componentização modular funcional com React Hooks (`useState`, `useEffect`);
- Separação clara de responsabilidades por telas e fluxos (`Home`, `Login`, `Cadastro_de_turma_doscente`, `Alocação_de_ambiente`, `Direcionamento_de_manutenção`, `Relatorio`);
- Camada centralizada de comunicação HTTP (`api.js`) desacoplada da camada visual;
- Estilização Vanilla CSS com arquivos de estilo dedicados por módulo para garantir flexibilidade e controle visual sem overhead de build pesado.

## 3. Alternativas Avaliadas

| Alternativa | Vantagens | Desvantagens / Motivo de Rejeição |
|---|---|---|
| **HTML/CSS/JS Puro (Vanilla)** | Sem dependências | Baixa reusabilidade de componentes em formulários complexos e manipulação excessiva imperativa do DOM. |
| **Angular** | Solução all-in-one corporativa | Curva de aprendizado íngreme com TypeScript rigoroso e sobrecarga de configuração para o escopo semestral. |
| **Vue.js** | Simplicidade e template syntax | Menor alinhamento com os laboratórios práticos e objetivos pré-definidos da disciplina de Frameworks Front-End. |

## 4. Consequências

### Consequências Positivas:
- **Alta Produtividade:** Divisão de telas entre os 6 integrantes da equipe sem conflitos de merge em arquivos monolíticos;
- **Excelente Experiência do Usuário (UX):** Transições de tela instantâneas sem recarregamento completo da página (SPA);
- **Ecossistema:** Facilidade de integração com ferramentas de build modernas e deploy contínuo na Vercel via `vercel.json`.

### Consequências Negativas e Riscos:
- Carregamento inicial do bundle JavaScript pode impactar o First Contentful Paint se o código crescer sem lazy loading (mitigado pela separação enxuta de componentes e ausência de bibliotecas de componentes pesadas).
