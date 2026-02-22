import shopsRepository from "./shopsRepository";
import type { Request, RequestHandler, Response, NextFunction } from "express";

const readShops = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shops = await shopsRepository.readShops();
    res.json(shops);
  } catch (err) {
    next(err);
  }
};

const getShopProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { shopId } = req.params;
    const products = await shopsRepository.readProductsByShop(Number(shopId));
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export default { readShops, getShopProducts };
