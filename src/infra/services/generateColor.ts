export function generateRandomColor() {
    // Generate random RGB values
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
  
    // Convert RGB to hexadecimal
    const hex = '#' + ((1 << 24) | (red << 16) | (green << 8) | blue).toString(16).slice(1);
  
    return hex;
  }