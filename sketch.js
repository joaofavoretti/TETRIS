

/* TODO: Dont like that being global... */
let movingTetromino;
let nextMovingTetromino;
let blocks = {};
let borderBlocks = {};
let TETRIS_WIDTH;
let TETRIS_HEIGHT;
let GAME_OFFSET;
const TETROMINOS = [O, I, T, S, Z, J, L];

function createRandomTetromino() {
    return new TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)](5, 0);
}

function setup() {
    TETRIS_WIDTH = 10;
    TETRIS_HEIGHT = 20;
    GAME_OFFSET = 1;
    
    createCanvas((TETRIS_WIDTH + 2) * Block.SIZE, (TETRIS_HEIGHT + 2) * Block.SIZE);

    createBorderBlocks();

    movingTetromino = createRandomTetromino();
    nextMovingTetromino = createRandomTetromino();
}

function createBorderBlocks() {
    borderColor = color(100, 100, 100);

    for (let x = 0; x < TETRIS_WIDTH + 2; x++) {
        borderBlocks[blockKey(x - GAME_OFFSET, 0 - GAME_OFFSET)] = new Block(x - GAME_OFFSET, 0 - GAME_OFFSET, borderColor);
        borderBlocks[blockKey(x - GAME_OFFSET, TETRIS_HEIGHT + 1 - GAME_OFFSET)] = new Block(x - GAME_OFFSET, TETRIS_HEIGHT + 1 - GAME_OFFSET, borderColor);
    }

    for (let y = 0; y < TETRIS_HEIGHT + 2; y++) {
        borderBlocks[blockKey(0 - GAME_OFFSET, y - GAME_OFFSET)] = new Block(0 - GAME_OFFSET, y - GAME_OFFSET, borderColor);
        borderBlocks[blockKey(TETRIS_WIDTH + 1 - GAME_OFFSET, y - GAME_OFFSET)] = new Block(TETRIS_WIDTH + 1 - GAME_OFFSET, y - GAME_OFFSET, borderColor);
    }   
}

function draw() {
    background(0);

    drawBackground();

    drawBorder();

    drawBlocks();

    moveTetromino();
}

function blockKey(x, y) { return `${x},${y}`; }

function drawBorder() {
    for (let block of Object.values(borderBlocks)) {
        block.draw();
    }
}

function drawBackground() {
    fill(220);
    rect(0, 0, (TETRIS_WIDTH + 2) * Block.SIZE, (TETRIS_HEIGHT + 2) * Block.SIZE);
}

function drawBlocks() {
    movingTetromino.draw();

    for (let block of Object.values(blocks)) {
        block.draw();
    }
}

function moveTetromino() {
    if (movingTetromino.step()) {
        spawnNewTetromino();
    }
}

function spawnNewTetromino() {
    for (let block of movingTetromino.blocks) {
        blocks[blockKey(block.x, block.y)] = block;
    }

    checkLineCompleted();

    movingTetromino = nextMovingTetromino;

    nextMovingTetromino = createRandomTetromino();

    if (Tetromino.checkCollision(movingTetromino.blocks.map(block => ({x: block.x, y: block.y})))) {
        drawGameOver();
        noLoop();
    }
}

function drawGameOver() {
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER); // Add this line to center the text horizontally
    
    text("Game Over!", width / 2, height / 2); // Center the text vertically and horizontally
}

function checkLineCompleted() {
    const lineMap = {};

    for (let block of Object.values(blocks)) {
        if (lineMap[block.y] === undefined) {
            lineMap[block.y] = 0;
        }
        lineMap[block.y] += 1;
    }

    for (let [y, count] of Object.entries(lineMap)) {
        if (count === TETRIS_WIDTH) {
            deleteLine(y);
        }
    }
}

function deleteLine(y) {
    for (let x = 0; x < TETRIS_WIDTH; x++) {
        delete blocks[blockKey(x, y)];
    }

    // Move down all blocks above
    for (let block of Object.values(blocks)) {
        if (block.y < y) {
            block.y += 1;
            blocks[blockKey(block.x, block.y)] = block;
            delete blocks[blockKey(block.x, block.y - 1)];
        }
    }
}

function keyPressed() {
    if (movingTetromino.move(keyCode)) {
        spawnNewTetromino();
    }
}