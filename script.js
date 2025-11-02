async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  const message = input.value.trim();
  if (!message) return;

  chatbox.innerHTML += `<p><b>You:</b> ${message}</p>`;
  input.value = "";

  try {
    const res = await fetch(`https://api.monkedev.com/fun/chat?msg=${encodeURIComponent(message)}`);
    const data = await res.json();
    chatbox.innerHTML += `<p><b>Bot:</b> ${data.response || "🤖 No response"}</p>`;
    chatbox.scrollTop = chatbox.scrollHeight;
  } catch (err) {
    chatbox.innerHTML += `<p>⚠️ Error: Could not connect to chatbot.</p>`;
  }
}