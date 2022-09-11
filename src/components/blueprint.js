import { useRef, useLayoutEffect } from "react";
import Building from "../buildinggen/building";

const Blueprint = (props) => {

    const canvasRef = useRef();

    const bld = new Building();

    useLayoutEffect(() => {
        const canv = canvasRef.current;
        const ctx = canv.getContext('2d');
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