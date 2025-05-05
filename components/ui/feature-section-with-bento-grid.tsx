import { User } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTractor } from '@fortawesome/free-solid-svg-icons'

function Feature() {
  return (
    <div className="bg-gray-600 w-full py-8 lg:py-12">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-400 rounded-lg h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col text-white gap-2">
                <div className="w-16 h-16 rounded-full bg-gray-500 flex items-center justify-center p-2 mt-2">
                <FontAwesomeIcon icon={faTractor} />
                </div>
              <h3 className="text-3xl tracking-tight font-bold">From Our Lands to Your Table</h3>
              <p className="text-muted-foreground  text-xl">
              Discover the richness and authenticity of local agriculture. Fresh, 
              carefully grown, and directly delivered from trusted farmers.
              </p>
            </div>
            <div className="bg-muted rounded-md  aspect-square p-6 flex justify-between flex-col">
              <div className="w-16 h-16 rounded-full bg-gray-500 flex items-center justify-center p-2 mt-2">
                <User className="w-8 h-8 stroke-3" />
                </div>
              <div className="flex flex-col">
              <h3 className="text-3xl tracking-tight font-bold">Smart Order Management</h3>
              <p className="text-muted-foreground max-w-xs text-base">
              Track, manage, and optimize your orders in real-time to boost 
              your efficiency and grow your business smoothly.
              </p>
              </div>
            </div>

            <div className="bg-muted rounded-md aspect-square p-6 flex justify-between flex-col">
              <User className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
              <h3 className="text-3xl tracking-tight font-bold">Pay Suppliers Easily</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                Simplify transactions and ensure timely payments with our secure and efficient
                 platform dedicated to agricultural trade.
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
              <User className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
                <h3 className="text-3xl tracking-tight font-bold">Personalized Offers</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                Access exclusive promotions and discounts tailored to your needs, 
                directly proposed by our partner suppliers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
