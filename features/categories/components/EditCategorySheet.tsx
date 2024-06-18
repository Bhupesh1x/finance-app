import { z } from "zod";
import { useMemo } from "react";
import { Loader2 } from "lucide-react";

import { useConfirm } from "@/hooks/useConfirm";
import { insertCategorySchema } from "@/db/schema";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { CategoryForm } from "./CategoryForm";
import { useGetCategory } from "../api/useGetCategory";
import { useEditCategory } from "../api/useEditCategory";
import { useOpenCategory } from "../hooks/useOpenCategory";
import { useDeleteCategory } from "../api/useDeleteCategory";

const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();

  const { data, isLoading } = useGetCategory(id);

  const [ConfirmDialog, confirm] = useConfirm({
    title: "Are you sure?",
    description: "You are about to delete this category.",
  });

  const mutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);

  const disabled = mutation.isPending || deleteMutation.isPending;

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = useMemo(() => {
    const name = data ? { name: data.name } : { name: "" };
    return name;
  }, [data]);

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-2">
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit an existing category.</SheetDescription>
          </SheetHeader>

          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <CategoryForm
              id={id}
              onSubmit={onSubmit}
              disabled={disabled}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
