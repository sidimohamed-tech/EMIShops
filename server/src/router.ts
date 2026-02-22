import express from "express";
import productsActions from "./modules/item/productsActions";
import shopsActions from "./modules/item/shopsActions";
const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Shops
router.get("/api/shops", shopsActions.readShops);
router.get("/api/shops/:shopId/products", shopsActions.getShopProducts);

// Products
router.get("/api/products", productsActions.readProducts);
router.get("/api/products/tshirts", productsActions.browseTshirts);

/* ************************************************************************* */

export default router;
