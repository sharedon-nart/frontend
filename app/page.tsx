import { Cta } from '@/components/landing/cta';
import { Features } from '@/components/landing/features';
import { Hero } from '@/components/landing/hero';
import { Shortcuts } from '@/components/landing/shortcuts';
import { UseCases } from '@/components/landing/use-cases';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <UseCases />
      <Shortcuts />
      <Cta />
    </main>
  );
}
