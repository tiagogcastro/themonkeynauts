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

## Regras que costumam surpreender

- Comprar monkeynaut exige possuir ship ("It is necessary to buy a ship before buying monkeynaut")
- Percentuais de raridade da venda devem somar 100
- Venda só nasce com startDate futura; encerra por quantity=0 ou stop manual do admin
- txHash é único globalmente (anti-replay via tabela logs)
- Player desabilitado some das buscas (soft-disable) — só admin reabilita

## Onde cada coisa fica na UI

| Aba (Dashboard) | Conteúdo |
|---|---|
| Account | dados do player, recursos, conectar carteira, depositar, sacar |
| Store | eventos de venda ativos (ships/monkeynauts/packs) e compra |
| Monkeynauts | lista dos seus tripulantes, atributos, montar crew |
| Ships | suas naves, fuel, nave ativa, viagem |
| Admin *(Admin+)* | Ban, Create Sale, AirDrop NFT, Game Params, Logs |
| Owner *(Owner)* | Private P2P intake (legado) |
