"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useIsMobile } from "@/hooks/use-mobile"

interface AddPrimitiveDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddPrimitives: (type: "box" | "pyramid", length: number, width: number, height: number, count: number) => void
}

export function AddPrimitiveDialog({ isOpen, onClose, onAddPrimitives }: AddPrimitiveDialogProps) {
  const [type, setType] = useState<"box" | "pyramid">("box")
  const [length, setLength] = useState(50)
  const [width, setWidth] = useState(50)
  const [height, setHeight] = useState(50)
  const [count, setCount] = useState(3)
  const isMobile = useIsMobile()

  const handleSubmit = () => {
    onAddPrimitives(type, length, width, height, count)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isMobile ? "max-w-[90%]" : "sm:max-w-[425px]"} dialog-content`}>
        <DialogHeader>
          <DialogTitle>Add primitives group</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className={`grid ${isMobile ? "grid-cols-1 gap-2" : "grid-cols-4 items-center gap-4"}`}>
            <Label htmlFor="type" className={isMobile ? "mb-1" : "text-right"}>
              Type
            </Label>
            <div className={isMobile ? "w-full" : "col-span-3"}>
              <Select value={type} onValueChange={(value) => setType(value as "box" | "pyramid")}>
                <SelectTrigger 
                  id="type" 
                  className="w-full focus:ring-primary focus:ring-offset-1 focus:border-primary"
                  style={{ backgroundColor: "white" }}
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="min-w-[8rem]" style={{ backgroundColor: "white" }}>
                  <SelectItem value="box" className="cursor-pointer">Box</SelectItem>
                  <SelectItem value="pyramid" className="cursor-pointer">Pyramid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className={`grid ${isMobile ? "grid-cols-1 gap-2" : "grid-cols-4 items-center gap-4"}`}>
            <Label htmlFor="length" className={isMobile ? "mb-1" : "text-right"}>
              Length
            </Label>
            <Input
              id="length"
              type="number"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className={isMobile ? "w-full" : "col-span-3"}
            />
          </div>
          <div className={`grid ${isMobile ? "grid-cols-1 gap-2" : "grid-cols-4 items-center gap-4"}`}>
            <Label htmlFor="width" className={isMobile ? "mb-1" : "text-right"}>
              Width
            </Label>
            <Input
              id="width"
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className={isMobile ? "w-full" : "col-span-3"}
            />
          </div>
          <div className={`grid ${isMobile ? "grid-cols-1 gap-2" : "grid-cols-4 items-center gap-4"}`}>
            <Label htmlFor="height" className={isMobile ? "mb-1" : "text-right"}>
              Height
            </Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className={isMobile ? "w-full" : "col-span-3"}
            />
          </div>
          <div className={`grid ${isMobile ? "grid-cols-1 gap-2" : "grid-cols-4 items-center gap-4"}`}>
            <Label htmlFor="number" className={isMobile ? "mb-1" : "text-right"}>
              Number
            </Label>
            <Input
              id="number"
              type="number"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className={isMobile ? "w-full" : "col-span-3"}
            />
          </div>
        </div>
        <DialogFooter className={isMobile ? "flex-col space-y-2" : "flex-row space-x-2"}>
          <Button 
            variant="outline" 
            onClick={onClose} 
            className={isMobile ? "w-full" : ""}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            className={isMobile ? "w-full" : ""}
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}