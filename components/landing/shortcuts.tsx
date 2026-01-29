import { Command } from 'lucide-react';

import { Card } from '@/components/landing/kit/card';

const shortcuts = [
  {
    keys: ['⌘', '/'],
    description: 'Show/Hide overlay',
    detail: 'Toggle the AI assistant interface'
  },
  {
    keys: ['⌘', '↵'],
    description: 'Start/Stop session',
    detail: 'Begin or end listening mode'
  },
  {
    keys: ['⌘', 'B'],
    description: 'Get answer',
    detail: 'Screenshot + audio analysis for instant response'
  }
] as const;

function Shortcuts() {
  return (
    <section id="shortcuts" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
            <Command className="h-6 w-6" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Master the{' '}
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Shortcuts
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Three simple keyboard commands to unlock superhuman meeting
            performance
          </p>
        </div>

        <div className="space-y-4">
          {shortcuts.map((shortcut) => (
            <Card
              key={shortcut.description}
              className="group p-6 hover:border-primary/50 transition-all"
            >
              <div className="flex items-center justify-between gap-6 flex-wrap">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {shortcut.keys.map((key) => (
                      <kbd
                        key={key}
                        className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-border bg-muted px-3 text-sm font-semibold group-hover:border-primary/50 group-hover:text-primary transition-colors"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                  <div>
                    <div className="font-semibold text-lg">
                      {shortcut.description}
                    </div>
                    <div className="text-sm text-gray-400">
                      {shortcut.detail}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Shortcuts };
