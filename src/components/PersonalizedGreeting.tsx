import React, { useState, useEffect } from 'react';
import { Sun, Moon, Coffee, Star } from 'lucide-react';

export const PersonalizedGreeting: React.FC = () => {
  const [userName] = useState('Alex'); // TODO: Replace with actual user name from auth
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    
    if (hour < 12) {
      return {
        greeting: 'Good Morning',
        icon: Sun,
        message: 'Ready to start a healthy day? 💪',
        gradient: 'from-yellow-400 to-orange-400'
      };
    } else if (hour < 17) {
      return {
        greeting: 'Good Afternoon',
        icon: Coffee,
        message: 'Keep up the great work today! ⚡',
        gradient: 'from-blue-400 to-teal-400'
      };
    } else if (hour < 21) {
      return {
        greeting: 'Good Evening',
        icon: Star,
        message: 'Time to wind down and reflect! 🌟',
        gradient: 'from-purple-400 to-pink-400'
      };
    } else {
      return {
        greeting: 'Good Night',
        icon: Moon,
        message: 'Rest well for tomorrow\'s journey! 🌙',
        gradient: 'from-indigo-400 to-purple-400'
      };
    }
  };

  const { greeting, icon: GreetingIcon, message, gradient } = getGreeting();

  return (
    <div className="text-center mb-12">
      <div className="mb-6">
        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${gradient} text-white shadow-lg mb-4`}>
          <GreetingIcon className="h-5 w-5" />
          <span className="font-medium">{greeting}</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-3">
          <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Hey {userName}!
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground font-medium">
          {message}
        </p>
      </div>
      
      {/* Time display */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};