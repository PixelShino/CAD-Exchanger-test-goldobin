"use client"

import type { Primitive } from "@/types/primitives"
import { useIsMobile } from "@/hooks/use-mobile"

interface PrimitivesListProps {
  primitives: Primitive[]
  selectedPrimitiveId: string | null
  onSelectPrimitive: (id: string) => void
}

export function PrimitivesList({ primitives, selectedPrimitiveId, onSelectPrimitive }: PrimitivesListProps) {
  const isMobile = useIsMobile()
  
  if (primitives.length === 0) {
    return (
      <div className="text-muted-foreground text-center py-8">
        {isMobile ? "Tap 'Add group' to start" : "No primitives added yet"}
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto">
      <h2 className={`font-medium mb-2 ${isMobile ? "text-sm" : ""}`}>Primitives ({primitives.length})</h2>
      {primitives.map((primitive) => (
        <div
          key={primitive.id}
          className={`p-2 mb-1 cursor-pointer rounded flex items-center ${
            selectedPrimitiveId === primitive.id 
              ? "bg-primary/10 border border-primary/20" 
              : "hover:bg-muted"
          } ${isMobile ? "min-h-[44px]" : ""}`}
          onClick={() => onSelectPrimitive(primitive.id)}
        >
          <div 
            className="w-4 h-4 mr-2 rounded-sm" 
            style={{ backgroundColor: primitive.color.toString() }} 
          />
          <div className="flex-1 overflow-hidden">
            <div className="font-medium truncate">
              {primitive.type === "box" ? "Box" : "Pyramid"} {primitive.id.split("-")[0]}
            </div>
            <div className={`text-xs text-muted-foreground ${isMobile ? "truncate" : ""}`}>
              pos: ({primitive.position.x.toFixed(1)}, {primitive.position.y.toFixed(1)},{" "}
              {primitive.position.z.toFixed(1)})
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
