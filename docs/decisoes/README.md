# 🏛️ Registros de Decisões Arquiteturais (ADRs) — SGA

Este diretório contém os **Architectural Decision Records (ADRs)** do projeto **SGA (Sistema de Gestão de Ambientes)**, formalizando as escolhas técnicas, justificativas, custos, riscos e alternativas avaliadas pela equipe **TechFlow**.

---

## 📑 Índice de Decisões

| ID | Título | Status | Data | Área Temática |
|---|---|:---:|:---:|---|
| [ADR-001](ADR-001-armazenamento-e-banco-de-dados.md) | Adoção do PostgreSQL e Supabase para Persistência Relacional | ✅ Aprovado | 2026-09-12 | Banco de Dados / Dados |
| [ADR-002](ADR-002-arquitetura-front-end-react.md) | Framework Front-End: Adoção do React.js (SPA) | ✅ Aprovado | 2026-09-15 | Front-End / Web App |
| [ADR-003](ADR-003-infraestrutura-nuvem-e-hospedagem.md) | Topologia em Nuvem Híbrida: Vercel + Supabase + API Express | ✅ Aprovado | 2026-09-18 | Nuvem / Infraestrutura |
| [ADR-004](ADR-004-seguranca-e-gestao-de-credenciais.md) | Gestão Segura de Credenciais, Variáveis de Ambiente e Perfis de Acesso | ✅ Aprovado | 2026-09-22 | Segurança / Governança |
| [ADR-005](ADR-005-estrategia-de-devops-e-ci-cd.md) | Esteira de Automação CI/CD no GitHub Actions e Docker Compose Local | ✅ Aprovado | 2026-09-25 | DevOps / Qualidade |

---

## Estrutura Padrão de cada ADR

Cada registro segue o formato clássico de Michael Nygard:
1. **Contexto:** Cenário, problema a ser resolvido e restrições.
2. **Decisão:** A escolha técnica adotada.
3. **Alternativas Avaliadas:** Soluções que foram descartadas e o motivo.
4. **Consequências Positivas:** Benefícios obtidos.
5. **Consequências Negativas e Riscos:** Trade-offs assumidos e planos de mitigação.
