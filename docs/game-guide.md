# Manual do jogo — The Monkeynauts

> **Contexto:** em 2022 este foi um projeto real de cliente (jogo P2E) que não chegou ao lançamento. A ideia era um jogo espacial play-and-earn na BSC, com esta web funcionando como painel de gerenciamento e a API como backend consumível por um client de jogo — que nunca chegou a existir. O projeto serviu para aprender integração com crypto (web3/ethers, validação on-chain), clean architecture, validações de contrato e trabalho com cliente. Em 2026 foi restaurado do zero como estudo de caso de portfólio.

Guia rápido das entidades, parâmetros e fluxos (pra você lembrar como tudo se conecta).

## Entidades

| Entidade | O que é | Quem cria |
|---|---|---|
| **Player** | conta (email/nickname/senha), tem carteira vinculada, recursos e uma nave ativa | registro público |
| **Resource** | carteira de recursos do player: `spc`, `gold`, `iron`, `copper`, `scrap`, `science` | criada junto com o player |
| **Ship** | nave com `role` (Fighter/Miner/Explorer), `rank` (B/A/S), tanque (`tankCapacity`), combustível (`fuel`), lotação de tripulação (`crewCapacity`) | compra na Store ou admin |
| **Monkeynaut** | tripulante com `role` (Soldier/Engineer/Scientist) e `rank` (Private→Major); atributos derivam dos base + bônus de rank/role | compra na Store ou admin |
| **Crew** | vínculo Monkeynaut ↔ Ship (respeita `crewCapacity`) | player ou admin |
| **Sale** | evento de venda por tempo/quantidade: Monkeynaut, Ship ou Pack | **admin** |

## Atributos do Monkeynaut

Base sorteada no range 250–350 (health) e 20–50 (speed/power/resistence). Rank adiciona bônus:

- Private +0% · Sergeant +10% · Captain +20% · Major +30% nos atributos
- Bonus value: Private 0 · Sergeant 5 · Captain 10 · Major 15
- Role define qual atributo recebe o maior peso: Soldier→power, Engineer→resistence, Scientist→speed
- Sorteio de raridade: role (Soldier 40%, Engineer 30%, Scientist 30%) e rank (Private 50%, Sergeant 30%, Captain 15%, Major 5%)

## Ship — parâmetros

- Role: Explorer / Miner / Fighter (33% cada)
- Rank: A 50% · B 35% · S 15%
- `tankCapacity`: máximo de combustível · `fuel`: atual
- `crewCapacity`: vagas de tripulação · `canRefuelAtStation`: pode reabastecer na estação espacial
- Consumo por ação vem do GameParams: `travelFuelConsuption` e `bountyHuntFuelConsuption`

## GameParams (admin seta uma vez)

Tunáveis globais: consumo de combustível (viagem/bounty), custo de refuel (%), recompensas mín/máx de bounty hunt, médias/variações de recompensa por mina (gold/iron/copper/scrap) e versão do cliente exigida.

## Fluxo completo (como o jogo funciona)

1. **Admin** cria evento de venda (aba Admin → Create Sale): tipo, crypto (BNB/BUSD/SPC), preço, datas, quantidade e distribuição de raridade em %
2. **Player** deposita SPC (Account → Deposit): envia tokens pra carteira de vendas e registra o txHash — no modo sandbox qualquer hash único vale
3. **Player** compra na **Store**: precisa já ter uma nave pra comprar monkeynaut (regra de negócio); a primeira compra costuma ser a Ship
4. Nave comprada aparece em Ships; definir como **ativa** (change-active-ship)
5. Montar **Crew** (Monkeynauts → adicionar à nave ativa)
6. **Viajar** (consome fuel) ou iniciar **Bounty Hunt** (gasta fuel, gera pontos/recompensas)
7. Refuel na Space Station quando acabar o combustível (custa % conforme GameParams)
8. **Withdraw**: saca SPC ≥ 1000 pro wallet vinculado (na sandbox debita e confirma sem chain real)

## Sales Event (a vitrine com prazo)

É o evento que coloca itens à venda de forma controlada — tipo janela sazonal de loja. Vive em `@/modules/sales`, com três repositórios separados (monkeynaut/ship/pack sales) orquestrados pelo `create-sale`.

### Anatomia

| Campo | O que faz |
|---|---|
| `type` | Monkeynaut · Ship · Pack |
| `crypto` | moeda aceita: BNB, BUSD ou SPC |
| `price` | preço unitário naquela crypto |
| `startDate` / `endDate` | janela em que dá pra comprar (fora dela, bloqueado) |
| `quantity` / `currentQuantityAvailable` | estoque total vs restante |
| `totalUnitsSold` | contador de vendidos |
| `active` | admin pode parar a venda manualmente antes do fim |

### Distribuição de raridade (soma obrigatória = 100%)

- **Monkeynaut Sale**: % de nascer Private / Sergeant / Captain / Major
- **Ship Sale**: % de rank B / A / S
- **Pack Sale**: pack sorteado (Basic / Advanced / Expert / Random)

Ao comprar, a API sorteia nessas percentagens e cria a entidade já com atributos derivados do rank.

### Ciclo de vida

```
Admin cria evento ──► ativo dentro da janela ──► players compram
        (Admin → Create Sale)      (Store)         │
                                                   ▼
                              estoque diminui, raridade sorteada,
                              entidade criada pro comprador
                                   │
                    encerra: estoque zero, endDate passou,
                    ou admin para manualmente ("Stop" em Open Sales)
```

Cada compra é **1 item por transação** com txHash único (anti-replay). A checagem `can-buy-sale-item` valida: venda ativa, dentro da janela, estoque disponível e regras específicas (ex.: possuir ship antes de comprar monkeynaut).

## Regras que costumam surpreender

- Comprar monkeynaut exige possuir ship ("It is necessary to buy a ship before buying monkeynaut")
- Percentuais de raridade da venda devem somar 100
- Venda só nasce com startDate futura; encerra por quantity=0 ou stop manual do admin
- txHash é único globalmente (anti-replay via tabela logs)
- Player desabilitado some das buscas (soft-disable) — só admin reabilita

## Perfis (roles)

| Role | Origem | Acesso |
|---|---|---|
| `Default` | qualquer registro | Account, Store, Monkeynauts, Ships |
| `Admin` | seed (`ADMIN_*` do `.env`) ou SQL | + rotas `/admins/*`: Ban, Create Sale, AirDrop NFT, Game Params, Logs |
| `Owner` | apenas SQL hoje (não há endpoint de promoção) | + `/owners/*`: Private P2P intake |

Proteção em duas camadas: abas Admin/Owner só renderizam para o papel correto na web, e a API valida role nos middlewares `ensure-administrator`/`ensure-owner`. A escalação de privilégio que permitia virar admin via `PUT /players/update` foi corrigida na restauração.

## Carteira e modos de operação

| Driver da API | Conexão de carteira | Depósito/Compra/Saque |
|---|---|---|
| `sandbox` (default) | **Modo demo**: sem MetaMask o app gera endereço/txHash fictícios; com MetaMask instalada usa o fluxo real apontando pra BSC | validados só por formato/uniqueness; crédito usa o valor informado |
| `rpc` | exige carteira EVM (MetaMask) na rede `VITE_BSC_CHAIN_ID_HEX` | txHash validado on-chain contra o contrato SPC oficial |

O texto da aba Private Sale ("minimum of 0.3 BNB...", "1 BNB = 13.000 SPC") é da rodada de captação de 2022 — ver seção abaixo.

## Private Sale — feature legada (2022)

Era a **pré-venda do token SPC** antes do lançamento: investidores enviavam BNB real para a carteira do projeto e registravam o txHash na plataforma.

- Mínimo **0.3 BNB** e máximo **3 BNB** por conta — mecanismo anti-baleia para distribuir tokens entre mais jogadores (`@/config/balance`: `bnbAmountMin`, `bnbAmountMax`)
- Teto global de **100 BNB** arrecadados (`bnbAmountTotalMax`)
- Conversão fixa: **1 BNB = 13.000 SPC** (`@/config/game`: `amountOfSpcToBnb`)
- A API somava todos os aportes existentes para validar os limites; txHash único impedia replay

Hoje é código morto na prática (captação encerrada, sem fundos) mantido por decisão de escopo da restauração. O módulo `private-p2p` (aba Owner) era o intake manual desses aportes feitos fora da plataforma. Candidato natural a remoção no pruning futuro.

## Onde cada coisa fica na UI

| Aba (Dashboard) | Conteúdo |
|---|---|
| Account | dados do player, recursos, conectar carteira, depositar, sacar |
| Store | eventos de venda ativos (ships/monkeynauts/packs) e compra |
| Monkeynauts | lista dos seus tripulantes, atributos, montar crew |
| Ships | suas naves, fuel, nave ativa, viagem |
| Private Sale | pré-venda de 2022 (legado) — aporte BNB com txHash; ver seção "Private Sale" |
| Admin *(Admin+)* | Ban, Create Sale, AirDrop NFT, Game Params, Logs |
| Owner *(Owner)* | Private P2P intake (legado) |
