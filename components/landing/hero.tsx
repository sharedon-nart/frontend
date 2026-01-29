'use client';

import * as React from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

import { Badge } from '@/components/landing/kit/badge';
import { Button } from '@/components/landing/kit/button';
import { MenuItem } from '@/components/landing/kit/menu-item';
import { Popover } from '@/components/landing/kit/popover';

function Hero() {
  const [isMacDropdownOpen, setIsMacDropdownOpen] = React.useState(false);

  return (
    <section className="relative pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-5xl text-center">
        <Badge className="mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          100% Undetectable AI Assistant
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Your Secret Weapon for{' '}
          <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
            Every Meeting
          </span>
        </h1>

        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Takes perfect notes, answers questions in real-time, and makes you the
          most prepared person on every call.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Popover
            open={isMacDropdownOpen}
            onOpenChange={setIsMacDropdownOpen}
            align="center"
            contentClassName="w-64 p-0"
            trigger={
              <Button variant="gradient" size="lg" className="min-w-[200px]">
                <Image src="/apple.svg" alt="Apple" width={20} height={20} />
                Get for Mac
                <ChevronDown className="h-5 w-5 ml-1" />
              </Button>
            }
            content={
              <div className="overflow-hidden rounded-lg">
                <MenuItem
                  iconSrc="/apple.svg"
                  iconAlt="Apple"
                  label="Get for Mac (Apple Silicon)"
                  onClick={() => setIsMacDropdownOpen(false)}
                />
                <MenuItem
                  iconSrc="/apple.svg"
                  iconAlt="Apple"
                  label="Get for Mac (Intel)"
                  onClick={() => setIsMacDropdownOpen(false)}
                />
              </div>
            }
          />

          <Button variant="gradient" size="lg" className="min-w-[200px]">
            <Image src="/windows.svg" alt="Windows" width={20} height={20} />
            Get for Windows
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          No credit card required • Instant setup • Works with any meeting
          platform
        </p>
      </div>

      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
    </section>
  );
}

export { Hero };
