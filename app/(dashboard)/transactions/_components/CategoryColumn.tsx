import { TriangleAlert } from "lucide-react";

import { useOpenCategory } from "@/features/categories/hooks/useOpenCategory";
import { useOpenTransaction } from "@/features/transactions/hooks/useOpenTransaction";

type Props = {
  id: string;
  category: string | null;
  categoryId: string | null;
};

export const CategoryColumn = ({ id, category, categoryId }: Props) => {
  const { onOpen: openCategory } = useOpenCategory();
  const { onOpen: openTransaction } = useOpenTransaction();

  const onClick = () => {
    if (categoryId) {
      openCategory(categoryId);
    } else {
      openTransaction(id);
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
