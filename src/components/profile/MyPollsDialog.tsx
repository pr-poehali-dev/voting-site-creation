import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'

interface MyPollsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MyPollsDialog({ open, onOpenChange }: MyPollsDialogProps) {
  const myPolls = [
    {
      id: '1',
      title: 'Выбор дизайна нового логотипа',
      status: 'active',
      votes: 105,
      createdAt: '2 дня назад'
    },
    {
      id: '2',
      title: 'Время проведения командных встреч',
      status: 'active',
      votes: 80,
      createdAt: '5 дней назад'
    },
    {
      id: '3',
      title: 'Предпочтения по корпоративным мероприятиям',
      status: 'closed',
      votes: 290,
      createdAt: '2 недели назад'
    }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Vote" size={24} />
            Мои голосования
          </DialogTitle>
          <DialogDescription>
            Голосования, созданные вами
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {myPolls.map((poll) => (
            <Card key={poll.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{poll.title}</h3>
                      <Badge variant={poll.status === 'active' ? 'default' : 'secondary'}>
                        {poll.status === 'active' ? 'Активно' : 'Завершено'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Icon name="Users" size={14} />
                        {poll.votes} голосов
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        {poll.createdAt}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="BarChart3" size={14} className="mr-1" />
                      Статистика
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Settings" size={14} className="mr-1" />
                      Настроить
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {myPolls.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Vote" size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">У вас пока нет созданных голосований</p>
              <Button className="mt-4">
                <Icon name="Plus" size={16} className="mr-2" />
                Создать первое голосование
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
