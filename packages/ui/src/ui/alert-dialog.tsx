import * as React from "react";
import { cn } from "../utils/cn";
import { Button, type ButtonProps } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const AlertDialog = Dialog;
const AlertDialogTrigger = DialogTrigger;
const AlertDialogPortal = DialogPortal;
const AlertDialogOverlay = DialogOverlay;

const AlertDialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogContent>,
  React.ComponentPropsWithoutRef<typeof DialogContent>
>(({ hideCloseButton = true, onPointerDownOutside, onInteractOutside, ...props }, ref) => (
  <DialogContent
    ref={ref}
    role="alertdialog"
    hideCloseButton={hideCloseButton}
    onPointerDownOutside={(event) => {
      event.preventDefault();
      onPointerDownOutside?.(event);
    }}
    onInteractOutside={(event) => {
      event.preventDefault();
      onInteractOutside?.(event);
    }}
    {...props}
  />
));
AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogHeader = DialogHeader;
const AlertDialogFooter = DialogFooter;
const AlertDialogTitle = DialogTitle;
const AlertDialogDescription = DialogDescription;

const AlertDialogAction = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <Button ref={ref} className={cn("max-sm:min-h-11", className)} {...props} />
  ),
);
AlertDialogAction.displayName = "AlertDialogAction";

const AlertDialogCancel = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "outline", ...props }, ref) => (
    <DialogClose asChild>
      <Button
        ref={ref}
        type="button"
        variant={variant}
        data-alert-cancel=""
        className={cn("max-sm:min-h-11 mt-2 sm:mt-0", className)}
        {...props}
      />
    </DialogClose>
  ),
);
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
