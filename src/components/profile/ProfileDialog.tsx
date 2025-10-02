import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'

interface User {
  name: string
  email: string
  role: string
}

interface ProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User
}

export function ProfileDialog({ open, onOpenChange, user }: ProfileDialogProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
      case 'demo-owner':
        return 'bg-gradient-to-r from-amber-400 to-orange-400 text-white'
      case 'admin':
        return 'bg-destructive text-white'
      default:
        return 'bg-success text-white'
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case 'owner': return 'Владелец'
      case 'demo-owner': return 'Демо Владелец'
      case 'admin': return 'Администратор'
      case 'demo-admin': return 'Демо Админ'
      default: return 'Участник'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="User" size={24} />
            Мой профиль
          </DialogTitle>
          <DialogDescription>
            Управление личными данными и настройками
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Профиль */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-white text-2xl font-bold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              <Badge className={`mt-2 ${getRoleColor(user.role)}`}>
                {getRoleText(user.role)}
              </Badge>
            </div>
          </div>

          {/* Форма */}
          <Card>
            <CardHeader>
              <CardTitle>Личная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input id="name" defaultValue={user.name} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" type="tel" placeholder="+7 (999) 999-99-99" />
              </div>
            </CardContent>
          </Card>

          {/* Статистика */}
          <Card>
            <CardHeader>
              <CardTitle>Активность</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Icon name="Vote" size={24} className="mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-500">Голосований</p>
              </div>
              <div className="text-center">
                <Icon name="CheckCircle2" size={24} className="mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-gray-500">Ответов</p>
              </div>
              <div className="text-center">
                <Icon name="Calendar" size={24} className="mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold">30</p>
                <p className="text-sm text-gray-500">Дней</p>
              </div>
            </CardContent>
          </Card>

          {/* Кнопки */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить изменения
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
