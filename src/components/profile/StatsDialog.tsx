import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'

interface StatsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StatsDialog({ open, onOpenChange }: StatsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="BarChart3" size={24} />
            Статистика
          </DialogTitle>
          <DialogDescription>
            Ваша активность и достижения
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Общая статистика */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-1">
                  <Icon name="Vote" size={14} className="text-primary" />
                  Создано
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">12</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-1">
                  <Icon name="CheckCircle2" size={14} className="text-green-600" />
                  Участвовал
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">45</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-1">
                  <Icon name="Users" size={14} className="text-blue-600" />
                  Голосов собрано
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">1.2K</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-1">
                  <Icon name="TrendingUp" size={14} className="text-orange-600" />
                  Активность
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-orange-600">89%</p>
              </CardContent>
            </Card>
          </div>

          {/* Популярные голосования */}
          <Card>
            <CardHeader>
              <CardTitle>Ваши самые популярные голосования</CardTitle>
              <CardDescription>По количеству участников</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: 'Корпоративные мероприятия', votes: 290, percentage: 100 },
                { title: 'Выбор дизайна логотипа', votes: 105, percentage: 36 },
                { title: 'Время командных встреч', votes: 80, percentage: 28 }
              ].map((poll, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{poll.title}</span>
                    <span className="text-sm text-gray-500">{poll.votes} голосов</span>
                  </div>
                  <Progress value={poll.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Активность по дням */}
          <Card>
            <CardHeader>
              <CardTitle>Активность за последнюю неделю</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => {
                  const activities = [5, 8, 3, 12, 7, 2, 4]
                  return (
                    <div key={day} className="text-center">
                      <div 
                        className="h-16 bg-primary/20 rounded-lg mb-2 flex items-end justify-center p-2"
                        style={{ height: `${activities[index] * 8}px`, minHeight: '32px' }}
                      >
                        <span className="text-xs font-bold text-primary">{activities[index]}</span>
                      </div>
                      <p className="text-xs text-gray-500">{day}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Достижения */}
          <Card>
            <CardHeader>
              <CardTitle>Достижения</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: 'Trophy', label: 'Первое голосование', unlocked: true },
                { icon: 'Star', label: '100+ голосов', unlocked: true },
                { icon: 'Award', label: '10 голосований', unlocked: true },
                { icon: 'Target', label: '1000+ голосов', unlocked: false }
              ].map((achievement, index) => (
                <div 
                  key={index} 
                  className={`text-center p-4 border rounded-lg ${achievement.unlocked ? 'bg-primary/5 border-primary/20' : 'opacity-50'}`}
                >
                  <Icon 
                    name={achievement.icon as any} 
                    size={32} 
                    className={`mx-auto mb-2 ${achievement.unlocked ? 'text-primary' : 'text-gray-400'}`}
                  />
                  <p className="text-xs font-medium">{achievement.label}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
