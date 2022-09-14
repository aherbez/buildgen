import WallSection from "./wallSection";
import FloorSection from "./floorSection";

const BuildingFloor = (props) => {

    // const intIdxStart = props.data.walls.exterior.length;
    // const floorIdxStart = intIdxStart + props.data.walls.interior.length;

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
                key={i}
            />);
    });

    const floors = props.data.floors.map((floor, i) => {
        return (
            <FloorSection
                data={floor}
                key={i}
            />
        )
    });

    const roof = (props.data.hasRoof) ? props.data.ceilings.map((tile, i) => {
        return (
            <FloorSection
                data={tile}
                key={i}
            />
        )
    }) : <group />

    return (
        <group
            position={[0, props.data.zPos * 3, 0]}
        >
            <group>
                {wallsExt}
                {wallsInt}
                {floors}
            </group>

            <group
                position={[0, 3, 0]}
            >
                {roof}
            </group>


        </group>);
}

export default BuildingFloor;