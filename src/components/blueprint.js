import { useRef, useEffect } from "react";
import Building from "../buildinggen/building";

const Blueprint = (props) => {
    console.log('Blueprint!');
    const canvasRef = useRef();

    useEffect(() => {
        const bld = new Building();
        const canv = canvasRef.current; // document.getElementById('stage');
        const ctx = canv.getContext('2d');
        ctx.clearRect(0, 0, 500, 500);        
        bld.draw(ctx);
    }, []);

    return (<div>
        <canvas 
            id="stage"
            ref={canvasRef}
            width={500}
            height={500}>    
        </canvas>
    </div>)
}

export default Blueprint;