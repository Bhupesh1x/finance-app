import { useOpenAccount } from "@/features/accounts/hooks/useOpenAccount";

type Props = {
  account: string;
  accountId: string;
};

export const AccountColumn = ({ account, accountId }: Props) => {
  const { onOpen } = useOpenAccount();

  const onClick = () => {
    onOpen(accountId);
  };

  return (
    <div
      onClick={onClick}
      className="flex items-center hover:underline cursor-pointer"
    >
      {account}
    </div>
  );
};
