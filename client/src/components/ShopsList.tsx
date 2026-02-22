import { useState, useEffect } from "react";
import "./ShopsList.css";

interface Shop {
  id: number;
  name: string;
  whatsapp_number: string;
  address_text: string;
}

interface ShopsListProps {
  onSelectShop: (shopId: number, shopName: string) => void;
}

function ShopsList({ onSelectShop }: ShopsListProps) {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3310";
        const response = await fetch(`${apiUrl}/api/shops`);
        if (!response.ok) throw new Error("Failed to fetch shops");
        const data = await response.json();
        setShops(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  if (loading)
    return <div className="shops-loading">Chargement des boutiques...</div>;
  if (error) return <div className="shops-error">Erreur: {error}</div>;

  return (
    <div className="shops-list-container">
      <h1>Nos Boutiques</h1>
      <div className="shops-grid">
        {shops.map((shop) => (
          <button
            key={shop.id}
            className="shop-card"
            type="button"
            onClick={() => onSelectShop(shop.id, shop.name)}
          >
            <h2>{shop.name}</h2>
            <p className="shop-address">{shop.address_text}</p>
            {shop.whatsapp_number && (
              <p className="shop-whatsapp">📱 {shop.whatsapp_number}</p>
            )}
            <span className="shop-button">Voir les produits</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ShopsList;
