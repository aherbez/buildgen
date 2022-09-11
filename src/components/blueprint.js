import { useRef, useLayoutEffect } from "react";
import Building from "../buildinggen/building";

const Blueprint = (props) => {

    const canvasRef = useRef();


    useLayoutEffect(() => {
        const bld = new Building();

        const canv = canvasRef.current;
        const ctx = canv.getContext('2d');
        ctx.clearRect(0, 0, 500, 500);
        
        bld.draw(ctx);
    }, []);

    return (<div>
        <canvas 
            width={500}
            height={500}
            ref={canvasRef}>    
        </canvas>
    </div>)
}

export default Blueprint;