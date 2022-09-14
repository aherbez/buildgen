/*
const OBJ_NONE = 0;
const OBJ_DOOR_EXT = 1;
const OBJ_WINDOW = 2;
const OBJ_DOOR_INT = 3;
*/

const getColor = (wall, isExt) => {
    if (isExt) {
        switch (wall.obj) {
            case 0:
                return "#888";
            case 1: 
                return "#0F0";
            case 2:
                return "#FFF";
            default:
                // should never get here
                return "#F0F";
                
        }
    } else {
        if (wall.obj === 3) {
            return "blue";
        } else {
            return "#444";
        }
    }
}

const WallSection = (props) => {    
    const pos = [
        (props.data.x * 4),
        1.5,
        props.data.y * 4
    ];

    const rot = [0,0,0];

    if (props.data.v === 1) {
        rot[1] = (props.data.v ? Math.PI/2 : 0);
        pos[2] += 2;
    } else {
        pos[0] += 2;
    }

    const color = getColor(props.data, props.isExterior);
    const thickness = (props.isExterior) ? 0.4 : 0.1;

    return (
    <mesh
        position={pos}
        rotation={rot}
    >
        <boxBufferGeometry args={[4,3,thickness,1,1,1]} />
        <meshLambertMaterial color={color} />    
    </mesh>);
}

export default WallSection;