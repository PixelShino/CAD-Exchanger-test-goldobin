"use client"

import type { Primitive } from "@/types/primitives"

interface PrimitivesListProps {
  primitives: Primitive[]
  selectedPrimitiveId: string | null
  onSelectPrimitive: (id: string) => void
}

export function PrimitivesList({ primitives, selectedPrimitiveId, onSelectPrimitive }: PrimitivesListProps) {
  if (primitives.length === 0) {
    return <div className="text-muted-foreground text-center py-8">No primitives added yet</div>
  }

  return (
    <div className="flex-1 overflow-auto">
      {primitives.map((primitive) => (
        <div
          key={primitive.id}
          className={`p-2 mb-1 cursor-pointer rounded flex items-center ${
            selectedPrimitiveId === primitive.id ? "bg-primary/10" : "hover:bg-muted"
          }`}
          onClick={() => onSelectPrimitive(primitive.id)}
        >
          <div className="w-4 h-4 mr-2 rounded-sm" style={{ backgroundColor: primitive.color.toString() }} />
          <div>
            <div className="font-medium">
              {primitive.type === "box" ? "Box" : "Pyramid"} {primitive.id.split("-")[0]}
            </div>
            <div className="text-xs text-muted-foreground">
              position: ({primitive.position.x.toFixed(1)}, {primitive.position.y.toFixed(1)},{" "}
              {primitive.position.z.toFixed(1)})
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
