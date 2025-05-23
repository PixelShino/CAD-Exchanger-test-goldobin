'use client';

import { useRef, useMemo } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import type { Primitive } from '@/types/primitives';
import * as THREE from 'three';

interface BoxProps {
  primitive: Primitive;
  isSelected: boolean;
  onClick: () => void;
}

export function Box({ primitive, isSelected, onClick }: BoxProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create box using BufferGeometry directly
  const geometry = useMemo(() => {
    // Create a BufferGeometry
    const bufferGeometry = new THREE.BufferGeometry();

    // Define box dimensions
    const width = primitive.dimensions.width / 100;
    const height = primitive.dimensions.height / 100;
    const length = primitive.dimensions.length / 100;

    // Define the 8 vertices of the box
    const vertices = new Float32Array([
      // Front face
      -length / 2,
      -height / 2,
      width / 2, // 0
      length / 2,
      -height / 2,
      width / 2, // 1
      length / 2,
      height / 2,
      width / 2, // 2
      -length / 2,
      height / 2,
      width / 2, // 3
      // Back face
      -length / 2,
      -height / 2,
      -width / 2, // 4
      length / 2,
      -height / 2,
      -width / 2, // 5
      length / 2,
      height / 2,
      -width / 2, // 6
      -length / 2,
      height / 2,
      -width / 2, // 7
    ]);

    // Define the indices (triangles) that make up each face
    const indices = [
      // Front face (2 triangles)
      0, 1, 2, 0, 2, 3,
      // Back face (2 triangles)
      5, 4, 7, 5, 7, 6,
      // Top face (2 triangles)
      3, 2, 6, 3, 6, 7,
      // Bottom face (2 triangles)
      4, 5, 1, 4, 1, 0,
      // Right face (2 triangles)
      1, 5, 6, 1, 6, 2,
      // Left face (2 triangles)
      4, 0, 3, 4, 3, 7,
    ];

    // Add position attribute
    bufferGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(vertices, 3),
    );

    if (primitive.multiColorFaces) {
      // To support different colors for each face
      // Add groups for each face (6 faces)
      bufferGeometry.addGroup(0, 6, 0); // Front face
      bufferGeometry.addGroup(6, 6, 1); // Back face
      bufferGeometry.addGroup(12, 6, 2); // Top face
      bufferGeometry.addGroup(18, 6, 3); // Bottom face
      bufferGeometry.addGroup(24, 6, 4); // Right face
      bufferGeometry.addGroup(30, 6, 5); // Left face

      // set index
      bufferGeometry.setIndex(indices);

      // Compute vertex normals for proper lighting
      bufferGeometry.computeVertexNormals();

      // Generating random colors for each face.
      const faceColors = Array(6)
        .fill(null)
        .map(() => new THREE.Color(Math.random() * 0xffffff));

      // Creating materials for each face.
      const materials = faceColors.map(
        (color) =>
          new THREE.MeshStandardMaterial({
            color: isSelected ? 0xffffff : color,
          }),
      );

      return { geometry: bufferGeometry, materials };
    } else {
      // Single color for all faces
      bufferGeometry.setIndex(indices);
      bufferGeometry.computeVertexNormals();

      return {
        geometry: bufferGeometry,
        materials: new THREE.MeshStandardMaterial({
          color: isSelected ? 0xffffff : primitive.color,
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
