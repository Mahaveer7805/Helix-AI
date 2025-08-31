import React from 'react';
import { Trophy, Target, Flame, Star, Award, Zap } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  earned: boolean;
  progress?: number;
  color: string;
}

export const GamificationBadges: React.FC = () => {
  const badges: Badge[] = [
    {
      id: 'early-bird',
      name: 'Early Bird',
      description: 'Completed morning routine 7 days',
      icon: Star,
      earned: true,
      color: 'from-yellow-400 to-orange-400'
    },
    {
      id: 'step-master',
      name: 'Step Master',
      description: 'Walked 10,000 steps today',
      icon: Target,
      earned: true,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'hydration-hero',
      name: 'Hydration Hero',
      description: '8 glasses of water daily',
      icon: Trophy,
      earned: false,
      progress: 75,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'fitness-streak',
      name: 'Fitness Streak',
      description: '5-day workout streak',
      icon: Flame,
      earned: false,
      progress: 60,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'mindful-moments',
      name: 'Mindful Moments',
      description: '10 meditation sessions',
      icon: Zap,
      earned: true,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'health-champion',
      name: 'Health Champion',
      description: 'Complete weekly health goals',
      icon: Award,
      earned: false,
      progress: 40,
      color: 'from-primary to-secondary'
    }
  ];

  const earnedBadges = badges.filter(badge => badge.earned);
  const inProgressBadges = badges.filter(badge => !badge.earned);

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Your Health Achievements
        </h2>
        <p className="text-muted-foreground">
          Celebrate your wellness milestones and stay motivated
        </p>
      </div>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Earned Badges ({earnedBadges.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                className="group bg-card border border-border rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <badge.icon className="h-6 w-6" />
                </div>
                <div className="font-semibold text-foreground text-sm mb-1">{badge.name}</div>
                <div className="text-xs text-muted-foreground">{badge.description}</div>
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                    ✓ Earned
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* In Progress Badges */}
      {inProgressBadges.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            In Progress
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inProgressBadges.map((badge) => (
              <div
                key={badge.id}
                className="bg-card border border-border rounded-2xl p-4 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${badge.color} opacity-60 flex items-center justify-center text-white`}>
                    <badge.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground text-sm">{badge.name}</div>
                    <div className="text-xs text-muted-foreground">{badge.description}</div>
                  </div>
                </div>
                
                {badge.progress && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-medium text-foreground">{badge.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${badge.color} transition-all duration-500`}
                        style={{ width: `${badge.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};