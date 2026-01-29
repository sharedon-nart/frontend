import { Briefcase, Check, TrendingUp, Users } from 'lucide-react';

import { Card } from '@/components/landing/kit/card';

const useCases = [
  {
    icon: Briefcase,
    title: 'Job Interviews',
    description:
      'Answer technical questions confidently with instant AI support.',
    benefits: [
      'Research company in real-time',
      'Get technical answer suggestions',
      'Never miss important details'
    ]
  },
  {
    icon: TrendingUp,
    title: 'Sales Calls',
    description:
      'Close more deals by staying in perfect context throughout conversations.',
    benefits: [
      'Instant product information',
      'Competitor comparison data',
      'Real-time objection handling'
    ]
  },
  {
    icon: Users,
    title: 'Partner Meetings',
    description: 'Communicate effectively across languages and time zones.',
    benefits: [
      'Live translation support',
      'Cultural context awareness',
      'Action item tracking'
    ]
  }
] as const;

function UseCases() {
  return (
    <section id="use-cases" className="py-20 px-4 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built for{' '}
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Every Scenario
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Whether you&apos;re landing your dream job or closing your biggest
            deal
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <Card
              key={useCase.title}
              className="p-8 hover:border-primary/50 transition-all"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6">
                <useCase.icon className="h-7 w-7" />
              </div>

              <h3 className="text-2xl font-semibold mb-3">{useCase.title}</h3>
              <p className="text-gray-400 mb-6">{useCase.description}</p>

              <ul className="space-y-3">
                {useCase.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export { UseCases };
