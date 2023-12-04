class Block {
    static SIZE = 25;

    constructor(x, y, color) {
        this.x = x + GAME_OFFSET;
        this.y = y + GAME_OFFSET;
        this.color = color;
    }

    draw() {
        fill(this.color);

        rect(this.x * Block.SIZE, this.y * Block.SIZE, Block.SIZE, Block.SIZE);
    }

    static checkCollision(x, y) {
        return Block.checkBorderCollision(x, y) || Block.checkBlockCollision(x, y, blocks);
    }

    static checkBorderCollision(x, y) {
        return x < GAME_OFFSET || x > TETRIS_WIDTH + GAME_OFFSET - 1 || y > TETRIS_HEIGHT + GAME_OFFSET - 1;
    }

    static checkBlockCollision(x, y, blocks) {
        const key = blockKey(x, y);
        return blocks[key] !== undefined;
    }
}