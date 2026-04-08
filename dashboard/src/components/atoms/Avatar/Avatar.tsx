import { cn } from '../../../utils/cn'

interface AvatarProps {
  name: string
  imageUrl?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function Avatar({ name, imageUrl, size = 'md', className }: AvatarProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-violet-100 font-medium text-violet-700',
        size === 'sm' && 'h-7 w-7 text-xs',
        size === 'md' && 'h-9 w-9 text-sm',
        size === 'lg' && 'h-12 w-12 text-base',
        className
      )}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  )
}