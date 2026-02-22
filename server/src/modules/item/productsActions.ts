import productsRepository from "./productsRepository";
import type { Request, RequestHandler, Response, NextFunction } from "express";
const readProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await productsRepository.readProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
};
const browseTshirts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tshirts = await productsRepository.readTshirts();
    res.json(tshirts);
  } catch (err) {
    next(err);
  }
};
export default { readProducts, browseTshirts };
