// Verifica si se puede mover una capa del jarrón origen al destino
export const canMove = (sourceJar, targetJar) => {
  if (!sourceJar || !targetJar) return false;

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

// Mueve una capa del jarrón origen al destino
export const moveLayer = (sourceJar, targetJar) => {
  if (!canMove(sourceJar, targetJar)) return null;

  const newSourceJar = [...sourceJar];
  const newTargetJar = [...targetJar];

  // Encuentra y remueve la capa superior del origen
  const sourceTopIndex = newSourceJar.findIndex(color => color);
  const colorToMove = newSourceJar[sourceTopIndex];
  newSourceJar[sourceTopIndex] = null;

  // Encuentra el primer espacio vacío desde arriba en el destino
  const targetEmptyIndex = newTargetJar.findIndex(color => !color);
  newTargetJar[targetEmptyIndex] = colorToMove;

  return {
    sourceJar: newSourceJar,
    targetJar: newTargetJar,
  };
};

// Verifica si el juego está completado
export const isGameComplete = (jars) => {
  return jars.every(jar => {
    const colors = jar.filter(color => color);
    if (colors.length === 0) return true;
    return colors.every(color => color === colors[0]);
  });
}; 