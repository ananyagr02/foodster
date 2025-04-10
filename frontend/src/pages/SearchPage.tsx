
// import { useSearchRestaurants } from "@/api/RestaurantApi";
// import CuisineFilter from "@/components/CuisineFilter";
// import PaginationSelector from "@/components/PaginationSelector";
// import SearchBar, { SearchForm } from "@/components/SearchBar";
// import SearchResultCard from "@/components/SearchResultCard";
// import SearchResultInfo from "@/components/SearchResultInfo";
// import SortOptionDropdown from "@/components/SortOptionDropdown";
// import { useState } from "react";
// import { useParams } from "react-router-dom";

// export type SearchState = {
//   searchQuery: string;
//   page: number;
//   selectedCuisines: string[];
//   sortOption: string;
// };

// const SearchPage = () => {
//   const { city } = useParams();
//   const [searchState, setSearchState] = useState<SearchState>({
//     searchQuery: "",
//     page: 1,
//     selectedCuisines: [],
//     sortOption: "bestMatch",
//   });

//   const { results, isLoading } = useSearchRestaurants(searchState, city);

//   const setSortOption = (sortOption: string) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       sortOption,
//       page: 1,
//     }));
//   };

//   const setSelectedCuisines = (selectedCuisines: string[]) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       selectedCuisines,
//       page: 1,
//     }));
//   };

//   const setPage = (page: number) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       page,
//     }));
//   };

//   const setSearchQuery = (searchFormData: SearchForm) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       searchQuery: searchFormData.searchQuery,
//       page: 1,
//     }));
//   };

//   const resetSearch = () => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       searchQuery: "",
//       page: 1,
//     }));
//   };

//   if (isLoading) {
//     return <span>Loading ...</span>;
//   }

//   if (!results?.data || !city) {
//     return <span>No results found</span>;
//   }

//   return (
//     <div className="flex flex-col gap-5">
//       {/* Filter, Sort, and Search Row */}
//       <div className="flex flex-wrap items-center gap-4">
//         <CuisineFilter
//           selectedCuisines={searchState.selectedCuisines}
//           onChange={setSelectedCuisines}
//         />
//         <SortOptionDropdown
//           sortOption={searchState.sortOption}
//           onChange={(value) => setSortOption(value)}
//         />

//         <SearchBar
//           searchQuery={searchState.searchQuery}
//           onSubmit={setSearchQuery}
//           placeHolder="Search by Cuisine or Restaurant Name"
//           onReset={resetSearch}
//         />
//       </div>

//       {/* Results Info */}
//       <div className="text-sm font-semibold">
//         <SearchResultInfo total={results.pagination.total} city={city} />
//       </div>

//       {/* Restaurant Cards */}
//       <div className="grid gap-5">
//         {results.data.map((restaurant) => (
//           <SearchResultCard  restaurant={restaurant} />
//         ))}
//       </div>

//       {/* Pagination */}
//       <PaginationSelector
//         page={results.pagination.page}
//         pages={results.pagination.pages}
//         onPageChange={setPage}
//       />
//     </div>
//   );
// };

// export default SearchPage;












// import { useSearchRestaurants } from "@/api/RestaurantApi";
// import CuisineFilter from "@/components/CuisineFilter";
// import PaginationSelector from "@/components/PaginationSelector";
// import SearchBar, { SearchForm } from "@/components/SearchBar";
// import SearchResultCard from "@/components/SearchResultCard";
// import SearchResultInfo from "@/components/SearchResultInfo";
// import SortOptionDropdown from "@/components/SortOptionDropdown";
// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { X } from "lucide-react"; // For cross icon

// export type SearchState = {
//   searchQuery: string;
//   page: number;
//   selectedCuisines: string[];
//   sortOption: string;
//   vegetarian: boolean; // Added to track vegetarian filter
//   nonVegetarian: boolean; // Added to track non-vegetarian filter
// };

// const SearchPage = () => {
//   const { city } = useParams();
//   const [searchState, setSearchState] = useState<SearchState>({
//     searchQuery: "",
//     page: 1,
//     selectedCuisines: [],
//     sortOption: "bestMatch",
//     vegetarian: false, // Initially not selected
//     nonVegetarian: false, // Initially not selected
//   });

//   const { results, isLoading } = useSearchRestaurants(searchState, city);

//   const setSortOption = (sortOption: string) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       sortOption,
//       page: 1,
//     }));
//   };

//   const setSelectedCuisines = (selectedCuisines: string[]) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       selectedCuisines,
//       page: 1,
//     }));
//   };

//   const setPage = (page: number) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       page,
//     }));
//   };

//   const setSearchQuery = (searchFormData: SearchForm) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       searchQuery: searchFormData.searchQuery,
//       page: 1,
//     }));
//   };

//   const resetSearch = () => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       searchQuery: "",
//       page: 1,
//     }));
//   };

//   const toggleVegetarian = () => {
//     setSearchState((prevState) => {
//       const updatedCuisines = prevState.vegetarian
//         ? prevState.selectedCuisines.filter((cuisine) => cuisine !== "Vegetarian")
//         : [...prevState.selectedCuisines, "Vegetarian"];
      
//       return {
//         ...prevState,
//         vegetarian: !prevState.vegetarian,
//         selectedCuisines: updatedCuisines,
//       };
//     });
//   };

//   const toggleNonVegetarian = () => {
//     setSearchState((prevState) => {
//       const updatedCuisines = prevState.nonVegetarian
//         ? prevState.selectedCuisines.filter((cuisine) => cuisine !== "Non-Vegetarian")
//         : [...prevState.selectedCuisines, "Non-Vegetarian"];
      
//       return {
//         ...prevState,
//         nonVegetarian: !prevState.nonVegetarian,
//         selectedCuisines: updatedCuisines,
//       };
//     });
//   };

//   if (isLoading) {
//     return <span>Loading ...</span>;
//   }

//   if (!results?.data || !city) {
//     return <span>No results found</span>;
//   }

//   return (
//     <div className="flex flex-col gap-5">
//       {/* Filter, Sort, and Search Row */}
//       <div className="flex flex-wrap items-center gap-4">
//         <CuisineFilter
//           selectedCuisines={searchState.selectedCuisines}
//           onChange={setSelectedCuisines}
//         />
//         <SortOptionDropdown
//           sortOption={searchState.sortOption}
//           onChange={(value) => setSortOption(value)}
//         />

//         {/* Vegetarian and Non-Vegetarian Buttons */}
//         <div className="flex space-x-2">
//           {/* Vegetarian Button */}
//           <button
//             onClick={toggleVegetarian}
//             className={`px-4 py-2 text-sm rounded-full flex items-center ${
//               searchState.vegetarian
//                 ? "bg-green-600 text-white"
//                 : "bg-gray-200 text-gray-800"
//             }`}
//           >
//             Vegetarian
//             {searchState.vegetarian && (
//               <X className="ml-2" size={16} />
//             )}
//           </button>

//           {/* Non-Vegetarian Button */}
//           <button
//             onClick={toggleNonVegetarian}
//             className={`px-4 py-2 text-sm rounded-full flex items-center ${
//               searchState.nonVegetarian
//                 ? "bg-red-600 text-white"
//                 : "bg-gray-200 text-gray-800"
//             }`}
//           >
//             Non-Vegetarian
//             {searchState.nonVegetarian && (
//               <X className="ml-2" size={16} />
//             )}
//           </button>
//         </div>

//         {/* Search Bar */}
//         <SearchBar
//           searchQuery={searchState.searchQuery}
//           onSubmit={setSearchQuery}
//           placeHolder="Search by Cuisine or Restaurant Name"
//           onReset={resetSearch}
//         />
//       </div>

//       {/* Results Info */}
//       <div className="text-sm font-semibold">
//         <SearchResultInfo total={results.pagination.total} city={city} />
//       </div>

//       {/* Restaurant Cards */}
//       <div className="grid gap-5">
//         {results.data.map((restaurant) => (
//           <SearchResultCard restaurant={restaurant} />
//         ))}
//       </div>

//       {/* Pagination */}
//       <PaginationSelector
//         page={results.pagination.page}
//         pages={results.pagination.pages}
//         onPageChange={setPage}
//       />
//     </div>
//   );
// };

// export default SearchPage;


// import { useSearchRestaurants } from "@/api/RestaurantApi";
// import CuisineFilter from "@/components/CuisineFilter";
// import PaginationSelector from "@/components/PaginationSelector";
// import SearchBar, { SearchForm } from "@/components/SearchBar";
// import SearchResultCard from "@/components/SearchResultCard";
// import SearchResultInfo from "@/components/SearchResultInfo";
// import SortOptionDropdown from "@/components/SortOptionDropdown";
// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { X } from "lucide-react"; // For cross icon

// export type SearchState = {
//   searchQuery: string;
//   page: number;
//   selectedCuisines: string[];
//   sortOption: string;
//   vegetarian: boolean; // Added to track vegetarian filter
//   nonVegetarian: boolean; // Added to track non-vegetarian filter
// };

// const SearchPage = () => {
//   const { city } = useParams();
//   const [searchState, setSearchState] = useState<SearchState>({
//     searchQuery: "",
//     page: 1,
//     selectedCuisines: [],
//     sortOption: "bestMatch",
//     vegetarian: false, // Initially not selected
//     nonVegetarian: false, // Initially not selected
//   });

//   const { results, isLoading } = useSearchRestaurants(searchState, city);
// console.log("results: ",results)
//   const setSortOption = (sortOption: string) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       sortOption,
//       page: 1,
//     }));
//   };

//   const setSelectedCuisines = (selectedCuisines: string[]) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       selectedCuisines,
//       page: 1,
//     }));
//   };

//   const setPage = (page: number) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       page,
//     }));
//   };

//   const setSearchQuery = (searchFormData: SearchForm) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       searchQuery: searchFormData.searchQuery,
//       page: 1,
//     }));
//   };

//   const resetSearch = () => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       searchQuery: "",
//       page: 1,
//     }));
//   };

//   const toggleVegetarian = () => {
//     setSearchState((prevState) => {
//       const updatedCuisines = prevState.vegetarian
//         ? prevState.selectedCuisines.filter((cuisine) => cuisine !== "Vegetarian")
//         : [...prevState.selectedCuisines, "Vegetarian"];
      
        
//       return {
//         ...prevState,
//         vegetarian: !prevState.vegetarian,
//         selectedCuisines: updatedCuisines,
//       };
//     });
//   };

//   const toggleNonVegetarian = () => {
//     setSearchState((prevState) => {
//       const updatedCuisines = prevState.nonVegetarian
//         ? prevState.selectedCuisines.filter((cuisine) => cuisine !== "Non-Vegetarian")
//         : [...prevState.selectedCuisines, "Non-Vegetarian"];
      
//       return {
//         ...prevState,
//         nonVegetarian: !prevState.nonVegetarian,
//         selectedCuisines: updatedCuisines,
//       };
//     });
//   };

//   if (isLoading) {
//     return <span>Loading ...</span>;
//   }

//   if (!results?.data || !city) {
//     return <span>No results found</span>;
//   }

//   return (
//     <div className="flex flex-col gap-5">
//       {/* Filter, Sort, and Search Row */}
//       <div className="flex flex-wrap items-center gap-4">
//         <CuisineFilter
//           selectedCuisines={searchState.selectedCuisines}
//           onChange={setSelectedCuisines}
//         />
//         <SortOptionDropdown
//           sortOption={searchState.sortOption}
//           onChange={(value) => setSortOption(value)}
//         />

//         {/* Vegetarian and Non-Vegetarian Buttons */}
//         <div className="flex space-x-2">
//           <button
//             onClick={toggleVegetarian}
//             className={`px-4 py-2 text-sm rounded-full flex items-center ${searchState.vegetarian ? "bg-green-600 text-white" : "bg-orange text-gray-800"}`}
//           >
//             Vegetarian
//             {searchState.vegetarian && <X className="ml-2" size={16} />}
//           </button>

//           <button
//             onClick={toggleNonVegetarian}
//             className={`px-4 py-2 text-sm rounded-full flex items-center ${searchState.nonVegetarian ? "bg-red-600 text-white" : "bg-orange text-gray-800"}`}
//           >
//             Non-Vegetarian
//             {searchState.nonVegetarian && <X className="ml-2" size={16} />}
//           </button>
//         </div>

//         {/* Search Bar */}
//         <SearchBar
//           searchQuery={searchState.searchQuery}
//           onSubmit={setSearchQuery}
//           placeHolder="Search by Cuisine or Restaurant Name"
//           onReset={resetSearch}
//         />
//       </div>

//       {/* Results Info */}
//       <div className="text-sm font-semibold">
//         <SearchResultInfo total={results.pagination.total} city={city} />
//       </div>

//       {/* Restaurant Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
//         {results.data.map((restaurant) => (
//           <SearchResultCard key={restaurant._id} restaurant={restaurant} />
//         ))}
//       </div>

//       {/* Pagination */}
//       <PaginationSelector
//         page={results.pagination.page}
//         pages={results.pagination.pages}
//         onPageChange={setPage}
//       />
//     </div>
//   );
// };

// export default SearchPage;





// SearchPage.tsx
import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { X } from "lucide-react";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
  vegetarian: boolean;
  nonVegetarian: boolean;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
    vegetarian: false,
    nonVegetarian: false,
  });

  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  const toggleVegetarian = () => {
    setSearchState((prevState) => {
      const updatedCuisines = prevState.vegetarian
        ? prevState.selectedCuisines.filter((cuisine) => cuisine !== "Vegetarian")
        : [...prevState.selectedCuisines, "Vegetarian"];

      return {
        ...prevState,
        vegetarian: !prevState.vegetarian,
        selectedCuisines: updatedCuisines,
      };
    });
  };

  const toggleNonVegetarian = () => {
    setSearchState((prevState) => {
      const updatedCuisines = prevState.nonVegetarian
        ? prevState.selectedCuisines.filter((cuisine) => cuisine !== "Non-Vegetarian")
        : [...prevState.selectedCuisines, "Non-Vegetarian"];

      return {
        ...prevState,
        nonVegetarian: !prevState.nonVegetarian,
        selectedCuisines: updatedCuisines,
      };
    });
  };

  if (isLoading) {
    return <span>Loading ...</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found</span>;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-4">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
        />
        <SortOptionDropdown
          sortOption={searchState.sortOption}
          onChange={(value) => setSortOption(value)}
        />

        <div className="flex space-x-2">
          <button
            onClick={toggleVegetarian}
            className={`px-4 py-2 text-sm rounded-lg flex items-center font-semibold ${
              searchState.vegetarian ? "bg-cream border border-green text-black font-bold" : "bg-orange text-white"
            }`}
            
          >
            Vegetarian
            {searchState.vegetarian && <X className="ml-2" size={16} />}
          </button>

          <button
            onClick={toggleNonVegetarian}
            className={`px-4 py-2 text-sm rounded-lg flex items-center font-semibold ${
              searchState.nonVegetarian ? "bg-cream border border-green text-black font-bold" : "bg-orange text-white"
            }`}
            
          >
            Non-Vegetarian
            {searchState.nonVegetarian && <X className="ml-2" size={16} />}
          </button>
        </div>

        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        />
      </div>

      <div className="text-sm font-semibold">
        <SearchResultInfo total={results.pagination.total} city={city} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {results.data.map((restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>

      <PaginationSelector
        page={results.pagination.page}
        pages={results.pagination.pages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default SearchPage;
