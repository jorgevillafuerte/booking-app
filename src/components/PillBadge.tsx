import './PillBadge.css'

interface PillBadgeProps {
  text: string
}

export function PillBadge({ text }: PillBadgeProps) {
  return <span className="pill-badge">{text}</span>
}
