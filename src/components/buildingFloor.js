import WallSection from "./wallSection";
import FloorSection from "./floorSection";

const BuildingFloor = (props) => {

    const intIdxStart = props.data.walls.exterior.length;
    const floorIdxStart = intIdxStart + props.data.walls.interior.length;

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
                key={i + intIdxStart}
            />);
    });

    const floors = props.data.floors.map((floor, i) => {
        return (
            <FloorSection
                data={floor}
                key={i + floorIdxStart}
            />
        )
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
            <group>
                {floors}
            </group>
        </group>);
}

export default BuildingFloor;