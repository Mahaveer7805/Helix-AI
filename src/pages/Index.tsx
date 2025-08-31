import React, { useState } from 'react';
import { VoiceInput } from '@/components/VoiceInput';
import { Dashboard } from '@/components/Dashboard';
import { AIResponse } from '@/components/AIResponse';
import { HealthStats } from '@/components/HealthStats';
import { QuickActions } from '@/components/QuickActions';
import { AIAvatar } from '@/components/AIAvatar';
import { PersonalizedGreeting } from '@/components/PersonalizedGreeting';
import { GamificationBadges } from '@/components/GamificationBadges';
import { useAI } from '@/hooks/useAI';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<string>('');
  const [responseCardType, setResponseCardType] = useState<string>('');
  const { processCommand, isLoading } = useAI();
  const { toast } = useToast();

  const handleCommand = async (command: string) => {
    try {
      const response = await processCommand(command);
      
      setCurrentResponse(response.text);
      setResponseCardType(response.cardType || '');
      
      if (response.isEmergency) {
        setEmergencyMode(true);
        toast({
          title: "⚠️ Emergency Detected",
          description: "Critical symptoms identified. Seek immediate medical attention.",
          variant: "destructive",
        });
      } else {
        setEmergencyMode(false);
        toast({
          title: "🤖 AI Health Assistant",
          description: "Command processed successfully!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your command. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCardClick = async (cardType: string) => {
    const cardPrompts = {
      symptoms: "I want to analyze my health symptoms and get personalized health insights. Please provide a comprehensive symptom checker analysis.",
      fitness: "Create a personalized fitness and nutrition plan for me. I want custom workout routines and meal plans.",
      mental: "I need mental health support and meditation guidance. Help me with stress relief and mental wellness strategies.",
      iot: "Help me set up IoT health device tracking. I want to monitor my vitals and sync health data from smart devices."
    };

    const cardMessages = {
      symptoms: "Health & Symptom Checker activated! 🔍",
      fitness: "Diet & Fitness Coach ready! 💪",
      mental: "Mental Health & Meditation guide active! 🧠",
      iot: "IoT Device Tracker connected! 📱"
    };

    toast({
      title: cardMessages[cardType as keyof typeof cardMessages],
      description: "Generating personalized AI response...",
    });

    // Trigger AI response for the specific card type
    await handleCommand(cardPrompts[cardType as keyof typeof cardPrompts]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Gradient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background opacity-50"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="text-center py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Brand */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-4">
                Healix AI
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light">
                Your Personal Health Assistant
              </p>
              <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full"></div>
            </div>
            
            {/* Personalized Greeting */}
            <PersonalizedGreeting />
            
            {/* AI Avatar */}
            <AIAvatar 
              isActive={isLoading} 
              message={currentResponse ? "Here's what I found for you!" : undefined}
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 pb-12 max-w-7xl mx-auto">
          {/* Health Stats */}
          <HealthStats />
          
          {/* Quick Actions */}
          <QuickActions onAction={handleCardClick} />
          
          {/* Voice Input Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Voice Health Assistant
              </h2>
              <p className="text-muted-foreground">
                Speak naturally to get personalized health insights and recommendations
              </p>
            </div>
            
            <VoiceInput onCommand={handleCommand} emergencyMode={emergencyMode} />
            
            {isLoading && (
              <div className="text-center mt-6">
                <div className="inline-flex items-center gap-3 text-primary bg-card px-6 py-3 rounded-full border border-border shadow-sm">
                  <div className="w-3 h-3 bg-primary rounded-full animate-ping"></div>
                  <div className="w-3 h-3 bg-secondary rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                  <span className="ml-2 text-lg font-medium">Processing your health command...</span>
                </div>
              </div>
            )}

            {currentResponse && (
              <AIResponse 
                response={currentResponse}
                isEmergency={emergencyMode}
                cardType={responseCardType}
              />
            )}
          </section>

          {/* Gamification Badges */}
          <GamificationBadges />

          {/* Dashboard */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Comprehensive Health Hub
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Deep dive into specialized health categories with AI-powered insights and personalized recommendations
              </p>
            </div>
            
            <Dashboard onCardClick={handleCardClick} emergencyMode={emergencyMode} />
          </section>
        </main>

        {/* Footer */}
        <footer className="text-center py-8 px-4 border-t border-border/30">
          <p className="text-muted-foreground text-sm">
            Powered by AI • Your health companion is always here to help
          </p>
          <div className="flex justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-secondary rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-accent rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;