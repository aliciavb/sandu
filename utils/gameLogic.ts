import { Color, Jar } from '../types/game';

// Validación de entrada para el jarrón
const validateJar = (jar: unknown): jar is Jar => {
  if (!Array.isArray(jar)) return false;
  if (jar.length !== 4) return false; // Asumimos que todos los jarrones tienen 4 slots
  return jar.every(color => color === null || typeof color === 'string');
};

// Validación de color
const isValidColor = (color: unknown): color is Color => {
  return color === null || typeof color === 'string';
};

export const canMove = (sourceJar: unknown, targetJar: unknown): boolean => {
  // Validación de entrada
  if (!validateJar(sourceJar) || !validateJar(targetJar)) {
    console.warn('Invalid jar format provided to canMove');
    return false;
  }

  // Encuentra la capa superior del jarrón origen
  const sourceTopColor = sourceJar.find(color => color);
  if (!sourceTopColor) return false;

  // Encuentra el primer espacio vacío desde arriba en el jarrón destino
  const targetEmptyIndex = targetJar.findIndex(color => !color);
  
  // Si el jarrón destino está lleno
  if (targetEmptyIndex === -1) return false;

  // Si el jarrón destino está vacío, se permite el movimiento
  const targetTopColor = targetJar.find(color => color);
  if (!targetTopColor) return true;

  // Si el color superior del destino es igual al color que queremos mover
  return targetTopColor === sourceTopColor;
};

export const moveLayer = (sourceJar: unknown, targetJar: unknown): { sourceJar: Jar; targetJar: Jar } | null => {
  // Validación de entrada
  if (!validateJar(sourceJar) || !validateJar(targetJar)) {
    console.warn('Invalid jar format provided to moveLayer');
    return null;
  }

  if (!canMove(sourceJar, targetJar)) return null;

  try {
    const newSourceJar = [...sourceJar];
    const newTargetJar = [...targetJar];

    // Encuentra y remueve la capa superior del origen
    const sourceTopIndex = newSourceJar.findIndex(color => color);
    const colorToMove = newSourceJar[sourceTopIndex];
    
    if (!isValidColor(colorToMove)) {
      console.warn('Invalid color found during move operation');
      return null;
    }

    newSourceJar[sourceTopIndex] = null;

    // Encuentra el primer espacio vacío desde arriba en el destino
    const targetEmptyIndex = newTargetJar.findIndex(color => !color);
    if (targetEmptyIndex === -1) {
      console.warn('No empty space found in target jar');
      return null;
    }

    newTargetJar[targetEmptyIndex] = colorToMove;

    return {
      sourceJar: newSourceJar,
      targetJar: newTargetJar,
    };
  } catch (error) {
    console.error('Error during move operation:', error);
    return null;
  }
};

export const isGameComplete = (jars: unknown): boolean => {
  if (!Array.isArray(jars) || !jars.every(validateJar)) {
    console.warn('Invalid jars format provided to isGameComplete');
    return false;
  }

  return jars.every(jar => {
    const colors = jar.filter((color): color is string => color !== null);
    if (colors.length === 0) return true;
    return colors.every(color => color === colors[0]);
  });
}; 