import { Cta } from '@/components/landing/cta';
import { Features } from '@/components/landing/features';
import { Hero } from '@/components/landing/hero';
import { LandingPricing } from '@/components/landing/pricing';
import { Shortcuts } from '@/components/landing/shortcuts';
import { UseCases } from '@/components/landing/use-cases';
import { createClient } from '@/utils/supabase/server';
import {
  getProducts,
  getSubscription,
  getUser
} from '@/utils/supabase/queries';

export default async function HomePage() {
  const supabase = createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase)
  ]);

  return (
    <main>
      <Hero />
      <Features />
      <UseCases />
      <Shortcuts />
      <LandingPricing
        user={user}
        products={products ?? []}
        subscription={subscription}
      />
      <Cta />
    </main>
  );
}
