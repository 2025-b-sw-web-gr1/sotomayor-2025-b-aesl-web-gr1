// Parse CSV Data
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    
    // Skip header and map rows
    return lines.slice(1).map(line => {
        // Handle quotes in CSV (basic implementation to handle commas inside quotes)
        const parts = [];
        let current = '';
        let inQuotes = false;
        
        for (let char of line) {
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                parts.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        parts.push(current);

        // Expected format: NombreApellido,NotaPrimerBimestre,NotaSegundoBimestre,NotaTotal,ComentarioEstudiante
        // Ensure we handle potential whitespace or missing values gracefully
        return {
            nombre: parts[0] ? parts[0].trim() : "Desconocido",
            nota1: parseFloat(parts[1]),
            nota2: parseFloat(parts[2]),
            notaTotal: parseFloat(parts[3]),
            comentario: parts[4] ? parts[4].replace(/"/g, '').trim() : ''
        };
    }).filter(item => !isNaN(item.nota1)); // Filter out empty lines or parse errors
}

// Sentiment Analysis Keyword Logic
function analyzeSentiment(text) {
    if (!text) return 'Neutral';
    const lowerText = text.toLowerCase();
    
    // Keywords priority: check stronger sentiments first
    if (lowerText.includes('excelente') || lowerText.includes('encantó') || lowerText.includes('perfecto') || lowerText.includes('aprendí bastante') || lowerText.includes('aprendí mucho')) return 'Excelente';
    if (lowerText.includes('muy buena') || lowerText.includes('muy bueno') || lowerText.includes('gran')) return 'Muy Bueno';
    if (lowerText.includes('buena') || lowerText.includes('bueno') || lowerText.includes('interesante') || lowerText.includes('agradó') || lowerText.includes('gustó')) return 'Bueno';
    if (lowerText.includes('pésimo') || lowerText.includes('confuso') || lowerText.includes('no entendí')) return 'Pésimo';
    if (lowerText.includes('malo') || lowerText.includes('no me gustó') || lowerText.includes('aburrida') || lowerText.includes('no me agrada')) return 'Malo';
    if (lowerText.includes('regular') || lowerText.includes('nada especial') || lowerText.includes('podría mejorar') || lowerText.includes('normal')) return 'Normal';
    
    return 'Neutral'; 
}

// Calculate Statistics (Media, Mediana, Moda)
function getStats(data) {
    // Media (Mean)
    const totalSum = data.reduce((sum, d) => sum + d.notaTotal, 0);
    const mean = totalSum / data.length;
    
    // Mediana (Median)
    const sortedTotals = data.map(d => d.notaTotal).sort((a, b) => a - b);
    const mid = Math.floor(sortedTotals.length / 2);
    const median = sortedTotals.length % 2 !== 0 
        ? sortedTotals[mid] 
        : (sortedTotals[mid - 1] + sortedTotals[mid]) / 2;
    
    // Moda (Mode)
    const counts = {};
    sortedTotals.forEach(n => counts[n] = (counts[n] || 0) + 1);
    
    let maxCount = 0;
    let mode = [];
    for (let n in counts) {
        if (counts[n] > maxCount) {
            maxCount = counts[n];
            mode = [n];
        } else if (counts[n] === maxCount) {
            mode.push(n);
        }
    }
    
    return {
        mean: mean.toFixed(2),
        median: median.toFixed(2),
        mode: mode.join(', ') // In case of displaying multiple modes
    };
}

// Main Logic to populate UI
function initializeApp(students) {
    // 1. Calculations & Table Populating
    const tableBody = document.querySelector('#studentsTable tbody');
    if (!tableBody) return;
    tableBody.innerHTML = ''; // Clear existing rows if any

    let categories = {
        'Excelente': 0, 'Muy Bueno': 0, 'Bueno': 0, 'Normal': 0, 'Malo': 0, 'Pésimo': 0, 'Neutral': 0
    };

    // Variables for Extremes
    let maxBim1 = -Infinity, minBim1 = Infinity;
    let maxBim2 = -Infinity, minBim2 = Infinity;
    let maxTotal = -Infinity, minTotal = Infinity;

    students.forEach(student => {
        // Extremes logic
        if (student.nota1 > maxBim1) maxBim1 = student.nota1;
        if (student.nota1 < minBim1) minBim1 = student.nota1;
        if (student.nota2 > maxBim2) maxBim2 = student.nota2;
        if (student.nota2 < minBim2) minBim2 = student.nota2;
        if (student.notaTotal > maxTotal) maxTotal = student.notaTotal;
        if (student.notaTotal < minTotal) minTotal = student.notaTotal;

        // Custom Calcs requested: Promedio & Percentage
        const average = (student.nota1 + student.nota2) / 2;
        const percentage = (student.notaTotal / 20) * 100;
        
        // Sentiment
        const sentiment = analyzeSentiment(student.comentario);
        if (categories[sentiment] !== undefined) {
             categories[sentiment]++;
        } else {
             // Fallback if category name mismatches slightly
             categories['Neutral']++;
        }

        // Create Table Row
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.nombre}</td>
            <td>${student.nota1}</td>
            <td>${student.nota2}</td>
            <td>${average.toFixed(1)}</td>
            <td>${percentage.toFixed(0)}%</td>
            <td><small>${student.comentario ? student.comentario.substring(0, 60) + (student.comentario.length > 60 ? '...' : '') : ''}</small></td>
            <td><span class="badge ${sentiment.toLowerCase().replace(' ', '-')}">${sentiment}</span></td>
        `;
        tableBody.appendChild(row);
    });

    // 2. Display Stats
    const stats = getStats(students);
    document.getElementById('media').textContent = stats.mean;
    document.getElementById('mediana').textContent = stats.median;
    document.getElementById('moda').textContent = stats.mode;

    // 3. Display Extremes
    document.getElementById('maxBim1').textContent = maxBim1;
    document.getElementById('minBim1').textContent = minBim1;
    document.getElementById('maxBim2').textContent = maxBim2;
    document.getElementById('minBim2').textContent = minBim2;
    document.getElementById('maxTotal').textContent = maxTotal;
    document.getElementById('minTotal').textContent = minTotal;

    // 4. Render Chart
    renderChart(categories);
}

function renderChart(categories) {
    const ctx = document.getElementById('sentimentChart');
    if (!ctx) return;

    // Prepare data
    const labels = Object.keys(categories).filter(k => categories[k] > 0);
    const data = labels.map(k => categories[k]);
    
    // Colors matching sentiment
    const colorMap = {
        'Excelente': '#28a745', // Green
        'Muy Bueno': '#5cb85c',
        'Bueno': '#5bc0de',     // Blue-ish
        'Normal': '#ffc107',    // Yellow
        'Malo': '#f0ad4e',      // Orange
        'Pésimo': '#d9534f',    // Red
        'Neutral': '#6c757d'    // Grey
    };
    const bgColors = labels.map(l => colorMap[l] || '#ccc');

    // Destroy existing chart if it exists (to avoid duplicates on reload)
    if (window.myPieChart) {
        window.myPieChart.destroy();
    }

    window.myPieChart = new Chart(ctx.getContext('2d'), {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: bgColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 20
                    }
                },
                title: {
                    display: true,
                    text: 'Distribución de Sentimientos'
                }
            }
        }
    });
}

// Fetch Logic
document.addEventListener('DOMContentLoaded', () => {
    // Attempt to fetch locally
    fetch('data.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.text();
        })
        .then(csvText => {
            const students = parseCSV(csvText);
            initializeApp(students);
        })
        .catch(error => {
            console.error("Error loading CSV:", error);
            const container = document.querySelector('.container');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-banner';
            errorDiv.style.cssText = "background: #f8d7da; color: #721c24; padding: 15px; margin-bottom: 20px; border-radius: 5px; border: 1px solid #f5c6cb;";
            errorDiv.innerHTML = `
                <h3>⚠️ No se pudieron cargar los datos</h3>
                <p>Parece que estás abriendo el archivo <code>index.html</code> directamente desde tu carpeta (protocolo <code>file://</code>).</p>
                <p>Por seguridad, los navegadores bloquean la lectura de archivos locales externos (CORS).</p>
                <p><strong>Para ver los resultados:</strong></p>
                <ol>
                    <li>Usa la extensión <strong>"Live Server"</strong> en VS Code.</li>
                    <li>O corre un servidor simple con Python en la carpeta: <code>python -m http.server</code></li>
                </ol>
            `;
            const header = document.querySelector('header');
            if(header && header.parentNode) {
                header.parentNode.insertBefore(errorDiv, header.nextSibling);
            }
        });
});