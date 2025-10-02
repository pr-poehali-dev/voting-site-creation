import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'

interface AdminPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdminPanel({ open, onOpenChange }: AdminPanelProps) {
  const stats = [
    { label: 'Всего голосований', value: '12', icon: 'Vote', color: 'text-blue-600' },
    { label: 'Активных', value: '5', icon: 'Activity', color: 'text-green-600' },
    { label: 'Участников', value: '247', icon: 'Users', color: 'text-purple-600' },
    { label: 'Всего голосов', value: '1,543', icon: 'TrendingUp', color: 'text-orange-600' },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Settings" size={24} />
            Панель управления
          </DialogTitle>
          <DialogDescription>
            Управление голосованиями и настройками системы
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Статистика */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2">
                    <Icon name={stat.icon as any} size={16} className={stat.color} />
                    {stat.label}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Последние голосования */}
          <Card>
            <CardHeader>
              <CardTitle>Последние голосования</CardTitle>
              <CardDescription>Управление активными опросами</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: 'Выбор дизайна логотипа', status: 'active', votes: 105 },
                  { title: 'Время командных встреч', status: 'active', votes: 80 },
                  { title: 'Корпоративные мероприятия', status: 'closed', votes: 290 },
                ].map((poll, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Icon name="Vote" size={20} className="text-gray-400" />
                      <div>
                        <p className="font-medium">{poll.title}</p>
                        <p className="text-sm text-gray-500">{poll.votes} голосов</p>
                      </div>
                    </div>
                    <Badge variant={poll.status === 'active' ? 'default' : 'secondary'}>
                      {poll.status === 'active' ? 'Активно' : 'Завершено'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Быстрые действия */}
          <Card>
            <CardHeader>
              <CardTitle>Быстрые действия</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <button className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Icon name="UserPlus" size={20} className="text-blue-600" />
                <div>
                  <p className="font-medium">Пригласить участников</p>
                  <p className="text-xs text-gray-500">Добавить новых пользователей</p>
                </div>
              </button>
              
              <button className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Icon name="FileText" size={20} className="text-green-600" />
                <div>
                  <p className="font-medium">Экспорт данных</p>
                  <p className="text-xs text-gray-500">Скачать результаты</p>
                </div>
              </button>
              
              <button className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Icon name="Bell" size={20} className="text-orange-600" />
                <div>
                  <p className="font-medium">Уведомления</p>
                  <p className="text-xs text-gray-500">Настроить оповещения</p>
                </div>
              </button>
              
              <button className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Icon name="Lock" size={20} className="text-purple-600" />
                <div>
                  <p className="font-medium">Безопасность</p>
                  <p className="text-xs text-gray-500">Настройки доступа</p>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
