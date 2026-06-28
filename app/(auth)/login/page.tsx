'use client';

import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Page() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post('/api/auth/login', form);

      toast.success('Login successful');

      router.push('/email');
      router.refresh();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
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
              "url('https://plus.unsplash.com/premium_photo-1684761949804-fd8eb9a5b6cc?w=900&auto=format&fit=crop&q=60')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-zinc-950/90" />

        <Link href="/" className="absolute top-12 left-12 flex items-center gap-3 text-white">
          <div className="h-6 w-6 bg-white" />
          <span className="text-sm font-semibold uppercase tracking-[0.3em]">MARKETING</span>
        </Link>

        <div className="absolute bottom-12 left-12 max-w-md text-white">
          <h2 className="mb-4 text-3xl font-light tracking-wide">Excellence in every detail.</h2>

          <p className="text-sm font-light leading-relaxed tracking-wide text-zinc-400">
            Access your exclusive dashboard. Manage your portfolio and assets with unparalleled
            precision and security.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-8 py-12 sm:px-16 lg:w-1/2 lg:px-24">
        <div className="w-full max-w-md space-y-12">
          <div className="space-y-3 text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Authentication
            </p>

            <h1 className="text-4xl font-light tracking-tight text-zinc-900">Welcome back.</h1>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>

              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                className="h-12 rounded-none border-0 border-b border-zinc-200 bg-transparent px-0 shadow-none focus-visible:border-zinc-900 focus-visible:ring-0"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-zinc-400 hover:text-zinc-900"
                >
                  Forgot password?
                </Link>
              </div>

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="h-12 rounded-none border-0 border-b border-zinc-200 bg-transparent px-0 shadow-none focus-visible:border-zinc-900 focus-visible:ring-0"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-14 w-full rounded-none bg-zinc-900 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-zinc-800"
            >
              {loading ? 'Signing In...' : 'Access Account'}
            </Button>

            <div className="text-center text-sm text-zinc-500 lg:text-left">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="font-medium text-zinc-900 underline underline-offset-4"
              >
                Request access
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
