document.addEventListener("DOMContentLoaded", function () {
    const chatbotContainer = document.getElementById("chatbot-container");
    const closeBtn = document.getElementById("close-btn");
    const sendBtn = document.getElementById("send-btn");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotIcon = document.getElementById("chatbot-icon");

    // Mostrar y ocultar el chatbot
    chatbotIcon.addEventListener("click", function () {
        chatbotContainer.classList.remove("hidden");
        chatbotContainer.classList.add("visible");
        chatbotIcon.style.display = "none";
    });

    closeBtn.addEventListener("click", function () {
        chatbotContainer.classList.remove("visible");
        chatbotIcon.style.display = "flex";
    });

    sendBtn.addEventListener("click", sendMessage);
    chatbotInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = chatbotInput.value.trim();
        if (userMessage) {
            appendMessage("user", userMessage);
            chatbotInput.value = "";
            getBotResponse(userMessage);
        }
    }

    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    async function getBotResponse(userMessage) {
        try {
            // Preparar mensajes con validación de contenido
            const messages = [
                {
                    role: "system",
                    content:
                        "Eres un asistente virtual llamado Nixana que está implementado en un proyecto llamado Fitness Restaurant y sólo puedes responder cosas acerca de la salud y buena alimentación, cualquier cosa que no tenga que ver con eso no lo debes responder.",
                },
                {
                    role: "user",
                    content: userMessage.trim(),
                },
            ];

            // Filtrar mensajes vacíos o inválidos
            const filteredMessages = messages.filter(
                (msg) => msg.content && msg.content.trim() !== ""
            );

            const response = await fetch("/gemini-chat/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_message: userMessage,
                    messages: filteredMessages,
                }),
            });

            const data = await response.json();
            console.log("Django API Response:", data);

            if (data && data.response) {
                appendMessage("bot", data.response);
            } else {
                appendMessage("bot", "Error en la respuesta del chatbot.");
            }
        } catch (error) {
            console.error("Error al obtener respuesta del bot:", error);
            appendMessage("bot", "Hubo un problema al conectarse con el chatbot.");
        }
    }
});
