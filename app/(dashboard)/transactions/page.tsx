import { AddNewButton } from "./_components/AddNewButton";
import { TransactionsTable } from "./_components/TransactionsTable";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function TransactionsPage() {
  return (
    <div className="w-full -mt-24 pb-10 max-w-screen-2xl mx-auto">
      <Card className="border-none drop-shadow-md">
        <CardHeader className="gap-y-2 flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <CardTitle>Transactions History</CardTitle>
          <AddNewButton />
        </CardHeader>
        <CardContent>
          <TransactionsTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default TransactionsPage;
