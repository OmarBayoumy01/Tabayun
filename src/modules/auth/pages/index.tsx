import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { Loader2, Lock, Mail, ShieldCheck } from 'lucide-react'
import { setToken } from '@/lib/auth'
import { queryClient } from '@/lib/queryClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { BrandMark } from '@/components/brand-mark'
import { useLogin, userQueryKey } from '../apis/queries'
import type { User } from '../types'
import { useNotify } from '@/hooks/notify'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type LoginValues = z.infer<typeof loginSchema>

export function LoginController() {
  const navigate = useNavigate()
  const { notify } = useNotify()
  const login = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (values: LoginValues) => {
    login.mutate(values, {
      onSuccess: ({ access_token, role }) => {
        setToken(access_token)
        // Seed the gate's user query so AppWrapper sees an authenticated session
        // immediately instead of the stale error cached on the initial
        // unauthenticated load (which otherwise bounces us back to /auth/login).
        queryClient.setQueryData<User>(userQueryKey, {
          id: 1,
          name: values.email.split('@')[0],
          email: values.email,
          role,
        })
        navigate('/dashboard', { replace: true })
        notify.success('Signed in successfully')
      },
      // Server errors (e.g. 401 invalid credentials) surface via the axios
      // interceptor's toast, so no extra handling is needed here.
    })
  }

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <BrandMark size="lg" showWordmark={false} />
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to Tabayun
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to check whether a photo or video is real.
          </p>
        </div>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Sign in</CardTitle>
          <CardDescription>Enter your credentials to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="pl-9"
                  aria-invalid={!!errors.email}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="pl-9"
                  aria-invalid={!!errors.password}
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={login.isPending}>
              {login.isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="size-3.5 text-success" />
        Your files are analysed privately and never stored.
      </p>
    </div>
  )
}
