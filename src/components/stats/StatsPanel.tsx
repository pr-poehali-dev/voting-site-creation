import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'

interface StatsPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StatsPanel({ open, onOpenChange }: StatsPanelProps) {
  const userStats = {
    totalVotes: 23,
    participatedPolls: 8,
    createdPolls: 3,
    activePolls: 2
  }

  const recentActivity = [
    { poll: 'Выбор дизайна логотипа', action: 'Проголосовал', time: '2 часа назад', option: 'Минималистичный дизайн' },
    { poll: 'Время командных встреч', action: 'Проголосовал', time: '1 день назад', option: 'Среда 14:00' },
    { poll: 'Корпоративные мероприятия', action: 'Создал', time: '3 дня назад', option: null },
  ]

  const popularPolls = [
    { title: 'Выбор дизайна логотипа', votes: 105, participation: 67 },
    { title: 'Время командных встреч', votes: 80, participation: 51 },
    { title: 'Корпоративные мероприятия', votes: 290, participation: 92 },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="BarChart3" size={24} />
            Моя статистика
          </DialogTitle>
          <DialogDescription>
            Ваша активность и участие в голосованиях
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Общая статистика */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Icon name="Vote" size={16} className="text-blue-600" />
                  Всего голосов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{userStats.totalVotes}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Icon name="CheckCircle" size={16} className="text-green-600" />
                  Участвовал
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{userStats.participatedPolls}</p>
                <p className="text-xs text-gray-500">голосований</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Icon name="Plus" size={16} className="text-purple-600" />
                  Создано
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{userStats.createdPolls}</p>
                <p className="text-xs text-gray-500">опросов</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Icon name="Activity" size={16} className="text-orange-600" />
                  Активных
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{userStats.activePolls}</p>
                <p className="text-xs text-gray-500">сейчас</p>
              </CardContent>
            </Card>
          </div>

          {/* Последняя активность */}
          <Card>
            <CardHeader>
              <CardTitle>Последняя активность</CardTitle>
              <CardDescription>Ваши действия в системе</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3 flex-1">
                      <Icon 
                        name={activity.action === 'Создал' ? 'Plus' : 'Vote'} 
                        size={20} 
                        className={activity.action === 'Создал' ? 'text-purple-600 mt-1' : 'text-blue-600 mt-1'} 
                      />
                      <div className="flex-1">
                        <p className="font-medium">{activity.poll}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                        {activity.option && (
                          <Badge variant="outline" className="mt-1">
                            {activity.option}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 whitespace-nowrap ml-4">{activity.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Популярные голосования */}
          <Card>
            <CardHeader>
              <CardTitle>Популярные голосования</CardTitle>
              <CardDescription>Самые активные опросы</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {popularPolls.map((poll, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon name="TrendingUp" size={16} className="text-green-600" />
                      <p className="font-medium">{poll.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{poll.votes} голосов</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={poll.participation} className="flex-1" />
                    <p className="text-sm text-gray-600 min-w-[3rem] text-right">{poll.participation}%</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Достижения */}
          <Card>
            <CardHeader>
              <CardTitle>Достижения</CardTitle>
              <CardDescription>Ваши награды за активность</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center p-4 border rounded-lg bg-yellow-50">
                  <Icon name="Award" size={32} className="mx-auto mb-2 text-yellow-600" />
                  <p className="font-medium">Активист</p>
                  <p className="text-xs text-gray-500">10+ голосов</p>
                </div>
                
                <div className="text-center p-4 border rounded-lg bg-blue-50">
                  <Icon name="Users" size={32} className="mx-auto mb-2 text-blue-600" />
                  <p className="font-medium">Организатор</p>
                  <p className="text-xs text-gray-500">Создал 3 опроса</p>
                </div>
                
                <div className="text-center p-4 border rounded-lg bg-green-50">
                  <Icon name="Star" size={32} className="mx-auto mb-2 text-green-600" />
                  <p className="font-medium">Популярный</p>
                  <p className="text-xs text-gray-500">100+ участников</p>
                </div>
                
                <div className="text-center p-4 border rounded-lg bg-purple-50 opacity-50">
                  <Icon name="Trophy" size={32} className="mx-auto mb-2 text-purple-600" />
                  <p className="font-medium">Эксперт</p>
                  <p className="text-xs text-gray-500">Заблокировано</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
