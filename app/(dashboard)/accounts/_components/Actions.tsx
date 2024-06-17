import { Edit, MoreVertical } from "lucide-react";

import { useOpenAccount } from "@/features/accounts/hooks/useOpenAccount";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenAccount();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-8 p-0" variant="ghost">
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right">
          <DropdownMenuItem disabled={false} onClick={() => onOpen(id)}>
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
