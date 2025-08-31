import React from 'react';
import { Stethoscope, Dumbbell, Wifi, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickActionProps {
  onAction: (action: string) => void;
}

export const QuickActions: React.FC<QuickActionProps> = ({ onAction }) => {
  const actions = [
    {
      id: 'symptoms',
      label: 'Check Symptoms',
      icon: Stethoscope,
      gradient: 'from-primary to-primary-glow',
      description: 'AI-powered symptom analysis'
    },
    {
      id: 'fitness',
      label: 'Plan Workout',
      icon: Dumbbell,
      gradient: 'from-orange-400 to-orange-500',
      description: 'Personalized fitness plans'
    },
    {
      id: 'iot',
      label: 'Sync Devices',
      icon: Wifi,
      gradient: 'from-blue-400 to-blue-500',
      description: 'Connect health devices'
    },
    {
      id: 'mental',
      label: 'Start Meditation',
      icon: Brain,
      gradient: 'from-secondary to-secondary-glow',
      description: 'Mental wellness & mindfulness'
    }
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Quick Health Actions
        </h2>
        <p className="text-muted-foreground">
          Jump into your wellness routine with one tap
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {actions.map((action) => (
          <Button
            key={action.id}
            onClick={() => onAction(action.id)}
            variant="outline"
            className="group relative h-auto p-6 bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col items-center gap-3 overflow-hidden"
          >
            {/* Background gradient on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            
            {/* Icon */}
            <div className={`relative p-3 rounded-xl bg-gradient-to-br ${action.gradient} text-white transition-transform duration-300 group-hover:scale-110`}>
              <action.icon className="h-6 w-6" />
            </div>
            
            {/* Content */}
            <div className="relative text-center">
              <div className="font-semibold text-foreground mb-1">{action.label}</div>
              <div className="text-xs text-muted-foreground">{action.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};