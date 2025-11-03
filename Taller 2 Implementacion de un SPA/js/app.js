/**
 * TaskManager SPA - Aplicación de Gestión de Tareas Personales
 * Implementa el patrón MVC y arquitectura de SPA
 */

class TaskManager {
    constructor() {
        // Estado de la aplicación
        this.tasks = [];
        this.currentFilter = 'all';
        this.currentPriorityFilter = null;
        this.currentSort = 'date-desc';
        this.searchQuery = '';
        this.editingTaskId = null;
        this.deletingTaskId = null;

        // Referencias a elementos DOM
        this.elements = {
            // Formulario principal
            taskForm: document.getElementById('task-form'),
            taskTitle: document.getElementById('task-title'),
            taskDescription: document.getElementById('task-description'),
            taskPriority: document.getElementById('task-priority'),
            taskDueDate: document.getElementById('task-due-date'),

            // Filtros y búsqueda
            searchInput: document.getElementById('search-input'),
            filterButtons: document.querySelectorAll('.filter-btn'),
            priorityFilters: document.querySelectorAll('.priority-filter'),
            sortSelect: document.getElementById('sort-select'),

            // Contenedores
            tasksContainer: document.getElementById('tasks-container'),
            emptyState: document.getElementById('empty-state'),

            // Estadísticas
            totalTasks: document.getElementById('total-tasks'),
            completedTasks: document.getElementById('completed-tasks'),

            // Modales
            editModal: document.getElementById('edit-modal'),
            editForm: document.getElementById('edit-task-form'),
            editTitle: document.getElementById('edit-task-title'),
            editDescription: document.getElementById('edit-task-description'),
            editPriority: document.getElementById('edit-task-priority'),
            editDueDate: document.getElementById('edit-task-due-date'),
            closeEditModal: document.getElementById('close-edit-modal'),
            cancelEdit: document.getElementById('cancel-edit'),

            deleteModal: document.getElementById('delete-modal'),
            closeDeleteModal: document.getElementById('close-delete-modal'),
            cancelDelete: document.getElementById('cancel-delete'),
            confirmDelete: document.getElementById('confirm-delete'),

            // Notificaciones
            notificationsContainer: document.getElementById('notifications-container')
        };

        // Inicializar la aplicación
        this.init();
    }

    /**
     * Inicializa la aplicación
     */
    init() {
        this.loadTasksFromStorage();
        this.bindEvents();
        this.renderTasks();
        this.updateStats();
        this.showNotification('¡Bienvenido a TaskManager!', 'La aplicación está lista para usar.', 'success');
    }

    /**
     * Vincula todos los eventos de la aplicación
     */
    bindEvents() {
        // Formulario principal
        this.elements.taskForm.addEventListener('submit', (e) => this.handleAddTask(e));

        // Búsqueda
        this.elements.searchInput.addEventListener('input', (e) => this.handleSearch(e));

        // Filtros de estado
        this.elements.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleStatusFilter(e));
        });

        // Filtros de prioridad
        this.elements.priorityFilters.forEach(btn => {
            btn.addEventListener('click', (e) => this.handlePriorityFilter(e));
        });

        // Ordenamiento
        this.elements.sortSelect.addEventListener('change', (e) => this.handleSort(e));

        // Modal de edición
        this.elements.editForm.addEventListener('submit', (e) => this.handleEditTask(e));
        this.elements.closeEditModal.addEventListener('click', () => this.closeEditModal());
        this.elements.cancelEdit.addEventListener('click', () => this.closeEditModal());

        // Modal de eliminación
        this.elements.closeDeleteModal.addEventListener('click', () => this.closeDeleteModal());
        this.elements.cancelDelete.addEventListener('click', () => this.closeDeleteModal());
        this.elements.confirmDelete.addEventListener('click', () => this.handleDeleteTask());

        // Cerrar modales al hacer clic fuera
        window.addEventListener('click', (e) => {
            if (e.target === this.elements.editModal) {
                this.closeEditModal();
            }
            if (e.target === this.elements.deleteModal) {
                this.closeDeleteModal();
            }
        });

        // Teclado shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    /**
     * Maneja atajos de teclado
     */
    handleKeyboardShortcuts(e) {
        // Escape para cerrar modales
        if (e.key === 'Escape') {
            this.closeEditModal();
            this.closeDeleteModal();
        }

        // Ctrl/Cmd + N para nueva tarea
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            this.elements.taskTitle.focus();
        }

        // Ctrl/Cmd + F para búsqueda
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            this.elements.searchInput.focus();
        }
    }

    /**
     * Genera un ID único para las tareas
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * Maneja la adición de nuevas tareas
     */
    handleAddTask(e) {
        e.preventDefault();

        const title = this.elements.taskTitle.value.trim();
        const description = this.elements.taskDescription.value.trim();
        const priority = this.elements.taskPriority.value;
        const dueDate = this.elements.taskDueDate.value;

        if (!title || !priority) {
            this.showNotification('Error', 'Por favor completa todos los campos requeridos.', 'error');
            return;
        }

        const newTask = {
            id: this.generateId(),
            title,
            description,
            priority,
            dueDate: dueDate || null,
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null
        };

        this.tasks.unshift(newTask);
        this.saveTasksToStorage();
        this.renderTasks();
        this.updateStats();
        
        // Limpiar formulario
        this.elements.taskForm.reset();
        
        this.showNotification('¡Tarea creada!', `"${title}" ha sido agregada exitosamente.`, 'success');
    }

    /**
     * Maneja la búsqueda de tareas
     */
    handleSearch(e) {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderTasks();
    }

    /**
     * Maneja los filtros de estado
     */
    handleStatusFilter(e) {
        // Remover clase active de todos los botones
        this.elements.filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Agregar clase active al botón seleccionado
        e.target.classList.add('active');
        
        this.currentFilter = e.target.dataset.filter;
        this.renderTasks();
    }

    /**
     * Maneja los filtros de prioridad
     */
    handlePriorityFilter(e) {
        const priority = e.target.dataset.priority;
        
        // Toggle filter
        if (this.currentPriorityFilter === priority) {
            this.currentPriorityFilter = null;
            e.target.classList.remove('active');
        } else {
            // Remover active de otros filtros de prioridad
            this.elements.priorityFilters.forEach(btn => btn.classList.remove('active'));
            
            this.currentPriorityFilter = priority;
            e.target.classList.add('active');
        }
        
        this.renderTasks();
    }

    /**
     * Maneja el ordenamiento de tareas
     */
    handleSort(e) {
        this.currentSort = e.target.value;
        this.renderTasks();
    }

    /**
     * Completa o marca como pendiente una tarea
     */
    toggleTaskCompletion(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            
            this.saveTasksToStorage();
            this.renderTasks();
            this.updateStats();
            
            const action = task.completed ? 'completada' : 'marcada como pendiente';
            this.showNotification('Estado actualizado', `La tarea "${task.title}" ha sido ${action}.`, 'success');
        }
    }

    /**
     * Abre el modal de edición con los datos de la tarea
     */
    openEditModal(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        this.editingTaskId = taskId;
        
        this.elements.editTitle.value = task.title;
        this.elements.editDescription.value = task.description || '';
        this.elements.editPriority.value = task.priority;
        this.elements.editDueDate.value = task.dueDate || '';
        
        this.elements.editModal.classList.add('show');
        this.elements.editTitle.focus();
    }

    /**
     * Cierra el modal de edición
     */
    closeEditModal() {
        this.elements.editModal.classList.remove('show');
        this.editingTaskId = null;
        this.elements.editForm.reset();
    }

    /**
     * Maneja la edición de tareas
     */
    handleEditTask(e) {
        e.preventDefault();
        
        if (!this.editingTaskId) return;

        const task = this.tasks.find(t => t.id === this.editingTaskId);
        if (!task) return;

        const title = this.elements.editTitle.value.trim();
        const description = this.elements.editDescription.value.trim();
        const priority = this.elements.editPriority.value;
        const dueDate = this.elements.editDueDate.value;

        if (!title || !priority) {
            this.showNotification('Error', 'Por favor completa todos los campos requeridos.', 'error');
            return;
        }

        task.title = title;
        task.description = description;
        task.priority = priority;
        task.dueDate = dueDate || null;
        task.updatedAt = new Date().toISOString();

        this.saveTasksToStorage();
        this.renderTasks();
        this.closeEditModal();
        
        this.showNotification('¡Tarea actualizada!', `"${title}" ha sido modificada exitosamente.`, 'success');
    }

    /**
     * Abre el modal de confirmación de eliminación
     */
    openDeleteModal(taskId) {
        this.deletingTaskId = taskId;
        this.elements.deleteModal.classList.add('show');
    }

    /**
     * Cierra el modal de eliminación
     */
    closeDeleteModal() {
        this.elements.deleteModal.classList.remove('show');
        this.deletingTaskId = null;
    }

    /**
     * Maneja la eliminación de tareas
     */
    handleDeleteTask() {
        if (!this.deletingTaskId) return;

        const taskIndex = this.tasks.findIndex(t => t.id === this.deletingTaskId);
        if (taskIndex === -1) return;

        const task = this.tasks[taskIndex];
        this.tasks.splice(taskIndex, 1);
        
        this.saveTasksToStorage();
        this.renderTasks();
        this.updateStats();
        this.closeDeleteModal();
        
        this.showNotification('Tarea eliminada', `"${task.title}" ha sido eliminada permanentemente.`, 'warning');
    }

    /**
     * Filtra las tareas según los criterios actuales
     */
    getFilteredTasks() {
        let filteredTasks = [...this.tasks];

        // Filtro por estado
        if (this.currentFilter === 'completed') {
            filteredTasks = filteredTasks.filter(task => task.completed);
        } else if (this.currentFilter === 'pending') {
            filteredTasks = filteredTasks.filter(task => !task.completed);
        }

        // Filtro por prioridad
        if (this.currentPriorityFilter) {
            filteredTasks = filteredTasks.filter(task => task.priority === this.currentPriorityFilter);
        }

        // Filtro por búsqueda
        if (this.searchQuery) {
            filteredTasks = filteredTasks.filter(task => 
                task.title.toLowerCase().includes(this.searchQuery) ||
                (task.description && task.description.toLowerCase().includes(this.searchQuery))
            );
        }

        return filteredTasks;
    }

    /**
     * Ordena las tareas según el criterio actual
     */
    sortTasks(tasks) {
        const sortedTasks = [...tasks];

        switch (this.currentSort) {
            case 'date-asc':
                return sortedTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            
            case 'date-desc':
                return sortedTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            
            case 'priority':
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return sortedTasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
            
            case 'title':
                return sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
            
            case 'due-date':
                return sortedTasks.sort((a, b) => {
                    if (!a.dueDate && !b.dueDate) return 0;
                    if (!a.dueDate) return 1;
                    if (!b.dueDate) return -1;
                    return new Date(a.dueDate) - new Date(b.dueDate);
                });
            
            default:
                return sortedTasks;
        }
    }

    /**
     * Renderiza todas las tareas en el DOM
     */
    renderTasks() {
        const filteredTasks = this.getFilteredTasks();
        const sortedTasks = this.sortTasks(filteredTasks);

        // Mostrar/ocultar estado vacío
        if (sortedTasks.length === 0) {
            this.elements.tasksContainer.innerHTML = '';
            this.elements.emptyState.classList.remove('hidden');
        } else {
            this.elements.emptyState.classList.add('hidden');
            this.elements.tasksContainer.innerHTML = sortedTasks.map(task => this.createTaskHTML(task)).join('');
            
            // Vincular eventos a los botones de acción
            this.bindTaskEvents();
        }
    }

    /**
     * Crea el HTML para una tarea individual
     */
    createTaskHTML(task) {
        const priorityLabels = {
            high: '🔴 Alta',
            medium: '🟡 Media',
            low: '🟢 Baja'
        };

        const formattedDate = new Date(task.createdAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        let dueDateHTML = '';
        if (task.dueDate) {
            const dueDate = new Date(task.dueDate);
            const today = new Date();
            const isOverdue = dueDate < today && !task.completed;
            
            const formattedDueDate = dueDate.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            dueDateHTML = `
                <div class="task-due-date ${isOverdue ? 'overdue' : ''}">
                    <i class="fas fa-calendar-alt"></i>
                    ${isOverdue ? 'Vencida: ' : 'Vence: '} ${formattedDueDate}
                </div>
            `;
        }

        return `
            <div class="task-item priority-${task.priority} ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                <div class="task-header">
                    <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
                    <span class="task-priority priority-${task.priority}">
                        ${priorityLabels[task.priority]}
                    </span>
                </div>
                
                ${task.description ? `<p class="task-description">${this.escapeHtml(task.description)}</p>` : ''}
                
                <div class="task-meta">
                    <div class="task-date">
                        <i class="fas fa-clock"></i>
                        Creada: ${formattedDate}
                    </div>
                    ${dueDateHTML}
                </div>
                
                <div class="task-actions">
                    <button class="task-action-btn complete-btn" onclick="taskManager.toggleTaskCompletion('${task.id}')" title="${task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}">
                        <i class="fas fa-${task.completed ? 'undo' : 'check'}"></i>
                    </button>
                    <button class="task-action-btn edit-btn" onclick="taskManager.openEditModal('${task.id}')" title="Editar tarea">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="task-action-btn delete-btn" onclick="taskManager.openDeleteModal('${task.id}')" title="Eliminar tarea">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Vincula eventos a los elementos de las tareas
     */
    bindTaskEvents() {
        // Los eventos se manejan mediante onclick en el HTML para simplicidad
        // En una aplicación más compleja, se usaría event delegation
    }

    /**
     * Actualiza las estadísticas mostradas en el header
     */
    updateStats() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(task => task.completed).length;

        this.elements.totalTasks.textContent = totalTasks;
        this.elements.completedTasks.textContent = completedTasks;
    }

    /**
     * Guarda las tareas en localStorage
     */
    saveTasksToStorage() {
        try {
            localStorage.setItem('taskmanager_tasks', JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Error al guardar tareas:', error);
            this.showNotification('Error', 'No se pudieron guardar las tareas.', 'error');
        }
    }

    /**
     * Carga las tareas desde localStorage
     */
    loadTasksFromStorage() {
        try {
            const saved = localStorage.getItem('taskmanager_tasks');
            if (saved) {
                this.tasks = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error al cargar tareas:', error);
            this.tasks = [];
            this.showNotification('Error', 'No se pudieron cargar las tareas guardadas.', 'error');
        }
    }

    /**
     * Muestra una notificación al usuario
     */
    showNotification(title, message, type = 'info', duration = 5000) {
        const iconMap = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="${iconMap[type]}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${this.escapeHtml(title)}</div>
                <div class="notification-message">${this.escapeHtml(message)}</div>
            </div>
        `;

        this.elements.notificationsContainer.appendChild(notification);

        // Auto-remover la notificación
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideInFromRight 0.3s ease reverse';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, duration);

        return notification;
    }

    /**
     * Escapa HTML para prevenir XSS
     */
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    /**
     * Exporta las tareas a JSON
     */
    exportTasks() {
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `taskmanager_backup_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showNotification('Exportación exitosa', 'Las tareas han sido exportadas correctamente.', 'success');
    }

    /**
     * Importa tareas desde un archivo JSON
     */
    importTasks(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedTasks = JSON.parse(e.target.result);
                
                if (Array.isArray(importedTasks)) {
                    this.tasks = [...this.tasks, ...importedTasks];
                    this.saveTasksToStorage();
                    this.renderTasks();
                    this.updateStats();
                    
                    this.showNotification('Importación exitosa', `${importedTasks.length} tareas han sido importadas.`, 'success');
                } else {
                    throw new Error('Formato de archivo inválido');
                }
            } catch (error) {
                console.error('Error al importar tareas:', error);
                this.showNotification('Error de importación', 'El archivo no tiene un formato válido.', 'error');
            }
        };
        
        reader.readAsText(file);
    }

    /**
     * Limpia todas las tareas completadas
     */
    clearCompletedTasks() {
        const completedCount = this.tasks.filter(task => task.completed).length;
        
        if (completedCount === 0) {
            this.showNotification('Sin tareas completadas', 'No hay tareas completadas para eliminar.', 'info');
            return;
        }

        if (confirm(`¿Estás seguro de que quieres eliminar las ${completedCount} tareas completadas?`)) {
            this.tasks = this.tasks.filter(task => !task.completed);
            this.saveTasksToStorage();
            this.renderTasks();
            this.updateStats();
            
            this.showNotification('Tareas eliminadas', `${completedCount} tareas completadas han sido eliminadas.`, 'success');
        }
    }

    /**
     * Obtiene estadísticas detalladas
     */
    getDetailedStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;
        
        const byPriority = {
            high: this.tasks.filter(t => t.priority === 'high' && !t.completed).length,
            medium: this.tasks.filter(t => t.priority === 'medium' && !t.completed).length,
            low: this.tasks.filter(t => t.priority === 'low' && !t.completed).length
        };

        const overdue = this.tasks.filter(t => {
            if (!t.dueDate || t.completed) return false;
            return new Date(t.dueDate) < new Date();
        }).length;

        return {
            total,
            completed,
            pending,
            byPriority,
            overdue,
            completionRate: total > 0 ? ((completed / total) * 100).toFixed(1) : 0
        };
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.taskManager = new TaskManager();
});

// Funciones adicionales para la consola del desarrollador
window.taskManagerUtils = {
    exportTasks: () => window.taskManager.exportTasks(),
    clearCompleted: () => window.taskManager.clearCompletedTasks(),
    getStats: () => window.taskManager.getDetailedStats(),
    reset: () => {
        if (confirm('¿Estás seguro de que quieres eliminar TODAS las tareas?')) {
            localStorage.removeItem('taskmanager_tasks');
            location.reload();
        }
    }
};