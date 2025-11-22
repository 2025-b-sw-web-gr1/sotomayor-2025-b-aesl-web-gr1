/**
 * Tactical Warfare System - Sistema de Gestión de Tácticas Militares
 * Simulación de arquitectura JSP/Servlet en Frontend
 * 
 * SIMULACIÓN DE ARQUITECTURA JAVA EE:
 * Este código simula cómo funcionaría una aplicación JSP/Servlet
 * 
 * En un entorno Java real:
 * - Esta clase sería un Servlet (@WebServlet)
 * - Los métodos serían doGet(), doPost()
 * - El localStorage sería una base de datos (JPA/Hibernate)
 * - Los datos se pasarían con request.setAttribute()
 * - La vista sería un archivo .jsp con JSTL y EL
 */

class TacticalWarfareManager {
    constructor() {
        // Simula HttpSession attributes
        this.tactics = [];
        this.currentFilter = 'all';
        this.currentPeriodFilter = null;
        this.currentSort = 'date-desc';
        this.searchQuery = '';
        this.editingTacticId = null;
        this.deletingTacticId = null;

        // Simula request.getAttribute() - Referencias DOM
        this.elements = this.initializeElements();
        
        // Simula Servlet.init()
        this.init();
    }

    initializeElements() {
        return {
            // Formulario
            tacticalForm: document.getElementById('tactical-form'),
            tacticName: document.getElementById('tactic-name'),
            tacticDescription: document.getElementById('tactic-description'),
            tacticType: document.getElementById('tactic-type'),
            tacticImportance: document.getElementById('tactic-importance'),
            tacticPeriod: document.getElementById('tactic-period'),
            tacticEffectiveness: document.getElementById('tactic-effectiveness'),
            tacticCommander: document.getElementById('tactic-commander'),
            tacticBattle: document.getElementById('tactic-battle'),

            // Filtros
            searchInput: document.getElementById('search-input'),
            filterButtons: document.querySelectorAll('.filter-btn'),
            periodFilters: document.querySelectorAll('.period-filter'),
            sortSelect: document.getElementById('sort-select'),

            // Contenedores
            tacticsContainer: document.getElementById('tactics-container'),
            emptyState: document.getElementById('empty-state'),

            // Stats
            totalTactics: document.getElementById('total-tactics'),
            highImportanceTactics: document.getElementById('high-importance-tactics'),

            // Modales
            editModal: document.getElementById('edit-modal'),
            editForm: document.getElementById('edit-tactical-form'),
            editName: document.getElementById('edit-tactic-name'),
            editDescription: document.getElementById('edit-tactic-description'),
            editType: document.getElementById('edit-tactic-type'),
            editImportance: document.getElementById('edit-tactic-importance'),
            editPeriod: document.getElementById('edit-tactic-period'),
            editEffectiveness: document.getElementById('edit-tactic-effectiveness'),
            editCommander: document.getElementById('edit-tactic-commander'),
            editBattle: document.getElementById('edit-tactic-battle'),
            closeEditModal: document.getElementById('close-edit-modal'),
            cancelEdit: document.getElementById('cancel-edit'),

            deleteModal: document.getElementById('delete-modal'),
            closeDeleteModal: document.getElementById('close-delete-modal'),
            cancelDelete: document.getElementById('cancel-delete'),
            confirmDelete: document.getElementById('confirm-delete'),

            notificationsContainer: document.getElementById('notifications-container')
        };
    }

    // Simula: public void init() throws ServletException
    init() {
        this.loadTacticsFromStorage();
        this.bindEvents();
        this.loadSampleData(); // Datos de ejemplo
        this.renderTactics();
        this.updateStats();
        this.showNotification(
            'Sistema Táctico Iniciado', 
            'Tactical Warfare System listo. Base de datos de tácticas militares cargada.', 
            'success'
        );
    }

    // Simula: protected void doPost(HttpServletRequest req, HttpServletResponse res)
    bindEvents() {
        this.elements.tacticalForm?.addEventListener('submit', (e) => this.handleAddTactic(e));
        this.elements.searchInput?.addEventListener('input', (e) => this.handleSearch(e));
        
        this.elements.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleTypeFilter(e));
        });
        
        this.elements.periodFilters.forEach(btn => {
            btn.addEventListener('click', (e) => this.handlePeriodFilter(e));
        });
        
        this.elements.sortSelect?.addEventListener('change', (e) => this.handleSort(e));
        this.elements.editForm?.addEventListener('submit', (e) => this.handleEditTactic(e));
        this.elements.closeEditModal?.addEventListener('click', () => this.closeEditModal());
        this.elements.cancelEdit?.addEventListener('click', () => this.closeEditModal());
        this.elements.closeDeleteModal?.addEventListener('click', () => this.closeDeleteModal());
        this.elements.cancelDelete?.addEventListener('click', () => this.closeDeleteModal());
        this.elements.confirmDelete?.addEventListener('click', () => this.handleDeleteTactic());

        window.addEventListener('click', (e) => {
            if (e.target === this.elements.editModal) this.closeEditModal();
            if (e.target === this.elements.deleteModal) this.closeDeleteModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeEditModal();
                this.closeDeleteModal();
            }
        });
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Simula: @PostMapping("/tactical/add")
    handleAddTactic(e) {
        e.preventDefault();

        const tacticData = {
            id: this.generateId(),
            nombre: this.elements.tacticName.value.trim(),
            descripcion: this.elements.tacticDescription.value.trim(),
            tipo: this.elements.tacticType.value,
            importancia: parseInt(this.elements.tacticImportance.value),
            periodo: this.elements.tacticPeriod.value,
            efectividad: this.elements.tacticEffectiveness.value,
            comandante: this.elements.tacticCommander.value.trim(),
            batalla: this.elements.tacticBattle.value.trim(),
            creadaEn: new Date().toISOString()
        };

        if (!tacticData.nombre || !tacticData.tipo || !tacticData.periodo) {
            this.showNotification('Error de Validación', 'Complete todos los campos requeridos.', 'error');
            return;
        }

        this.tactics.unshift(tacticData);
        this.saveTacticsToStorage();
        this.renderTactics();
        this.updateStats();
        this.elements.tacticalForm.reset();
        
        this.showNotification(
            'Táctica Registrada', 
            `"${tacticData.nombre}" agregada al catálogo militar.`, 
            'success'
        );
    }

    handleSearch(e) {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderTactics();
    }

    handleTypeFilter(e) {
        this.elements.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.dataset.filter;
        this.renderTactics();
    }

    handlePeriodFilter(e) {
        const period = e.target.dataset.period;
        
        if (this.currentPeriodFilter === period) {
            this.currentPeriodFilter = null;
            e.target.classList.remove('active');
        } else {
            this.elements.periodFilters.forEach(btn => btn.classList.remove('active'));
            this.currentPeriodFilter = period;
            e.target.classList.add('active');
        }
        
        this.renderTactics();
    }

    handleSort(e) {
        this.currentSort = e.target.value;
        this.renderTactics();
    }

    // Simula: SELECT * FROM tacticas WHERE ... (JPA Query)
    getFilteredTactics() {
        let filtered = [...this.tactics];

        // Filtro por tipo
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(t => t.tipo === this.currentFilter);
        }

        // Filtro por periodo
        if (this.currentPeriodFilter) {
            filtered = filtered.filter(t => t.periodo === this.currentPeriodFilter);
        }

        // Búsqueda
        if (this.searchQuery) {
            filtered = filtered.filter(t => 
                t.nombre.toLowerCase().includes(this.searchQuery) ||
                (t.descripcion && t.descripcion.toLowerCase().includes(this.searchQuery)) ||
                (t.comandante && t.comandante.toLowerCase().includes(this.searchQuery)) ||
                (t.batalla && t.batalla.toLowerCase().includes(this.searchQuery))
            );
        }

        return filtered;
    }

    sortTactics(tactics) {
        const sorted = [...tactics];

        switch (this.currentSort) {
            case 'date-desc':
                return sorted.sort((a, b) => new Date(b.creadaEn) - new Date(a.creadaEn));
            case 'importance':
                return sorted.sort((a, b) => b.importancia - a.importancia);
            case 'name':
                return sorted.sort((a, b) => a.nombre.localeCompare(b.nombre));
            case 'period':
                const periodOrder = { ANTIGUO: 1, MEDIEVAL: 2, MODERNO: 3, CONTEMPORANEO: 4 };
                return sorted.sort((a, b) => periodOrder[a.periodo] - periodOrder[b.periodo]);
            case 'effectiveness':
                const effOrder = { ALTA: 3, MEDIA: 2, BAJA: 1 };
                return sorted.sort((a, b) => effOrder[b.efectividad] - effOrder[a.efectividad]);
            default:
                return sorted;
        }
    }

    // Simula: <c:forEach var="tactica" items="${tacticas}">
    renderTactics() {
        const filtered = this.getFilteredTactics();
        const sorted = this.sortTactics(filtered);

        if (sorted.length === 0) {
            this.elements.tacticsContainer.innerHTML = '';
            this.elements.emptyState?.classList.remove('hidden');
        } else {
            this.elements.emptyState?.classList.add('hidden');
            this.elements.tacticsContainer.innerHTML = sorted.map(t => this.createTacticHTML(t)).join('');
        }
    }

    // Simula: ${tactica.nombre} - Expression Language
    createTacticHTML(tactic) {
        const typeIcons = {
            OFENSIVA: '⚔️',
            DEFENSIVA: '🛡️',
            MANIOBRA: '🔄',
            ASEDIO: '🏰',
            GUERRILLA: '🌲',
            NAVAL: '⚓'
        };

        const periodIcons = {
            ANTIGUO: '🏛️',
            MEDIEVAL: '⚔️',
            MODERNO: '🎖️',
            CONTEMPORANEO: '🚁'
        };

        const effBadges = {
            ALTA: '<span class="eff-badge high">✅ Alta Efectividad</span>',
            MEDIA: '<span class="eff-badge medium">⚠️ Media Efectividad</span>',
            BAJA: '<span class="eff-badge low">❌ Baja Efectividad</span>'
        };

        const stars = '⭐'.repeat(tactic.importancia);

        return `
            <div class="tactic-card type-${tactic.tipo.toLowerCase()}" data-tactic-id="${tactic.id}">
                <div class="tactic-header">
                    <h3 class="tactic-name">
                        ${typeIcons[tactic.tipo]} ${this.escapeHtml(tactic.nombre)}
                    </h3>
                    <div class="tactic-importance" title="Importancia Estratégica">
                        ${stars}
                    </div>
                </div>
                
                ${tactic.descripcion ? `<p class="tactic-description">${this.escapeHtml(tactic.descripcion)}</p>` : ''}
                
                <div class="tactic-meta">
                    <div class="meta-item">
                        <strong>Tipo:</strong> ${typeIcons[tactic.tipo]} ${tactic.tipo}
                    </div>
                    <div class="meta-item">
                        <strong>Periodo:</strong> ${periodIcons[tactic.periodo]} ${tactic.periodo}
                    </div>
                    <div class="meta-item">
                        ${effBadges[tactic.efectividad]}
                    </div>
                </div>
                
                ${tactic.comandante || tactic.batalla ? `
                    <div class="tactic-historical">
                        ${tactic.comandante ? `<div><strong>Comandante:</strong> ${this.escapeHtml(tactic.comandante)}</div>` : ''}
                        ${tactic.batalla ? `<div><strong>Batalla Notable:</strong> ${this.escapeHtml(tactic.batalla)}</div>` : ''}
                    </div>
                ` : ''}
                
                <div class="tactic-actions">
                    <button class="tactic-btn edit" onclick="tacticalManager.openEditModal('${tactic.id}')" title="Editar">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="tactic-btn delete" onclick="tacticalManager.openDeleteModal('${tactic.id}')" title="Eliminar">
                        <i class="fas fa-trash-alt"></i> Eliminar
                    </button>
                </div>
            </div>
        `;
    }

    openEditModal(tacticId) {
        const tactic = this.tactics.find(t => t.id === tacticId);
        if (!tactic) return;

        this.editingTacticId = tacticId;
        
        this.elements.editName.value = tactic.nombre;
        this.elements.editDescription.value = tactic.descripcion || '';
        this.elements.editType.value = tactic.tipo;
        this.elements.editImportance.value = tactic.importancia;
        this.elements.editPeriod.value = tactic.periodo;
        this.elements.editEffectiveness.value = tactic.efectividad;
        this.elements.editCommander.value = tactic.comandante || '';
        this.elements.editBattle.value = tactic.batalla || '';
        
        this.elements.editModal?.classList.add('show');
    }

    closeEditModal() {
        this.elements.editModal?.classList.remove('show');
        this.editingTacticId = null;
        this.elements.editForm?.reset();
    }

    handleEditTactic(e) {
        e.preventDefault();
        
        const tactic = this.tactics.find(t => t.id === this.editingTacticId);
        if (!tactic) return;

        tactic.nombre = this.elements.editName.value.trim();
        tactic.descripcion = this.elements.editDescription.value.trim();
        tactic.tipo = this.elements.editType.value;
        tactic.importancia = parseInt(this.elements.editImportance.value);
        tactic.periodo = this.elements.editPeriod.value;
        tactic.efectividad = this.elements.editEffectiveness.value;
        tactic.comandante = this.elements.editCommander.value.trim();
        tactic.batalla = this.elements.editBattle.value.trim();

        this.saveTacticsToStorage();
        this.renderTactics();
        this.closeEditModal();
        
        this.showNotification('Táctica Actualizada', `"${tactic.nombre}" modificada exitosamente.`, 'success');
    }

    openDeleteModal(tacticId) {
        this.deletingTacticId = tacticId;
        this.elements.deleteModal?.classList.add('show');
    }

    closeDeleteModal() {
        this.elements.deleteModal?.classList.remove('show');
        this.deletingTacticId = null;
    }

    handleDeleteTactic() {
        const index = this.tactics.findIndex(t => t.id === this.deletingTacticId);
        if (index === -1) return;

        const tactic = this.tactics[index];
        this.tactics.splice(index, 1);
        
        this.saveTacticsToStorage();
        this.renderTactics();
        this.updateStats();
        this.closeDeleteModal();
        
        this.showNotification('Táctica Eliminada', `"${tactic.nombre}" removida del catálogo.`, 'warning');
    }

    updateStats() {
        const total = this.tactics.length;
        const highImportance = this.tactics.filter(t => t.importancia >= 4).length;

        if (this.elements.totalTactics) this.elements.totalTactics.textContent = total;
        if (this.elements.highImportanceTactics) this.elements.highImportanceTactics.textContent = highImportance;
    }

    // Simula: JPA EntityManager.persist()
    saveTacticsToStorage() {
        try {
            localStorage.setItem('tactical_warfare_data', JSON.stringify(this.tactics));
        } catch (error) {
            console.error('Error al guardar:', error);
            this.showNotification('Error de Persistencia', 'No se pudo guardar en la base de datos.', 'error');
        }
    }

    // Simula: JPA EntityManager.find()
    loadTacticsFromStorage() {
        try {
            const saved = localStorage.getItem('tactical_warfare_data');
            if (saved) {
                this.tactics = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error al cargar:', error);
            this.tactics = [];
        }
    }

    showNotification(title, message, type = 'info', duration = 5000) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="${icons[type]}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${this.escapeHtml(title)}</div>
                <div class="notification-message">${this.escapeHtml(message)}</div>
            </div>
        `;

        this.elements.notificationsContainer?.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideInFromRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    escapeHtml(text) {
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return String(text).replace(/[&<>"']/g, m => map[m]);
    }

    // Datos de ejemplo
    loadSampleData() {
        if (this.tactics.length === 0) {
            this.tactics = [
                {
                    id: this.generateId(),
                    nombre: "Falange Macedonia",
                    descripcion: "Formación de infantería pesada en bloque compacto con lanzas largas (sarisas). Revolucionó la guerra antigua.",
                    tipo: "OFENSIVA",
                    importancia: 5,
                    periodo: "ANTIGUO",
                    efectividad: "ALTA",
                    comandante: "Alejandro Magno",
                    batalla: "Batalla de Gaugamela (331 a.C.)",
                    creadaEn: new Date('2024-01-15').toISOString()
                },
                {
                    id: this.generateId(),
                    nombre: "Blitzkrieg",
                    descripcion: "Guerra relámpago basada en rápidos movimientos de tanques y aviación para romper líneas enemigas.",
                    tipo: "OFENSIVA",
                    importancia: 5,
                    periodo: "MODERNO",
                    efectividad: "ALTA",
                    comandante: "Heinz Guderian",
                    batalla: "Invasión de Francia (1940)",
                    creadaEn: new Date('2024-02-10').toISOString()
                },
                {
                    id: this.generateId(),
                    nombre: "Guerrilla",
                    descripcion: "Táctica de guerra irregular con ataques sorpresa, emboscadas y retiradas rápidas contra fuerzas superiores.",
                    tipo: "GUERRILLA",
                    importancia: 4,
                    periodo: "CONTEMPORANEO",
                    efectividad: "ALTA",
                    comandante: "Che Guevara",
                    batalla: "Revolución Cubana (1953-1959)",
                    creadaEn: new Date('2024-03-05').toISOString()
                },
                {
                    id: this.generateId(),
                    nombre: "Tortuga Romana",
                    descripcion: "Formación defensiva donde los soldados crean una muralla de escudos cubriendo todos los lados.",
                    tipo: "DEFENSIVA",
                    importancia: 3,
                    periodo: "ANTIGUO",
                    efectividad: "ALTA",
                    comandante: "Legiones Romanas",
                    batalla: "Asedios diversos",
                    creadaEn: new Date('2024-04-01').toISOString()
                },
                {
                    id: this.generateId(),
                    nombre: "Pinza de Aníbal",
                    descripcion: "Maniobra envolvente que rodea al enemigo por ambos flancos simultáneamente, destruyendo su formación.",
                    tipo: "MANIOBRA",
                    importancia: 5,
                    periodo: "ANTIGUO",
                    efectividad: "ALTA",
                    comandante: "Aníbal Barca",
                    batalla: "Batalla de Cannae (216 a.C.)",
                    creadaEn: new Date('2024-05-12').toISOString()
                }
            ];
            this.saveTacticsToStorage();
        }
    }
}

// Inicializar la aplicación cuando el DOM esté listo
// Simula: ServletContextListener.contextInitialized()
let tacticalManager;

document.addEventListener('DOMContentLoaded', () => {
    tacticalManager = new TacticalWarfareManager();
    
    // Exponer globalmente para onclick handlers
    window.tacticalManager = tacticalManager;
    
    console.log('%c⚔️ Tactical Warfare System Initialized', 'color: #10b981; font-size: 16px; font-weight: bold;');
    console.log('%cSimulación de arquitectura JSP/Servlet activada', 'color: #6366f1;');
});
