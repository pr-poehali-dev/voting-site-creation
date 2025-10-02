import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'
import { LoginDialog } from '@/components/auth/LoginDialog'
import { UserMenu } from '@/components/auth/UserMenu'
import { CreatePollDialog } from '@/components/polls/CreatePollDialog'
import { AdminPanel } from '@/components/admin/AdminPanel'
import { OwnerPanel } from '@/components/admin/OwnerPanel'

interface User {
  name: string
  email: string
  role: string
}

interface Poll {
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
}

const mockPolls: Poll[] = [
  {
    id: '1',
    title: 'Выберите дизайн нового логотипа',
    description: 'Помогите нам выбрать лучший вариант логотипа для компании',
    options: [
      { id: '1a', text: 'Минималистичный дизайн', votes: 45 },
      { id: '1b', text: 'Яркий и креативный', votes: 32 },
      { id: '1c', text: 'Классический стиль', votes: 28 }
    ],
    totalVotes: 105,
    isActive: true,
    endDate: '2025-10-15'
  },
  {
    id: '2',
    title: 'Время проведения командных встреч',
    description: 'Когда вам удобнее участвовать в еженедельных встречах?',
    options: [
      { id: '2a', text: 'Понедельник 10:00', votes: 15 },
      { id: '2b', text: 'Среда 14:00', votes: 42 },
      { id: '2c', text: 'Пятница 16:00', votes: 23 }
    ],
    totalVotes: 80,
    isActive: true,
    endDate: '2025-09-30'
  },
  {
    id: '3',
    title: 'Предпочтения по корпоративным мероприятиям',
    description: 'Какие виды корпоративных мероприятий вам наиболее интересны?',
    options: [
      { id: '3a', text: 'Спортивные соревнования', votes: 67 },
      { id: '3b', text: 'Творческие мастер-классы', votes: 89 },
      { id: '3c', text: 'Выездные тимбилдинги', votes: 134 }
    ],
    totalVotes: 290,
    isActive: false,
    endDate: '2025-09-20'
  }
]

const Index = () => {
  const [polls, setPolls] = useState<Poll[]>(mockPolls)
  const [votedPolls, setVotedPolls] = useState<Set<string>>(new Set())
  const [user, setUser] = useState<User | null>(null)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showCreatePollDialog, setShowCreatePollDialog] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [showOwnerPanel, setShowOwnerPanel] = useState(false)

  const handleLogin = (userData: User) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
    setVotedPolls(new Set())
  }

  const handleVote = (pollId: string, optionId: string) => {
    if (!user) {
      setShowLoginDialog(true)
      return
    }
    
    if (votedPolls.has(pollId)) return

    setPolls(prevPolls =>
      prevPolls.map(poll => {
        if (poll.id === pollId) {
          return {
            ...poll,
            options: poll.options.map(option =>
              option.id === optionId
                ? { ...option, votes: option.votes + 1 }
                : option
            ),
            totalVotes: poll.totalVotes + 1
          }
        }
        return poll
      })
    )

    setVotedPolls(prev => new Set(prev).add(pollId))
  }

  const getVotePercentage = (votes: number, total: number) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0
  }

  const handleCreatePoll = (pollData: {
    title: string
    description: string
    options: string[]
    endDate: string
  }) => {
    const newPoll: Poll = {
      id: Date.now().toString(),
      title: pollData.title,
      description: pollData.description,
      options: pollData.options.map((text, index) => ({
        id: `${Date.now()}-${index}`,
        text,
        votes: 0
      })),
      totalVotes: 0,
      isActive: true,
      endDate: pollData.endDate
    }

    setPolls([newPoll, ...polls])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Vote" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Голосование.ру</h1>
                <p className="text-sm text-gray-600">Анонимные голосования</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    disabled={user.role.startsWith('demo-')}
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    {user.role.startsWith('demo-') ? 'Демо - ограничено' : 'Создать голосование'}
                  </Button>
                  <UserMenu 
                    user={user} 
                    onLogout={handleLogout}
                    onOpenAdminPanel={() => setShowAdminPanel(true)}
                    onOpenOwnerPanel={() => setShowOwnerPanel(true)}
                  />
                </>
              ) : (
                <Button onClick={() => setShowLoginDialog(true)} variant="outline">
                  <Icon name="LogIn" size={16} className="mr-2" />
                  Войти
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message for Logged in Users */}
        {user && (
          <Card className="mb-8 animate-fade-in bg-gradient-to-r from-primary/5 to-success/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    Добро пожаловать, {user.name}!
                  </h2>
                  <p className="text-gray-600">
                    {user.role === 'owner' ? 'Добро пожаловать, владелец! У вас максимальные права доступа'
                     : user.role === 'demo-owner' ? 'Демо режим владельца - ограниченные функции для тестирования'
                     : user.role === 'admin' ? 'У вас есть полный доступ к управлению платформой'
                     : user.role === 'demo-admin' ? 'Демо режим администратора - ограниченные функции'
                     : user.role === 'demo-user' ? 'Демо режим участника - тестируйте базовые функции'
                     : 'Участвуйте в голосованиях и создавайте свои опросы'}
                  </p>
                </div>
                <Badge variant="secondary" className={
                  user.role === 'owner' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                  : user.role === 'demo-owner' ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white border border-amber-300'
                  : user.role === 'admin' ? 'bg-destructive text-white'
                  : user.role === 'demo-admin' ? 'bg-red-400 text-white border border-red-300'
                  : user.role === 'demo-user' ? 'bg-green-400 text-white border border-green-300'
                  : 'bg-success text-white'
                }>
                  {user.role === 'owner' ? 'Владелец'
                   : user.role === 'demo-owner' ? 'Демо Владелец'
                   : user.role === 'admin' ? 'Администратор'
                   : user.role === 'demo-admin' ? 'Демо Админ'
                   : user.role === 'demo-user' ? 'Демо Участник'
                   : 'Участник'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-fade-in hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="BarChart3" size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-sm text-gray-600">Активных голосований</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in hover-scale" style={{animationDelay: '0.1s'}}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={24} className="text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{user ? '475' : '???'}</p>
                  <p className="text-sm text-gray-600">Участников</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in hover-scale" style={{animationDelay: '0.2s'}}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={24} className="text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">100%</p>
                  <p className="text-sm text-gray-600">Анонимность</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Polls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {polls.map((poll, index) => {
            const hasVoted = votedPolls.has(poll.id)
            
            return (
              <Card 
                key={poll.id} 
                className="animate-slide-up hover-scale transition-all duration-300"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{poll.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {poll.description}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={poll.isActive ? "default" : "secondary"}
                      className={poll.isActive ? "bg-success text-white" : ""}
                    >
                      {poll.isActive ? 'Активно' : 'Завершено'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={16} />
                      <span>{poll.totalVotes} голосов</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={16} />
                      <span>до {poll.endDate}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {poll.options.map((option) => {
                      const percentage = getVotePercentage(option.votes, poll.totalVotes)
                      
                      return (
                        <div key={option.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-900">{option.text}</span>
                            {hasVoted && (
                              <span className="text-sm text-gray-600">
                                {option.votes} ({percentage}%)
                              </span>
                            )}
                          </div>
                          
                          {hasVoted ? (
                            <Progress 
                              value={percentage} 
                              className="h-3"
                            />
                          ) : (
                            <Button
                              onClick={() => handleVote(poll.id, option.id)}
                              variant="outline"
                              className="w-full justify-start hover:bg-primary/5 hover:border-primary transition-all duration-200"
                              disabled={!poll.isActive || !user}
                            >
                              <Icon name="ChevronRight" size={16} className="mr-2" />
                              {!user ? 'Войдите для голосования' : 'Выбрать этот вариант'}
                            </Button>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {hasVoted && (
                    <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-lg">
                      <div className="flex items-center space-x-2 text-success">
                        <Icon name="CheckCircle" size={20} />
                        <span className="font-medium">Ваш голос учтён!</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Спасибо за участие в голосовании. Результаты обновляются в реальном времени.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State for More Polls */}
        <Card className="mt-8 animate-fade-in border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Icon name="Plus" size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Создайте новое голосование
            </h3>
            <p className="text-gray-600 text-center max-w-md mb-6">
              Соберите мнения команды, проведите опрос клиентов или организуйте 
              голосование по важным вопросам.
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => {
                if (!user) {
                  setShowLoginDialog(true)
                } else {
                  setShowCreatePollDialog(true)
                }
              }}
            >
              <Icon name="Vote" size={16} className="mr-2" />
              {!user ? 'Войдите для создания' : 'Начать голосование'}
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={20} className="text-primary" />
              <span className="text-sm text-gray-600">
                Все голосования полностью анонимны и зашифрованы
              </span>
            </div>
            <div className="text-sm text-gray-500">
              © 2025 Голосование.ру. Безопасные голосования.
            </div>
          </div>
        </div>
      </footer>

      {/* Dialogs */}
      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog}
        onLogin={handleLogin}
      />
      
      <CreatePollDialog
        open={showCreatePollDialog}
        onOpenChange={setShowCreatePollDialog}
        onCreatePoll={handleCreatePoll}
      />

      <AdminPanel
        open={showAdminPanel}
        onOpenChange={setShowAdminPanel}
      />

      <OwnerPanel
        open={showOwnerPanel}
        onOpenChange={setShowOwnerPanel}
      />
    </div>
  )
}

export default Index