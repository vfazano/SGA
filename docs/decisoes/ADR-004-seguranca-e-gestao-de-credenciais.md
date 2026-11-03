# ADR-004: Gestão Segura de Credenciais, Variáveis de Ambiente e Perfis de Acesso

- **Status:** ✅ Aprovado
- **Data:** 22/09/2026
- **Autores:** Equipe TechFlow

---

## 1. Contexto

O critério de avaliação de **Segurança** do Projeto Integrador II e as boas práticas de engenharia de software exigem:
- Proibição absoluta de chaves de API, senhas e tokens comitados em repositórios Git públicos ou privados;
- Separação entre credenciais administrativas privilegiadas (`service_role`) e chaves públicas anônimas (`anon_key`);
- Controle de acesso granular por perfil de usuário (Coordenação, Secretaria, Docente, Manutenção, Público).

## 2. Decisão

1. **Gestão de Segredos via Variáveis de Ambiente:**
   - Todos os dados sensíveis são carregados via `dotenv` a partir de arquivos `.env` locais nunca versionados;
   - Os arquivos `.env` foram adicionados e auditados no `.gitignore`;
   - O repositório fornece templates documentados (`.env.example`) com nomes claros de variáveis e descrições sem valores reais.
2. **Separação de Chaves no Supabase:**
   - O backend Node.js utiliza a chave privilegiada (`SUPABASE_SERVICE_ROLE_KEY`) de forma encapsulada no lado do servidor;
   - O front-end nunca expõe chaves com privilégios de gravação desmedida;
3. **Canal Público de Manutenção vs. Painel Autenticado:**
   - O canal público (`/sugerir-manutencao`) tem permissão de apenas submeter novos registros com status estrito `PENDENTE_ANALISE`;
   - Nenhuma solicitação pública altera tabelas de salas, turmas ou tem acesso às ocorrências de outros solicitantes.

## 3. Consequências

### Consequências Positivas:
- **Conformidade em Auditoria Automática:** Pipelines de CI/CD detectam e bloqueiam commits contendo arquivos `.env` ou padrões de chaves expostas;
- **Mitigação de Riscos de Vazamento:** Caso o código do repositório seja clonado, nenhum dado sensível da instituição é comprometido;
- **Auditabilidade e Governança:** Qualquer alteração de configuração de infraestrutura é feita pelo painel seguro do provedor.
