'use client';

import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = axios.post('/api/auth/register', form);

      await toast.promise(response, {
        loading: 'Creating account...',
        success: (res) => {
          setForm({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          });

          return res.data.message || 'Account created successfully';
        },
        error: (err) => err.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white text-zinc-950 font-sans selection:bg-zinc-200">
      <div className="relative hidden w-1/2 lg:block bg-zinc-950">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{
            backgroundImage:
              "url('https://plus.unsplash.com/premium_photo-1682309526815-efe5d6225117?w=900&auto=format&fit=crop&q=60')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-zinc-950/90" />

        <Link
          href="/"
          className="absolute top-12 left-12 flex items-center gap-3 text-white"
        >
          <div className="h-6 w-6 bg-white" />
          <span className="text-sm font-semibold uppercase tracking-[0.3em]">
            MARKETING
          </span>
        </Link>

        <div className="absolute bottom-12 left-12 max-w-md text-white">
          <h2 className="mb-4 text-3xl font-light tracking-wide">
            Begin your journey.
          </h2>

          <p className="text-sm font-light leading-relaxed tracking-wide text-zinc-400">
            Apply for an exclusive account. Elevate your
            experience with tailored insights, premium tools,
            and uncompromising security.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-8 py-12 sm:px-16 lg:w-1/2 lg:px-24">
        <div className="w-full max-w-md space-y-12">
          <div className="space-y-3 text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Registration
            </p>

            <h1 className="text-4xl font-light tracking-tight text-zinc-900">
              Create your account.
            </h1>
          </div>

          <form
            className="space-y-8"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First Name
                </Label>

                <Input
                  id="firstName"
                  type="text"
                  placeholder="Jane"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Last Name
                </Label>

                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-14 w-full rounded-none bg-zinc-900 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-zinc-800"
            >
              {loading
                ? 'Creating Account...'
                : 'Request Access'}
            </Button>

            <div className="text-center text-sm text-zinc-500 lg:text-left">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-zinc-900 underline underline-offset-4"
              >
                Sign in here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};