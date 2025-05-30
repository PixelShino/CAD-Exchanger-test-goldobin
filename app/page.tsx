"use client"

import { useState, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { PrimitivesList } from "@/components/primitives-list"
import { AddPrimitiveDialog } from "@/components/add-primitive-dialog"
import { Scene } from "@/components/scene"
import type { Primitive } from "@/types/primitives"
import { generateRandomPrimitives } from "@/lib/primitive-utils"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Home() {
  const [primitives, setPrimitives] = useState<Primitive[]>([])
  const [selectedPrimitiveId, setSelectedPrimitiveId] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useIsMobile()

  const handleAddPrimitives = (
    type: "box" | "pyramid",
    length: number,
    width: number,
    height: number,
    count: number,
  ) => {
    const newPrimitives = generateRandomPrimitives(type, length, width, height, count)
    setPrimitives((prev) => [...prev, ...newPrimitives])
    setIsDialogOpen(false)
  }

  const handleSelectPrimitive = (id: string) => {
    setSelectedPrimitiveId(id === selectedPrimitiveId ? null : id)
  }

  const handleClearScene = () => {
    setPrimitives([])
    setSelectedPrimitiveId(null)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <main className="flex h-screen flex-col">
      <div className={`flex h-full ${isMobile ? "flex-col" : "flex-row"}`}>
        {/* Mobile toggle button */}
        {isMobile && (
          <div className="bg-secondary p-2 flex justify-between items-center border-b">
            <h1 className="font-medium">CAD Exchanger</h1>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleSidebar}
              className="px-2 py-1"
            >
              {showSidebar ? "Hide List" : "Show List"}
            </Button>
          </div>
        )}

        {/* Left panel with primitives list */}
        {(!isMobile || showSidebar) && (
          <div className={`${isMobile ? "h-64 border-b" : "w-64 border-r"} p-4 flex flex-col`}>
            <PrimitivesList
              primitives={primitives}
              selectedPrimitiveId={selectedPrimitiveId}
              onSelectPrimitive={handleSelectPrimitive}
            />
            <div className={`mt-auto pt-4 flex ${isMobile ? "flex-col gap-2" : "gap-2"}`}>
              <Button 
                variant="outline" 
                onClick={handleClearScene} 
                className={isMobile ? "w-full" : "flex-1"}
              >
                Clear scene
              </Button>
              <Button 
                onClick={() => setIsDialogOpen(true)} 
                className={isMobile ? "w-full" : "flex-1"}
              >
                Add group
              </Button>
            </div>
          </div>
        )}

        {/* 3D viewer */}
        <div className="flex-1 relative">
          <Canvas ref={canvasRef} camera={{ position: [5, 5, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Scene
              primitives={primitives}
              selectedPrimitiveId={selectedPrimitiveId}
              onSelectPrimitive={handleSelectPrimitive}
            />
            <OrbitControls />
          </Canvas>
        </div>
      </div>

      <AddPrimitiveDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAddPrimitives={handleAddPrimitives}
      />
    </main>
  )
}
