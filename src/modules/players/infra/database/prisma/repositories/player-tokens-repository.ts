// import { PlayerToken } from "@prisma/client"
// import { prisma } from "../../../../shared/prisma/client"
// import crypto from "node:crypto"
// import { IPlayerTokensRepository } from "../IPlayerTokensRepository"

// export class PlayerTokensRepository implements IPlayerTokensRepository {
//     async findByPlayerId(player_id: string): Promise<PlayerToken | null> {
//         return prisma.playerToken.findFirst({
//             where: {
//                 player_id
//             }
//         })
//     }

//     async destroy(player_token_id: string): Promise<void> {
//         await prisma.playerToken.delete({
//             where: {
//                 id: player_token_id
//             }
//         })
//     }

//     async generate(player_id: string): Promise<PlayerToken> {
//         return prisma.playerToken.create({
//             data: {
//                 id: crypto.randomUUID(),
//                 token: crypto.randomUUID(),
//                 player_id
//             }
//         })
//     }
//   async findByToken(token: string): Promise<PlayerToken | null> {
//     return prisma.playerToken.findUnique({
//         where: {
//             token
//         }
//     })
//   }
// }