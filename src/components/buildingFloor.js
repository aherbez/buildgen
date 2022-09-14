import WallSection from "./wallSection";

const BuildingFloor = (props) => {
    console.log(props.data.walls);
    // const walls = props.floorData.

    const wallsExt = props.data.walls.exterior.map((wall, i) => {
        return (
            <WallSection 
                data={wall}
                isExterior={true}
                key={i}
            />);
    });

    const wallsInt = props.data.walls.interior.map((wall, i) => {
        return (
            <WallSection 
                data={wall}
                isExterior={false}
                key={props.data.walls.exterior.length + i}
            />);
    });

    return (
        <group
            position={[0, props.data.zPos * 3, 0]}
        >
            <group>
                {wallsExt}
            </group>
            <group>
                {wallsInt}
            </group>
            
        </group>);
}

export default BuildingFloor;