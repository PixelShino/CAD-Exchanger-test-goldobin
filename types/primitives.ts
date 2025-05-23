import type * as THREE from "three"

export interface PrimitiveDimensions {
  length: number
  width: number
  height: number
}

export interface Primitive {
  id: string
  type: "box" | "pyramid"
  position: THREE.Vector3
  dimensions: PrimitiveDimensions
  color: THREE.Color
  multiColorFaces?: boolean
}
