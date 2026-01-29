import * as React from 'react';

import { cn } from '@/utils/cn';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card text-card-foreground',
        className
      )}
      {...props}
    />
  );
}

export { Card };
