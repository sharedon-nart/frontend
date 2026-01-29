'use client';

import * as React from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/landing/kit/button';
import { MenuItem } from '@/components/landing/kit/menu-item';
import { Popover } from '@/components/landing/kit/popover';

function Cta() {
  const [isMacDropdownOpen, setIsMacDropdownOpen] = React.useState(false);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/20 via-card to-card p-12 text-center">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to{' '}
              <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                Dominate Every Call?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Download Sherdon now and experience the power of invisible AI
              assistance
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Popover
                open={isMacDropdownOpen}
                onOpenChange={setIsMacDropdownOpen}
                align="center"
                contentClassName="w-64 p-0"
                trigger={
                  <Button
                    variant="gradient"
                    size="lg"
                    className="min-w-[200px]"
                  >
                    <Image
                      src="/apple.svg"
                      alt="Apple"
                      width={20}
                      height={20}
                    />
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
                <Image
                  src="/windows.svg"
                  alt="Windows"
                  width={20}
                  height={20}
                />
                Get for Windows
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Free trial • No credit card required • 5-minute setup
            </p>
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}

export { Cta };
