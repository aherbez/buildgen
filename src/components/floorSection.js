const FloorSection = (props) => {
    const pos = [
        (props.data.x * 4) + 2,
        0,
        (props.data.y * 4) + 2
    ];
    
    
    return (
    <mesh
        position={pos}
    >
        <boxBufferGeometry args={[4,0.1,4,1,1,1]} />
        <meshLambertMaterial color={"#555"} />
    </mesh>);
}

export default FloorSection;