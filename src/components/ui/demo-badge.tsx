import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'

interface DemoBadgeProps {
  className?: string
}

export function DemoBadge({ className }: DemoBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={`bg-orange-50 border-orange-200 text-orange-700 ${className}`}
    >
      <Icon name="AlertTriangle" size={12} className="mr-1" />
      Демо режим
    </Badge>
  )
}