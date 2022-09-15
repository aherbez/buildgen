const RoofSection = (props) => {
    const rot = [0,0,0];
    
    const pos = [
        (props.data.x * 4),
        0,
        (props.data.y * 4)
    ];

    // is this a ramp?
    if (props.data.obj === 4) {
        rot[1] = Math.PI/2 * -props.data.rot;
    }
    
    return (
        <group
            position={pos}
        >
            <group
                position={[2,0,2]}
                rotation={rot}
            >
                <mesh 
                    geometry={props.geo}
                    material={props.mat}
                />
            </group>
        </group>
    );

}

export default RoofSection;