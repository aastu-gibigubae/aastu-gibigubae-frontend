import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PageContainer } from '@components/layout/PageContainer';
import { Badge, Button, ImagePlaceholder, Input } from '@components/ui';
import { useAuth } from '@hooks/useAuth';

import type { User } from '@/types/auth';

const ROLE_LABEL: Record<string, string> = {
  registered: 'member',
  sub_admin: 'sub-admin',
  admin: 'admin',
};

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  studentId: string;
  department: string;
  gender: string;
  email: string;
}

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, reset } = useForm<ProfileFormValues>({
    values: user
      ? {
          firstName: user.firstName,
          lastName: user.lastName,
          studentId: user.studentId ?? '',
          department: user.department ?? '',
          gender: user.gender ?? '',
          email: user.email ?? '',
        }
      : undefined,
  });

  if (!user) return null; // ProtectedRoute handles the redirect before this renders

  function onSubmit(values: ProfileFormValues) {
    updateUser(values as Partial<User>);
    setIsEditing(false);
  }

  return (
    <PageContainer className="py-14">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <div>
          <div className="rounded-2xl border border-primary-dark/10 p-6 text-center">
            <ImagePlaceholder round className="mx-auto h-24 w-24" />
            <h2 className="mt-4 font-heading text-lg text-primary-dark">
              {user.firstName} {user.lastName}
            </h2>
            <Badge tone="accent" className="mt-2">
              {ROLE_LABEL[user.role] ?? user.role}
            </Badge>
          </div>
          <Button
            variant="primary"
            fullWidth
            className="mt-4"
            onClick={() => {
              reset();
              setIsEditing((prev) => !prev);
            }}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        <div>
          <h1 className="font-heading text-2xl text-primary-dark">My Profile</h1>
          <p className="mt-1 text-sm text-primary-dark/60">View your personal information and account details</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 rounded-2xl border border-primary-dark/10 p-6">
            <h2 className="font-heading text-lg text-primary-dark">Profile Information</h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Input label="First Name" disabled={!isEditing} {...register('firstName')} />
              <Input label="Last Name" disabled={!isEditing} {...register('lastName')} />
              <Input label="Student ID" disabled={!isEditing} {...register('studentId')} />
              <Input label="Department" disabled={!isEditing} {...register('department')} />
              <Input label="Gender" disabled={!isEditing} {...register('gender')} />
              <Input label="Email" type="email" disabled={!isEditing} {...register('email')} />
            </div>

            {isEditing && (
              <Button type="submit" variant="primary" className="mt-5">
                Save Changes
              </Button>
            )}

            <hr className="my-6 border-primary-dark/10" />

            <h2 className="font-heading text-lg text-primary-dark">Account Information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-primary-dark/50">Account Created</p>
                <p className="mt-1 text-sm text-primary-dark">{user.createdAt ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-primary-dark/50">Account Status</p>
                <p className="mt-1 text-sm capitalize text-primary-dark">{user.status ?? 'active'}</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}
