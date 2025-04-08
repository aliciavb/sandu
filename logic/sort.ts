//logic/sort.ts
// Revisa si se puede tranferir un color
// Mueve varias capas iguales si hay espacio
// Devuelve una nueva copia del estado jars con los cambios

export function tryTransfer(jars: string[][], from: number, to: number): string[][] {
	const source = [...jars[from]];
	const target = [...jars[to]];
  
	const sourceTop = getTopColor(source);
	const targetTop = getTopColor(target);
  
	if (!sourceTop.color) return jars; // jarrón vacío
	if (!canReceiveColor(target, sourceTop.color)) return jars;
  
	const amountToMove = Math.min(sourceTop.count, countEmpty(target));
  
	const newSource = removeTopColors(source, amountToMove);
	const newTarget = addColors(target, sourceTop.color, amountToMove);
  
	const newJars = [...jars];
	newJars[from] = newSource;
	newJars[to] = newTarget;
  
	return newJars;
  }
  
  function getTopColor(jar: string[]) {
	const reversed = [...jar].reverse();
	const firstColor = reversed.find(c => c !== 'transparent');
	if (!firstColor) return { color: null, count: 0 };
  
	let count = 0;
	for (const color of reversed) {
	  if (color === firstColor) count++;
	  else if (color !== 'transparent') break;
	}
  
	return { color: firstColor, count };
  }
  
  function countEmpty(jar: string[]) {
	return jar.filter(c => c === 'transparent').length;
  }
  
  function canReceiveColor(jar: string[], color: string) {
	const top = getTopColor(jar).color;
	return countEmpty(jar) > 0 && (top === null || top === color);
  }
  
  function removeTopColors(jar: string[], count: number) {
	const result = [...jar];
	for (let i = jar.length - 1; i >= 0 && count > 0; i--) {
	  if (result[i] !== 'transparent') {
		result[i] = 'transparent';
		count--;
	  }
	}
	return result;
  }
  
  function addColors(jar: string[], color: string, count: number) {
	const result = [...jar];
	for (let i = 0; i < result.length && count > 0; i++) {
	  if (result[i] === 'transparent') {
		result[i] = color;
		count--;
	  }
	}
	return result;
  }
  