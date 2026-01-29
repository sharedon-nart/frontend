'use client';

import Link from 'next/link';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import s from './Navbar.module.css';
import Image from 'next/image';

interface NavlinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {
  const router = useRouter();
  const pathname = usePathname();
  const redirectMethod = getRedirectMethod();
  const requestRouter = redirectMethod === 'client' ? router : null;

  return (
    <div className="flex h-16 items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href="/" className={s.logo} aria-label="Sharedon home">
          <span className="flex items-center gap-2">
            <Image
              src="/sharedon-logo.png"
              alt="Sharedon Logo"
              width={32}
              height={32}
              priority
            />
            <span className="text-xl font-bold">Sharedon</span>
          </span>
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        {pathname === '/' ? (
          <>
            <Link href="/#features" className={s.link}>
              Features
            </Link>
            <Link href="/#use-cases" className={s.link}>
              Use Cases
            </Link>
            <Link href="/#shortcuts" className={s.link}>
              Shortcuts
            </Link>
            <Link href="/#pricing" className={s.link}>
              Pricing
            </Link>
          </>
        ) : (
          <Link href="/#pricing" className={s.link}>
            Pricing
          </Link>
        )}
      </nav>

      <div className="flex items-center gap-3">
        {pathname !== '/' && user && (
          <Link href="/account" className={s.link}>
            Account
          </Link>
        )}

        {user ? (
          <form onSubmit={(e) => handleRequest(e, SignOut, requestRouter)}>
            <input type="hidden" name="pathName" value={pathname} />
            <button type="submit" className={s.link}>
              Sign out
            </button>
          </form>
        ) : (
          <Link href="/signin" className={s.link}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
