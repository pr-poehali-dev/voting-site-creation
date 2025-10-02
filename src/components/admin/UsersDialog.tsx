import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import Icon from '@/components/ui/icon'

interface User {
  name: string
  email: string
  role: string
}

interface UsersDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentUser: User
}

export function UsersDialog({ open, onOpenChange, currentUser }: UsersDialogProps) {
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Александр Иванов',
      email: 'snovi6423@gmail.com',
      role: 'owner',
      roleText: 'Владелец',
      color: 'bg-amber-500',
      polls: 12,
      votes: 45
    },
    {
      id: '2',
      name: 'Демо Админ',
      email: 'demo@admin.ru',
      role: 'demo-admin',
      roleText: 'Демо Админ',
      color: 'bg-red-400',
      polls: 5,
      votes: 23
    },
    {
      id: '3',
      name: 'Демо Участник',
      email: 'demo@user.ru',
      role: 'demo-user',
      roleText: 'Демо Участник',
      color: 'bg-green-400',
      polls: 0,
      votes: 12
    }
  ])

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId))
    setUserToDelete(null)
  }

  const getUserToDeleteInfo = () => {
    return users.find(u => u.id === userToDelete)
  }

  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Users" size={24} />
            Управление пользователями
          </DialogTitle>
          <DialogDescription>
            Список пользователей и их права доступа
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Поиск */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Поиск по имени или email..." 
                className="pl-9"
              />
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Icon name="UserPlus" size={16} className="mr-2" />
              Пригласить
            </Button>
          </div>

          {/* Список пользователей */}
          <div className="space-y-3">
            {users.map((user) => (
              <Card key={user.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 ${user.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{user.name}</h3>
                          <Badge className={`${user.color} text-white`}>
                            {user.roleText}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Icon name="Vote" size={12} />
                            {user.polls} голосований
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="CheckCircle2" size={12} />
                            {user.votes} ответов
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {user.role !== 'owner' && currentUser.role === 'owner' && (
                        <>
                          <Button variant="outline" size="sm">
                            <Icon name="Settings" size={14} className="mr-1" />
                            Роль
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => setUserToDelete(user.id)}
                          >
                            <Icon name="Trash2" size={14} className="mr-1" />
                            Удалить
                          </Button>
                        </>
                      )}
                      {user.role !== 'owner' && currentUser.role !== 'owner' && (
                        <Badge variant="secondary">Только для владельца</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Статистика */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{users.length}</p>
              <p className="text-sm text-gray-500">Всего пользователей</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => !u.role.startsWith('demo-')).length}
              </p>
              <p className="text-sm text-gray-500">Активных</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {users.reduce((acc, u) => acc + u.polls, 0)}
              </p>
              <p className="text-sm text-gray-500">Создано голосований</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить пользователя?</AlertDialogTitle>
          <AlertDialogDescription>
            Вы уверены, что хотите удалить пользователя <strong>{getUserToDeleteInfo()?.name}</strong>?
            Это действие нельзя отменить. Все голосования и данные пользователя будут сохранены.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => userToDelete && handleDeleteUser(userToDelete)}
            className="bg-destructive hover:bg-destructive/90"
          >
            Удалить пользователя
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}