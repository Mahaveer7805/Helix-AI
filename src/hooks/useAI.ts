import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AIResponse {
  text: string;
  isEmergency?: boolean;
  cardType?: string;
}

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processCommand = useCallback(async (command: string): Promise<AIResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('ai-health-assistant', {
        body: { command }
      });

      if (functionError) {
        console.error('Function error:', functionError);
        throw new Error(functionError.message || 'Failed to process command');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      return {
        text: data.text,
        isEmergency: data.isEmergency || false,
        cardType: data.cardType || ''
      };

    } catch (err) {
      console.error('Error processing command:', err);
      setError('Failed to process command. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    processCommand,
    isLoading,
    error
  };
};