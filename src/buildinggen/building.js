import { randomColor } from "../utils/colorutils";

const GRID_MIN = 1;
const GRID_SIZE = 20;
const MAX_ROOM_SIZE = 10;

class Room {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.w = Math.floor(Math.random() * MAX_ROOM_SIZE) + 1;
        this.h = Math.floor(Math.random() * MAX_ROOM_SIZE) + 1;
    }
}


class Building {
    constructor() {
        console.log('new building!');

        this._rooms = [];

        // start with a single room

        this._addRoom();
    }

    _addRoom() {
        const r = new Room();
        this._rooms.push(r);
    }

    draw(ctx) {
        ctx.save();
        ctx.scale(GRID_SIZE, GRID_SIZE);

        this._rooms.forEach(r => {
            ctx.save();
            ctx.translate(r.x, r.y);
            ctx.fillStyle = randomColor();
            ctx.fillRect(0, 0, r.w, r.h);
            
            ctx.restore();
        });

        ctx.restore();
    }
}

export default Building;