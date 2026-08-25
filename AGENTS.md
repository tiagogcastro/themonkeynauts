# Guia para agentes de IA (AGENTS.md)

Instruções para IAs trabalhando neste repositório.

## Comandos

```bash
pnpm install                      # setup
docker compose up -d              # postgres
pnpm --filter api db:migrate      # prisma migrate dev + generate
pnpm dev:api                      # api :3333 (tsx watch)
pnpm dev:web                      # web :5173 (vite)
pnpm --filter api typecheck       # tsc --noEmit (obrigatório antes de commit)
pnpm --filter web typecheck
```

## Convenções

- **Imports**: sempre alias `@/` a partir de `src` de cada app (`@/shared/...`, `@/modules/...`). Relativos só dentro do mesmo módulo.
- **API**: clean architecture — use-case em `core/business-logic`, contrato em `domain`, Prisma/HTTP em `infra`. Use-cases retornam `Either`. Registro DI em `shared/infra/container`.
- **Validação**: zod nas rotas via `validate({ body, query })`; nada de validação manual no controller.
- **Respostas**: envelope `{ data, error }`; erros de negócio como classes que estendem `AppError`.
- **Commits**: concisos e por bloco lógico (conventional commits). Nada de artefatos/tmp/logs; `.env` nunca vai pro git.
- **Testes**: `apps/api/scripts/smoke-test.mjs` é local-only (git-excluded) e valida as 55 rotas E2E contra o servidor rodando.

## Contexto do projeto

Jogo P2E de 2022 restaurado. Blockchain por driver: `sandbox` (fictício, default) ou `rpc` (BSC real + contrato SPC oficial). Não introduzir credenciais externas obrigatórias; tudo deve rodar 100% local.

## Roadmap acordado com o dono

1. ✅ Monorepo + libs modernas + API funcional
2. Em andamento: web moderna + responsiva
3. Futuro: avaliar Next.js/Fastify, pruning de features legadas (private-sale/p2p/owner), CI/testes
