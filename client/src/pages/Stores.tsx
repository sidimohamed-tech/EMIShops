import { useState } from "react";
import ShopsList from "../components/ShopsList";
import ShopProducts from "../components/ShopProducts";

function Stores() {
  const [selectedShop, setSelectedShop] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleSelectShop = (shopId: number, shopName: string) => {
    setSelectedShop({ id: shopId, name: shopName });
  };

  const handleBack = () => {
    setSelectedShop(null);
  };

  return (
    <div>
      {selectedShop ? (
        <ShopProducts
          shopId={selectedShop.id}
          shopName={selectedShop.name}
          onBack={handleBack}
        />
      ) : (
        <ShopsList onSelectShop={handleSelectShop} />
      )}
    </div>
  );
}

export default Stores;
