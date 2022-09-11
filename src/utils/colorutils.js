const randomColor = () => {
    const r = 100; // Math.floor(Math.random() * 128);
    const g = 100; // Math.floor(Math.random() * 128);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}


export {
    randomColor
}