import * as THREE from 'three';
import type { Primitive, PrimitiveDimensions } from '@/types/primitives';

// Generate a random position within a certain range
function getRandomPosition(range = 3): THREE.Vector3 {
  return new THREE.Vector3(
    (Math.random() - 0.5) * range,
    (Math.random() - 0.5) * range,
    (Math.random() - 0.5) * range,
  );
}

// Generate a random color
function getRandomColor(): THREE.Color {
  return new THREE.Color(Math.random() * 0xffffff);
}

// Generate a unique ID
function generateId(): string {
  return Math.floor(Math.random() * 1000) + '-' + Date.now().toString(36);
}

// Generate random primitives based on user input
export function generateRandomPrimitives(
  type: 'box' | 'pyramid',
  length: number,
  width: number,
  height: number,
  count: number,
): Primitive[] {
  const multiColorFaces = true; // Always enable multi-colored faces as per requirements
  const primitives: Primitive[] = [];

  const dimensions: PrimitiveDimensions = {
    length,
    width,
    height,
  };

  for (let i = 0; i < count; i++) {
    primitives.push({
      id: generateId(),
      type,
      position: getRandomPosition(),
      dimensions,
      color: getRandomColor(),
      multiColorFaces,
    });
  }

  return primitives;
}
