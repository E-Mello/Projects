import type { ComponentPropsWithoutRef, ForwardRefRenderFunction } from "react";

import type { FieldError } from "react-hook-form";
import { forwardRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  error?: FieldError;
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { error, ...props },
  ref
) => {
  return (
    <div className="flex flex-col">
      <input {...props} ref={ref} />
      {error && <span>{error.message}</span>}
    </div>
  );
};

export const Input = forwardRef(InputBase);
