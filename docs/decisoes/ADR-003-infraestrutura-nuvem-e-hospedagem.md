# ADR-003: Topologia em Nuvem Híbrida: Vercel + Supabase + API Express

- **Status:** ✅ Aprovado
- **Data:** 18/09/2026
- **Autores:** Equipe TechFlow

---

## 1. Contexto

O Projeto Integrador II exige a entrega de um serviço executável ou demonstrável em ambiente de **Computação em Nuvem**, integrando dados, aplicação e infraestrutura com alta disponibilidade, baixo custo e facilidade de publicação contínua (DevOps).

A infraestrutura precisa comportar:
1. Uma interface web pública acessível para qualquer smartphone/navegador da comunidade acadêmica;
2. Uma camada de serviços de retaguarda (API) com regras de negócio, validação e agregação analítica;
3. Um banco de dados relacional resiliente, seguro e auditável.

## 2. Decisão

Adotou-se uma arquitetura em nuvem distribuída e orientada a serviços gerenciados (Serverless / PaaS):
1. **Front-End na Vercel:** Deploy automático acoplado ao repositório GitHub, entrega global por CDN Edge Network, certificados HTTPS TLS automáticos e configuração de rotas SPA via `vercel.json`;
2. **Banco de Dados no Supabase:** Instância gerenciada de PostgreSQL em região AWS/GCP, provendo escalabilidade, backups, SSL e API nativa;
3. **Backend Node.js / Express:** API intermediária com endpoints RESTful sob o prefixo `/api`, servindo de intermediária para regras de negócio sensíveis, health checks (`/api/health`) e cálculo de indicadores de ciência de dados;
4. **Ambiente Local Reproduzível:** `docker-compose.yml` que sobe localmente o PostgreSQL, o Backend e o Frontend, garantindo independência de conexão e teste offline.

## 3. Alternativas Avaliadas

| Alternativa | Vantagens | Desvantagens / Motivo de Rejeição |
|---|---|---|
| **Máquina Virtual Monolítica (EC2 / Compute Engine)** | Controle total do SO | Custo fixo mensal elevado, complexidade de hardening, patching e provisionamento de certificados SSL manuais. |
| **Heroku** | Simplicidade de deploy | Descontinuação do tier gratuito e menor flexibilidade em relação ao Supabase. |
| **Execução puramente local (Localhost)** | Zero custo | Viola os critérios obrigatórios de computação em nuvem e demonstração remota do Projeto Integrador II. |

## 4. Consequências

### Consequências Positivas:
- **Custo Operacional Zero:** Dentro dos limites gratuitos de Vercel e Supabase;
- **Alta Disponibilidade:** Uptime superior a 99.9% provido pelas nuvens de classe mundial;
- **Facilidade de Demonstração:** URLs públicas instantâneas para banca avaliadora testar a aplicação em tempo real.
