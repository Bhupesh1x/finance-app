import { AddNewButton } from "./_components/AddNewButton";
import { AccountsTable } from "./_components/AccountsTable";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AccountsPage() {
  return (
    <div className="w-full -mt-24 pb-10 max-w-screen-2xl mx-auto">
      <Card className="border-none drop-shadow-md">
        <CardHeader className="gap-y-2 flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <CardTitle>Accounts Page</CardTitle>
          <AddNewButton />
        </CardHeader>
        <CardContent>
          <AccountsTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default AccountsPage;
