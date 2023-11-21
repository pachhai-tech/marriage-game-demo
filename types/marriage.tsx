export type GameSettings = {
  numPlayers: number
  seenPoint: number
  unseenPoint: number
  pointRate: number
  currency: 'USD' | 'NPR'
  dublee: boolean
  dubleePointLess: boolean
  dubleeBonusPoint: number
  foulPoint: number
  foulBonus: 'Next Game' | 'Current Game'
}

export type MarriagePlay = {
  playerName: string
  seen: boolean
  dublee: boolean
  points: number
}

export type MarriageWinner = {
  playerName: string
  points: number
  value: number
  currency: 'USD' | 'NPR'
}

export type MarriageScoreTracker = {
  uid: string
  docId: string
  createdAt: string
  updatedAt: string
  settings: GameSettings
  plays: Record<string, MarriagePlay>
  winner: MarriageWinner
}
