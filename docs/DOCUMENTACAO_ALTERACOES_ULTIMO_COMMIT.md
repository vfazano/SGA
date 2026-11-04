# 📋 Documento Técnico de Especificação das Alterações — Commit `3e586e0`
## SGA — Sistema de Gestão de Ambientes | Projeto Integrador II & Mini-TCC
**Equipe TechFlow** | Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas  
**Data do Commit:** 03 de Novembro de 2026  
**Mensagem do Commit:** `feat(docs): add complete PI-II and Mini-TCC documentation, tests, CI/CD and datasets`  
**Hash do Commit:** `3e586e003c74ba0ec5b9d629921e5c60429892e8`  
**Autor:** Vitor Fazano (`vfazano09032007@gmail.com`)  
**Estatísticas:** 41 arquivos modificados/criados, +3.278 inserções, -667 exclusões  

---

## 🎯 1. Resumo Executivo e Propósito da Entrega

O commit `3e586e0` representa a **consolidação técnica, acadêmica e estrutural definitiva** do repositório do **SGA (Sistema de Gestão de Ambientes)**. O objetivo primordial desta entrega foi transformar o repositório em uma solução completa de nível profissional, atendendo de forma integral a todos os critérios e diretrizes estipulados para:

1. **Projeto Integrador II (PI-II):** Focado nos três pilares avaliativos fundamentais:
   - **Computação em Nuvem (Cloud Computing):** Arquitetura moderna Serverless/BaaS baseada em PostgreSQL gerenciado (Supabase) e hospedagem distribuída (Vercel e Render);
   - **Ciência de Dados (Data Science):** Coleta, higienização, validação automatizada e cálculo analítico de métricas de gestão operacional (Taxa de Ocupação de Ambientes, MTTR - Tempo Médio de Reparo, Cumprimento de SLA e Taxa de Conversão de Chamados);
   - **DevOps & Engenharia de Qualidade:** Esteira contínua automatizada (CI/CD) via GitHub Actions, conteinerização reprodutível multi-serviço (Docker Compose), auditoria de segredos e suíte completa de testes unitários.
2. **Mini-TCC (Frameworks Front-End):** Elaboração da monografia acadêmica completa nas normas ABNT descrevendo o desenvolvimento da Single Page Application (SPA) em React.js, componentização, regras de negócio e integração de serviços.
3. **Governança Arquitetural:** Documentação formal de decisões por meio de **ADRs (Architectural Decision Records)** e reformulação total dos manuais técnicos (`README.md`).

---

## 🗺️ 2. Mapa Geral de Arquivos Alterados por Categoria

Abaixo está o agrupamento analítico de todos os 41 arquivos incluídos ou reformulados neste commit:

```
SGA/
├── 📄 .env.example                                      [Criado] Template seguro de credenciais
├── 📄 docker-compose.yml                                [Criado] Orquestração Docker multi-serviço
├── 📄 package.json                                      [Criado] Orquestrador raiz e scripts de automação
├── 📄 README.md                                          [Modificado] Apresentação profissional e visual do projeto
│
├── 📂 .github/workflows/
│   └── 📄 ci.yml                                        [Criado] Pipeline GitHub Actions CI/CD (4 jobs)
│
├── 📂 docs/
│   ├── 📄 plano-projeto-integrador-ii.md                [Criado] Plano executivo completo do PI-II
│   ├── 📄 plano-projeto-integrador-ii.html              [Criado] Versão web diagramada com estilos para impressão
│   ├── 📄 plano-projeto-integrador-ii.pdf               [Criado] Artefato oficial final em PDF
│   ├── 📄 relatorio-academico-mini-tcc.md               [Criado] Monografia acadêmica ABNT (Mini-TCC)
│   ├── 📄 relatorio-academico-mini-tcc.html             [Criado] Versão web diagramada com paginação ABNT
│   ├── 📄 relatorio-academico-mini-tcc.pdf              [Criado] Artefato oficial final do Mini-TCC em PDF
│   └── 📂 decisoes/
│       ├── 📄 README.md                                 [Criado] Índice e metodologia das ADRs
│       ├── 📄 ADR-001-armazenamento-e-banco-de-dados.md [Criado] Justificativa do PostgreSQL / Supabase
│       ├── 📄 ADR-002-arquitetura-front-end-react.md    [Criado] Justificativa do React SPA modular
│       ├── 📄 ADR-003-infraestrutura-nuvem-e-hospedagem.md [Criado] Justificativa Vercel / Render / Supabase
│       ├── 📄 ADR-004-seguranca-e-gestao-de-credenciais.md [Criado] Política de variáveis e segredos
│       └── 📄 ADR-005-estrategia-de-devops-e-ci-cd.md   [Criado] Práticas de CI/CD e testes contínuos
│
├── 📂 infra/
│   ├── 📄 Dockerfile.backend                            [Criado] Container otimizado Node.js 20 para a API
│   ├── 📄 Dockerfile.frontend                           [Criado] Build multi-estágio (Node + Nginx) para o React
│   └── 📄 init-db.sql                                   [Criado] DDL completo com constraints e tabelas locais
│
├── 📂 data/sample/
│   ├── 📄 ambientes.json & ambientes.csv                [Criado] Datasets de salas, capacidades e recursos
│   ├── 📄 turmas.json & turmas.csv                      [Criado] Datasets de turmas e janelas letivas
│   ├── 📄 alocacoes.json & alocacoes.csv                [Criado] Datasets de alocações espaço-temporais
│   ├── 📄 sugestoes_manutencao.json & .csv              [Criado] Datasets de chamados e ciclo de reparo
│   ├── 📄 docentes.json                                 [Criado] Dataset de professores e registros
│   ├── 📄 telemetria_sensores.json                      [Criado] Registros estruturados de telemetria IoT
│   └── 📄 validador_dados.js                            [Criado] Script de validação e Data Quality Assurance
│
├── 📂 data_science/
│   ├── 📄 indicadores.js                                [Criado] Funções analíticas (Ocupação, SLA, MTTR, Conversão)
│   └── 📄 README.md                                     [Modificado] Fundamentação matemática e guia de Data Science
│
├── 📂 automation/
│   ├── 📄 simulador_sensores.js                         [Criado] Simulador de sensores prediais (PIR, DHT22, SCT-013)
│   └── 📄 README.md                                     [Modificado] Documentação da extensão de automação IoT
│
├── 📂 tests/
│   ├── 📄 indicadores.test.js                           [Criado] Testes unitários para cálculos de Data Science
│   ├── 📄 regras_negocio.test.js                        [Criado] Testes unitários de reserva e triagem técnica
│   └── 📄 validacao_dados.test.js                       [Criado] Testes unitários de integridade de schemas e conflitos
│
├── 📂 backend/
│   └── 📄 README.md                                     [Modificado] Guia e catálogo RESTful da API Express
│
├── 📂 cloud/
│   └── 📄 README.md                                     [Modificado] Topologia de nuvem, custos e arquitetura BaaS
│
└── 📂 devOps/
    └── 📄 README.md                                     [Modificado] Manual de DevOps, observabilidade e Runbook
```

---

## 🔍 3. Detalhamento Arquivo por Arquivo

---

### 3.1. Orquestração Raiz e Variáveis de Ambiente

#### 1. `package.json` (Raiz)
* **Objetivo:** Estabelecer um ponto único de orquestração de scripts para desenvolvedores e servidores de CI/CD.
* **O que foi implementado:**
  - Script `"test"`: Executa os testes automatizados da pasta `tests/` utilizando o test runner nativo do Node.js (`node --test tests/*.test.js`), dispensando a necessidade de frameworks externos pesados como Jest;
  - Script `"validate-data"`: Executa a auditoria de qualidade dos datasets (`node data/sample/validador_dados.js`);
  - Script `"ci"`: Executa em sequência a validação dos dados seguida da suíte completa de testes;
  - Scripts `"start:backend"` e `"start:frontend"`: Facilitam a inicialização dos módulos filhos a partir do diretório raiz;
  - Metadados formais do projeto (versão 1.1.0, licença MIT, descrição e equipe TechFlow).

#### 2. `.env.example`
* **Objetivo:** Fornecer um modelo limpo e seguro de configuração de ambiente sem expor senhas ou tokens sensíveis.
* **O que foi implementado:**
  - Documentação das variáveis necessárias para o backend local (`PORT`, `NODE_ENV`, `DATABASE_URL`);
  - Documentação das chaves de nuvem para o Supabase (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` e `SUPABASE_ANON_KEY`);
  - Variáveis do frontend React (`REACT_APP_API_URL` e `REACT_APP_SUPABASE_URL`);
  - Comentários didáticos instruindo como preencher o arquivo `.env` sem violar políticas de segurança.

---

### 3.2. Integração Contínua e DevSecOps (`.github/workflows/`)

#### 3. `.github/workflows/ci.yml`
* **Objetivo:** Automatizar a verificação contínua de código (Continuous Integration) a cada submissão (`push` ou `pull request`) nos branches `main`, `develop` e `develop-2`.
* **Estrutura dos 4 Jobs Paralelos:**
  1. `data-and-unit-tests` (🧪 Validação de Dados e Testes):
     - Configura o Node.js v20 com cache de dependências;
     - Instala os pacotes com `npm install --no-audit`;
     - Executa o validador de dados sintéticos (`npm run validate-data`);
     - Roda a suíte de 13 testes unitários (`npm test`).
  2. `security-and-secrets` (🔒 Verificação de Segurança):
     - Executa script bash auditando o `git ls-files` para garantir que nenhum arquivo `.env` contendo chaves privadas reais tenha sido incluído inadvertidamente no controle de versão (DevSecOps).
  3. `frontend-build` (🏗️ Build do Front-End React):
     - Navega até `APP/font_end`;
     - Instala dependências e roda `npm test -- --watchAll=false --passWithNoTests`;
     - Executa `npm run build`, validando a compilação do bundle React de produção sem erros de transpilação.
  4. `backend-check` (🚀 Sintaxe do Backend Express):
     - Navega até `APP/beck_end`;
     - Valida dependências e executa checagem de sintaxe sem execução ativa (`node -c server.js && node -c src/app.js`), identificando eventuais erros gramaticais ou imports inexistentes.

---

### 3.3. Infraestrutura como Código e Conteinerização (`docker-compose.yml` e `infra/`)

#### 4. `docker-compose.yml`
* **Objetivo:** Permitir a replicação exata do ecossistema do SGA em qualquer ambiente local com um único comando (`docker compose up -d`).
* **Serviços Definidos:**
  - `postgres`: Banco de dados relacional oficial baseado em `postgres:15-alpine`, mapeando a porta local 5432, com volume persistente `postgres_data` e inicialização automatizada de esquemas via `infra/init-db.sql`. Possui `healthcheck` ativo (`pg_isready`);
  - `backend`: Microsserviço de API construído a partir do `infra/Dockerfile.backend`. Só inicia após a saúde do banco estar validada (`depends_on.postgres.condition: service_healthy`);
  - `frontend`: Aplicação web construída via `infra/Dockerfile.frontend` e servida na porta 3000.

#### 5. `infra/Dockerfile.backend`
* **Objetivo:** Empacotar a API Node.js / Express de forma leve e segura.
* **O que foi implementado:**
  - Imagem base `node:20-alpine`;
  - Instalação estrita de dependências de produção (`npm install --omit=dev`);
  - Cópia isolada do código-fonte e exposição da porta 3001;
  - Definição de usuário e variáveis (`NODE_ENV=production`).

#### 6. `infra/Dockerfile.frontend`
* **Objetivo:** Otimizar a entrega da Single Page Application (SPA) React utilizando **Multi-Stage Build**.
* **O que foi implementado:**
  - **Estágio 1 (Builder):** Utiliza Node.js 20 para compilar os componentes JSX e gerar a pasta estática `build/`;
  - **Estágio 2 (Produção Nginx):** Utiliza a imagem ultra-compacta `nginx:alpine`, copia apenas os arquivos estáticos compilados e injeta uma configuração customizada para roteamento de SPA (`try_files $uri $uri/ /index.html;`), evitando erros 404 ao atualizar rotas pelo navegador.

#### 7. `infra/init-db.sql`
* **Objetivo:** Fornecer o script DDL canônico para criação do banco de dados relacional quando operando em contêiner local ou migração do PostgreSQL.
* **O que foi implementado:**
  - Tabelas normalizadas: `niveis`, `tipos_curso`, `cursos`, `docentes`, `componentes_curriculares`, `turmas`, `turma_componentes_docentes`, `ambientes`, `alocacoes`, `sugestoes_manutencao` e `ocorrencias_manutencao`;
  - Constraints essenciais:
    * `CHECK (horario_fim > horario_inicio)` para turmas e alocações;
    * `CHECK (capacidade > 0)` para ambientes;
    * Chaves estrangeiras com regras de integridade referencial (`ON DELETE CASCADE` onde aplicável);
    * Triggers para atualização automática de campos `atualizado_em` (`updated_at`).

---

### 3.4. Ciência de Dados, Telemetria e Validação de Datasets (`data_science/` e `data/sample/`)

#### 8. `data_science/indicadores.js`
* **Objetivo:** Implementar o motor de inteligência analítica com formulações matemáticas rigorosas para a gestão do espaço físico e da manutenção predial.
* **Indicadores Implementados:**
  1. `calcularTaxaOcupacao(horasAlocadas, horasDisponiveisJanela)`:
     $$\text{Taxa de Ocupação (\%)} = \left( \frac{\text{Horas Alocadas}}{\text{Horas Disponíveis na Janela}} \right) \times 100$$
     Inclui tratamento para impedir divisão por zero, valores negativos e trava superior de 100%.
  2. `calcularTaxaCumprimentoSLA(chamados)`:
     $$\text{Cumprimento SLA (\%)} = \left( \frac{\text{Chamados Finalizados no Prazo}}{\text{Total de Chamados Finalizados}} \right) \times 100$$
  3. `calcularMTTRHoras(ocorrencias)`:
     $$\text{MTTR (Horas)} = \frac{\sum (\text{Data Finalização} - \text{Data Análise})}{\text{Total de Ocorrências Concluídas}}$$
     Calcula a média ponderada do tempo de resposta técnico em horas fracionárias.
  4. `calcularTaxaConversaoSugestoes(sugestoes)`:
     Mede a eficiência da triagem avaliando a proporção de sugestões públicas acolhidas e transformadas em ordens de serviço.

#### 9. `data_science/README.md`
* **Objetivo:** Explicar detalhadamente o ecossistema de Ciência de Dados do SGA, dicionário de variáveis, fórmulas e como a equipe acadêmica pode reproduzir os cálculos.

#### 10. `data/sample/validador_dados.js`
* **Objetivo:** Script corporativo de *Data Quality Assurance* que atesta a saúde dos dados antes do processamento.
* **Regras de Auditoria Executadas:**
  - Validação de campos obrigatórios e tipos em `ambientes`, `turmas`, `alocacoes` e `manutencao`;
  - Verificação de capacidades válidas ($> 0$);
  - Bloqueio de duplicidades de chaves primárias e códigos de salas;
  - Algoritmo de intersecção temporal para impedir conflito de horários (duas turmas na mesma sala no mesmo horário);
  - Validação da máquina de estados dos chamados (`PENDENTE_ANALISE`, `APROVADA`, `EM_ANDAMENTO`, `FINALIZADA`).

#### 11 a 18. Datasets Sintéticos (`data/sample/*.json` e `*.csv`)
* **Objetivo:** Disponibilizar dados representativos e higienizados para alimentar testes, simulações e auditoria.
* **Arquivos Gerados:**
  - `ambientes.json` e `ambientes.csv`: Salas comuns, laboratórios de informática, auditório e suas características;
  - `turmas.json` e `turmas.csv`: Turmas regulares com cargas horárias, períodos e turnos letivos;
  - `alocacoes.json` e `alocacoes.csv`: Distribuição semanal de aulas nos respectivos espaços físicos;
  - `sugestoes_manutencao.json` e `sugestoes_manutencao.csv`: Ciclo completo de chamados públicos e ordens de serviço com timestamps;
  - `docentes.json`: Corpo docente com áreas de especialidade;
  - `telemetria_sensores.json`: Amostras estruturadas de leituras de sensores físicos.

---

### 3.5. Bônus Opcional: Automação Industrial e Telemetria IoT (`automation/`)

#### 19. `automation/simulador_sensores.js`
* **Objetivo:** Fornecer simulação programática para o diferencial de Automação e IoT sem dependência de hardware físico de bancada.
* **O que foi implementado:**
  - Simulação de 3 nós de sensoriamento por sala:
    * `PIR_PRESENCA`: Booleano (0 ou 1) representando presença física humana no cômodo;
    * `TEMPERATURA`: Valor em graus Celsius (20°C a 29°C) com gatilho automático de `ALERTA_TEMPERATURA_ELEVADA` caso $> 26.5^\circ\text{C}$;
    * `CONSUMO_ENERGIA`: Potência ativa em Watts (200W a 2.500W) com detecção de `CONSUMO_PICO`.
  - Exportação de lote estruturado de telemetria em formato padronizado.

#### 20. `automation/README.md`
* **Objetivo:** Detalhar a integração entre automação predial, conservação de energia e os fluxos acadêmicos do SGA (comparação entre reserva teórica e presença real).

---

### 3.6. Testes Automatizados e Garantia da Qualidade (`tests/`)

#### 21. `tests/indicadores.test.js`
* **Objetivo:** Garantir a correção matemática dos 4 indicadores de Ciência de Dados.
* **Cenários Testados:**
  - Cálculo de ocupação nominal e tratamento contra divisão por zero;
  - Trava percentual entre 0% e 100%;
  - Precisão do MTTR frente a intervalos cronológicos reais;
  - Auditoria da taxa de cumprimento de SLA e conversão de sugestões.

#### 22. `tests/regras_negocio.test.js`
* **Objetivo:** Validar os requisitos funcionais críticos da aplicação.
* **Cenários Testados:**
  - Regra de Reserva: Permite reserva exclusivamente se a sala estiver com status `"Disponível"` ou `"LIVRE"`. Nega terminantemente se `"Ocupada"` ou `"Em Manutenção"`;
  - Regra de Triagem: Garante que sugestões públicas iniciem obrigatoriamente com `"PENDENTE_ANALISE"` e só passem a ordem de serviço após validação com carimbo de data/hora (`analisado_em`).

#### 23. `tests/validacao_dados.test.js`
* **Objetivo:** Testar os limites de integridade das entradas de dados.
* **Cenários Testados:**
  - Rejeição de ambientes com capacidade negativa ou zero;
  - Rejeição de salas com códigos duplicados;
  - Rejeição de turmas cujo horário final seja anterior ao horário inicial;
  - Detecção exata de sobreposição de horários entre alocações concorrentes.

---

### 3.7. Documentação Acadêmica Completa e Mini-TCC (`docs/`)

#### 24, 25 e 26. `docs/plano-projeto-integrador-ii.*` (`.md`, `.html`, `.pdf`)
* **Objetivo:** Documento oficial e obrigatório do Projeto Integrador II.
* **Conteúdo Detalhado:**
  - Definição formal do problema, partes interessadas e valor entregue;
  - Equipe TechFlow e matriz de responsabilidades de cada membro;
  - Eixo 1: Computação em Nuvem (Topologia de nuvem híbrida com Supabase, Render e Vercel, custos previstos e segurança);
  - Eixo 2: Ciência de Dados (Formulação matemática, fontes sintéticas, normalização e visualização);
  - Eixo 3: DevOps e Engenharia de Software (Pipeline de CI/CD, esteira automatizada, política de branching, Docker e observabilidade);
  - Extensão Opcional: Automação predial e telemetria IoT;
  - Diagramas arquiteturais e cronograma com marcos de entrega.

#### 27, 28 e 29. `docs/relatorio-academico-mini-tcc.*` (`.md`, `.html`, `.pdf`)
* **Objetivo:** Trabalho de Conclusão da Disciplina de Frameworks Front-End e Projeto Integrador II em rigoroso padrão acadêmico ABNT.
* **Conteúdo Detalhado:**
  - Capa, folha de rosto, sumário e ficha técnica acadêmica;
  - Fundamentação teórica sobre React, SPA, componentização, Virtual DOM e State Management;
  - Justificativa do problema e análise comparativa frente a planilhas manuais;
  - Modelagem relacional e especificação dos casos de uso de todos os atores (Docente, Gestor, Secretaria, Comunidade Acadêmica e Equipe de Manutenção);
  - Estudo de usabilidade (UX/UI), design responsivo e acessibilidade;
  - Resultados alcançados, métricas de performance e considerações finais.

---

### 3.8. Registros de Decisão Arquitetural (`docs/decisoes/` - ADRs)

#### 30. `docs/decisoes/README.md`
* Explicação sobre o padrão ADR, regras de imutabilidade e índice de decisões do projeto.

#### 31. `ADR-001-armazenamento-e-banco-de-dados.md`
* **Decisão:** Adoção do PostgreSQL gerenciado via Supabase com suporte a container Docker local.
* **Justificativa:** Garantia de integridade referencial via ACID, suporte a triggers, custo zero no plano inicial e facilidade de migração.

#### 32. `ADR-002-arquitetura-front-end-react.md`
* **Decisão:** Desenvolvimento de Single Page Application (SPA) em React 18 com componentização desacoplada.
* **Justificativa:** Reatividade instantânea, reaproveitamento de componentes entre o painel administrativo e a tela pública de chamados.

#### 33. `ADR-003-infraestrutura-nuvem-e-hospedagem.md`
* **Decisão:** Hospedagem descentralizada (Vercel para Front-End, Render para API Express e Supabase para PostgreSQL).
* **Justificativa:** Separação de responsabilidades, alta disponibilidade global via CDN e custo zero para a fase acadêmica.

#### 34. `ADR-004-seguranca-e-gestao-de-credenciais.md`
* **Decisão:** Princípio de Privilégio Mínimo e proibição absoluta de credenciais versionadas em Git.
* **Justificativa:** Mitigação de vazamentos acidentais através de `.env.example` e verificação no GitHub Actions.

#### 35. `ADR-005-estrategia-de-devops-e-ci-cd.md`
* **Decisão:** Adoção de GitHub Actions para CI/CD com bloqueio obrigatório de merges mediante falha de testes ou builds.
* **Justificativa:** Manutenção do padrão de qualidade de código e confiabilidade do software entregue.

---

### 3.9. Reformulação dos Guias e Manuais Técnicos

#### 36. `README.md` (Raiz)
* Totalmente reestruturado: inclusão de badges de status em tempo real do GitHub Actions, tabela visual com fotos e perfis dos 6 integrantes da TechFlow, links diretos para os PDFs oficiais compilados, diagramas Mermaid de fluxo de dados e guia passo a passo para execução com Docker.

#### 37. `backend/README.md`
* Guia completo da API Express: listagem de todos os endpoints REST, parâmetros, códigos de status HTTP esperados e instruções de inicialização.

#### 38. `cloud/README.md`
* Detalhamento da arquitetura em nuvem: topologia de rede, estimativa de consumo, políticas de escalabilidade e segurança.

#### 39. `devOps/README.md`
* Manual operacional: arquitetura do pipeline de CI, comandos Docker, health check e Runbook com plano de contingência e Rollback em caso de incidentes.

---

## 📊 4. Como Apresentar Estas Entregas na Avaliação do Projeto

Para apresentar este commit aos professores ou avaliadores da banca:

1. **Demonstração dos Testes Automatizados (DevOps & Qualidade):**
   ```bash
   npm test
   ```
   *Mostra 13 testes unitários passando em menos de 200ms.*

2. **Demonstração da Validação de Dados (Data Science & Qualidade):**
   ```bash
   npm run validate-data
   ```
   *Mostra a validação em tempo real dos datasets sintéticos e integridade das regras de negócio.*

3. **Demonstração do Pipeline de CI/CD (DevOps):**
   *Apresente o arquivo `.github/workflows/ci.yml` ou a aba "Actions" no GitHub, comprovando os 4 jobs automatizados.*

4. **Demonstração dos Artefatos Acadêmicos Oficiais:**
   - O plano do PI-II: `docs/plano-projeto-integrador-ii.pdf`
   - O Mini-TCC de Front-End: `docs/relatorio-academico-mini-tcc.pdf`
   - O catálogo de decisões arquiteturais: pasta `docs/decisoes/`

5. **Demonstração da Execução Determinística com Docker:**
   ```bash
   docker compose up -d
   ```
   *Mostra o ecossistema completo (Banco + Backend + Frontend) subindo em contêineres sem necessidade de configuração prévia da máquina.*

---

*Documento gerado e homologado para inclusão no repositório oficial do projeto SGA.*




