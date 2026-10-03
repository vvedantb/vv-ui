export const overlaySurfaceClass =
  "bg-overlay text-overlay-foreground smooth-shadow-ring-xl";

export const modalBackdropClass = "bg-backdrop backdrop-blur-md";

export const staticSurfaceClass =
  "bg-surface-secondary text-surface-foreground border-0 shadow-none backdrop-blur-none";

export const flatElevatedSurfaceClass =
  "bg-surface text-surface-foreground border-0 shadow-none backdrop-blur-none";

export const flatElevatedSurfaceHoverClass =
  "transition-[background-color,transform] duration-150 ease-out active:scale-[0.99] hover:bg-surface-secondary";

export const flatElevatedSurfaceFocusClass = "focus-within:outline-hidden";

export const chatInputContainerClass =
  "bg-surface-secondary text-foreground shadow-none backdrop-blur-none";

export const flatPanelSubtleClass =
  "bg-surface-secondary text-foreground border-0 shadow-none backdrop-blur-none";

export const flatPanelSubtleHoverClass =
  "transition-[background-color,transform] duration-150 ease-out active:scale-[0.99] hover:bg-surface-tertiary";

export const flatInteractiveClass =
  "border-0 bg-transparent shadow-none backdrop-blur-none transition-[background-color,transform] duration-200 ease-smooth active:duration-100 active:ease-out active:scale-[0.97] hover:bg-surface-secondary hover:text-foreground";

export const segmentActiveClass = "bg-segment text-segment-foreground";

export const segmentActiveStateClass =
  "data-[state=active]:bg-segment data-[state=active]:text-segment-foreground";

export const segmentOpenStateClass =
  "data-[state=open]:bg-segment data-[state=open]:text-segment-foreground";

export const segmentExpandedStateClass =
  "aria-expanded:bg-segment aria-expanded:text-segment-foreground";

export const defaultActiveClass = "bg-default text-default-foreground";

export const defaultSelectedStateClass =
  "data-[state=selected]:bg-default data-[state=selected]:text-default-foreground";

export const defaultActiveStateClass =
  "data-[state=active]:bg-default data-[state=active]:text-default-foreground";

export const menuItemHighlightClass =
  "focus:bg-surface-tertiary focus:text-foreground data-highlighted:bg-surface-tertiary data-highlighted:text-foreground";

export const menuItemEmphasisHighlightClass =
  "focus:bg-default focus:text-default-foreground data-highlighted:bg-default data-highlighted:text-default-foreground data-[state=open]:bg-default data-[state=open]:text-default-foreground";

export const menuListSelectedClass =
  "data-[selected=true]:bg-default data-[selected=true]:text-default-foreground";
