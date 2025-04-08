// utils/levelGenerator.ts
import { JAR_COLORS } from '../constants/theme';

export function generateLevel(levelNumber: number) {
	const numColors = Math.min(4 + Math.floor(levelNumber / 5), JAR_COLORS.length);
	const colors = JAR_COLORS.slice(0, numColors);
  
	const numLayersPerColor = 4;
	const colorUnits = colors.flatMap(color => Array(numLayersPerColor).fill(color));
	const shuffled = shuffleArray(colorUnits);
  
	const numJars = colors.length + 2; // +2 para jarrones vacíos
  
	const jars: string[][] = Array.from({ length: numJars }, () => []);

  
	shuffled.forEach(color => {
	  let added = false;
	  while (!added) {
		const index = Math.floor(Math.random() * colors.length);
		if (jars[index].length < numLayersPerColor) {
		  jars[index].push(color);
		  added = true;
		}
	  }
	});
  
	return jars;
  }
  
  function shuffleArray<T>(array: T[]): T[] {
	const arr = [...array];
	for (let i = arr.length - 1; i > 0; i--) {
	  const j = Math.floor(Math.random() * (i + 1));
	  [arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
  }
  