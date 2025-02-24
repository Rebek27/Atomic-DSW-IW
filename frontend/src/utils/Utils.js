export const formatValue = (value) => Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value);

export const formatThousands = (value) => Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value);

export const getCssVariable = (variable) => {
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
};

const adjustHexOpacity = (hexColor, opacity) => {
  // Remove the '#' if it exists
  hexColor = hexColor.replace('#', '');

  // Convert hex to RGB
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Return RGBA string
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const adjustHSLOpacity = (hslColor, opacity) => {
  // Convert HSL to HSLA
  return hslColor.replace('hsl(', 'hsla(').replace(')', `, ${opacity})`);
};

const adjustOKLCHOpacity = (oklchColor, opacity) => {
  // Add alpha value to OKLCH color
  return oklchColor.replace(/oklch\((.*?)\)/, (match, p1) => `oklch(${p1} / ${opacity})`);
};

const adjustRGBOpacity = (rgbColor, opacity) => {
  // Convertir 'rgb(r, g, b)' a 'rgba(r, g, b, opacity)'
  if (rgbColor.startsWith('rgba')) {
    // Si ya es rgba, reemplazamos la opacidad
    return rgbColor.replace(/rgba\((.*),\s*[\d\.]+\)/, `rgba($1, ${opacity})`);
  } else {
    return rgbColor.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
  }
};

export const adjustColorOpacity = (color, opacity) => {
  if (color.startsWith('#')) {
    return adjustHexOpacity(color, opacity);
  } else if (color.startsWith('hsl')) {
    return adjustHSLOpacity(color, opacity);
  } else if (color.startsWith('oklch')) {
    return adjustOKLCHOpacity(color, opacity);
  } else if (color.startsWith('rgb')) {
    return adjustRGBOpacity(color, opacity);
  } else {
    // Asumimos que es un nombre de color
    const rgbColor = colorNameToRGB(color);
    return adjustRGBOpacity(rgbColor, opacity);
  }
};



export const oklchToRGBA = (oklchColor) => {
  // Create a temporary div to use for color conversion
  const tempDiv = document.createElement('div');
  tempDiv.style.color = oklchColor;
  document.body.appendChild(tempDiv);
  
  // Get the computed style and convert to RGB
  const computedColor = window.getComputedStyle(tempDiv).color;
  document.body.removeChild(tempDiv);
  
  return computedColor;
};

const colorNameToRGB = (colorName) => {
  // Crear un elemento temporal para obtener el color computado
  const tempDiv = document.createElement('div');
  tempDiv.style.color = colorName;
  document.body.appendChild(tempDiv);
  
  // Obtener el color computado en formato RGB
  const computedColor = window.getComputedStyle(tempDiv).color;
  document.body.removeChild(tempDiv);
  
  return computedColor;
};
