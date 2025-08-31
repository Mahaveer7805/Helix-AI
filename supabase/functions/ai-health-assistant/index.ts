import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const groqApiKey = Deno.env.get('GROQ_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { command } = await req.json();
    
    console.log('Processing health command:', command);

    // Emergency keyword detection
    const emergencyKeywords = [
      'chest pain', 'heart attack', 'stroke', 'difficulty breathing', 
      'severe pain', 'bleeding', 'unconscious', 'emergency', 'urgent',
      'can\'t breathe', 'severe headache', 'seizure'
    ];

    const isEmergency = emergencyKeywords.some(keyword => 
      command.toLowerCase().includes(keyword)
    );

    // Card type detection
    let cardType = '';
    if (command.toLowerCase().includes('symptom') || command.toLowerCase().includes('pain') || command.toLowerCase().includes('sick')) {
      cardType = 'symptoms';
    } else if (command.toLowerCase().includes('diet') || command.toLowerCase().includes('fitness') || command.toLowerCase().includes('workout')) {
      cardType = 'fitness';
    } else if (command.toLowerCase().includes('mental') || command.toLowerCase().includes('stress') || command.toLowerCase().includes('meditation')) {
      cardType = 'mental';
    } else if (command.toLowerCase().includes('device') || command.toLowerCase().includes('tracker') || command.toLowerCase().includes('iot')) {
      cardType = 'iot';
    }

    // Create specialized system prompts based on context
    let systemPrompt = "You are LOVABLE, an advanced AI health companion. ";
    
    if (isEmergency) {
      systemPrompt += "CRITICAL: The user has mentioned potential emergency symptoms. Prioritize safety and recommend immediate medical attention. ";
    } else if (cardType === 'symptoms') {
      systemPrompt += `You are a health symptom analyzer. Provide detailed symptom analysis, potential causes, and actionable recommendations. 
      Format your response with clear sections using **headers** for: **Symptom Analysis**, **Possible Causes**, **Recommendations**, **When to Seek Help**.
      Always remind users this doesn't replace professional medical advice.`;
    } else if (cardType === 'fitness') {
      systemPrompt += `You are a fitness and nutrition coach. Create detailed workout plans and meal suggestions.
      Format your response with **headers** for: **Workout Plan**, **Nutrition Guidelines**, **Weekly Schedule**, **Progress Tracking**.
      Include specific exercises, sets, reps, and meal suggestions.`;
    } else if (cardType === 'mental') {
      systemPrompt += `You are a mental health and meditation guide. Provide stress relief techniques, mood tracking insights, and meditation exercises.
      Format your response with **headers** for: **Mental Health Assessment**, **Meditation Exercises**, **Stress Relief Techniques**, **Daily Practices**.
      Be empathetic and supportive while providing actionable mental wellness strategies.`;
    } else if (cardType === 'iot') {
      systemPrompt += `You are an IoT health device specialist. Provide guidance on health device integration, data interpretation, and monitoring strategies.
      Format your response with **headers** for: **Device Recommendations**, **Data Interpretation**, **Monitoring Schedule**, **Health Insights**.
      Focus on practical device usage and health data analysis.`;
    } else {
      systemPrompt += `Provide comprehensive health guidance based on the user's request.
      Format your response with relevant **headers** and organized sections for easy reading.`;
    }
    
    systemPrompt += ` Always use emojis appropriately and keep responses detailed but concise. Be supportive and encouraging.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: command }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error('Groq API error:', response.status, response.statusText);
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI response generated successfully');

    return new Response(JSON.stringify({ 
      text: aiResponse,
      isEmergency,
      cardType
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-health-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      text: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.",
      isEmergency: false,
      cardType: ''
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});