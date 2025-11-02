const API_URL = "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct";
const chatContainer = document.getElementById("chat-container");
const input = document.getElementById("user-input");
const button = document.getElementById("send-btn");

button.addEventListener("click", sendMessage);

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage() {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  addMessage("You", userMessage);
  input.value = "";

  addMessage("🤖", "Thinking...");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer hf_yOUR_HUGGING_FACE_TOKEN" // optional if you have a key
      },
      body: JSON.stringify({ inputs: userMessage })
    });

    if (!response.ok) throw new Error("Failed to fetch response");
    const data = await response.json();

    const botReply = data[0]?.generated_text || "Sorry, I couldn't understand.";
    document.querySelectorAll(".message").at(-1).innerHTML = `<strong>🤖:</strong> ${botReply}`;
  } catch (err) {
    document.querySelectorAll(".message").at(-1).innerHTML = "⚠️ Error: Could not connect to chatbot.";
    console.error(err);
  }
}