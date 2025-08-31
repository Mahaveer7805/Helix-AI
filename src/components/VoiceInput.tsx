import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceInputProps {
  onCommand: (command: string) => void;
  emergencyMode: boolean;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ onCommand, emergencyMode }) => {
  const [isListening, setIsListening] = useState(false);
  const [command, setCommand] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setCommand(transcript);
        if (event.results[0].isFinal) {
          setIsListening(false);
        }
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setIsSupported(false);
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setCommand('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSubmit = () => {
    if (command.trim()) {
      onCommand(command.trim());
      setCommand('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto mb-12 ${emergencyMode ? 'emergency-mode' : ''}`}>
      <div className="relative">
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Give me a health command... (e.g., 'Check my symptoms' or 'Create a workout plan')"
          className="voice-input w-full text-lg text-foreground placeholder:text-muted-foreground pr-32"
        />
        
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          {isSupported && (
            <Button
              onClick={isListening ? stopListening : startListening}
              variant="ghost"
              size="sm"
              className={`p-2 rounded-lg border transition-all duration-300 ${
                isListening 
                  ? 'border-destructive bg-destructive/10 text-destructive neon-glow-emergency' 
                  : 'border-primary bg-primary/10 text-primary hover:neon-glow-primary'
              }`}
            >
              {isListening ? (
                <MicOff className="h-5 w-5 animate-pulse" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
          )}
          
          <Button
            onClick={handleSubmit}
            disabled={!command.trim()}
            variant="ghost"
            size="sm"
            className="p-2 rounded-lg border border-accent bg-accent/10 text-accent hover:neon-glow-accent disabled:opacity-50 transition-all duration-300"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {isListening && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 text-primary animate-pulse">
            <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
            <span className="text-sm">Listening...</span>
          </div>
        </div>
      )}
    </div>
  );
};