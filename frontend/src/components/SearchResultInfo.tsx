import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};
const toCamelCase = (text: string) => {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} Restaurants found in {toCamelCase(city)}
        <Link
          to="/"
          className="ml-1 text-sm font-semibold underline cursor-pointer text-orange"
          style={{ color: "#06A77D" }}
        >
        Change Location
        </Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;
