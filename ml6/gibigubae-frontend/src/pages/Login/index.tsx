import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, ImagePlaceholder, Input } from '@components/ui';
import { useAuth } from '@hooks/useAuth';
import { loginSchema, type LoginFormValues } from './loginSchema';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoggingIn, loginError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginFormValues) => {
    await login({ phone: `+251${values.phone}`, password: values.password });
    const redirectTo = (location.state as { from?: Location })?.from?.pathname ?? '/';
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-4 py-16">
      <ImagePlaceholder aspect="aspect-video" tone="dark" className="absolute inset-0 h-full w-full rounded-none opacity-30" />
      <div className="absolute inset-0 bg-ink/40" aria-hidden="true" />

      <div className="relative w-full max-w-md rounded-2xl bg-ink p-8 text-center shadow-xl sm:p-10">
        <ImagePlaceholder round className="mx-auto h-20 w-20" tone="dark" />
        <h1 className="mt-6 font-heading text-2xl text-white">Welcome Back!</h1>
        <p className="mt-1 text-sm text-white/60">Sign in to your Gibi Gubae account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4 text-left" noValidate>
          <Input
            tone="dark"
            placeholder="+251 Phone number"
            inputMode="numeric"
            error={errors.phone?.message}
            {...register('phone')}
          />
          <Input
            tone="dark"
            type="password"
            placeholder="Password"
            error={errors.password?.message}
            {...register('password')}
          />

          {loginError && (
            <p role="alert" className="text-sm text-red-400">
              Couldn't sign you in. Check your phone number and password and try again.
            </p>
          )}

          <Button type="submit" variant="accent" fullWidth disabled={isLoggingIn}>
            {isLoggingIn ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>

        <p className="mt-5 text-sm text-white/70">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-accent hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
