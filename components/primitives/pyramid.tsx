'use client';

import { useRef, useMemo } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import type { Primitive } from '@/types/primitives';
import * as THREE from 'three';

interface PyramidProps {
  primitive: Primitive;
  isSelected: boolean;
  onClick: () => void;
}

export function Pyramid({ primitive, isSelected, onClick }: PyramidProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create pyramid geometry using BufferGeometry directly
  const geometry = useMemo(() => {
    // Create a BufferGeometry
    const bufferGeometry = new THREE.BufferGeometry();

    // Define pyramid dimensions
    const baseSize =
      Math.min(primitive.dimensions.length, primitive.dimensions.width) / 100;
    const height = primitive.dimensions.height / 100;

    // Define the 5 vertices of the pyramid (4 for the base, 1 for the apex)
    const vertices = new Float32Array([
      // Base vertices
      -baseSize,
      -height / 2,
      -baseSize, // 0: bottom left
      baseSize,
      -height / 2,
      -baseSize, // 1: bottom right
      baseSize,
      -height / 2,
      baseSize, // 2: top right
      -baseSize,
      -height / 2,
      baseSize, // 3: top left
      // Apex
      0,
      height / 2,
      0, // 4: top point
    ]);

    // Add position attribute
    bufferGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(vertices, 3),
    );

    if (primitive.multiColorFaces) {
      // Для поддержки разных цветов для каждой грани нам нужно создать 5 отдельных геометрий
      // (4 боковые грани + основание)

      // Сохраняем случайные цвета для каждой грани
      const faceColors = Array(5)
        .fill(null)
        .map(() => new THREE.Color(Math.random() * 0xffffff));

      // Создаем группы для каждой грани
      // База (2 треугольника = 1 группа)
      bufferGeometry.addGroup(0, 3, 0); // первый треугольник базы
      bufferGeometry.addGroup(3, 3, 0); // второй треугольник базы

      // 4 боковые грани (по 1 треугольнику каждая)
      bufferGeometry.addGroup(6, 3, 1); // передняя грань
      bufferGeometry.addGroup(9, 3, 2); // правая грань
      bufferGeometry.addGroup(12, 3, 3); // задняя грань
      bufferGeometry.addGroup(15, 3, 4); // левая грань

      // Определяем индексы для треугольников
      const indices = [
        // База (2 треугольника)
        0,
        2,
        1,
        0,
        3,
        2,
        // 4 боковые грани
        0,
        1,
        4, // передняя грань
        1,
        2,
        4, // правая грань
        2,
        3,
        4, // задняя грань
        3,
        0,
        4, // левая грань
      ];

      bufferGeometry.setIndex(indices);

      // Compute vertex normals for proper lighting
      bufferGeometry.computeVertexNormals();

      // Создаем материалы для каждой грани
      const materials = faceColors.map(
        (color) =>
          new THREE.MeshStandardMaterial({
            color: isSelected ? 0xffffff : color,
            side: THREE.DoubleSide,
          }),
      );

      return { geometry: bufferGeometry, materials };
    } else {
      // Single color for all faces
      // set index for triangle
      const indices = [
        // base (2 triangle)
        0,
        2,
        1,
        0,
        3,
        2,
        // 4 side face
        0,
        1,
        4, // front face
        1,
        2,
        4, // right face
        2,
        3,
        4, // back face
        3,
        0,
        4, // left face
      ];

      bufferGeometry.setIndex(indices);

      // Compute vertex normals for proper lighting
      bufferGeometry.computeVertexNormals();

      return {
        geometry: bufferGeometry,
        materials: new THREE.MeshStandardMaterial({
          color: isSelected ? 0xffffff : primitive.color,
          side: THREE.DoubleSide,
        }),
      };
    }
  }, [
    primitive.dimensions,
    primitive.color,
    primitive.id,
    primitive.multiColorFaces,
    isSelected,
  ]);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <mesh
      ref={meshRef}
      position={[
        primitive.position.x,
        primitive.position.y,
        primitive.position.z,
      ]}
      onClick={handleClick}
      material={geometry.materials}
      geometry={geometry.geometry}
    >
      {isSelected && (
        <lineSegments>
          <edgesGeometry args={[geometry.geometry]} />
          <lineBasicMaterial color={0xffffff} />
        </lineSegments>
      )}
    </mesh>
  );
}
