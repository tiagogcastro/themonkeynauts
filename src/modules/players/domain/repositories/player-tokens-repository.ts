export interface IPlayerTokensRepository {
  generate(player_id: string): Promise<PlayerToken>
  findByToken(token: string): Promise<PlayerToken | null>
  findByPlayerId(player_id: string): Promise<PlayerToken | null>
  destroy(player_token_id: string): Promise<void>
}