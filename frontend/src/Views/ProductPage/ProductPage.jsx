import AppSidebar from "@/components/CommonComponents/AppSidebar/AppSidebar";
import HomePageNavbar from "@/components/HomePageComponents/HomePageNavbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthContext } from "@/context/AuthProvider";
import { useProductContext } from "@/context/ProductProvider";
import { FaStar } from "react-icons/fa6";
import { MdCall, MdAlternateEmail, MdLocationOn } from "react-icons/md";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { getProduct, buyProduct } = useProductContext();
  const { getUserById } = useContext(AuthContext);
  const [src, setSrc] = useState(null);
  const [seller, setSeller] = useState(null);
    const { user } = useContext(AuthContext)
  const fetch = async (id) => {
    const result = await getProduct(id);
    setProduct(result.product);
    setSrc(result.product.images[0]);
    const sellerUser = await getUserById(result.product.seller);
    setSeller(sellerUser?.user);
  };

  const isSeller = seller?.username === user?.username;
  console.log(isSeller)

  useEffect(() => {
    fetch(id);
  }, [id]);

  const handleBuy = async() => {
    const result = await buyProduct(id);
    console.log(result)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SidebarProvider defaultOpen={false}>
        <AppSidebar>
          <div className="w-full sticky top-0 z-50">
            <HomePageNavbar />
          </div>
          {!product ? (
            <div className="text-center py-10">Fetching...</div>
          ) : (
            <div className="w-full flex justify-center items-center">
              <Card className="p-4 m-4">
                <CardHeader>
                  <h1 className="text-3xl md:text-4xl font-extrabold">
                    {product?.name?.charAt(0).toUpperCase() +
                      product?.name?.slice(1)}
                  </h1>
                </CardHeader>
                <Separator />
                <CardContent className="flex flex-col md:flex-row gap-6 p-0 sm:px-6">
                  {/* Product Image Section */}
                  <div className="flex flex-col items-center md:items-start w-full md:w-1/2">
                    <img
                      src={src}
                      alt={product.name}
                      className="w-full md:w-[28rem] h-auto md:h-[24rem] rounded-xl object-cover"
                    />
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {product?.images?.map((img) => (
                        <img
                          key={img}
                          src={img}
                          alt={product.title}
                          onClick={() => setSrc(img)}
                          className={`w-20 h-20 rounded-md cursor-pointer transition-transform duration-300 object-cover ${
                            img === src
                              ? "scale-105 opacity-100"
                              : "opacity-50 hover:opacity-100 hover:scale-105"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Product Details Section */}
                  <div className="flex flex-col gap-4 w-full md:w-1/2">
                    <Card className="p-4">
                      <h2 className="text-xl font-semibold">Price:</h2>
                      <span className="text-2xl font-bold">
                        ₹{product.price}
                      </span>
                      <h2 className="text-xl font-semibold mt-4">Details:</h2>
                      <ul className="list-disc pl-6">
                        {product?.details?.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </Card>

                    {/* Seller Information */}
                    <Card className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            seller?.profileImage ||
                            "https://via.placeholder.com/100"
                          }
                          alt="profileImg"
                          className="rounded-full h-16 w-16 object-cover"
                        />
                        <div>
                          <span className="font-medium text-lg">
                            {seller?.fullName}
                          </span>
                          <p className="text-gray-500">@{seller?.username}</p>
                        </div>
                        <div className="flex flex-col items-center border rounded-xl px-3 py-1">
                          <FaStar className="text-yellow-400" />
                          <span className="font-medium">{seller?.rating}</span>
                        </div>
                      </div>
                      <h2 className="font-bold mt-4">Contact Details:</h2>
                      <div className="space-y-2">
                        <span className="flex items-center gap-2">
                          <MdCall className="text-green-600" /> {seller?.phone}
                        </span>
                        <span className="flex items-center gap-2">
                          <MdAlternateEmail className="text-blue-600" />{" "}
                          {seller?.email}
                        </span>
                        <span className="flex items-center gap-2">
                          <MdLocationOn className="text-red-600" />{" "}
                          {seller?.address}
                        </span>
                      </div>
                    </Card>
                  </div>
                </CardContent>

                <Button onClick={handleBuy} disabled={isSeller} variant={isSeller ? "ghost" : "default"}>
                    {isSeller ? "This is your product, you can't buy it!": "Buy"}
                </Button>
              </Card>
            </div>
          )}
        </AppSidebar>
      </SidebarProvider>
    </div>
  );
}

export default ProductPage;
