import { Brain, Mic, Shield, Zap } from 'lucide-react';

import { Card } from '@/components/landing/kit/card';

const features = [
  {
    icon: Mic,
    title: 'Perfect Notes',
    description:
      'Captures every word, automatically organizes key points, and generates summaries.'
  },
  {
    icon: Brain,
    title: 'Real-Time Intelligence',
    description:
      'Get instant answers to questions by analyzing audio and screen context.'
  },
  {
    icon: Shield,
    title: '100% Undetectable',
    description:
      'Works invisibly in the background. No one knows you have an AI assistant.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Instant responses with keyboard shortcuts. No lag, no delays.'
  }
] as const;

function Features() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your{' '}
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              AI-Powered
            </span>{' '}
            Edge
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to dominate every conversation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group p-8 hover:border-primary/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Features };
