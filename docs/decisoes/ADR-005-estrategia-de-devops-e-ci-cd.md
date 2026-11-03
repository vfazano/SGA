# ADR-005: Esteira de Automação CI/CD no GitHub Actions e Docker Compose Local

- **Status:** ✅ Aprovado
- **Data:** 25/09/2026
- **Autores:** Equipe TechFlow

---

## 1. Contexto

Para atingir a nota máxima na dimensão **DevOps e Qualidade** do Projeto Integrador II (peso 25%), o projeto precisa comprovar:
- Versionamento com commits pequenos, atômicos e rastreáveis;
- Execução automática de build, testes unitários e testes de integridade a cada alteração de código (`push` e `pull request`);
- Detecção automatizada de secrets e falhas bloqueantes;
- Capacidade de rodar o ambiente completo de forma determinística e reproduzível através do Docker Compose;
- Plano claro de rollback e recuperação de desastres (Runbook).

## 2. Decisão

1. **Automação de Testes e Integração Contínua (CI):**
   - Implementação de workflow declarativo no **GitHub Actions** (`.github/workflows/ci.yml`);
   - Três estágios fundamentais:
     1. Validação de esquemas e testes de integridade de dados sintéticos (`npm run validate-data`);
     2. Testes unitários de indicadores de Ciência de Dados e regras de negócio (`npm test`);
     3. Build e checagem de integridade do Front-End React e API Express.
2. **Estratégia de Branching e Versionamento:**
   - GitFlow adaptado com branches `main` (produção estável), `develop` (integração) e feature branches;
   - Versionamento Semântico (SemVer: `MAJOR.MINOR.PATCH`) para tagueamento de releases.
3. **Plano de Rollback / Recuperação de Versão:**
   - Na Vercel: rollback instantâneo com 1 clique para a build anterior (`Instant Rollback`);
   - No Git: reversão controlada via `git revert <commit-hash>` ou re-deploy de tag anterior estável.

## 3. Consequências

### Consequências Positivas:
- **Prevenção de Regressões:** Nenhuma alteração que quebre os cálculos de indicadores ou integridade de dados é aceita sem aviso;
- **Transparência e Auditabilidade:** A banca e os docentes podem inspecionar a aba *Actions* do GitHub e verificar os logs de execução com selos verdes de aprovação;
- **Reproduzibilidade:** Qualquer avaliador pode clonar o repositório e executar `docker compose up` para testar todo o ecossistema.
