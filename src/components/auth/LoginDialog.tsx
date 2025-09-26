import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Icon from '@/components/ui/icon'

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLogin: (user: { name: string; email: string; role: string }) => void
}

export function LoginDialog({ open, onOpenChange, onLogin }: LoginDialogProps) {
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Проверка учетных данных
    let user
    
    if (loginData.email === 'snovi6423@gmail.com' && loginData.password === '89223109976') {
      user = {
        name: 'Владелец',
        email: loginData.email,
        role: 'owner'
      }
    } else if (loginData.email === 'admin@votespace.ru') {
      user = {
        name: 'Администратор',
        email: loginData.email,
        role: 'admin'
      }
    } else {
      user = {
        name: 'Пользователь',
        email: loginData.email,
        role: 'user'
      }
    }
    
    onLogin(user)
    onOpenChange(false)
    setLoginData({ email: '', password: '' })
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (registerData.password !== registerData.confirmPassword) {
      alert('Пароли не совпадают')
      return
    }
    
    // Симуляция регистрации
    const user = {
      name: registerData.name,
      email: registerData.email,
      role: 'user'
    }
    
    onLogin(user)
    onOpenChange(false)
    setRegisterData({ name: '', email: '', password: '', confirmPassword: '' })
  }

  const handleDemoLogin = (type: 'admin' | 'user' | 'owner') => {
    let user
    
    if (type === 'owner') {
      user = { name: 'Демо Владелец', email: 'demo-owner@golосование.ru', role: 'demo-owner' }
    } else if (type === 'admin') {
      user = { name: 'Демо Админ', email: 'demo-admin@golосование.ru', role: 'demo-admin' }
    } else {
      user = { name: 'Демо Участник', email: 'demo-user@golосование.ru', role: 'demo-user' }
    }
    
    onLogin(user)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Icon name="UserCheck" size={24} className="text-primary" />
            <span>Добро пожаловать в Голосование.ру</span>
          </DialogTitle>
          <DialogDescription>
            Войдите в свою учетную запись или создайте новую для участия в голосованиях
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Вход в систему</CardTitle>
                <CardDescription>
                  Введите свои учетные данные для входа
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Пароль</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Icon name="LogIn" size={16} className="mr-2" />
                    Войти
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Или попробуйте демо
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" onClick={() => handleDemoLogin('user')} className="text-xs">
                    <Icon name="User" size={14} className="mr-1" />
                    Участник
                  </Button>
                  <Button variant="outline" onClick={() => handleDemoLogin('admin')} className="text-xs">
                    <Icon name="Shield" size={14} className="mr-1" />
                    Админ
                  </Button>
                  <Button variant="outline" onClick={() => handleDemoLogin('owner')} className="text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-500 hover:from-amber-600 hover:to-orange-600">
                    <Icon name="Crown" size={14} className="mr-1" />
                    Демо Владелец
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Создать аккаунт</CardTitle>
                <CardDescription>
                  Заполните форму для создания новой учетной записи
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ваше имя"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="your@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Пароль</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Создать аккаунт
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}