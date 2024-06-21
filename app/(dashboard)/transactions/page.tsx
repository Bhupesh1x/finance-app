"use client";

import { format, parse } from "date-fns";
import { useMemo, useState } from "react";

import { convertAmountToMilliunits } from "@/lib/utils";

import { UplaodButton } from "./_components/UplaodButton";
import { AddNewButton } from "./_components/AddNewButton";
import { TransactionsTable } from "./_components/TransactionsTable";
import {
  ImportTableContainer,
  SelectedColumnState,
} from "./_components/ImportTableContainer";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

const requiredOptions = ["amount", "date", "payee"];

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

function TransactionsPage() {
  const [vaiant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnState>(
    {}
  );

  const headers: string[] = importResults.data[0];
  const body: string[][] = importResults.data.slice(1);

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancel = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
    setSelectedColumns({});
  };

  const progress = useMemo(
    () => Object.values(selectedColumns).filter(Boolean).length,
    [selectedColumns]
  );

  const onContinue = () => {
    const mappedData = {
      headers: headers.map((_header, index) => {
        return selectedColumns[`column_${index}`] || null;
      }),
      body: body
        .map((row) => {
          const transformedRow = row.map((cell, index) =>
            selectedColumns[`column_${index}`] ? cell : null
          );

          return transformedRow.every((item) => item === null)
            ? []
            : transformedRow;
        })
        .filter((row) => row.length > 0),
    };

    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell, index) => {
        const header = mappedData.headers[index];

        if (header) {
          acc[header] = cell;
        }

        return acc;
      }, {});
    });

    const formattedData = arrayOfData.map((data) => ({
      ...data,
      amount: convertAmountToMilliunits(data.amount),
      date: format(parse(data.date, dateFormat, new Date()), outputFormat),
    }));

    console.log(formattedData);
  };

  return (
    <div className="w-full -mt-24 pb-10 max-w-screen-2xl mx-auto">
      <Card className="border-none drop-shadow-md">
        <CardHeader className="gap-y-2 flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <CardTitle>
            {vaiant === VARIANTS.LIST
              ? "Transactions History"
              : "Import Transaction"}
          </CardTitle>
          {vaiant === VARIANTS.LIST ? (
            <div className="flex items-center gap-x-2">
              <AddNewButton />
              <UplaodButton onUpload={onUpload} />
            </div>
          ) : (
            <div className="flex items-center gap-x-2">
              <Button onClick={onCancel} className="w-full lg:w-auto">
                Cancel
              </Button>
              <Button
                onClick={onContinue}
                className="w-full lg:w-auto"
                disabled={progress < requiredOptions.length}
              >
                Continue ({progress} / {requiredOptions.length} )
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {vaiant === VARIANTS.LIST ? (
            <TransactionsTable />
          ) : (
            <ImportTableContainer
              body={body}
              headers={headers}
              selectedColumns={selectedColumns}
              setSelectedColumns={setSelectedColumns}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default TransactionsPage;
