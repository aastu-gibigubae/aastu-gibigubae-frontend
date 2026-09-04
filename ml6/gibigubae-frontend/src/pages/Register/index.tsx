import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button, ImagePlaceholder, Input, Select } from '@components/ui';
import { useAuth } from '@hooks/useAuth';
import { registerSchema, type RegisterFormValues } from './registerSchema';
import { DEPARTMENT_OPTIONS, GENDER_OPTIONS } from './departmentOptions';

export default function Register() {
  const navigate = useNavigate();
  const { register: registerUser, isRegistering, registerError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (values: RegisterFormValues) => {
    await registerUser({ ...values, phone: `+251${values.phone}` });
    navigate('/', { replace: true });
  };

  return (
    <div className="grid min-h-screen bg-ink lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-16 sm:px-8">
        <div className="w-full max-w-md">
          <ImagePlaceholder round tone="dark" className="h-16 w-16" />
          <h1 className="mt-6 font-heading text-3xl text-white">Create your account</h1>
          <p className="mt-1 text-sm text-accent">Join AASTU Gibi Gubae</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
            <div className="grid grid-cols-2 gap-4">
              <Input tone="dark" placeholder="First name" error={errors.firstName?.message} {...register('firstName')} />
              <Input tone="dark" placeholder="Last name" error={errors.lastName?.message} {...register('lastName')} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                tone="dark"
                placeholder="+251 Phone number"
                inputMode="numeric"
                error={errors.phone?.message}
                {...register('phone')}
              />
              <Select tone="dark" placeholder="Gender" options={GENDER_OPTIONS} error={errors.gender?.message} {...register('gender')} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                tone="dark"
                placeholder="Department"
                options={DEPARTMENT_OPTIONS}
                error={errors.department?.message}
                {...register('department')}
              />
              <Input
                tone="dark"
                placeholder="Student ID"
                title="Format: ETS201/18"
                error={errors.studentId?.message}
                {...register('studentId')}
              />
            </div>

            <Input tone="dark" type="password" placeholder="Password" error={errors.password?.message} {...register('password')} />

            {registerError && (
              <p role="alert" className="text-sm text-red-400">
                Something went wrong creating your account. Please try again.
              </p>
            )}

            <Button type="submit" variant="accent" fullWidth disabled={isRegistering}>
              {isRegistering ? 'Creating account…' : 'Create Account'}
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-white/70">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-accent hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <ImagePlaceholder aspect="aspect-auto" tone="dark" className="h-full rounded-none" />
      </div>
    </div>
  );
}
