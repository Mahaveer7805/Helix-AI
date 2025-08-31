import React from 'react';
import { Activity, Moon, Flame, Footprints } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ElementType;
  color: string;
  progress: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, unit, icon: Icon, color, progress }) => (
  <div className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="text-sm text-muted-foreground">{unit}</div>
      </div>
    </div>
    
    <div className="mb-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-foreground">{title}</span>
        <span className="text-xs text-muted-foreground">{progress}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className={`h-2 rounded-full bg-gradient-to-r ${color} transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  </div>
);

export const HealthStats: React.FC = () => {
  const stats = [
    {
      title: "Daily Steps",
      value: "7,834",
      unit: "of 10,000",
      icon: Footprints,
      color: "from-primary to-primary-glow",
      progress: 78
    },
    {
      title: "Sleep Quality",
      value: "8.2",
      unit: "hours",
      icon: Moon,
      color: "from-secondary to-secondary-glow",
      progress: 82
    },
    {
      title: "Calories Burned",
      value: "1,420",
      unit: "kcal",
      icon: Flame,
      color: "from-orange-400 to-orange-500",
      progress: 71
    },
    {
      title: "Active Minutes",
      value: "45",
      unit: "of 60 min",
      icon: Activity,
      color: "from-green-400 to-green-500",
      progress: 75
    }
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Today's Health Overview
        </h2>
        <p className="text-muted-foreground">
          Track your progress and stay motivated on your wellness journey
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            {...stat}
          />
        ))}
      </div>
    </div>
  );
};