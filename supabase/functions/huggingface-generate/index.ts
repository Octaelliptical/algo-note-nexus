
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()

    if (!prompt) {
      throw new Error('Prompt is required')
    }

    const hfApiKey = Deno.env.get('HF_API_KEY')
    if (!hfApiKey) {
      throw new Error('HF_API_KEY not configured')
    }

    console.log('Making request to HuggingFace API with prompt:', prompt)

    // Using a more reliable text generation model
    const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${hfApiKey}`,
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.7,
          do_sample: true,
          return_full_text: false,
          stop: ["</s>", "\n\n"]
        },
        options: {
          wait_for_model: true,
          use_cache: false
        },
      }),
    })

    console.log('HuggingFace API response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('HuggingFace API error:', errorText)
      
      // If model is loading, provide a fallback response
      if (response.status === 503) {
        const fallbackResponse = `Generated response for: "${prompt}"\n\nThis is an educational response about your query. The AI model is currently loading - please try again in a moment for a more detailed response.`
        return new Response(
          JSON.stringify({ generated_text: fallbackResponse }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          },
        )
      }
      
      throw new Error(`HuggingFace API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log('HuggingFace API response data:', data)
    
    let generatedText = ''
    
    // Handle different response formats
    if (Array.isArray(data) && data.length > 0) {
      const firstResult = data[0]
      if (firstResult.generated_text) {
        generatedText = firstResult.generated_text.trim()
      } else if (firstResult.text) {
        generatedText = firstResult.text.trim()
      }
    } else if (data.generated_text) {
      generatedText = data.generated_text.trim()
    } else if (data.text) {
      generatedText = data.text.trim()
    }

    // Clean up the response - remove the original prompt if it's included
    if (generatedText && generatedText.includes(prompt)) {
      const promptIndex = generatedText.indexOf(prompt)
      if (promptIndex !== -1) {
        generatedText = generatedText.substring(promptIndex + prompt.length).trim()
      }
    }

    // Fallback if no meaningful content was generated
    if (!generatedText || generatedText.length < 10) {
      generatedText = `Educational response for: "${prompt}"\n\nThis topic involves important concepts that would benefit from further exploration. Consider researching the fundamentals and practical applications of this subject.`
    }

    return new Response(
      JSON.stringify({ generated_text: generatedText }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error in huggingface-generate function:', error)
    
    // Provide a helpful fallback response instead of just an error
    const fallbackResponse = 'The AI text generation service is temporarily unavailable. Please try again later or use the other AI features available.'
    
    return new Response(
      JSON.stringify({ 
        generated_text: fallbackResponse,
        error: error.message 
      }),
      {
        status: 200, // Return 200 so the frontend can still display the fallback
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
