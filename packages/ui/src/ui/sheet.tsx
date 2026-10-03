"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "../utils/cn";

type SheetSide = "top" | "bottom" | "left" | "right";

function Sheet({
  shouldScaleBackground = false,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return (
    <DrawerPrimitive.Root
      shouldScaleBackground={shouldScaleBackground}
      {...props}
    />
  );
}

const SheetTrigger = DrawerPrimitive.Trigger;
const SheetPortal = DrawerPrimitive.Portal;
const SheetClose = DrawerPrimitive.Close;
const SheetHandle = DrawerPrimitive.Handle;
const SheetTitle = DrawerPrimitive.Title;
const SheetDescription = DrawerPrimitive.Description;

const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-backdrop backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

const sheetSideClass: Record<SheetSide, string> = {
  bottom: "inset-x-0 bottom-0 mt-24 flex h-auto flex-col rounded-t-2xl",
  top: "inset-x-0 top-0 mb-24 flex h-auto flex-col rounded-b-2xl",
  left: "inset-y-2 left-2 right-auto flex h-auto w-80 max-w-[88vw] flex-col rounded-2xl",
  right:
    "inset-y-2 left-auto right-2 flex h-auto w-80 max-w-[88vw] flex-col rounded-2xl",
};

const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    side?: SheetSide;
  }
>(({ className, children, side = "bottom", ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 bg-overlay/95 text-overlay-foreground smooth-shadow-ring-xl outline-hidden backdrop-blur-xl",
        sheetSideClass[side],
        className,
      )}
      {...props}
    >
      {side === "bottom" || side === "top" ? (
        <SheetHandle className="mx-auto mt-3 mb-1 h-1 w-12 shrink-0 rounded-full bg-surface-tertiary" />
      ) : null}
      {children}
    </DrawerPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = "SheetContent";

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHandle,
  SheetTitle,
  SheetDescription,
};
