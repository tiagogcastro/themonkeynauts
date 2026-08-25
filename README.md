# The Monkeynauts 🚀

Jogo espacial play-and-earn (P2E) com naves, tripulações e token $SPC na BSC , restaurado e modernizado como projeto de portfólio.

> **Monorepo**: `apps/web` (React SPA) · `apps/api` (Express + Prisma) , blockchain opcional via driver `sandbox` (moeda fictícia) ou `rpc` (BSC real).

## Stack

| Camada | Tecnologias |
|---|---|
| **Web** | React 19, Vite, TypeScript 5, styled-components 6, react-router 7, react-hook-form + yup, axios, ethers v6 |
| **API** | Node 22, Express 5, TypeScript 5 (strict), zod, Prisma 6 + PostgreSQL, tsyringe (clean architecture), jsonwebtoken, ethers v6 |
| **Infra dev** | pnpm workspaces, Docker (Postgres), tsx/tsup |

## Como rodar (100% local, sem credenciais externas)

```bash
# 1. dependências
pnpm install

# 2. banco (docker)
docker compose up -d
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

# 3. schema + admin seed
pnpm --filter api db:migrate

# 4. api (porta 3333) e web (porta 5173)
pnpm dev:api
pnpm dev:web   # em outro terminal
```

Contas iniciais:
- **Admin**: `admin@themonkeynauts.local` / `Admin@1234`
- Crie jogadores pela tela de registro.

## Modo blockchain

| `BLOCKCHAIN_DRIVER` | Comportamento |
|---|---|
| `sandbox` *(default)* | Moeda fictícia. Depósitos/compras/withdraws funcionam offline; nenhum acesso a chain. Ideal para demo/testes. |
| `rpc` | Integração real com BSC (`BSC_RPC_URL`) validando transações on-chain do contrato SPC oficial (`SMART_CONTRACT`). Payouts exigem `SALES_PRIVATE_KEY`. |

O contrato oficial SPC na mainnet foi validado: símbolo `SPC`, 18 decimais (~200M supply).

## Arquitetura da API

Clean architecture por módulo , `core/business-logic` (use-cases, tsyringe) → `domain` (entidades/repositórios) → `infra` (Prisma/HTTP). Detalhes em [docs/](docs/):

- [docs/clean-architecture.md](docs/clean-architecture.md) , Either right/left, DI, providers, validação
- [docs/game-guide.md](docs/game-guide.md) , entidades, parâmetros e fluxos do jogo
- [docs/admin-guide.md](docs/admin-guide.md) , painel admin/owner campo a campo
- [docs/architecture.md](docs/architecture.md) , visão geral e decisões de restauração

```
src/modules/{players,ships,monkeynauts,crews,sales,private-sales,private-p2p,game-params,logs}
src/shared/{core,domain,infra}
```

## Qualidade

- `pnpm --filter api typecheck` , TypeScript estrito, 0 erros
- Smoke test E2E cobrindo as 55 rotas (registro → compra → crews → fuel → bounty → withdraw → admin/owner)
- Correções de segurança aplicadas sobre o código de 2022 (senha em texto puro no reset, escalação de privilégio, toggle de ban sem persistência)

## Roadmap

- [ ] Responsividade mobile completa (em andamento)
- [ ] Avaliação Next.js / Fastify (fase futura)
- [ ] CI (GitHub Actions), testes automatizados
- [ ] Docker para web/api além do Postgres

---
## Author

Built by [Tiago Gonçalves de Castro](https://github.com/tiagogcastro) · [LinkedIn](https://www.linkedin.com/in/tiagogcastro)

Original project: The Monkeynauts (2022), restored in 2026 as a portfolio case study.
