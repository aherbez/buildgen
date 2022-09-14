import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import "../App.css";

import Ground from "./ground";
import BuildingFloor from "./buildingFloor";

const BuildingGeo = (props) => {
    const build = props.building;
    
    const floors = build.floors.map((floorData, i) => {
        return (
            <BuildingFloor
                key={floorData.zPos}
                data={floorData}
            />);
    });

    const pos = [
        -(build.floors[0].w/2) * 4,
        0,
        -(build.floors[0].h/2) * 4
    ];
    console.log(pos);

    return (
        <div id="layer-scene">
            <Canvas
                camera={{position: [pos[0], 7.5, pos[2]]}}
            >
            <hemisphereLight />
            <OrbitControls />
            <Sky />

            <Ground />

            <group
                position={pos}
            >
                {floors}
            </group>

            </Canvas>
    </div>);
}

export default BuildingGeo;