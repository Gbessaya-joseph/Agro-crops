import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const { fieldContext, formContext } = createFormHookContexts()

const { useAppForm } = createFormHook({
    fieldComponents: {
      TextField: Input,
    },
    formComponents: {
      SubmitButton: Button,
    },
    fieldContext,
    formContext,
  })

export default useAppForm;