"use client"
import { useId, useState } from "react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface SelectWithSearchProps {
  data: { value: string; label: string }[]
  label: string
  labelEmpty: string
  labelSearch: string
  className?: string
  onSelect: (value: string) => void
}

export default function SelectWithSearch({
  data,
  label,
  labelEmpty,
  labelSearch,
  className,
  onSelect
}: SelectWithSearchProps) {
  const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")

  return (
    <div className="*:not-first:mt-2 flex-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="tertiary"
            role="combobox"
            aria-expanded={open}
            className={`hover:bg-background border-input w-full justify-between px-3 font-normal ${className}`}
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value
                ? data.find((framework) => framework.value === value)
                    ?.label
                : label}
            </span>
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0 !size-5"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder={labelSearch} />
            <CommandList>
              <CommandEmpty>{labelEmpty}</CommandEmpty>
              <CommandGroup>
                {data.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                      onSelect(currentValue === value ? "" : currentValue)
                    }}
                  >
                    {framework.label}
                    {value === framework.value && (
                      <CheckIcon size={16} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
