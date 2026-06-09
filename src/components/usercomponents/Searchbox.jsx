import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Search } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { useCart } from './tools/Cardcontext'
import { useState, useEffect } from "react";

const Searchbox = () => {
    const { searchProducts } = useCart(); 
    const [search, setSearch] = useState("");
    const fetchData = () => {
      searchProducts(search); 
    };
  return (
    <>
      
        <div className="flex flex-row">
          <div className="">
            <Field>
              <Input
                id="input-demo-api-key"
                type="text"
                placeholder="Search products..."
                className="bg-white rounded-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Field>
          </div>
          <div className="flex flex-row gap-1 pl-1">
            
              <button type="button" className="bg-green-200 p-1 rounded-sm" onClick={(() => fetchData())}>
                <Search />
              </button>
              
              
                <button type="button" className="bg-green-200 p-1 rounded-sm" onClick={(() => {
                  setSearch("");
                  searchProducts("");
                  })}>
                  <CircleX />
                </button>
              
          </div>
          
          
        </div>
      
    </>
  );
};

export default Searchbox;
