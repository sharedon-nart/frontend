'use client';

import * as React from 'react';

import { cn } from '@/utils/cn';

type Align = 'start' | 'center' | 'end';
type Side = 'top' | 'bottom' | 'left' | 'right';

type PopoverProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: React.ReactNode;
  content: React.ReactNode;
  align?: Align;
  side?: Side;
  sideOffset?: number;
  contentClassName?: string;
  triggerClassName?: string;
};

function Popover({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  trigger,
  content,
  align = 'center',
  side = 'bottom',
  sideOffset = 8,
  contentClassName,
  triggerClassName
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;

  const triggerRef = React.useRef<HTMLDivElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (openProp === undefined) setUncontrolledOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [onOpenChange, openProp]
  );

  const handleClose = React.useCallback(() => {
    if (open) setOpen(false);
  }, [open, setOpen]);

  React.useEffect(() => {
    if (!open) return;

    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!triggerRef.current || !contentRef.current) return;
      if (
        !triggerRef.current.contains(target) &&
        !contentRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, setOpen]);

  const alignmentClasses: Record<Align, Record<Side, string>> = {
    start: { top: 'left-0', bottom: 'left-0', left: 'top-0', right: 'top-0' },
    center: {
      top: 'left-1/2 -translate-x-1/2',
      bottom: 'left-1/2 -translate-x-1/2',
      left: 'top-1/2 -translate-y-1/2',
      right: 'top-1/2 -translate-y-1/2'
    },
    end: {
      top: 'right-0',
      bottom: 'right-0',
      left: 'bottom-0',
      right: 'bottom-0'
    }
  };

  const sideClasses: Record<Side, string> = {
    top: 'bottom-full',
    bottom: 'top-full',
    left: 'right-full',
    right: 'left-full'
  };

  const offsetStyle: React.CSSProperties =
    side === 'bottom'
      ? { marginTop: sideOffset }
      : side === 'top'
        ? { marginBottom: sideOffset }
        : side === 'left'
          ? { marginRight: sideOffset }
          : { marginLeft: sideOffset };

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        className={cn('cursor-pointer', triggerClassName)}
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(!open);
          }
        }}
      >
        {trigger}
      </div>

      {open ? (
        <div
          ref={contentRef}
          className={cn(
            'absolute z-50 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95',
            alignmentClasses[align][side],
            sideClasses[side],
            contentClassName
          )}
          style={offsetStyle}
          role="menu"
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') e.preventDefault();
            if (e.key === 'Escape') handleClose();
          }}
        >
          {content}
        </div>
      ) : null}
    </div>
  );
}

export { Popover };
