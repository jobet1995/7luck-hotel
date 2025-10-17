# Gemini AI Setup Guide for 7Luck Hotel Chatbot

## Step 1: Get your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the generated API key

## Step 2: Configure Environment Variables

Create a `.env.local` file in your project root directory and add your API key:

```bash
# Add this to your .env.local file
GEMINI_API_KEY=your_actual_api_key_here
```

## Step 3: Restart Your Development Server

After adding the API key, restart your Next.js development server:

```bash
npm run dev
```

## ✅ **Fixed Issues**

### **Model Name Corrections**

- Updated to use `gemini-2.5-flash` as the primary model (as requested)
- Added fallback mechanism to try `gemini-pro` if primary model fails
- Enhanced error handling for API connectivity issues

### **Error Handling Improvements**

- **Automatic Fallback**: If Gemini API fails, the chatbot gracefully falls back to predefined responses
- **Visual Indicators**:
  - 🟢 **Green dot**: AI-powered responses active
  - 🟡 **Yellow dot**: Fallback mode (API key not configured or API error)
- **Better Error Messages**: Clear feedback when API issues occur

## Features Added

- **AI-Powered Responses**: The chatbot now uses Google Gemini AI for intelligent responses
- **Hotel Context**: The AI is trained to respond as a 7Luck Hotel assistant
- **Fallback System**: If the API is unavailable, it falls back to predefined responses
- **Visual Status Indicators**: The chat header shows AI status
- **Error Handling**: Proper error handling for API failures

## API Key Security

- The API key is stored securely in environment variables
- Never commit your actual API key to version control
- The `.env.local` file is automatically ignored by git

## Supported Queries

The AI assistant can help with:

- Hotel bookings and reservations
- Room information and amenities
- Location and directions
- Pricing and rates
- Check-in/check-out times
- Contact information
- General hotel services

## Troubleshooting

### **If you get a "model not found" error:**

1. The chatbot will automatically try alternative models
2. Check that your API key is valid and has the necessary permissions
3. Ensure you're using the correct API key from Google AI Studio

### **If the chatbot shows yellow status:**

1. Check that your `GEMINI_API_KEY` is correctly set in `.env.local`
2. Verify your API key is valid and active
3. The chatbot will still work with fallback responses even without the API key

### **Network or API Errors:**

- The chatbot includes comprehensive error handling
- Users will see a friendly error message if API calls fail
- The system automatically retries and falls back gracefully

## Testing the Integration

1. Open your website in the browser
2. Click the chat button in the bottom-right corner
3. Check the header status indicator (green = AI active, yellow = fallback)
4. Send a message and verify you get an appropriate response
5. Try various types of questions to test the AI responses

The chatbot will provide intelligent, contextual responses based on your specific questions about 7Luck Hotel & Resorts.
