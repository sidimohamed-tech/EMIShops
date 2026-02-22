import client from "../../../database/client";
import type {  Rows } from "../../../database/client";

const readProducts=async () => {
     const [rows]=await client.query<Rows>("select * from products");
        return rows;
}
const readTshirts=async () => {
    const [data]=await client.query<Rows>("select * from products where category_id='1'");
    return data;
}
export default {readProducts,readTshirts};