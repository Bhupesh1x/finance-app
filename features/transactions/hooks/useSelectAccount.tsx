import { useMemo, useRef, useState } from "react";

import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";
import { useCreateAccounts } from "@/features/accounts/api/useCreateAccount";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select } from "@/components/Select";
import { Button } from "@/components/ui/button";

export const useSelectAccount = (): [
  () => JSX.Element,
  () => Promise<unknown>
] => {
  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void;
  } | null>(null);
  const selectValue = useRef<string>();

  const { data: accounts, isLoading } = useGetAccounts();
  const mutation = useCreateAccounts();

  const onCreate = (name: string) => {
    mutation.mutate({ name });
  };

  const accountsOptions = useMemo(() => {
    const options = (accounts ?? [])?.map((account) => ({
      value: account.id,
      label: account.name,
    }));

    return options ?? [];
  }, [accounts]);

  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(selectValue.current);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(undefined);
    handleClose();
  };

  const AccountDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent className="space-y-16">
        <DialogHeader>
          <DialogHeader>
            <DialogTitle>Select Account</DialogTitle>
            <DialogDescription className="mb-6">
              Select an account to continue
            </DialogDescription>
          </DialogHeader>
          <div className="h-1" />
          <Select
            onCreate={onCreate}
            options={accountsOptions}
            placeholder="Select an account"
            disabled={isLoading || mutation.isPending}
            onChange={(value) => (selectValue.current = value)}
          />
          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="button" onClick={handleConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );

  return [AccountDialog, confirm];
};
