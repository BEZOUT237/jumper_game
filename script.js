const character = document.getElementById('character');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
let score = 0;
let isJumping = false;
let gameOver = false;

// Steph rappelle toi que ceci est la fonction de saut
document.addEventListener('keydown', () => {
    if (!isJumping && !gameOver) {
        jump();
    }
});

function jump() {
    isJumping = true;
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 150) {
            clearInterval(jumpInterval);
            const fallInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(fallInterval);
                    isJumping = false;
                }
                jumpHeight -= 10;
                character.style.bottom = jumpHeight + 'px';
            }, 20);
        }
        jumpHeight += 10;
        character.style.bottom = jumpHeight + 'px';
    }, 20);
}

// ici c'est la fonction pour réinitialiser le jeu
function resetGame() {
    score = 0;
    scoreDisplay.textContent = 'Score: ' + score;
    gameOver = false;
    obstacle.style.animation = 'none';
    obstacle.offsetHeight; // forcer un reflow
    obstacle.style.animation = null;
}

// et ici, la fonction pour afficher le message de fin de partie
function endGame() {
    gameOver = true;
    let appreciation = '';

    if (score < 50) {
        appreciation = 'Pas mal, continuez à pratiquer !';
    } else if (score < 100) {
        appreciation = 'Bien joué, vous vous améliorez !';
    } else {
        appreciation = 'Excellent, vous êtes un maître du jeu !';
    }

    alert(`Game Over! Votre score est de ${score}. ${appreciation}`);
    resetGame();
}

// Et enfin la vérification des collisions et mise à jour du score
const gameLoop = setInterval(() => {
    if (gameOver) return;

    const characterRect = character.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        characterRect.right > obstacleRect.left &&
        characterRect.left < obstacleRect.right &&
        characterRect.bottom > obstacleRect.top
    ) {
        endGame();
    } else {
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
    }
}, 100);
