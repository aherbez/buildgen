import { useRef, useEffect, useState } from "react";
import Building from "../buildinggen/building";

const Blueprint = (props) => {
    console.log('Blueprint!');
    const canvasRef = useRef();
    const [ building, setBuilding ] = useState(new Building());
    const [ currFloor, setFloor ] = useState(0);

    useEffect(() => {
            const canv = canvasRef.current; // document.getElementById('stage');
        const ctx = canv.getContext('2d');
        ctx.clearRect(0, 0, 500, 500);        
        building.draw(ctx, currFloor);
    }, [currFloor]);

    return (<div>
        <div>
            <button onClick={() => {
                setFloor(Math.max(0, currFloor-1));
            }}>{"<-"}</button>
            {currFloor+1} / {building.floors.length}
            <button onClick={() => {
                setFloor(Math.min(building.floors.length-1, currFloor+1));
            }}>{"->"}</button>
        </div>

        <canvas 
            id="stage"
            ref={canvasRef}
            width={500}
            height={500}>    
        </canvas>
    </div>)
}

export default Blueprint;