# 🚀 Camada de Backend & API RESTful — SGA

A camada de backend do **SGA (Sistema de Gestão de Ambientes)** é construída sobre **Node.js** e **Express 5**, atuando como serviço mediador entre a interface web (React) e o banco de dados relacional gerenciado (Supabase/PostgreSQL).

O código-fonte da API está localizado no diretório [`APP/beck_end/`](../APP/beck_end/).

---

## 🏛️ Estrutura de Diretórios do Backend

```
APP/beck_end/
├── server.js               # Ponto de entrada do servidor HTTP (Porta 3001)
├── package.json            # Dependências da API (express, cors, dotenv, @supabase/supabase-js)
├── .env.example            # Template de variáveis de ambiente sem segredos
└── src/
    ├── app.js              # Configuração global do Express e middlewares
    ├── config/
    │   └── supabase.js     # Cliente de conexão segura com o Supabase
    ├── routes/             # Definição e roteamento dos endpoints REST
    │   ├── index.js        # Roteador mestre e endpoint de healthcheck
    │   ├── ambientesRoutes.js
    │   ├── turmasRoutes.js
    │   ├── docentesRoutes.js
    │   ├── atribuicoesRoutes.js
    │   ├── alocacoesRoutes.js
    │   └── manutencaoRoutes.js
    └── services/           # Regras de negócio, consultas e integrações
        ├── ambientesService.js
        ├── turmasService.js
        ├── docentesService.js
        ├── atribuicoesService.js
        ├── alocacoesService.js
        └── manutencaoService.js
```

---

## 📋 Catálogo de Endpoints da API

Todos os endpoints operam sob o prefixo `/api` e retornam respostas padronizadas em formato JSON.

### 1. Monitoramento & Saúde
| Método | Endpoint | Descrição | Status Sucesso |
|---|---|---|:---:|
| `GET` | `/api/health` | Verifica a conectividade do servidor e do banco de dados | `200 OK` / `503 Service Unavailable` |

### 2. Gestão de Ambientes (Salas e Laboratórios)
| Método | Endpoint | Descrição | Status Sucesso |
|---|---|---|:---:|
| `GET` | `/api/ambientes` | Lista todos os ambientes cadastrados com status e capacidade | `200 OK` |
| `POST` | `/api/ambientes` | Cadastra um novo ambiente físico | `201 Created` |

### 3. Gestão Acadêmica (Turmas, Docentes e Atribuições)
| Método | Endpoint | Descrição | Status Sucesso |
|---|---|---|:---:|
| `GET` | `/api/turmas` | Lista as turmas ativas com cursos e turnos | `200 OK` |
| `POST` | `/api/turmas` | Registra uma nova turma | `201 Created` |
| `GET` | `/api/docentes` | Lista os docentes com registro e área | `200 OK` |
| `POST` | `/api/docentes` | Cadastra um novo docente | `201 Created` |
| `GET` | `/api/atribuicoes` | Consulta atribuições entre turma, docente e disciplina | `200 OK` |
| `POST` | `/api/atribuicoes` | Registra uma nova atribuição acadêmica | `201 Created` |

### 4. Alocações e Reservas de Ambientes
| Método | Endpoint | Descrição | Status Sucesso |
|---|---|---|:---:|
| `GET` | `/api/alocacoes-ambiente` | Consulta alocações de horários em salas | `200 OK` |
| `POST` | `/api/alocacoes-ambiente` | Realiza a alocação de um ambiente | `201 Created` |

### 5. Manutenção e Canal Público
| Método | Endpoint | Descrição | Status Sucesso |
|---|---|---|:---:|
| `GET` | `/api/sugestoes-manutencao` | Lista sugestões e ordens de manutenção com filtros | `200 OK` |
| `POST` | `/api/sugestoes-manutencao` | Envia sugestão pública de manutenção (sem autenticação) | `201 Created` |
| `PATCH` | `/api/sugestoes-manutencao/:id` | Triagem e atualização de status pelo setor de Manutenção | `200 OK` |

---

## 🛠️ Como Executar o Backend Localmente

```bash
cd APP/beck_end

# 1. Copiar as variáveis de ambiente
cp .env.example .env

# 2. Instalar dependências
npm install

# 3. Executar em modo de desenvolvimento
npm run dev

# 4. Executar em modo de produção
npm start
```

O servidor estará disponível em `http://localhost:3001`.
Verifique a saúde em `http://localhost:3001/api/health`.
