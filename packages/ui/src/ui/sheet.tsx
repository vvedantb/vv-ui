"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "../utils/cn";
import { assignRef } from "../utils/ref";
import {
  connectBodyPointerEventsFix,
  connectKeyboardScroll,
  connectOverlayViewport,
} from "./overlay-a11y";

type SheetSide = "top" | "bottom" | "left" | "right";

// vaul animates and drags from the Root's `direction`; SheetContent reads it
// so `<Sheet direction="right">` places the panel on the right by default.
const SheetDirectionContext = React.createContext<SheetSide>("bottom");

function Sheet({
  shouldScaleBackground = false,
  direction = "bottom",
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return (
    <SheetDirectionContext.Provider value={direction}>
      <DrawerPrimitive.Root
        shouldScaleBackground={shouldScaleBackground}
        direction={direction}
        {...props}
      />
    </SheetDirectionContext.Provider>
  );
}

const SheetTrigger = DrawerPrimitive.Trigger;
const SheetPortal = DrawerPrimitive.Portal;
const SheetClose = DrawerPrimitive.Close;
const SheetHandle = DrawerPrimitive.Handle;
const SheetTitle = DrawerPrimitive.Title;
const SheetDescription = DrawerPrimitive.Description;

const overlayMotionClass =
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 motion-reduce:animate-none motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none";

const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-backdrop backdrop-blur-md",
      overlayMotionClass,
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

const sheetSideClass: Record<SheetSide, string> = {
  bottom:
    "inset-x-0 bottom-[var(--overlay-vv-bottom,0px)] mt-24 flex max-h-[min(96dvh,calc(var(--overlay-vv-height,100dvh)-1.5rem))] h-auto flex-col rounded-t-2xl pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]",
  top: "inset-x-0 top-0 mb-24 flex h-auto max-h-[var(--overlay-vv-height,100dvh)] flex-col rounded-b-2xl pt-[max(0.75rem,env(safe-area-inset-top,0px))]",
  left: "inset-y-2 left-2 right-auto flex h-auto w-80 max-w-[88vw] flex-col rounded-2xl",
  right:
    "inset-y-2 left-auto right-2 flex h-auto w-80 max-w-[88vw] flex-col rounded-2xl",
};

const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    /** Defaults to the parent Sheet's `direction`. */
    side?: SheetSide;
  }
>(({ className, children, side: sideProp, ...props }, ref) => {
  const direction = React.useContext(SheetDirectionContext);
  const side = sideProp ?? direction;
  const overlayCleanupRef = React.useRef<(() => void) | null>(null);

  const mergedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      overlayCleanupRef.current?.();
      overlayCleanupRef.current = null;
      if (node) {
        const viewport = connectOverlayViewport(node);
        const keyboard = connectKeyboardScroll(node);
        const pointerEvents = connectBodyPointerEventsFix();
        overlayCleanupRef.current = () => {
          viewport();
          keyboard();
          pointerEvents();
        };
      }
      assignRef(ref, node);
    },
    [ref],
  );

  React.useLayoutEffect(() => {
    return () => {
      overlayCleanupRef.current?.();
      overlayCleanupRef.current = null;
    };
  }, []);

  return (
    <SheetPortal>
      <SheetOverlay />
      <DrawerPrimitive.Content
        ref={mergedRef}
        className={cn(
          "fixed z-50 overflow-y-auto bg-overlay/95 text-overlay-foreground smooth-shadow-ring-xl outline-hidden backdrop-blur-xl motion-reduce:transition-none",
          sheetSideClass[side],
          className,
        )}
        {...props}
      >
        {side === "bottom" || side === "top" ? (
          <div className="flex min-h-11 shrink-0 items-center justify-center">
            <SheetHandle className="relative mx-auto h-1 w-12 shrink-0 rounded-full bg-surface-tertiary after:absolute after:inset-x-[-16px] after:inset-y-[-20px] after:content-['']" />
          </div>
        ) : null}
        {children}
      </DrawerPrimitive.Content>
    </SheetPortal>
  );
});
SheetContent.displayName = "SheetContent";

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-1.5 p-4 text-left", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "sticky bottom-0 mt-auto flex flex-col-reverse gap-2 bg-overlay/95 p-4 sm:flex-row sm:justify-end",
      "pb-[max(1rem,env(safe-area-inset-bottom,0px))]",
      "[&_button]:max-sm:min-h-11",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

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
  SheetHeader,
  SheetFooter,
};
