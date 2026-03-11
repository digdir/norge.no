import re

with open("packages/data-access/react-query/hooks/chat.ts", "r") as f:
    text = f.read()

replacement = """  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Du har nådd chat-grensen. Vennligst vent 1 minutt og prøv igjen.");
    }
    if (response.status === 422) {
      throw new Error("Meldingen din er for lang. Vennligst forkort den til under 2000 tegn og prøv igjen.");
    }
    try {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Sorry, I encountered an error. Please try again.");
    } catch {
      throw new Error("Sorry, I encountered an error. Please try again.");
    }
  }"""

text = re.sub(r"  if \(!response\.ok\) \{\n    throw new Error\(`API request failed with status \$\{response\.status\}`\);\n  \}", replacement, text)

with open("packages/data-access/react-query/hooks/chat.ts", "w") as f:
    f.write(text)
