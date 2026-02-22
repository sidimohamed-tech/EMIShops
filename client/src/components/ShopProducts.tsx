import { useState, useEffect } from "react";
import "./ShopProducts.css";

interface Product {
  id: number;
  shop_id: number;
  category_id: number;
  title: string;
  description: string;
  status: string;
  category_name: string;
}

interface ShopProductsProps {
  shopId: number;
  shopName: string;
  onBack: () => void;
}

function ShopProducts({ shopId, shopName, onBack }: ShopProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3310";
        const response = await fetch(`${apiUrl}/api/shops/${shopId}/products`);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [shopId]);

  if (loading)
    return <div className="products-loading">Chargement des produits...</div>;
  if (error) return <div className="products-error">Erreur: {error}</div>;

  return (
    <div className="shop-products-container">
      <button type="button" className="back-button" onClick={onBack}>
        ← Retour aux boutiques
      </button>
      <h1>Produits de {shopName}</h1>

      {products.length === 0 ? (
        <div className="no-products">Aucun produit disponible</div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.title}</h3>
              <p className="product-category">{product.category_name}</p>
              {product.description && (
                <p className="product-description">{product.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShopProducts;
