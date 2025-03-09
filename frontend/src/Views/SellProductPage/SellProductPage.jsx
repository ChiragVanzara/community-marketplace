import AppSidebar from "@/components/CommonComponents/AppSidebar/AppSidebar";
import Navbar from "@/components/CommonComponents/Navbar/Navbar";
import HomePageNavbar from "@/components/HomePageComponents/HomePageNavbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useProductContext } from "@/context/ProductProvider";
import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import React, { useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "sonner";

const SellProductPage = ({edit=false}, id='', product={}) => {
  const inputRef = useRef();
  const { sellProduct } = useProductContext();

  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [details, setDetails] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;

  const addDetail = () => {
    const input = document.getElementById("details");
    setDetails([...details, input.value]);
    input.value = "";
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 12) {
      setError("You can upload up to 12 images only.");
      return;
    }

    setIsUploading(true);
    setError("");

    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", upload_preset);

        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
            formData
          );
          return response.data.secure_url;
        } catch (error) {
          setError("Image upload failed. Please try again.");
          console.log(error);
          return null;
        }
      })
    );

    const validImages = uploadedImages.filter((url) => url !== null);
    const updatedImages = [...images, ...validImages];

    setImages(updatedImages);
    setIsUploading(false);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || images.length === 0) {
      toast.error("Name, price, and at least one image are required!");
      return;
    }

    const productData = {
      name,
      price,
      images,
      details,
      category
    };

    await sellProduct(productData);

    setName("");
    setPrice("");
    setImages([]);
    setDetails([]);
  };

  return (
    <div className="h-screen">
      {/* <Navbar /> */}
      <SidebarProvider defaultOpen={false}>
        <AppSidebar>
          <div className="w-full sticky top-0 z-50">
            <HomePageNavbar />
          </div>
          <div className="w-full max-w-7xl grid md:grid-cols-2 mx-auto my-auto p-4 gap-2">
            <Card className="p-4">
              <CardHeader>
                <h1 className="text-2xl text-center">Sell Your Product</h1>
                <CardDescription className="text-center">
                  Provide Your Product Information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Product Name"
                />
                <Input
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Product Price"
                />
                <div className="flex items-center">
                  <Input
                    type="text"
                    id="details"
                    name="details"
                    placeholder="Add Product Detail"
                  />
                  <Button variant="outline" onClick={addDetail}>
                    <FontAwesomeIcon icon={faPlus} />
                    Add
                  </Button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {details.map((item, index) => (
                    <Badge
                      className="text-sm bg-slate-200 text-black w-full "
                      key={index}
                    >
                      {index + 1}. {item}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">{category ? `Category: ${category}` : "Choose Category"}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={category}
                        onValueChange={setCategory}
                        className="space-y-2 p-2"
                      >
                        <DropdownMenuRadioItem value="laptop">
                          Laptop
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="mobile">
                          Mobile
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="watch">
                          Watch
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="books">
                          Books
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
              <CardFooter className="flex justify-around items-center">
                <Button onClick={handleSubmit}>
                  Add Product
                  <FontAwesomeIcon icon={faArrowRight} />
                </Button>
              </CardFooter>
            </Card>
            <Card className="h-fit">
              <CardHeader>
                <h1 className="text-2xl text-center">Product Images</h1>
                <CardDescription className="text-center">
                  Add Image of Your Product from multiple side
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <div className="grid grid-cols-1 gap-2 w-full">
                  <ScrollArea className="h-[200px] w-full rounded-md border p-2 mx-auto">
                    {images.length > 0 ? (
                      images.map((image, index) => (
                        <div
                          key={index}
                          className="relative h-fit w-1/2 mx-auto mb-3"
                        >
                          <img
                            src={image}
                            className="h-[100px] w-[200px] mx-auto"
                          />
                          <div
                            onClick={() => handleDeleteImage(index)}
                            className="absolute top-0 right-8 bg-red-500 text-white rounded-full p-1 cursor-pointer"
                          >
                            <FaTimes />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center font-light">
                        Image Preview
                      </div>
                    )}
                  </ScrollArea>
                  <div
                    className="border-2 border-dashed h-[100px] w-full flex items-center justify-center"
                    onClick={() => inputRef.current.click()}
                  >
                    {isUploading ? (
                      <span>Uploading...</span>
                    ) : (
                      <FontAwesomeIcon icon={faPlus} />
                    )}
                  </div>
                </div>
                <Input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  name="productImage"
                  ref={inputRef}
                  className="hidden"
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </CardContent>
            </Card>
          </div>
        </AppSidebar>
      </SidebarProvider>
    </div>
  );
};

export default SellProductPage;
