import { randomColor } from "../utils/colorutils";

// const GRID_MIN = 1;
const GRID_SIZE = 10;
const MAX_ROOM_SIZE = 15;

const N = 0;
const E = 1;
const S = 2;
const W = 3;

const WALL_NONE = 0;
const WALL_EXT = 1;
const WALL_INTERIOR = 2;

const OBJ_NONE = 0;
const OBJ_DOOR_EXT = 1;
const OBJ_WINDOW = 2;
// const OBJ_DOOR_INT = 3;

const WINDOW_CHANCE = 0.3;

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
        this.id = -1;
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
        return (this._rooms.length >= 5);
    }

    _addRoom() {
        const r = new Room();
        r.id = this._rooms.length;

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
        this.maxPos = [Math.max(this.maxPos[0], r.x+r.w), Math.max(this.maxPos[1], r.y+r.h)];
        
        this._rooms.push(r);
    }

    _finalize() {
        console.log(this);
        this.w = this.maxPos[0] - this.minPos[0];
        this.h = this.maxPos[1] - this.minPos[1];

        this.contents = [];
        for (let i=0; i < this.h; i++) {
            // contents.push([]);
            this.contents.push(Array(this.w).fill(-1));
        }

        // console.log(this.contents.length, this.h);
        // console.log(this.contents[0].length, this.w);

        const stripsH = Array.from(Array(this.h), () => {
            return {
                spans: []    
            }
        });
        const stripsV = Array.from(Array(this.w), () => {
            return {
                spans: []
            }
        });

        const offsetX = this.minPos[0] === 0 ? 0 : -this.minPos[0];
        const offsetY = this.minPos[1] === 0 ? 0 : -this.minPos[1];

        this._rooms.forEach(r => {
            // correct negative positions
            r.x += offsetX;
            r.y += offsetY;

            for (let x=0; x < r.w; x++) {
                stripsV[r.x+x].spans.push({
                    start: r.y,
                    end: r.y + r.h,
                    id: r.id
                });

               for (let y=0; y < r.h; y++) {
                    if (x===0) {
                        stripsH[r.y+y].spans.push({
                            start: r.x,
                            end: r.x + r.w,
                            id: r.id
                        });        
                    }

                    // mark cells
                    this.contents[y+r.y][x+r.x] = r.id;
               }
            }
        });
    
        const spanSort = (sA, sB) => {
            if (sA.start < sB.start) return -1;
            if (sA.start > sB.start) return 1;
            return 0;
        }

        const markRooms = (start, end, pos, isHoriz) => {
            // console.log('filling in: ', start, end, pos);
            if (isHoriz) {
                for (let i=0; i < end-start; i++) {
                    this.contents[pos][start+i] = 128;
                }
            } else {
                for (let i=0; i < end-start; i++) {
                    this.contents[start+i][pos] = 128;
                }
            }
        }

        stripsH.forEach((hs, spanIdx) => {
            if (hs.spans.length > 1) {
                hs.spans.sort(spanSort);
                for (let i=1; i<hs.spans.length; i++) {
                    const start = hs.spans[i-1].end;
                    const end = hs.spans[i].start;
                    if (end-start > 0) {
                        markRooms(start, end, spanIdx, true);
                    }
                }
            }
        });

        stripsV.forEach((hs, spanIdx) => {
            if (hs.spans.length > 1) {
                hs.spans.sort(spanSort);
                for (let i=1; i<hs.spans.length; i++) {
                    const start = hs.spans[i-1].end;
                    const end = hs.spans[i].start;
                    if (end-start > 0) {
                        markRooms(start, end, spanIdx, false);
                    }
                }
            }
        });

        const safeGetCell = (x, y) => {
            if (x < 0 || x >= this.w) return -1;
            if (y < 0 || y >= this.h) return -1;
            return this.contents[y][x];
        }

        const getWallType = (x1, y1, x2, y2) => {
            const curr = safeGetCell(x1, y1);
            const compare = safeGetCell(x2, y2);
            console.log(x1, y1, x2, y2, '|', curr, compare)
            if (curr === compare) {
                return WALL_NONE;
            }
            if ((curr !== -1) && (compare !== -1)) {
                return WALL_INTERIOR;
            }
            return WALL_EXT;
        }

        /*
        const getRooms = (x1, y1, x2, y2) => {
            return [safeGetCell(x1, y1), safeGetCell(x2, y2)];
        }

        let lastHDiv = null;
        const roomDivHash = (id1, id2) => {
            if (id1 < id2) {
                return id1 + '_' + id2;
            }
            return id2 + '_' + id1;
        }
        */

        // gen walls
        this.walls = {
            exterior: [],
            interior: []
        };
        



        for (let y=0; y < this.h+1; y++) {
            for (let x=0; x < this.w+1; x++) {
                
                const hWall = getWallType(x, y, x, y-1);
                
                if (hWall !== WALL_NONE) {
                    const w = {
                        x: x,
                        y: y,
                        v: 0,
                        t: hWall,
                        obj: OBJ_NONE
                    }
                    if (hWall === WALL_EXT) {
                        if (Math.random() < WINDOW_CHANCE) {
                            w.obj = OBJ_WINDOW; 
                        }
                        this.walls.exterior.push(w);
                    } else {
                        this.walls.interior.push(w);
                    }
                }
                
                const vWall = getWallType(x, y, x-1, y);
                if (vWall !== WALL_NONE) {
                    const w = {
                        x: x,
                        y: y,
                        v: 1,
                        t: vWall,
                        obj: -1
                    }
                    if (vWall === WALL_EXT) {
                        if (Math.random() < WINDOW_CHANCE) {
                            w.obj = OBJ_WINDOW; 
                        }
                        this.walls.exterior.push(w);
                    } else {
                        this.walls.interior.push(w);
                    }
                }
            }
        }

        // add some doors. I considered using a Fischer-Yates shuffle
        // then selecting the first N locations, but this is quicker, and
        // actually better, I think. Since similar indices are near each other,
        // selecting randomly from different spans of the list spreads the doors
        // out around the building better than a shuffle would, and is O(num doors)
        // instead of O(num exterior walls)
        const numDoors = 3;
        for (let i=0; i < numDoors; i++) {
            const wallRange = Math.floor(this.walls.exterior.length / numDoors);
            let wallIdx = Math.floor(Math.random() * wallRange);
            wallIdx += wallRange * i;
            this.walls.exterior[wallIdx].obj = OBJ_DOOR_EXT;    
        }

    }

    draw(ctx) {
        ctx.clearRect(0, 0, 500, 500);
        ctx.fillStyle = "#FFF";
        ctx.fillRect(0, 0, 500, 500);

        ctx.save();
        
        // ctx.translate(-this.minPos[0] * GRID_SIZE, -this.minPos[1] * GRID_SIZE);
        
        const colors = [];
        // colors[128] = "#F00";
        
        ctx.strokeStyle = "#AAA";

        console.table(this.contents);

        for (let i=0; i < this.h; i++) {
            for (let j=0; j < this.w; j++) {

                const rID = this.contents[i][j];
                if (rID === -1) {
                    ctx.strokeRect(j*GRID_SIZE, i*GRID_SIZE, GRID_SIZE, GRID_SIZE);
                } else {
                    if (!colors[rID]) {
                        colors[rID] = randomColor();
                    }

                    ctx.fillStyle = colors[rID];
                    ctx.fillRect(j*GRID_SIZE, i*GRID_SIZE, GRID_SIZE, GRID_SIZE);
                }
            }
        }

        ctx.save();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#F00";
        this.walls.exterior.forEach((w,i) => {
                ctx.moveTo(w.x * GRID_SIZE, w.y * GRID_SIZE);
                const end = w.v ? {x: w.x, y: w.y+1} : {x: w.x+1, y: w.y};
                ctx.lineTo(end.x * GRID_SIZE, end.y * GRID_SIZE);
        });
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000";
        this.walls.interior.forEach((w,i) => {                        
                ctx.moveTo(w.x * GRID_SIZE, w.y * GRID_SIZE);
                const end = w.v ? {x: w.x, y: w.y+1} : {x: w.x+1, y: w.y};
                ctx.lineTo(end.x * GRID_SIZE, end.y * GRID_SIZE);
        });
        ctx.stroke();
        ctx.restore();

        ctx.save();
        
        this.walls.exterior.forEach(wall => {
            switch (wall.obj) {
                case OBJ_DOOR_EXT:
                    console.log('DRAWING EXT WALL');
                    ctx.save();
                    ctx.fillStyle = "#0F0";
                    if (wall.v) {
                        ctx.fillRect((wall.x*GRID_SIZE)-4, (wall.y*GRID_SIZE), 8, GRID_SIZE);

                    } else {
                        ctx.fillRect(wall.x*GRID_SIZE, (wall.y*GRID_SIZE)-4, GRID_SIZE, 8);

                    }
                    ctx.restore();
                    break;
                case OBJ_WINDOW:
                    ctx.save();
                    ctx.fillStyle = "#AAA";
                    if (wall.v) {
                        ctx.fillRect((wall.x*GRID_SIZE)-2, (wall.y*GRID_SIZE), 4, GRID_SIZE);

                    } else {
                        ctx.fillRect(wall.x*GRID_SIZE, (wall.y*GRID_SIZE)-2, GRID_SIZE, 4);
                    }
                    ctx.restore();
                    break;
                default:
                    break;
            }
        });
        ctx.restore();



        ctx.restore();
    }
}

export default Building;