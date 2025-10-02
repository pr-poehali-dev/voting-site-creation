import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import Icon from '@/components/ui/icon'

interface OwnerPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OwnerPanel({ open, onOpenChange }: OwnerPanelProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Crown" size={24} className="text-amber-500" />
            Владелец-панель
          </DialogTitle>
          <DialogDescription>
            Расширенные настройки и управление системой
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Системные настройки */}
          <Card>
            <CardHeader>
              <CardTitle>Системные настройки</CardTitle>
              <CardDescription>Основные параметры платформы</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Публичная регистрация</Label>
                  <p className="text-sm text-gray-500">Разрешить новым пользователям регистрироваться</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Модерация голосований</Label>
                  <p className="text-sm text-gray-500">Требовать одобрение новых голосований</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email уведомления</Label>
                  <p className="text-sm text-gray-500">Отправлять уведомления на почту</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Анонимное голосование</Label>
                  <p className="text-sm text-gray-500">Скрывать данные голосующих</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Управление ролями */}
          <Card>
            <CardHeader>
              <CardTitle>Управление ролями</CardTitle>
              <CardDescription>Пользователи и права доступа</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Александр Иванов', email: 'snovi6423@gmail.com', role: 'Владелец', color: 'bg-amber-500' },
                  { name: 'Демо Админ', email: 'demo@admin.ru', role: 'Демо Админ', color: 'bg-red-400' },
                  { name: 'Демо Участник', email: 'demo@user.ru', role: 'Демо Участник', color: 'bg-green-400' },
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${user.color} rounded-full flex items-center justify-center text-white font-medium`}>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 ${user.color} text-white rounded-full text-sm font-medium`}>
                      {user.role}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Статистика платформы */}
          <Card>
            <CardHeader>
              <CardTitle>Статистика платформы</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Icon name="Database" size={32} className="mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold">2.4 GB</p>
                <p className="text-sm text-gray-500">Использовано</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <Icon name="Zap" size={32} className="mx-auto mb-2 text-yellow-600" />
                <p className="text-2xl font-bold">99.9%</p>
                <p className="text-sm text-gray-500">Uptime</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <Icon name="Shield" size={32} className="mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">SSL</p>
                <p className="text-sm text-gray-500">Защищено</p>
              </div>
            </CardContent>
          </Card>

          {/* Опасные действия */}
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Опасная зона</CardTitle>
              <CardDescription>Необратимые действия - будьте осторожны</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors text-left">
                <div className="flex items-center gap-2">
                  <Icon name="Archive" size={20} className="text-orange-600" />
                  <div>
                    <p className="font-medium">Архивировать все завершенные голосования</p>
                    <p className="text-xs text-gray-500">Перенести в архив неактивные опросы</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-left">
                <div className="flex items-center gap-2">
                  <Icon name="Trash2" size={20} className="text-red-600" />
                  <div>
                    <p className="font-medium text-red-600">Удалить все данные</p>
                    <p className="text-xs text-gray-500">Полная очистка базы данных</p>
                  </div>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
