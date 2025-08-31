import React, { useState, useEffect } from 'react';
import { Bot, Heart } from 'lucide-react';

interface AIAvatarProps {
  isActive?: boolean;
  message?: string;
}

export const AIAvatar: React.FC<AIAvatarProps> = ({ isActive = false, message }) => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (isActive) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <div className="flex items-center gap-4 mb-8">
      {/* Avatar */}
      <div className="relative">
        <div className={`
          w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary 
          flex items-center justify-center shadow-lg transition-all duration-300
          ${isActive ? 'scale-110 shadow-primary/30' : 'hover:scale-105'}
          ${pulse ? 'animate-pulse' : ''}
        `}>
          <Bot className="h-8 w-8 text-white" />
        </div>
        
        {/* Active indicator */}
        {isActive && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-background">
            <Heart className="h-3 w-3 text-white animate-pulse" />
          </div>
        )}
        
        {/* Pulse rings when active */}
        {isActive && (
          <>
            <div className="absolute inset-0 w-16 h-16 rounded-full bg-primary/20 animate-ping" />
            <div className="absolute inset-0 w-16 h-16 rounded-full bg-primary/10 animate-ping" style={{ animationDelay: '0.5s' }} />
          </>
        )}
      </div>
      
      {/* Message bubble */}
      <div className="flex-1">
        <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-foreground">Healix AI</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <p className="text-muted-foreground text-sm">
            {message || "Hi! I'm your AI health assistant. How can I help you today?"}
          </p>
        </div>
      </div>
    </div>
  );
};