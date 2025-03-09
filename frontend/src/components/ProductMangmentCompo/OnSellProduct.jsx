import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useProductContext } from "@/context/ProductProvider";

const OnSellProduct = ({ products }) => {
  const { deleteProduct } = useProductContext();
  return (
    <div className="">
      {/* <Button asChild className='mx-auto' variant='ghost'>
        <Link to='/sell-product'>
          <FontAwesomeIcon icon={faPlus} size='lg' />
          Sell Product
        </Link>
      </Button> */}
      <ul className="space-y-4">
        {products &&
          products.map((item) => (
            <li key={item._id} className="flex justify-between items-center border px-3 py-2 rounded-lg">
              <span>{item.name}</span>
              <div className="">
                <Link to={`/edit-product/${item._id}`}>
                  <Button className="mr-2" variant="outline">
                    Edit
                  </Button>
                </Link>
                <Button onClick={() => deleteProduct(item?._id )} className="ml-2" variant="destructive">
                  Delete
                </Button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default OnSellProduct;
