const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

const tileSize = 40;  // Taille d'une case dans le labyrinthe
let playerPosition = { x: 0, y: 0 };  // Position initiale du joueur
let maze = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
];

const finishPosition = { x: 9, y: 9 };  // Position de sortie

// Fonction pour dessiner le labyrinthe
function drawMaze() {
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 1) {
                ctx.fillStyle = '#333';
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            } else {
                ctx.fillStyle = '#fff';
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
    }
    // Dessine le joueur
    ctx.fillStyle = '#ff4500';
    ctx.fillRect(playerPosition.x * tileSize, playerPosition.y * tileSize, tileSize, tileSize);
}

// Déplace le joueur
function movePlayer(dx, dy) {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;
    if (newX >= 0 && newX < maze[0].length && newY >= 0 && newY < maze.length && maze[newY][newX] === 0) {
        playerPosition.x = newX;
        playerPosition.y = newY;
        drawMaze();
        checkWin();
    }
}

// Vérifie si le joueur a gagné
function checkWin() {
    if (playerPosition.x === finishPosition.x && playerPosition.y === finishPosition.y) {
        document.getElementById('gameCanvas').classList.add('hidden');
        document.getElementById('end-message').classList.remove('hidden');
    }
}

// Écoute les touches pour déplacer le joueur
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
            movePlayer(1, 0);
            break;
    }
});

// Redémarre le jeu
document.getElementById('restart-button').addEventListener('click', () => {
    playerPosition = { x: 0, y: 0 };
    document.getElementById('gameCanvas').classList.remove('hidden');
    document.getElementById('end-message').classList.add('hidden');
    drawMaze();
});

// Démarre le jeu en dessinant le labyrinthe
drawMaze();
