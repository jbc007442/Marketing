'use client';

import Link from 'next/link';
import { ReactNode, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, LogOut, Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Email Marketing', href: '/email', icon: Mail },
  { name: 'WhatsApp Marketing', href: '/whatsapp', icon: MessageCircle },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu automatically when the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      localStorage.removeItem('marketflow_token');
      toast.success('Logged out successfully');
      router.push('/login');
      router.refresh();
    } catch {
      toast.error('Logout failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FDFDFD] font-sans selection:bg-neutral-200">
      {/* Mobile Overlay - Glassmorphic Dimmer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-neutral-900/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Offcanvas on Mobile, Fixed on Desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-neutral-200/60 bg-white/80 backdrop-blur-2xl transition-transform duration-500 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-24 items-center justify-between px-8 lg:px-10">
          <h2 className="text-xl font-light tracking-widest text-neutral-900">
            MARKET<span className="font-semibold">FLOW</span>
          </h2>

          {/* Close button for mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-500 hover:text-neutral-900 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} strokeWidth={2} />
          </Button>
        </div>

        <nav className="mt-4 flex flex-col gap-2 px-6">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300 ease-out ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-md shadow-neutral-900/10'
                    : 'text-neutral-500 hover:bg-neutral-100/80 hover:text-neutral-900'
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-900'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col transition-all duration-300 lg:ml-72">
        {/* Header - Sticky with Blur */}
        <header className="sticky top-0 z-30 flex h-20 lg:h-24 items-center justify-between border-b border-neutral-200/50 bg-white/70 px-4 lg:px-10 backdrop-blur-md transition-all">
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Hamburger Button for Mobile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-neutral-600 hover:bg-neutral-100 lg:hidden"
            >
              <Menu size={22} />
            </Button>

            <h1 className="text-lg lg:text-xl font-medium tracking-tight text-neutral-800">
              {navItems.find((item) => pathname?.startsWith(item.href))?.name || 'Overview'}
            </h1>
          </div>

          <div className="flex items-center gap-2 lg:gap-6">
            {/* Hide text on mobile, just show icon if needed, or keep hidden */}
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="group hidden text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-red-600 sm:flex"
            >
              <LogOut size={18} className="mr-2 transition-transform group-hover:-translate-x-1" />
              Logout
            </Button>

            {/* Mobile-only logout icon */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="group text-neutral-500 hover:text-red-600 sm:hidden"
            >
              <LogOut size={18} />
            </Button>

            {/* Premium Avatar */}
            <div className="ml-2 flex h-9 w-9 lg:h-11 lg:w-11 cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-950 text-sm font-medium text-white shadow-sm shadow-neutral-400 ring-2 ring-white ring-offset-2 ring-offset-neutral-50 transition-transform hover:scale-105">
              T
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:px-10 lg:py-8">
          <div className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
