import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY!);

export async function POST(request: Request) {
  const { image } = await request.json();

  if (!image) {
    return NextResponse.json({ error: 'Image is required' }, { status: 400 });
  }

  try {
    // Remove the data URL prefix to get just the base64 data
    const base64Data = image.split(',')[1];

    // Initialize the model with gemini-1.5-flash
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create prompt
    const prompt = `CanvasAI: Empowering Creativity with Intelligent Note-Taking

Analyze the provided image and respond in one of two ways:

1. For mathematical content:
{
    "computed_result": number
}

- Handle all mathematical expressions including:
  - Basic arithmetic
  - Algebraic expressions
  - Trigonometric functions
  - Logarithmic operations
  - Calculus-based computations
- Return only the final computed result in JSON format
- Include no explanations or intermediate steps
-1. Basic Arithmetic:
Input: "2 + 3"
Response: {"computed_result": 5}

input: "25 ÷ 5"
Response: {"computed_result": 5}

input: "10000000000000 - 1"
Response: {"computed_result": 9999999999999}

Input: "2 + 3 × 4"
Response:  14

Input: "25 ÷ 5 - 3"
Response: {"computed_result": 2}

2. Algebraic Expressions:
Input: "x² + 2x + 1, where x = 3"
Response: {"computed_result": 16}

Input: "(a + b)², where a = 2, b = 3"
Response: {"computed_result": 25}

3. Trigonometric Functions:
Input: "sin(30°)"
Response: {"computed_result": 0.5}

Input: "cos(60°) + tan(45°)"
Response: {"computed_result": 1.5}

4. Logarithmic Operations:
Input: "log₁₀(100)"
Response: {"computed_result": 2}

Input: "ln(e²)"
Response: {"computed_result": 2}

5. Mixed Operations:
Input: "2 × sin(45°) + log₁₀(1000)"
Response: {"computed_result": 4.414}

Input: "√16 + π"
Response: {"computed_result": 7.142}

6. Calculus:
Input: "∫(2x)dx from 0 to 2"
Response: {"computed_result": 4}

Input: "d/dx(x²) at x = 3"
Response: {"computed_result": 6}

7. Complex Expressions:
Input: "sin²(30°) + log₁₀(100) × √16"
Response: {"computed_result": 8.25}

Input: "(3 + 4)² ÷ 2 + sin(60°)"
Response: {"computed_result": 25.866}

2. For non-mathematical content:
- Provide a single, concise caption describing the key elements in the image
- Focus on identifying:
  - Main subjects/objects
  - Notable text content
  - Key visual elements
  - Spatial relationships
  - Important contextual details
- Return the caption as plain text without any JSON formatting

Important:
- Provide only the requested output format
- Include no additional explanations or commentary
- Ensure mathematical results are precise and formatted as JSON
- Keep non-mathematical captions clear and descriptive`;

    // Generate content
    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Data
        }
      }
    ]);

    const responseText = await result.response.text();
    try {
      // Try to parse as JSON first (for mathematical responses)
      const jsonMatch = responseText.match(/\{.*\}/);
      if (jsonMatch) {
        const parsedResult = JSON.parse(jsonMatch[0]);
        if (parsedResult.computed_result !== undefined) {
          return NextResponse.json({ 
            type: 'mathematical',
            result: parsedResult.computed_result 
          });
        }
      }
      
      // If not JSON or no computed_result, treat as text caption
      return NextResponse.json({ 
        type: 'caption',
        result: responseText.trim() 
      });
    
    } catch (error) {
      console.error('Error processing response:', error);
      throw new Error('Failed to process the response');
    }

  } catch (error: any) {
    console.error('Error:', error.message);
    return NextResponse.json({
      error: 'Internal server error',
      details: error.message
    }, { status: 500 });
  }
} 