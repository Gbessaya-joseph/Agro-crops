'use client';
import { Button } from "@/components/ui/button";
import { ImageUploadDemo } from "@/components/ui/image-uplod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LabelInputContainer } from "@/components/ui/signup-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useId, useState } from "react";

export default function CreateProductPage() {
  const items = [
    { id: "1", name: "Fruit" },
    { id: "2", name: "Vegetable" },
    { id: "3", name: "Cereal" },
    { id: "4", name: "Other" },
  ];
  const id = useId();
  const [selectedValue, setSelectedValue] = useState("1");
  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    console.log("Selected value:", value);
  };
  return (
    <div className="w-full flex flex-col gap-4 m-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold">Create Product</h1>
      <p className="text-base text-muted-foreground">
        Create a new product by filling out the form below.
      </p>
      <div className="w-full space-y-8 rounded-xl border border-border bg-card p-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <form action="" className="w-full flex flex-col gap-6">
            {/* Do not forget to add the action */}
            {/* Select option for the following input to provide product categories */}
            <div className="space-y-2 min-w-[300px]">
              <Label htmlFor={id}>Product category</Label>
              <Select defaultValue="1"
                onValueChange={handleSelectChange}
                value={selectedValue}>
                <SelectTrigger id={id}>
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent 
                className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2"
                >
                  {items.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* show input field if the user selects "Other" */}
            </div>
            {selectedValue === "4" && (
                <LabelInputContainer>
                  <Label htmlFor="other-category">Other Category</Label>
                  <Input
                    id="other-category"
                    placeholder="Other Category"
                    type="text"
                    name="other-category"
                    required
                  />
                </LabelInputContainer>
              )}
            <LabelInputContainer>
              <Label htmlFor="product-name">Product Name</Label>
              <Input
                id="product-name"
                placeholder="Product Name"
                type="text"
                name="product-name"
                required
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="product-description">Product Description</Label>
              <textarea
              id="product-description"
              placeholder="Product Description"
              name="product-description"
              required
              className="border rounded-md p-2 w-full"
              ></textarea>
            </LabelInputContainer>
          </form>
          <ImageUploadDemo />
        </div>
        <div className="flex justify-end">
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  );
}