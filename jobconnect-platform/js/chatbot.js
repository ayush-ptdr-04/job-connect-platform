// Simple rule-based chatbot
const responses = {
  'hi': 'Hello! How can I assist you with your career today?',
  'job': 'Looking for jobs? Check out the opportunities on the homepage or your dashboard!',
  'skills': 'Boost your profile with in-demand skills like JavaScript, Python, or React!',
  'career': 'Need career advice? Focus on building a strong portfolio and networking!',
  'default': 'Hmm, I didn’t catch that. Try asking about jobs, skills, or career advice!',
};

function setupChatbot() {
  const toggleBtn = document.getElementById('chatbot-toggle');
  const chatbot = document.getElementById('chatbot');
  const sendBtn = document.getElementById('chatbot-send');
  const input = document.getElementById('chatbot-input');
  const messages = document.getElementById('chatbot-messages');

  if (toggleBtn && chatbot) {
    toggleBtn.addEventListener('click', () => {
      chatbot.classList.toggle('translate-y-full');
      chatbot.classList.toggle('opacity-0');
      toggleBtn.classList.toggle('hidden');
    });
  }

  if (sendBtn && input && messages) {
    sendBtn.addEventListener('click', () => {
      const userInput = input.value.toLowerCase().trim();
      if (!userInput) return;

      // Add user message
      const userMsg = document.createElement('div');
      userMsg.className = 'text-right text-gray-700 mb-1 animate-fade-in';
      userMsg.textContent = `You: ${userInput}`;
      messages.appendChild(userMsg);

      // Add bot response
      const botMsg = document.createElement('div');
      botMsg.className = 'text-left text-teal-400 mb-1 animate-fade-in';
      botMsg.textContent = `Bot: ${responses[userInput] || responses['default']}`;
      messages.appendChild(botMsg);

      // Clear input and scroll to bottom
      input.value = '';
      messages.scrollTop = messages.scrollHeight;
    });

    // Allow sending with Enter key
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendBtn.click();
    });
  }
}

document.addEventListener('DOMContentLoaded', setupChatbot);