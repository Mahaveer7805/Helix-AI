import React, { useState } from 'react';
import { Activity, Utensils, Brain, Wifi } from 'lucide-react';
import { HealthCard } from './HealthCard';

interface DashboardProps {
  onCardClick: (cardType: string) => void;
  emergencyMode: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ onCardClick, emergencyMode }) => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleCardClick = (cardType: string) => {
    setActiveCard(cardType);
    onCardClick(cardType);
    // Reset active state after animation
    setTimeout(() => setActiveCard(null), 1000);
  };

  const cards = [
    {
      id: 'symptoms',
      title: 'Health & Symptom Checker',
      description: 'Analyze symptoms, get AI-powered health insights, and receive personalized recommendations',
      icon: Activity,
      color: 'primary' as const
    },
    {
      id: 'fitness',
      title: 'Diet & Fitness Coach',
      description: 'Custom meal plans, workout routines, and nutrition tracking powered by AI',
      icon: Utensils,
      color: 'accent' as const
    },
    {
      id: 'mental',
      title: 'Mental Health & Meditation',
      description: 'Mood tracking, guided meditation, stress relief, and mental wellness support',
      icon: Brain,
      color: 'secondary' as const
    },
    {
      id: 'iot',
      title: 'IoT Device Tracker',
      description: 'Connect smart health devices, monitor vitals, and sync health data seamlessly',
      icon: Wifi,
      color: emergencyMode ? 'destructive' as const : 'primary' as const
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <HealthCard
            key={card.id}
            title={card.title}
            description={card.description}
            icon={card.icon}
            color={card.color}
            type={card.id}
            onClick={handleCardClick}
            isActive={activeCard === card.id}
            emergencyMode={emergencyMode}
          />
        ))}
      </div>
      
      {emergencyMode && (
        <div className="mt-8 p-6 rounded-xl border-2 border-destructive bg-destructive/10 text-center emergency-mode">
          <h3 className="text-xl font-bold text-destructive mb-2">🚨 EMERGENCY MODE ACTIVATED</h3>
          <p className="text-destructive-foreground">
            Critical health symptoms detected. Please consult a healthcare professional immediately.
          </p>
        </div>
      )}
    </div>
  );
};