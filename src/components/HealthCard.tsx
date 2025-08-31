import React from 'react';
import { LucideIcon } from 'lucide-react';

interface HealthCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'primary' | 'secondary' | 'accent' | 'destructive';
  type: string;
  onClick: (type: string) => void;
  isActive?: boolean;
  emergencyMode?: boolean;
}

export const HealthCard: React.FC<HealthCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
  type,
  onClick,
  isActive = false,
  emergencyMode = false
}) => {
  const colorClasses = {
    primary: 'border-primary/30 hover:border-primary text-primary',
    secondary: 'border-secondary/30 hover:border-secondary text-secondary',
    accent: 'border-accent/30 hover:border-accent text-accent',
    destructive: 'border-destructive/30 hover:border-destructive text-destructive'
  };

  const glowClasses = {
    primary: 'hover:neon-glow-primary',
    secondary: 'hover:neon-glow-secondary',
    accent: 'hover:neon-glow-accent',
    destructive: 'hover:neon-glow-emergency'
  };

  return (
    <div
      onClick={() => onClick(type)}
      className={`
        health-card group relative overflow-hidden rounded-2xl border-2 p-8 
        backdrop-blur-sm transition-all duration-500 cursor-pointer
        hover:scale-105 hover:shadow-2xl hover:-translate-y-2
        ${emergencyMode && type === 'symptoms' 
          ? 'border-destructive bg-destructive/20 shadow-[0_0_30px_rgba(239,68,68,0.4)]' 
          : `${colorClasses[color]} ${glowClasses[color]}`
        }
        ${isActive ? `neon-glow-${color === 'destructive' ? 'emergency' : color}` : ''}
      `}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`
          p-4 rounded-full border-2 border-current
          group-hover:animate-pulse-glow transition-all duration-300
          ${isActive ? 'animate-pulse-glow' : ''}
        `}>
          <Icon className="h-8 w-8" />
        </div>
        
        <div>
          <h3 className={`
            text-xl font-bold mb-2
            ${color === 'primary' ? 'text-glow-primary' : ''}
            ${color === 'secondary' ? 'text-glow-secondary' : ''}
            ${color === 'accent' ? 'text-glow-accent' : ''}
            ${color === 'destructive' ? 'text-shadow' : ''}
          `}>
            {title}
          </h3>
          <p className="text-muted-foreground group-hover:text-white/90 transition-colors text-sm leading-relaxed">
            {description}
          </p>
          <div className="mt-4 text-xs text-muted-foreground group-hover:text-white/80 transition-colors">
            Click to activate AI-powered {title.toLowerCase()}
          </div>
        </div>
        
        <div className={`
          w-full h-1 rounded-full bg-gradient-to-r opacity-50
          group-hover:opacity-100 transition-opacity duration-300
          ${color === 'primary' ? 'from-primary to-primary-glow' : ''}
          ${color === 'secondary' ? 'from-secondary to-secondary-glow' : ''}
          ${color === 'accent' ? 'from-accent to-accent-glow' : ''}
          ${color === 'destructive' ? 'from-destructive to-destructive-glow' : ''}
        `} />
      </div>
    </div>
  );
};