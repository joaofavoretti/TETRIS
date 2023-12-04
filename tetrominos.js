class Tetromino {
    static MOVE_INTERVAL = 500; // 0.5 sec

    constructor(x, y) {
        // Tetromino Rectangle Center
        this.x = x;
        this.y = y;

        this.blocks = [];

        this.lastMoveTime = millis();
    }
    
    draw() {
        for (let block of this.blocks) {
            block.draw();
        }
    }

    static checkCollision(tetrominoBlocks) {
        return Tetromino.checkBorderCollision(tetrominoBlocks) || Tetromino.checkBlockCollision(tetrominoBlocks);
    }

    static checkBorderCollision(tetrominoBlocks) {
        for (let block of tetrominoBlocks) {
            if (Block.checkBorderCollision(block.x, block.y)) {
                return true;
            }
        }
        return false;
    }

    static checkBlockCollision(tetrominoBlocks) {
        for (let block of tetrominoBlocks) {
            if (Block.checkBlockCollision(block.x, block.y, blocks)) {
                return true;
            }
        }
        return false;
    }

    move(keyCode) {

        function moveDown(tetrominoBlocks) {
            while(!Tetromino.checkCollision(tetrominoBlocks)) {
                tetrominoBlocks = tetrominoBlocks.map(block => ({x: block.x, y: block.y + 1}));
            }
            return tetrominoBlocks.map(block => ({x: block.x, y: block.y - 1}));
        }

        const moveMap = {
            [DOWN_ARROW]: (tetrominoBlocks) => moveDown(tetrominoBlocks),
            [LEFT_ARROW]: (tetrominoBlocks) => tetrominoBlocks.map(block => ({x: block.x - 1, y: block.y})),
            [RIGHT_ARROW]: (tetrominoBlocks) => tetrominoBlocks.map(block => ({x: block.x + 1, y: block.y}))
            
        };

        const move = moveMap[keyCode];
        if (move) {
            const newBlocks = move(this.blocks);
            if (Tetromino.checkCollision(newBlocks)) {
                return keyCode === DOWN_ARROW;
                // return true;
            }
            
            for (let i = 0; i < this.blocks.length; i++) {
                this.blocks[i].x = newBlocks[i].x;
                this.blocks[i].y = newBlocks[i].y;
            }
        }

        return false;
    }

    step() {
        // Check if it's time to move the block down
        if (millis() - this.lastMoveTime >= Tetromino.MOVE_INTERVAL) {
            this.lastMoveTime = millis();
            
            if (Tetromino.checkCollision(this.blocks.map(block => ({x: block.x, y: block.y + 1})))) {
                return true;
            }
            
            for (let block of this.blocks) {
                block.y += 1;
            }
        }
        
        return false;
    }

}

class O extends Tetromino {
    constructor(x, y) {
        super();
        this.blocks = [
            new Block(x, y, color(255, 255, 0)),
            new Block(x + 1, y, color(255, 255, 0)),
            new Block(x, y + 1, color(255, 255, 0)),
            new Block(x + 1, y + 1, color(255, 255, 0)),
        ];
    }

}

class I extends Tetromino {
    constructor(x, y) {
        super();
        this.blocks = [
            new Block(x, y, color(0, 255, 255)),
            new Block(x, y + 1, color(0, 255, 255)),
            new Block(x, y + 2, color(0, 255, 255)),
            new Block(x, y + 3, color(0, 255, 255)),
        ];
    }
}

class T extends Tetromino {
    constructor(x, y) {
        super();
        this.blocks = [
            new Block(x, y, color(255, 0, 255)),
            new Block(x - 1, y, color(255, 0, 255)),
            new Block(x + 1, y, color(255, 0, 255)),
            new Block(x, y + 1, color(255, 0, 255)),
        ];
    }
}

class S extends Tetromino {
    constructor(x, y) {
        super();
        this.blocks = [
            new Block(x, y, color(0, 255, 0)),
            new Block(x + 1, y, color(0, 255, 0)),
            new Block(x, y + 1, color(0, 255, 0)),
            new Block(x - 1, y + 1, color(0, 255, 0)),
        ];
    }
}

class Z extends Tetromino {
    constructor(x, y) {
        super();
        this.blocks = [
            new Block(x, y, color(255, 0, 0)),
            new Block(x - 1, y, color(255, 0, 0)),
            new Block(x, y + 1, color(255, 0, 0)),
            new Block(x + 1, y + 1, color(255, 0, 0)),
        ];
    }
}

class J extends Tetromino {
    constructor(x, y) {
        super();
        this.blocks = [
            new Block(x, y, color(0, 0, 255)),
            new Block(x, y + 1, color(0, 0, 255)),
            new Block(x, y + 2, color(0, 0, 255)),
            new Block(x - 1, y + 2, color(0, 0, 255)),
        ];
    }
}

class L extends Tetromino {
    constructor(x, y) {
        super();
        this.blocks = [
            new Block(x, y, color(255, 165, 0)),
            new Block(x, y + 1, color(255, 165, 0)),
            new Block(x, y + 2, color(255, 165, 0)),
            new Block(x + 1, y + 2, color(255, 165, 0)),
        ];
    }
}