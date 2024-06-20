import { useOpenCategory } from "@/features/categories/hooks/useOpenCategory";
import { TriangleAlert } from "lucide-react";

type Props = {
  id: string;
  category: string | null;
  categoryId: string | null;
};

export const CategoryColumn = ({ id, category, categoryId }: Props) => {
  const { onOpen } = useOpenCategory();

  const onClick = () => {
    if (categoryId) {
      onOpen(categoryId);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center hover:underline cursor-pointer ${
        !category && "text-rose-500"
      }`}
    >
      {!category && <TriangleAlert className="mr-2 size-4 shrink-0" />}
      {category || "Uncategorized"}
    </div>
  );
};
