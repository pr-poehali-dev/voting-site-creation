import { useState } from 'react'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'

interface User {
  name: string
  email: string
  role: string
}

interface UserMenuProps {
  user: User
  onLogout: () => void
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
      case 'admin':
        return 'bg-destructive text-white'
      case 'moderator':
        return 'bg-orange-500 text-white'
      default:
        return 'bg-success text-white'
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case 'owner':
        return 'Владелец'
      case 'admin':
        return 'Администратор'
      case 'moderator':
        return 'Модератор'
      default:
        return 'Участник'
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-white font-medium">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="p-4">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-white font-medium text-lg">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground mt-1">
                  {user.email}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className={`w-fit ${getRoleColor(user.role)}`}>
              {getRoleText(user.role)}
            </Badge>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="cursor-pointer">
          <Icon name="User" size={16} className="mr-2" />
          Мой профиль
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer">
          <Icon name="Vote" size={16} className="mr-2" />
          Мои голосования
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer">
          <Icon name="BarChart3" size={16} className="mr-2" />
          Статистика
        </DropdownMenuItem>
        
        {(user.role === 'admin' || user.role === 'owner') && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Icon name="Settings" size={16} className="mr-2" />
              Управление
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer">
              <Icon name="Users" size={16} className="mr-2" />
              Пользователи
            </DropdownMenuItem>
            
            {user.role === 'owner' && (
              <DropdownMenuItem className="cursor-pointer">
                <Icon name="Crown" size={16} className="mr-2" />
                Владелец-панель
              </DropdownMenuItem>
            )}
          </>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="cursor-pointer">
          <Icon name="HelpCircle" size={16} className="mr-2" />
          Помощь
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="cursor-pointer text-destructive focus:text-destructive" 
          onClick={onLogout}
        >
          <Icon name="LogOut" size={16} className="mr-2" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}