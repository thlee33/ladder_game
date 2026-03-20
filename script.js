class LadderGame {
    constructor() {
        this.canvas = document.getElementById('ladder-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.containerTop = document.getElementById('participants-top');
        this.containerBottom = document.getElementById('participants-bottom');
        this.columnInput = document.getElementById('column-count');
        this.checkBtn = document.getElementById('check-result-btn');
        this.mysteryBox = document.getElementById('mystery-box');
        
        this.columns = 4;
        this.rows = 15;
        this.ladder = []; 
        this.resultsRevealed = false;
        
        // Vibrant neon palette for paths
        this.colors = [
            '#00d2ff', '#f032e6', '#32ff7e', '#ff9f1a', 
            '#7d5fff', '#ff5252', '#fff200', '#18dcff'
        ];

        this.init();
        this.addEventListeners();
    }

    init() {
        this.columns = parseInt(this.columnInput.value);
        this.resultsRevealed = false;
        this.mysteryBox.classList.remove('reveal');
        this.resizeCanvas();
        this.generateLadder();
        this.renderParticipants();
        this.drawLadder();
    }

    resizeCanvas() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width - 64; 
        this.canvas.height = Math.max(200, rect.height - 136); 
    }

    generateLadder() {
        this.ladder = Array.from({ length: this.rows }, () => Array(this.columns - 1).fill(false));
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns - 1; c++) {
                if (Math.random() > 0.6 && (c === 0 || !this.ladder[r][c - 1])) {
                    this.ladder[r][c] = true;
                }
            }
        }
    }

    renderParticipants() {
        this.containerTop.innerHTML = '';
        this.containerBottom.innerHTML = '';
        
        for (let i = 0; i < this.columns; i++) {
            const topDiv = document.createElement('div');
            topDiv.className = 'participant';
            topDiv.innerHTML = `<input type="text" value="P${i+1}"><span class="participant-start" style="background:${this.colors[i % this.colors.length]}" data-index="${i}"></span>`;
            
            const bottomDiv = document.createElement('div');
            bottomDiv.className = 'participant';
            bottomDiv.innerHTML = `<input type="text" value="결과 ${i+1}">`;
            
            this.containerTop.appendChild(topDiv);
            this.containerBottom.appendChild(bottomDiv);
        }
    }

    drawLadder(highlightPaths = []) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const spacing = this.canvas.width / (this.columns - 1);
        const rowHeight = this.canvas.height / this.rows;

        // Draw vertical lines
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        this.ctx.lineWidth = 4;
        this.ctx.lineCap = 'round';

        for (let i = 0; i < this.columns; i++) {
            const x = i * spacing;
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        // Draw rungs
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns - 1; c++) {
                if (this.ladder[r][c]) {
                    const x = c * spacing;
                    const y = (r + 0.5) * rowHeight;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y);
                    this.ctx.lineTo(x + spacing, y);
                    this.ctx.stroke();
                }
            }
        }

        if (highlightPaths.length > 0) {
            highlightPaths.forEach((pathObj, idx) => {
                this.drawPath(pathObj.path, this.colors[idx % this.colors.length]);
            });
        }
    }

    drawPath(path, color) {
        const spacing = this.canvas.width / (this.columns - 1);
        const rowHeight = this.canvas.height / this.rows;

        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 5;
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = color;
        this.ctx.globalAlpha = 0.8;

        this.ctx.beginPath();
        this.ctx.moveTo(path[0].col * spacing, 0);
        
        for (let i = 1; i < path.length; i++) {
            const p = path[i];
            this.ctx.lineTo(p.col * spacing, (p.row) * rowHeight);
        }
        
        const last = path[path.length - 1];
        this.ctx.lineTo(last.col * spacing, this.canvas.height);
        this.ctx.stroke();
        
        this.ctx.shadowBlur = 0;
        this.ctx.globalAlpha = 1.0;
    }

    calculatePath(startIndex) {
        let currentCol = parseInt(startIndex);
        let path = [{ row: 0, col: currentCol }];

        for (let r = 0; r < this.rows; r++) {
            let moveY = (r + 0.5);
            path.push({ row: moveY, col: currentCol });

            if (currentCol > 0 && this.ladder[r][currentCol - 1]) {
                currentCol--;
            } else if (currentCol < this.columns - 1 && this.ladder[r][currentCol]) {
                currentCol++;
            }
            path.push({ row: moveY, col: currentCol });
        }
        return { path, finalCol: currentCol, color: this.colors[startIndex % this.colors.length] };
    }

    revealAll() {
        this.resultsRevealed = true;
        this.mysteryBox.classList.add('reveal');
        
        const allPaths = [];
        for (let i = 0; i < this.columns; i++) {
            allPaths.push(this.calculatePath(i));
        }
        
        this.drawLadder(allPaths);
    }

    addEventListeners() {
        document.getElementById('reset-btn').addEventListener('click', () => this.init());
        this.checkBtn.addEventListener('click', () => this.revealAll());
        
        document.getElementById('close-result').addEventListener('click', () => {
            document.getElementById('result-overlay').classList.add('hidden');
        });

        this.containerTop.addEventListener('click', (e) => {
            if (e.target.classList.contains('participant-start')) {
                // Individual reveal: use specific color
                const index = parseInt(e.target.dataset.index);
                const result = this.calculatePath(index);
                this.drawLadder([result]);
            }
        });

        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.drawLadder();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LadderGame();
});
