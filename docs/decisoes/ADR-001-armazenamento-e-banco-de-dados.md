# ADR-001: Adoção do PostgreSQL e Supabase para Persistência Relacional

- **Status:** ✅ Aprovado
- **Data:** 12/09/2026
- **Autores:** Equipe TechFlow

---

## 1. Contexto

O Sistema de Gestão de Ambientes (SGA) lida com entidades altamente estruturadas e inter-relacionadas: cursos, turmas, componentes curriculares, docentes, ambientes físicos (salas, laboratórios, auditórios), horários de alocação e ordens de serviço de manutenção. 

No estado anterior, os dados estavam dispersos em planilhas eletrônicas e tabelas desnormalizadas sem garantia de integridade referencial, gerando:
- Inconsistências de horários (aulas atribuídas na mesma sala no mesmo horário);
- Dificuldade na apuração de indicadores históricos e auditoria;
- Falta de integridade transacional na conversão de sugestões públicas em ocorrências de manutenção.

## 2. Decisão

Decidiu-se pela modelagem relacional normalizada utilizando **PostgreSQL** hospedado na nuvem através da plataforma gerenciada **Supabase**.
- Chaves primárias auto-incrementais (`bigint identity`) e chaves estrangeiras com restrições `ON DELETE CASCADE` ou `RESTRICT`;
- Índices B-Tree nas colunas de busca frequente (`turma_id`, `docente_id`, `codigo`);
- Views materializadas/lógicas (`vw_oferta_academica`) para consultas analíticas de alocação;
- Restrições a nível de tabela (`CHECK`) para impedir que `horario_fim <= horario_inicio` e `capacidade <= 0`.

## 3. Alternativas Avaliadas

| Alternativa | Vantagens | Desvantagens / Motivo de Rejeição |
|---|---|---|
| **MongoDB / NoSQL Documental** | Flexibilidade de schema | Inadequado para regras fortes de integridade referencial e validações cruzadas de horários e conflitos de salas. |
| **MySQL / MariaDB Self-Hosted** | Tradicional e conhecido | Exigiria provisionamento, patching e gerenciamento manual de servidor, elevando o custo de infraestrutura e manutenção. |
| **SQLite Local** | Simplicidade extrema | Incompatível com o modelo de implantação em nuvem multi-usuário e acesso concorrente pela equipe de manutenção e usuários públicos. |

## 4. Consequências

### Consequências Positivas:
- **Garantia de Integridade:** O banco impede alocações com dados corrompidos na origem através de constraints e chaves únicas compostas;
- **Alta Disponibilidade e Nuvem:** O Supabase provê backup automático, replicação e conexão SSL segura;
- **Custo Zero no Nível Acadêmico:** Utilização do free-tier da plataforma com cotas suficientes para o projeto integrador;
- **Facilidade de Consumo:** SDK oficial em JavaScript (`@supabase/supabase-js`) para o Node.js e SQL padrão ANSI.

### Consequências Negativas e Riscos:
- Dependência de latência de rede com a nuvem durante o desenvolvimento local (mitigada pelo suporte opcional a container local via Docker Compose).
