import Productcard from './tools/Productcard'

const Productslist = (products) => {
  
  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 px-5">
        {
        products?.product.length >= 0 ? 
          products?.product?.map((things) => {
            
            return (
              <Productcard key={things?.name} carddata={things} />
            );
          })
        : ""
        }
        
      </div>
    </>
  );
};

export default Productslist;
