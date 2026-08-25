# Arquitetura

## Monorepo

```
apps/web      React SPA (Vite, porta 5173)
apps/api      Express API (porta 3333)
docs/         esta documentação
```

pnpm workspaces; Node >= 22 (`.nvmrc`).

## Fluxo de dados (web → api)

1. `axios` (`services/api.ts`) com `Authorization: Bearer <jwt>` e baseURL `VITE_API_URL`
2. Rotas Express validam payload com zod (`shared/infra/http/validation.ts`)
3. `adaptRoute` une body+params+query+`request.player` e chama o controller
4. Controller resolve o use-case no container tsyringe
5. Use-cases retornam `Either<Error, T>`; controllers mapeiam para `{ data, error }`

Envelope padrão de resposta:

```json
{ "data": {...} | null, "error": { "messages": [], "name": "", "statusCode": 0 } }
```

## Módulos da API

| Módulo | Responsabilidade |
|---|---|
| players | contas, JWT + sessões em DB, carteira, recursos, depósito/withdraw SPC, bounty hunt |
| ships | naves, combustível (consume/refuel/reset cron), nave ativa |
| monkeynauts | tripulantes, energia (cron), transferência owner/operator |
| crews | vínculo monkeynaut ↔ ship |
| sales | eventos de venda (Monkeynaut/Ship/Pack), compra validando txHash, airdrop |
| private-sales | registro de aportes BNB (legado 2022 — mantido) |
| private-p2p | intake P2P owner-only (legado) |
| game-params | tunáveis globais + gate de versão do cliente |
| logs | auditoria por txHash única (anti-replay) |

## Blockchain driver

Interface única (`IBlockchainProvider`) com duas implementações escolhidas por env:

- **SandboxBlockchainProvider** — moeda fictícia; valida formato/uniqueness do txHash via tabela `logs`; crédito usa `amount` informado.
- **EthersBlockchainProvider** — ethers v6 contra BSC; valida sender/recipient/valor/token nos receipts; waits limitados por `TX_WAIT_ATTEMPTS × TX_WAIT_DELAY_MS`.

## Autenticação

- Registro/login com bcrypt; JWT HS256 (1d) cujo payload é o registro de sessão persistido em `player_auth`
- Cada request revalida: existência, expiração, `isValidToken`, status do jogador
- Papéis: `Default`, `Admin`, `Owner` (rotas `/admins/*`, `/owners/*`)

## Decisões de restauração (2022 → hoje)

- Migrações antigas sofreram squash em uma `init` fresca (histórico preservado no git)
- Drivers de mail reduzidos a ethereal (sem credenciais externas); storage/S3/rate-limiter removidos (nunca usados)
- Correções de segurança: hash no reset-password, remoção de escalada via `role`, persistência do toggle enable/disable
- Imports padronizados em `@/` nas duas apps
