import AppSidebar from "@/components/CommonComponents/AppSidebar/AppSidebar";
import Footer from "@/components/CommonComponents/Footer/Footer";
import HomePageNavbar from "@/components/HomePageComponents/HomePageNavbar";
import OnSellProduct from "@/components/ProductMangmentCompo/OnSellProduct";
import ProducManageGrid from "@/components/ProductMangmentCompo/ProducManageGrid";
import SoldProduct from "@/components/ProductMangmentCompo/SoldProduct";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductProvider, useProductContext } from "@/context/ProductProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ProductManagmentPage = () => {
  const navigate = useNavigate();
  const { getProductsBySeller, products } = useProductContext(ProductProvider);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/sign-in");
    }
    getProductsBySeller();
  }, []);

  //   console.log(products);
  return (
    <div className="h-screen">
      <SidebarProvider defaultOpen={false}>
        <AppSidebar>
          <div className="w-full sticky top-0 z-50">
            <HomePageNavbar />
          </div>
          {!products ? (
            <div>Fetching...</div>
          ) : (
            <div className="p-4">
              <div>
                <ProducManageGrid products={products} />
              </div>
              <Separator className="my-4" />
              <div className="">
                <div className="flex justify-between items-center w-1/2 mx-auto">
                  <h2 className="text-3xl mb-5">Your Products</h2>
                  <Button asChild variant="default">
                    <Link to="/sell-product">
                      <FontAwesomeIcon icon={faPlus} size="lg" />
                      Sell Product
                    </Link>
                  </Button>
                </div>

                <Tabs defaultValue="onsell">
                  <TabsList className="h-fit md:w-1/2 mx-auto">
                    <TabsTrigger value="onsell" className="text-xl">
                      Product on Sell
                    </TabsTrigger>
                    <TabsTrigger value="sold" className="text-xl">
                      Sold Product
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="onsell" className="md:w-1/2 mx-auto">
                    <OnSellProduct products={products} />
                  </TabsContent>
                  <TabsContent value="sold" className="mx-auto">
                    <SoldProduct />
                  </TabsContent>
                </Tabs>
              </div>
              <Separator className="my-4" />
              <div>
                <Footer />
              </div>
            </div>
          )}
        </AppSidebar>
      </SidebarProvider>
    </div>
  );
};

export default ProductManagmentPage;
