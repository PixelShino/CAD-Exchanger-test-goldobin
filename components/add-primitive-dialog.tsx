"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

  const handleSubmit = () => {
    onAddPrimitives(type, length, width, height, count)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] dialog-content">
        <DialogHeader>
          <DialogTitle>Add primitives group</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select value={type} onValueChange={(value) => setType(value as "box" | "pyramid")}>
              <SelectTrigger id="type" className="col-span-3 custom-select">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="box">Box</SelectItem>
                <SelectItem value="pyramid">Pyramid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="length" className="text-right">
              Length
            </Label>
            <Input
              id="length"
              type="number"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="col-span-3 custom-input"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="width" className="text-right">
              Width
            </Label>
            <Input
              id="width"
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="col-span-3 custom-input"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="height" className="text-right">
              Height
            </Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="col-span-3 custom-input"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="number" className="text-right">
              Number
            </Label>
            <Input
              id="number"
              type="number"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="col-span-3 custom-input"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="custom-button">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="custom-button">
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}