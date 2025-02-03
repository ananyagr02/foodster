import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
};

const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className={`flex items-center gap-3 justify-between flex-row shadow-lg shadow-black rounded-full p-1 max-w-xl w-full${
//           form.formState.errors.searchQuery && "border-green-800"
//         }`}
//       >
//         <Search
//           strokeWidth={2.5}
//           size={30}
//           className="ml-1 text-black hidden md:block"
//         />
//         <FormField
//           control={form.control}
//           name="searchQuery"
//           render={({ field }) => (
//             <FormItem className="flex-1">
//               <FormControl>
//                 <Input
//                   {...field}
//                   className="border-none shadow-none text-xl focus-visible:ring-0"
//                   placeholder={placeHolder}
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <Button
//           onClick={handleReset}
//           type="button"
//           variant="outline"
//           className="rounded-full"
//         >
//           Reset
//         </Button>
//         <Button type="submit" className="rounded-full bg-black">
//           Search
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default SearchBar;


return (
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={`search-bar flex items-center gap-3 justify-between flex-row rounded-full p-1 max-w-xl w-full ${
        form.formState.errors.searchQuery ? "shadow-[0px_0px_20px_5px_rgba(0,128,0,0.5)]" : ""
      }`}
      style={{
        maxWidth: "600px",
        boxShadow: `0px 10px 20px rgba(0, 0, 0, 0.25), 
                    0px 0px 15px rgba(0, 0, 0, 0.2)`,
      }}
    >
      <Search
        strokeWidth={2.5}
        size={30}
        className="ml-1 p-1 text-black hidden md:block"
      />
      <FormField
        control={form.control}
        name="searchQuery"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormControl>
              <Input
                {...field}
                className="border-none shadow-none text-xl focus-visible:ring-0"
                placeholder={placeHolder}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <Button
        onClick={handleReset}
        type="button"
        variant="outline"
        className="rounded-full py-5 border-green bg-cream"
      >
        Reset
      </Button>
      <Button type="submit" className="rounded-full bg-green py-5">
        Search
      </Button>
    </form>
  </Form>
);
};
export default SearchBar;