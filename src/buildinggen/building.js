import { randomColor } from "../utils/colorutils";

// const GRID_MIN = 1;
const GRID_SIZE = 10;
const MAX_ROOM_SIZE = 10;

const N = 0;
const E = 1;
const S = 2;
const W = 3;

// const isVert = (n) => (n % 2) === 0;
// const isHorz = (n) => (n % 2) === 1;
const pickSide = () => {
    return (
        (Math.random() > 0.5 ? 0 : 2) +
        (Math.random() > 0.5 ? 0 : 1)
    )
}

const randPos = (currMin, currMax, extents) => {
    const newMin = currMin - extents + 1;
    const newMax = currMax - 1;
    const result = (Math.floor(Math.random() * (newMax-newMin))) + newMin; 
    return result;
}

class Room {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.w = Math.floor(Math.random() * MAX_ROOM_SIZE) + 2;
        this.h = Math.floor(Math.random() * MAX_ROOM_SIZE) + 2;
        this.order = 0;
    }
}

class Extent {
    constructor(p, mn, mx) {
        this.pos = p || 0;
        this.rMin = mn || 0;
        this.rMax = mx || 0; 
    }
}

class Building {
    constructor() {
        console.log('new building!');

        this._rooms = [];
        this.w = 0;
        this.h = 0;
        this.edges = [
            new Extent(),
            new Extent(),
            new Extent(),
            new Extent()
        ];

        this.minPos = [0,0];
        this.maxPos = [0,0];
    
        while (!this._finished) {
            this._addRoom();
        }
        this._finalize();
    }

    get _finished() {
        return (this._rooms.length >= 7);
    }

    _addRoom() {
        const r = new Room();
        r.order = this._rooms.length;

        if (this._rooms.length < 1) {
            this.edges[N] = new Extent(r.h, 0, r.w);
            this.edges[E] = new Extent(r.w, 0, r.h);
            this.edges[S] = new Extent(0, 0, r.w);
            this.edges[W] = new Extent(0, 0, r.h);
            
        } else {
            switch (pickSide()) {
                case N:
                    r.y = this.edges[N].pos;
                    r.x = randPos(this.edges[N].rMin, this.edges[N].rMax, r.w);
                    this.edges[N].pos += r.h;
                    
                    this.edges[N].rMin = r.x;
                    this.edges[N].rMax = r.x + r.w;

                    this.edges[W].pos = Math.min(this.edges[W].pos, r.x);
                    this.edges[E].pos = Math.max(this.edges[E].pos, r.x + r.w);
                    
                    break;
                case E:
                    r.x = this.edges[E].pos;
                    r.y = randPos(this.edges[E].rMin, this.edges[E].rMax, r.h);
                    this.edges[E].pos += r.w;
                    
                    this.edges[E].rMin = r.y;
                    this.edges[E].rMax = r.y + r.h;

                    this.edges[S].pos = Math.min(this.edges[S].pos, r.y);
                    this.edges[N].pos = Math.max(this.edges[N].pos, r.y + r.h);
                    break;
                case S:
                    r.y = this.edges[S].pos - r.h;
                    r.x = randPos(this.edges[S].rMin, this.edges[S].rMax, r.w);
                    this.edges[S].pos -= r.h;
                    this.h += r.h;
                    
                    this.edges[S].rMin = r.x;
                    this.edges[S].rMax = r.x + r.w;

                    this.edges[W].pos = Math.min(this.edges[W].pos, r.x);
                    this.edges[E].pos = Math.max(this.edges[E].pos, r.x + r.w);
                    break;
                case W:
                    r.x = this.edges[W].pos - r.w;
                    r.y = randPos(this.edges[W].rMin, this.edges[W].rMax, r.h);
                    this.edges[W].pos -= r.w;
                    
                    this.edges[W].rMin = r.y;
                    this.edges[W].rMax = r.y + r.h;

                    this.edges[S].pos = Math.min(this.edges[S].pos, r.y);
                    this.edges[N].pos = Math.max(this.edges[N].pos, r.y + r.h);
                    break;
                default:
                    break;
            }
    
        }

        this.minPos = [Math.min(this.minPos[0], r.x), Math.min(this.minPos[1], r.y)];
        this.maxPos = [Math.max(this.maxPos[0], r.x+r.w), Math.max(this.maxPos[0], r.y+r.h)];

        this._rooms.push(r);
    }

    _finalize() {
        console.log(this);
        this.w = this.edges[E] - this.edges[W];
        this.h = this.edges[N] - this.edges[S];
    }

    draw(ctx) {
        ctx.save();
        
        ctx.translate(-this.minPos[0] * GRID_SIZE, -this.minPos[1] * GRID_SIZE);
        
        this._rooms.forEach(r => {
            ctx.save();
            ctx.translate(r.x * GRID_SIZE, r.y * GRID_SIZE);
            ctx.fillStyle = randomColor();
            ctx.fillRect(0, 0, r.w * GRID_SIZE, r.h * GRID_SIZE);
            ctx.strokeRect(0, 0, r.w * GRID_SIZE, r.h * GRID_SIZE);
            ctx.restore();
        });

        ctx.restore();
    }
}

export default Building;