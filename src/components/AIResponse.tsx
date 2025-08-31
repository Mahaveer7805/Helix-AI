import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, AlertTriangle, Heart, Dumbbell, User, Smartphone } from 'lucide-react';

interface AIResponseProps {
  response: string;
  isEmergency: boolean;
  cardType: string;
}

const getIcon = (cardType: string) => {
  switch (cardType) {
    case 'symptoms': return Heart;
    case 'fitness': return Dumbbell;
    case 'mental': return Brain;
    case 'iot': return Smartphone;
    default: return User;
  }
};

const getTypeLabel = (cardType: string) => {
  switch (cardType) {
    case 'symptoms': return 'Health Analysis';
    case 'fitness': return 'Fitness Plan';
    case 'mental': return 'Mental Wellness';
    case 'iot': return 'Device Status';
    default: return 'AI Assistant';
  }
};

export const AIResponse: React.FC<AIResponseProps> = ({ response, isEmergency, cardType }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const Icon = getIcon(cardType);

  useEffect(() => {
    setIsVisible(true);
    setDisplayedText('');
    setCurrentIndex(0);
  }, [response]);

  useEffect(() => {
    if (currentIndex < response.length) {
      const timer = setTimeout(() => {
        setDisplayedText(response.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, response]);

  // Parse response for better formatting
  const formatResponse = (text: string) => {
    // Split by double asterisks for sections
    const sections = text.split('**').filter(Boolean);
    const formattedSections = [];
    
    for (let i = 0; i < sections.length; i++) {
      if (i % 2 === 0) {
        // Regular text
        const lines = sections[i].split('\n').filter(line => line.trim());
        formattedSections.push(...lines.map(line => ({ type: 'text', content: line.trim() })));
      } else {
        // Bold section headers
        formattedSections.push({ type: 'header', content: sections[i].trim() });
      }
    }
    
    return formattedSections;
  };

  const formattedSections = formatResponse(displayedText);

  return (
    <Card className={`
      mt-8 p-6 backdrop-blur-sm border-2 transition-all duration-500 transform
      ${isVisible ? 'animate-fade-in scale-100' : 'scale-95 opacity-0'}
      ${isEmergency 
        ? 'border-destructive bg-destructive/10 shadow-[0_0_30px_rgba(239,68,68,0.3)]' 
        : 'border-primary bg-primary/5 shadow-[0_0_20px_rgba(var(--primary),0.2)]'
      }
    `}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`
          p-3 rounded-full transition-all duration-300 animate-scale-in
          ${isEmergency 
            ? 'bg-destructive/20 text-destructive' 
            : 'bg-primary/20 text-primary'
          }
        `}>
          {isEmergency ? (
            <AlertTriangle className="h-6 w-6 animate-pulse" />
          ) : (
            <Icon className="h-6 w-6" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-foreground">
              {isEmergency ? '⚠️ Emergency Alert' : 'AI Health Response'}
            </h3>
            <Badge 
              variant={isEmergency ? 'destructive' : 'secondary'}
              className="animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              {getTypeLabel(cardType)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Powered by LOVABLE AI • {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Response Content */}
      <div className="space-y-4">
        {formattedSections.map((section, index) => (
          <div
            key={index}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {section.type === 'header' ? (
              <div className="flex items-center gap-2 mt-6 mb-2">
                <div className={`
                  w-2 h-6 rounded-full
                  ${isEmergency ? 'bg-destructive' : 'bg-primary'}
                `} />
                <h4 className="text-lg font-semibold text-foreground">
                  {section.content}
                </h4>
              </div>
            ) : (
              <div className="ml-4">
                {section.content.includes('1.') || section.content.includes('2.') || section.content.includes('3.') ? (
                  // Exercise/list items
                  <div className={`
                    p-3 rounded-lg border-l-4 my-2 transition-all duration-300 hover:scale-[1.02]
                    ${isEmergency 
                      ? 'border-l-destructive bg-destructive/5' 
                      : 'border-l-primary bg-primary/5'
                    }
                  `}>
                    <p className="text-foreground leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ) : (
                  // Regular text
                  <p className="text-foreground leading-relaxed mb-3">
                    {section.content}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
        
        {/* Typing indicator */}
        {currentIndex < response.length && (
          <div className="flex items-center gap-2 ml-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-sm text-muted-foreground">AI is thinking...</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={`
        mt-6 pt-4 border-t flex items-center justify-between
        ${isEmergency ? 'border-destructive/30' : 'border-primary/30'}
      `}>
        <div className="text-xs text-muted-foreground">
          ⚡ Powered by Advanced AI • Always consult healthcare professionals
        </div>
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-secondary rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    </Card>
  );
};