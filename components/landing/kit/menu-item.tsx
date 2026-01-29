import * as React from 'react';

import { cn } from '@/utils/cn';

type IconComponent = React.ComponentType<{ className?: string }>;

type MenuItemProps = {
  icon?: IconComponent;
  iconSrc?: string;
  iconAlt?: string;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
};

function MenuItem({
  icon: Icon,
  iconSrc,
  iconAlt = '',
  label,
  onClick,
  className,
  disabled = false
}: MenuItemProps) {
  return (
    <button
      type="button"
      className={cn(
        'w-full px-4 py-3 text-left transition-colors flex items-center gap-3',
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:bg-accent/50 cursor-pointer',
        className
      )}
      onClick={(e) => {
        if (!disabled) onClick?.(e);
      }}
      disabled={disabled}
    >
      {iconSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={iconSrc} alt={iconAlt} className="h-5 w-5" />
      ) : Icon ? (
        <Icon className="h-5 w-5" />
      ) : null}
      <span>{label}</span>
    </button>
  );
}

export { MenuItem };
