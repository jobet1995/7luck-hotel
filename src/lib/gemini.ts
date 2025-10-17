import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI with API key from environment variables
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "",
);

/**
 * Generate a response using Google Gemini AI
 * @param userMessage - The user's message to respond to
 * @param context - Optional context about the hotel to provide better responses
 * @returns Promise<string> - The AI-generated response
 */
export async function generateGeminiResponse(
  userMessage: string,
  context?: string,
): Promise<string> {
  try {
    // Check if API key is available
    const apiKey =
      process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn(
        "Gemini API key not found. Please add GEMINI_API_KEY to your environment variables.",
      );
      return getFallbackResponse(userMessage);
    }

    // Get the Gemini model - using gemini-2.5-flash as requested
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Create context-aware prompt for hotel assistant
    const hotelContext =
      context ||
      `You are a helpful assistant for 7Luck Hotel & Resorts, a luxury hotel. You help guests with information about bookings, amenities, services, location, pricing, and general inquiries. Always be professional, friendly, and provide accurate information about the hotel.`;

    const fullPrompt = `${hotelContext}

User question: ${userMessage}

Please provide a helpful, concise response as the hotel assistant:`;

    // Generate response
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);

    // If it's a model not found error, try with a different model
    if (error instanceof Error && error.message.includes("not found")) {
      console.warn("Model not found, trying with alternative model...");
      return await generateGeminiResponseWithFallback(userMessage, context);
    }

    // Return fallback response if API fails
    return getFallbackResponse(userMessage);
  }
}

/**
 * Fallback function to try alternative models if the primary model fails
 */
async function generateGeminiResponseWithFallback(
  userMessage: string,
  context?: string,
): Promise<string> {
  try {
    // Try with gemini-pro if gemini-1.5-flash fails
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const hotelContext =
      context ||
      `You are a helpful assistant for 7Luck Hotel & Resorts, a luxury hotel. You help guests with information about bookings, amenities, services, location, pricing, and general inquiries. Always be professional, friendly, and provide accurate information about the hotel.`;

    const fullPrompt = `${hotelContext}

User question: ${userMessage}

Please provide a helpful, concise response as the hotel assistant:`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return text.trim();
  } catch (fallbackError) {
    console.error("Fallback model also failed:", fallbackError);
    return getFallbackResponse(userMessage);
  }
}

/**
 * Fallback responses when Gemini API is unavailable
 */
function getFallbackResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  if (
    message.includes("hello") ||
    message.includes("hi") ||
    message.includes("hey")
  ) {
    return "Hello! Welcome to 7Luck Hotel & Resorts! I'm here to help you with any questions about our luxury accommodations, amenities, or services. How can I assist you today?";
  }

  if (
    message.includes("booking") ||
    message.includes("reservation") ||
    message.includes("book")
  ) {
    return "I'd be happy to help you with booking! You can make a reservation through our website or by calling our front desk at +1 (555) 123-4567. Would you like me to guide you to our booking page?";
  }

  if (
    message.includes("amenities") ||
    message.includes("facilities") ||
    message.includes("services")
  ) {
    return "We offer world-class amenities including a luxury spa, fitness center, rooftop pool, fine dining restaurant, business center, and 24/7 concierge service. Is there something specific you'd like to know more about?";
  }

  if (
    message.includes("rooms") ||
    message.includes("room") ||
    message.includes("suite")
  ) {
    return "Our hotel features elegantly appointed rooms and suites with stunning city views, premium bedding, smart TVs, high-speed WiFi, and luxury bathrooms. We have various room types to suit different preferences and budgets.";
  }

  if (
    message.includes("location") ||
    message.includes("address") ||
    message.includes("where")
  ) {
    return "We're conveniently located in the heart of downtown, just steps from major business districts, shopping centers, and cultural attractions. Our address is 123 Luxury Avenue, Downtown City.";
  }

  if (
    message.includes("price") ||
    message.includes("cost") ||
    message.includes("rate")
  ) {
    return "Our room rates vary by season and room type, starting from $299 per night. We offer special packages and seasonal promotions. Would you like me to check current rates for specific dates?";
  }

  if (
    message.includes("check in") ||
    message.includes("check out") ||
    message.includes("check-in") ||
    message.includes("check-out")
  ) {
    return "Check-in time is 3:00 PM and check-out time is 11:00 AM. Early check-in and late check-out can be arranged based on availability for an additional fee.";
  }

  if (
    message.includes("contact") ||
    message.includes("phone") ||
    message.includes("email")
  ) {
    return "You can reach us at +1 (555) 123-4567 or info@7luckhotel.com. Our front desk is available 24/7 to assist you!";
  }

  if (message.includes("thank") || message.includes("thanks")) {
    return "You're very welcome! Is there anything else I can help you with regarding your stay at 7Luck Hotel & Resorts?";
  }

  return "Thank you for your question! I'm currently experiencing some technical difficulties, but I'd be happy to help you with general information about our hotel. For more specific inquiries, please contact our front desk at +1 (555) 123-4567 or visit our website.";
}

/**
 * Validate if the Gemini API key is properly configured
 */
export function isGeminiConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY
  );
}
