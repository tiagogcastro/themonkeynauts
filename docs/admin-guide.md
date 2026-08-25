# Guia do painel Admin/Owner

Referência de cada funcionalidade administrativa — campos, regras e efeitos no banco.

## Game Params (`POST /admins/game-params/set`)

Tunáveis globais em linha única na tabela `game_params`. Lidas por vários use-cases; mudam o jogo sem deploy.

| Grupo | Campos | Efeito |
|---|---|---|
| Versão | `gameClientVersion` | gate da rota pública `POST /system/version-check` |
| Combustível | `travelFuelConsuption`, `bountyHuntFuelConsuption` | custo por ação da nave (`consume-fuel`) |
| Refuel | `shipRefuelCostInPercentage` | % cobrado em SPC ao reabastecer na Space Station |
| Bounty Hunt | `bountyHuntMinReward`, `bountyHuntMaxReward` | faixa de recompensa por run finalizada |
| Minas (gold/iron/copper/scrap) | `mine<metal>AverageResourceReward`, `mine<metal>AverageSpcReward`, `mine<Metal>RewardsVariation` | média ± variação dos ganhos de mineração |

Regra: todos os números são inteiros obrigatórios; o painel pré-carrega os valores atuais via `GET /game-params/fetch`.

## Logs (`GET /admins/logs/list-logs`)

Trilha de auditoria de todas as ações sensíveis (depósito, compra, saque, ban, airdrop, private sale...).

- Campos: `action` (texto descritivo), `playerId`, `txHash`, timestamps
- `txHash` tem **constraint unique** — é o mecanismo anti-replay global
- Filtro opcional por `playerId`; sem filtro lista tudo

## Ban Account (`PATCH /admins/players/ban-unban-player`)

Toggle de banimento por **UUID ou carteira** (o use-case detecta formato):

- Detecta UUID → busca por id; senão → busca por wallet
- Inverte `isBanned`; persiste; envia email com template handlebars informando o motivo (driver ethereal imprime URL de preview no console)
- Player banido não autentica (`ensure-authenticated` bloqueia) — exceto se for Admin
- O mesmo endpoint desban (toggle); motivo vai no email das duas direções

Relacionado: `PATCH /admins/players/disable-enable-player` — soft-disable por UUID. Diferença: desabilitado **some das buscas** (`findById` filtra `isEnabled=true`) e não pode logar; reabilitar usa lookup especial que ignora o filtro.

## AirDrop NFT (`POST /admins/sale-events/create-air-drop-nft`)

Cria entidades diretamente pro estoque de um player, por email — sem passar pela Store.

| Campo | Valores |
|---|---|
| `email` | player destinatário (deve existir e estar habilitado) |
| `type` | Monkeynaut · Ship · Pack |
| `monkeynaut.rank/role` | rank específico ou `Random` (sorteia 50/30/15/5; role 40/30/30) |
| `ship.rank/role` | A/B/S ou `Random` (50/35/15) |

- Com `Random` o use-case sorteia antes de delegar para os mesmos use-cases de criação da loja (atributos derivam igual)
- Grava Log da operação (sem txHash)
- `Pack` hoje não materializa itens — aceito pelo schema mas sem efeito de criação

## Sales Events

Ver seção dedicada no [game-guide.md](./game-guide.md#sales-event-a-vitrine-com-prazo). Resumo admin:

- **Create** (`POST /admins/sale-events/create`): tipo + crypto + preço + datas + quantity + tabela de raridade somando 100%
- **Stop** (`PUT /admins/sale-events/update-sale` com `active: false` + id específico do tipo): encerra antecipadamente; o botão "Stop" fica na lista Open Sales do painel
- Update também ajusta preços/raridade/quantidade de vendas vivas

## Private Sale (`POST /admins/private-sales/create-private-sale`)

Intake administrativo de aportes BNB (legado 2022): recebe `wallet` + `bnbAmount` (0.3–3) + `txHash` e registra o aporte respeitando o teto global de 100 BNB. Detalhes completos no game-guide.

## Operações financeiras do admin

| Rota | Efeito |
|---|---|
| `POST /admins/players/deposit-tokens` | credita SPC pro player alvo (mesma validação anti-replay do player) |
| `POST /admins/players/withdraw-tokens` | saca do saldo interno do player alvo (mínimo 1000) |
| `PATCH /admins/players/save-wallet` | define/troca carteira de um player |

Observação: o middleware `ensure-wallet` valida a carteira do **chamador** — portanto o próprio admin precisa ter carteira vinculada para usar as rotas financeiras.

## Criação direta de entidades

- `POST /admins/ships/create-ship` — ownerId + role/rank opcionais (random se omitidos)
- `POST /admins/monkeynauts/create-monkeynaut` — idem, mais atributos base customizáveis

Úteis pra popular ambiente de demo/teste sem passar pelas vendas.
