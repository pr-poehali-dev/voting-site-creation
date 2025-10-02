// API клиент для работы с бэкендом

const POLLS_API = 'https://functions.poehali.dev/84ed2c58-df4a-4461-8aff-eccb56f98410'

export interface Poll {
  id: string
  title: string
  description: string
  options: {
    id: string
    text: string
    votes: number
  }[]
  totalVotes: number
  isActive: boolean
  endDate: string
  creatorName?: string
}

export interface CreatePollData {
  title: string
  description: string
  options: string[]
  endDate: string
  userId?: number
}

export interface VoteData {
  pollId: string
  optionId: string
  userId?: number
}

// Получить все голосования
export async function getPolls(): Promise<Poll[]> {
  const response = await fetch(POLLS_API, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch polls')
  }

  const data = await response.json()
  return data.polls || []
}

// Создать голосование
export async function createPoll(pollData: CreatePollData): Promise<{ success: boolean; pollId: number }> {
  const response = await fetch(POLLS_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'create',
      ...pollData,
      userId: pollData.userId || 1, // Системный пользователь по умолчанию
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to create poll')
  }

  return response.json()
}

// Проголосовать
export async function vote(voteData: VoteData): Promise<{ success: boolean }> {
  const response = await fetch(POLLS_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'vote',
      ...voteData,
      userId: voteData.userId || 1, // Системный пользователь по умолчанию
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to vote')
  }

  return response.json()
}
