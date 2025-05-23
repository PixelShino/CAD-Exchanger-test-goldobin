"use client"

import type { Primitive } from "@/types/primitives"
import { Box } from "./primitives/box"
import { Pyramid } from "./primitives/pyramid"

interface SceneProps {
  primitives: Primitive[]
  selectedPrimitiveId: string | null
  onSelectPrimitive: (id: string) => void
}

export function Scene({ primitives, selectedPrimitiveId, onSelectPrimitive }: SceneProps) {
  return (
    <>
      {primitives.map((primitive) => {
        const isSelected = primitive.id === selectedPrimitiveId

        if (primitive.type === "box") {
          return (
            <Box
              key={primitive.id}
              primitive={primitive}
              isSelected={isSelected}
              onClick={() => onSelectPrimitive(primitive.id)}
            />
          )
        } else {
          return (
            <Pyramid
              key={primitive.id}
              primitive={primitive}
              isSelected={isSelected}
              onClick={() => onSelectPrimitive(primitive.id)}
            />
          )
        }
      })}
    </>
  )
}
