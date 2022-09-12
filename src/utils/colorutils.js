const randomColor = () => {
    const r = Math.floor(Math.random() * 128);
    const g = Math.floor(Math.random() * 128);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}


export {
    randomColor
}