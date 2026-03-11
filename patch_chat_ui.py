import re

with open("packages/ui/pages/chat-page/index.tsx", "r") as f:
    text = f.read()

old_str = """        onError: (error: Error) => {
          console.error('Failed to fetch response:', error);
          const errorMessage: ChatMessageProps = createChatMessage(
            'Sorry, I encountered an error. Please try again.',
            'ai',
          );
          setMessages((prev) => [...prev, errorMessage]);
        },"""

new_str = """        onError: (error: Error) => {
          console.error('Failed to fetch response:', error);
          const errorMessage: ChatMessageProps = createChatMessage(
            error.message || 'Beklager, jeg støtte på en feil. Vennligst prøv igjen.',
            'ai',
          );
          setMessages((prev) => [...prev, errorMessage]);
        },"""

text = text.replace(old_str, new_str)

with open("packages/ui/pages/chat-page/index.tsx", "w") as f:
    f.write(text)
