import client from "../../../database/client";
import type { Rows } from "../../../database/client";

const readShops = async () => {
  const [rows] = await client.query<Rows>(
    "SELECT id, name, whatsapp_number, address_text FROM shops WHERE status = 'approved'",
  );
  return rows;
};

const readShopById = async (shopId: number) => {
  const [rows] = await client.query<Rows>(
    "SELECT id, name, whatsapp_number, address_text FROM shops WHERE id = ? AND status = 'approved'",
    [shopId],
  );
  return rows[0];
};

const readProductsByShop = async (shopId: number) => {
  const [rows] = await client.query<Rows>(
    "SELECT p.id, p.shop_id, p.category_id, p.title, p.description, p.status, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.shop_id = ? AND p.status = 'active'",
    [shopId],
  );
  return rows;
};

export default { readShops, readShopById, readProductsByShop };
