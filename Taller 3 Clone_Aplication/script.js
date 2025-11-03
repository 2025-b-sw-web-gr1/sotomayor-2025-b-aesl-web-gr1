// Funcionalidad para el clone de Telegram

document.addEventListener('DOMContentLoaded', () => {
    // Elementos principales
    const chatItems = document.querySelectorAll('.chat-item');
    const searchInput = document.querySelector('.search-input');
    const menuBtn = document.querySelector('.menu-btn');
    const emptyState = document.querySelector('.empty-state');
    const conversationArea = document.querySelector('.conversation-area');
    const messageInput = document.getElementById('messageInput');
    const messagesContainer = document.getElementById('messagesContainer');
    
    // Datos de los chats para la conversación
    const chatData = {
        'Desarrollo Web': {
            avatar: 'DW',
            gradient: 'linear-gradient(135deg, #2c3e50, #3498db)',
            status: '2,543 miembros, 234 en línea'
        },
        'Cursos Online - Tecnología': {
            avatar: 'CO',
            gradient: 'linear-gradient(135deg, #e74c3c, #f39c12)',
            status: '8,834 miembros, 1,523 en línea'
        },
        'Análisis de Datos': {
            avatar: 'AD',
            gradient: 'linear-gradient(135deg, #f1c40f, #e67e22)',
            status: '5,234 miembros, 892 en línea'
        },
        'Inteligencia Artificial': {
            avatar: 'IA',
            gradient: 'linear-gradient(135deg, #3498db, #2980b9)',
            status: '12,456 miembros, 3,234 en línea'
        },
        'Oportunidades Laborales Tech': {
            avatar: 'OL',
            gradient: 'linear-gradient(135deg, #f1c40f, #f39c12)',
            status: '7,892 miembros, 456 en línea'
        },
        'Freelance Developers': {
            avatar: 'FD',
            gradient: 'linear-gradient(135deg, #8e44ad, #9b59b6)',
            status: '4,567 miembros, 234 en línea'
        },
        'Recursos Educativos 📚': {
            avatar: 'RE',
            gradient: 'linear-gradient(135deg, #16a085, #27ae60)',
            status: '15,234 miembros, 4,567 en línea'
        },
        'Seguridad Informática': {
            avatar: 'SI',
            gradient: 'linear-gradient(135deg, #34495e, #2c3e50)',
            status: '9,876 miembros, 1,234 en línea'
        },
        'Comunidad Linux': {
            avatar: '🐧',
            gradient: 'linear-gradient(135deg, #2c3e50, #34495e)',
            status: '6,543 miembros, 987 en línea'
        }
    };
    
    // Función para abrir un chat
    function openChat(chatName) {
        const data = chatData[chatName];
        
        if (!data) return;
        
        // Ocultar estado vacío y mostrar conversación
        emptyState.classList.remove('active');
        conversationArea.classList.add('active');
        
        // Actualizar header del chat
        const chatHeaderAvatar = document.getElementById('chatHeaderAvatar');
        const chatHeaderName = document.getElementById('chatHeaderName');
        const chatHeaderStatus = document.getElementById('chatHeaderStatus');
        
        chatHeaderAvatar.innerHTML = `<span>${data.avatar}</span>`;
        chatHeaderAvatar.style.background = data.gradient;
        chatHeaderName.textContent = chatName;
        chatHeaderStatus.textContent = data.status;
        
        // Scroll al final de los mensajes
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }
    
    // Evento de click en cada chat
    chatItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remover clase 'active' de todos los chats
            chatItems.forEach(chat => chat.classList.remove('active'));
            
            // Agregar clase 'active' al chat seleccionado
            item.classList.add('active');
            
            // Obtener nombre del chat
            const chatName = item.querySelector('.chat-name').textContent;
            
            // Abrir conversación
            if (chatName !== 'Archived Chats') {
                openChat(chatName);
            }
            
            console.log(`Chat seleccionado: ${chatName}`);
        });
    });

    // Funcionalidad del buscador
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        chatItems.forEach(item => {
            const chatName = item.querySelector('.chat-name').textContent.toLowerCase();
            const chatMessage = item.querySelector('.chat-message').textContent.toLowerCase();
            
            if (chatName.includes(searchTerm) || chatMessage.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Funcionalidad del botón de menú
    menuBtn.addEventListener('click', () => {
        console.log('Menú clickeado');
    });

    // Funcionalidad del input de mensaje
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && messageInput.value.trim()) {
            sendMessage(messageInput.value.trim());
            messageInput.value = '';
        }
    });

    // Función para enviar mensaje
    function sendMessage(text) {
        const messageHTML = `
            <div class="message message-own">
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-time">${getCurrentTime()}</span>
                    </div>
                    <div class="message-text">
                        ${text}
                    </div>
                    <div class="message-status">
                        <svg width="16" height="16" viewBox="0 0 16 16">
                            <path fill="currentColor" d="M5.5 12.5l-3-3 1-1 2 2 6-6 1 1z"/>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 16 16">
                            <path fill="currentColor" d="M5.5 12.5l-3-3 1-1 2 2 6-6 1 1z"/>
                        </svg>
                    </div>
                </div>
            </div>
        `;
        
        // Insertar antes del indicador de escritura
        const typingIndicator = document.querySelector('.typing-indicator');
        messagesContainer.insertBefore(
            createElementFromHTML(messageHTML),
            typingIndicator
        );
        
        // Scroll al final
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Función auxiliar para crear elemento desde HTML
    function createElementFromHTML(htmlString) {
        const div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }

    // Función para obtener hora actual
    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // Agregar estilo activo al CSS dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        .chat-item.active {
            background-color: rgba(82, 136, 193, 0.15) !important;
        }
    `;
    document.head.appendChild(style);
});
