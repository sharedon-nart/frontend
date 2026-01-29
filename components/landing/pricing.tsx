'use client';

import { Card } from '@/components/landing/kit/card';
import { Button } from '@/components/landing/kit/button';
import type { Tables } from '@/types_db';
import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe } from '@/utils/stripe/server';
import { getErrorRedirect } from '@/utils/helpers';
import { User } from '@supabase/supabase-js';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Check } from 'lucide-react';

type Subscription = Tables<'subscriptions'>;
type Product = Tables<'products'>;
type Price = Tables<'prices'>;
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = 'lifetime' | 'year' | 'month';

function LandingPricing({ user, products, subscription }: Props) {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();

  const handleStripeCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push('/signin/signup');
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath
    );

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          'An unknown error occurred.',
          'Please try again later or contact a system administrator.'
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };

  if (!products.length) {
    return (
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              No subscription pricing plans found. Create them in your{' '}
              <a
                className="text-primary underline"
                href="https://dashboard.stripe.com/products"
                rel="noopener noreferrer"
                target="_blank"
              >
                Stripe Dashboard
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-20 px-4 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple{' '}
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start for free, upgrade when you need more
          </p>

          {(intervals.includes('month') || intervals.includes('year')) && (
            <div className="inline-flex mt-8 p-1 rounded-lg bg-muted border border-border">
              {intervals.includes('month') && (
                <button
                  onClick={() => setBillingInterval('month')}
                  type="button"
                  className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                    billingInterval === 'month'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Monthly
                </button>
              )}
              {intervals.includes('year') && (
                <button
                  onClick={() => setBillingInterval('year')}
                  type="button"
                  className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                    billingInterval === 'year'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Yearly
                </button>
              )}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            );
            if (!price) return null;
            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currency!,
              minimumFractionDigits: 0
            }).format((price?.unit_amount || 0) / 100);

            const isCurrentPlan = subscription
              ? product.name === subscription?.prices?.products?.name
              : false;

            return (
              <Card
                key={product.id}
                className={`p-8 flex flex-col ${
                  isCurrentPlan
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'hover:border-primary/50'
                } transition-all`}
              >
                {isCurrentPlan && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4 self-start">
                    Current Plan
                  </span>
                )}

                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-400 mb-6">{product.description}</p>

                <div className="mb-6">
                  <span className="text-5xl font-bold">{priceString}</span>
                  <span className="text-muted-foreground">
                    /{billingInterval}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-300">All core features</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-300">Priority support</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-300">Regular updates</span>
                  </li>
                </ul>

                <Button
                  variant={isCurrentPlan ? 'outline' : 'gradient'}
                  className="w-full"
                  onClick={() => handleStripeCheckout(price)}
                  disabled={priceIdLoading === price.id}
                >
                  {priceIdLoading === price.id
                    ? 'Loading...'
                    : subscription
                      ? 'Manage'
                      : 'Get Started'}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { LandingPricing };
