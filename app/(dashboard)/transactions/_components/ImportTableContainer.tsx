import { Dispatch, SetStateAction } from "react";

import { ImportTable } from "./ImportTable";

export interface SelectedColumnState {
  [key: string]: string | null;
}

type Props = {
  body: string[][];
  headers: string[];
  selectedColumns: SelectedColumnState;
  setSelectedColumns: Dispatch<SetStateAction<SelectedColumnState>>;
};

export const ImportTableContainer = ({
  body,
  headers,
  selectedColumns,
  setSelectedColumns,
}: Props) => {
  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumns((prev) => {
      const prevSelectedValue = { ...prev };

      for (const key in prevSelectedValue) {
        if (prevSelectedValue[key] === value) {
          prevSelectedValue[key] = null;
        }
      }

      if (value === "skip") {
        value = null;
      }

      prevSelectedValue[`column_${columnIndex}`] = value;
      return prevSelectedValue;
    });
  };

  return (
    <>
      <ImportTable
        headers={headers}
        body={body}
        selectedColumns={selectedColumns}
        onTableHeadSelectChange={onTableHeadSelectChange}
      />
    </>
  );
};
