export function generateRandomColor() {
    // Generate random RGB values
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
  
    // Convert RGB to hexadecimal
    var hex = '#' + ((1 << 24) | (red << 16) | (green << 8) | blue).toString(16).slice(1);
  
    return hex;
  }