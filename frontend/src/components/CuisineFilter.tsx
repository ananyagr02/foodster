import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, Filter, X } from "lucide-react";
import { Button } from "./ui/button";
import { cuisineList } from "@/config/restaurant-options-config";
import { cn } from "@/lib/utils"; // Utility to combine class names

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
};

const CuisineFilter = ({ onChange, selectedCuisines }: Props) => {
  const [tempSelectedCuisines, setTempSelectedCuisines] = React.useState<string[]>(
    selectedCuisines
  );

  const handleCuisineSelect = (cuisine: string) => {
    const newCuisinesList = tempSelectedCuisines.includes(cuisine)
      ? tempSelectedCuisines.filter((item) => item !== cuisine)
      : [...tempSelectedCuisines, cuisine];
    setTempSelectedCuisines(newCuisinesList);
  };

  const handleCuisinesReset = () => setTempSelectedCuisines([]);

  const handleApplyFilters = () => {
    onChange(tempSelectedCuisines);
  };

  return (
    <div className="flex justify-between items-center space-x-4">
      {/* Filter Button with Count */}
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button
            variant="outline"
            className="flex items-center px-4 py-2 text-sm w-full bg-orange text-white border border-transparent hover:bg-cream hover:border-green transition-colors"
            >
            <Filter className="mr-2" size={18} />
            Filter By Cuisine
            <div className="ml-2 w-5 h-5 flex items-center justify-center text-xs font-semibold text-white bg-green rounded-full">
              {selectedCuisines.length}
            </div>
          </Button>
        </Dialog.Trigger>

        {/* Dialog Content */}
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
          <Dialog.Content
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cream rounded-lg shadow-lg p-6 z-50 w-[90%] max-w-3xl"
          >
            {/* Dialog Header */}
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold">
                Select Cuisines
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-gray-500 hover:text-gray-800">
                  <X size={20} />
                </button>
              </Dialog.Close>
            </div>

            {/* Cuisines Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {cuisineList.map((cuisine) => (
                <div
                  key={cuisine}
                  onClick={() => handleCuisineSelect(cuisine)}
                  className={cn(
                    "flex items-center px-4 py-2 cursor-pointer rounded-lg border",
                    tempSelectedCuisines.includes(cuisine)
                      ? "bg-orange border-orange text-white"

                      : "bg-green text-white border-green hover:bg-green-600"

                  )}
                >
                  {tempSelectedCuisines.includes(cuisine) && (
                    <Check size={20} strokeWidth={3} className="mr-2" />
                  )}
                  {cuisine}
                </div>
              ))}
            </div>

            {/* Dialog Footer */}
            <div className="flex justify-end mt-6 space-x-4">
              <Button variant="outline" onClick={handleCuisinesReset} className="bg-cream border-green text-black hover:bg-green-100 hover:scale-105 transition-transform">
                Reset Filters
              </Button>
              <Dialog.Close asChild>
                <Button variant="default" onClick={handleApplyFilters}  className="bg-orange text-white hover:bg-orange hover:scale-105 transition-transform">
                  Apply Filters
                </Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default CuisineFilter;