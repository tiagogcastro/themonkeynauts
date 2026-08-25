# Clean Architecture — como o projeto aplica

Guia dos padrões usados na API (`apps/api`), com exemplos reais do código. O objetivo é que qualquer dev (ou IA) consiga adicionar features seguindo exatamente o mesmo estilo.

## As camadas de um módulo

```
src/modules/<feature>/
├── core/business-logic/   ← use-cases (regra de negócio, puro)
│   └── errors/            ← erros específicos do use-case
├── domain/
│   ├── entities/          ← entidades com comportamento/computed props
│   ├── enums/             ← enumerações de domínio
│   └── repositories/      ← CONTRATOS (interfaces) de persistência
├── dtos/                  ← contratos de entrada (request DTOs)
└── infra/
    ├── database/prisma/repositories/  ← implementação Prisma dos contratos
    └── http/
        ├── controllers/   ← traduz request → use-case → HttpResponse
        └── routes/        ← endpoints + validação zod
```

**Regra de ouro:** dependências apontam para dentro. Use-cases não importam Express nem Prisma; conhecem apenas os contratos de `domain`.

## 1. Either com `right` e `left` (o coração do projeto)

Use-cases **nunca lançam erro esperado** — retornam um resultado explícito:

```ts
import { Either, left, right } from '@/shared/core/logic/either';

type WithdrawTokensResponse = Either<
  PlayerNotFoundError | AmountLessMinimumNeededAmountError,
  IPlayer & { resource: IResource }
>;

async function execute({ playerId, amount }): Promise<WithdrawTokensResponse> {
  const player = await this.playersRepository.findById(playerId);

  if (!player) {
    return left(new PlayerNotFoundError());   // caminho infeliz tipado
  }
  ...
  return right({ ...player, resource });      // caminho feliz
}
```

Por quê:
- A assinatura **documenta todos os erros possíveis** — dá pra ler o tipo e saber o que tratar
- O controller é obrigado a fazer `if (result.isLeft())` — impossível esquecer de tratar
- Só exceções verdadeiramente excepcionais viram `throw` (e caem no handler global 500)

O controller converte:

```ts
const result = await useCase.execute(data);

if (result.isLeft()) {
  return clientError(result.value);   // AppError carrega statusCode
}

return ok(instanceToInstance('player', result.value));
```

Erros de domínio são classes (tipam o union do `Either`):

```ts
export class PlayerNotFoundError extends AppError {
  constructor() { super('Player does not exist', 400); }
}
```

## 2. Entidades ricas (não são só structs)

Entidades computam propriedades derivadas no construtor — a regra fica num lugar só:

```ts
// modules/ships/domain/entities/ship.ts
constructor(props, metadata) {
  this.ship = {
    ...props,
    // bônus aplicado sobre atributos base conforme rank
  };
}
```

Exemplo real nos Monkeynauts: `baseHealth 250–350`, e o rank soma % (Sergeant +10%, Captain +20%, Major +30%) via helpers de domínio (`getAttributesByBase`). O sorteio de raridade usa `rarity({ Private: 50, Sergeant: 30, ... })`.

## 3. Repository pattern (contrato fora, Prisma dentro)

O use-case depende da interface; o Prisma é detalhe plugável:

```ts
// domain/repositories/players-repository.ts (contrato)
interface IPlayersRepository {
  findById(id: string): AsyncMaybe<IPlayer>;
  findByWallet(wallet: string): AsyncMaybe<IPlayer>;
  save(player: IPlayer): Promise<void>;
  ...
}

// infra/database/prisma/repositories/prisma-players-repository.ts (implementação)
class PrismaPlayersRepository implements IPlayersRepository { ... }
```

`AsyncMaybe<T>` = `Promise<T | null>` semântico para buscas que podem não encontrar.

## 4. Injeção de dependência (tsyringe)

Registro central em `@/shared/infra/container/` (providers, repositories, business-logic). Nos use-cases:

```ts
@injectable()
class DepositTokensBusinessLogic {
  constructor(
    @inject('PlayersRepository') private playersRepository: IPlayersRepository,
    @inject('BlockchainProvider') private blockchainProvider: IBlockchainProvider,
    @inject('LogsRepository') private logsRepository: ILogsRepository,
  ) {}
}
```

**Prova de que funciona:** trocamos o provider web3+ethers por dois drivers (`SandboxBlockchainProvider` / `EthersBlockchainProvider`) escolhidos por env — **zero mudança nos use-cases**.

## 5. Seam de providers (infra substituível)

Toda integração externa passa por interface em `shared/domain/providers/` + implementação em `shared/infra/providers/`:

| Provider | Interface | Implementações |
|---|---|---|
| Blockchain | `IBlockchainProvider` | Sandbox / Ethers (BSC) |
| Hash | `IHashProvider` | BCrypt |
| Token | `ITokenProvider` | JWT |
| Mail | `IMailProvider` | Ethereal (nodemailer) |
| Date | `IDateProvider` | date-fns |
| Cron | `ICronJobProvider` | node-cron |

## 6. Validação na borda, não no controller

Zod valida na rota; o controller já recebe dado confiável:

```ts
playersRouter.post(
  '/deposit-tokens',
  validate({
    body: z.object({
      txHash: z.string().regex(txHashRegExp),
      amount: z.number().int().positive().optional(),
    }),
  }),
  ensureAuthenticated,
  adaptMiddleware(ensureWalletMiddleware),
  adaptRoute(depositTokensController),
);
```

`ZodError` cai no handler global e sai no envelope padrão com status 400.

## 7. Adaptadores HTTP

Controllers implementam `IController.handle(request) → Promise<HttpResponse>`; os adapters conectam ao Express:

- `adaptRoute(controller)` — une body+params+query+`request.player`
- `adaptMiddleware(middleware)` — mesmo contrato para middlewares

Envelope único de resposta:

```json
{ "data": {} | null, "error": { "messages": [], "name": "", "statusCode": 0 } }
```

## 8. Anti-replay por log

Toda operação financeira grava um `Log` com `txHash` único. O provider blockchain consulta esse log antes de confirmar uma transação — replay vira `TransactionCarriedOutError`. Exemplo de regra transversal resolvida com o próprio pattern de repositório.

## Tecnologias

| Papel | Tech |
|---|---|
| Runtime / linguagem | Node 24 (LTS) · TypeScript 5 strict |
| HTTP | Express 5 |
| Validação | zod |
| Persistência | Prisma 6 · PostgreSQL |
| DI | tsyringe (+ decorators legados) |
| Blockchain | ethers v6 |
| Auth | bcryptjs · jsonwebtoken |
| Jobs | cron |
| Mail (dev) | nodemailer ethereal |
| Build/dev | tsx (watch) · tsup (bundle) · pnpm workspaces |
