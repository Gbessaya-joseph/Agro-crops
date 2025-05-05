import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import Image  from "next/image";
export default function ProductListLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {
        const items = [
            {
                id: "1",
                image: "/cereal.png",
                name: "Cereal",
                description: "A healthy breakfast option",
                price: 5.99,
            },
            {
                id: "2",
                image: "/hero_image.jpeg",
                name: "Fruit",
                description: "Fresh and juicy fruits",
                price: 2.99,
            },
            {
                id: "3",
                image: "/hero-image.jpeg",
                name: "Vegetable",
                description: "Organic vegetables",
                price: 3.49,
            },
            {
                id: "4",
                image: "/image1.jpeg",
                name: "Other",
                description: "Miscellaneous items",
                price: 4.99,
            },
        ];
    return (
        <div className="flex flex-col gap-4 m-auto max-w-4xl p-6">
            <Card className="w-full flex flex-row gap-4">
                <CardContent>
                    <Image
                        src="/cereal.png"
                        alt="Product Image"
                        width={200}
                        height={500}>   
                    </Image>
                    <CardDescription>
                        
                    </CardDescription>
                </CardContent>
                <div className="flex flex-col gap-2 justify-between p-4">
                    <Button>Contact Provider</Button>
                    <Button variant="outline">Add to Cart</Button>
                    <Button variant="link">View Details</Button>
                </div>
            </Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                    <Card key={item.id} className="w-full flex flex-col gap-2">
                        <CardContent className="flex flex-col p-2">
                            <Image
                                src={item.image}
                                alt="Product Image"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-full h-auto object-cover rounded-lg"
                            />
                            <CardDescription>
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p>${item.price}</p>
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="flex flex-row gap-2 justify-between p-4">
                            <Button variant="outline">Pass command</Button>
                            <Button className=" bg-accent/10 backdrop-blur-sm rounded-lg px-3 py-1.5  transition-transform hover:scale-x-100 text-black">
                                <ShoppingCart />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        {children}
        </div>
    );
    }