import DateFilter from "./DateFilter";
import { AccountFilter } from "./AccountFilter";

const Filters = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-2 lg:gap-y-0 lg:gap-x-2 mt-4">
      <AccountFilter />
      <DateFilter />
    </div>
  );
};

export default Filters;
