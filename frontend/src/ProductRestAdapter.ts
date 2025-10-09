import axios from "axios";

import { ProductRepository, Product, Either, DataError } from "@machb/front-base";

type GetProductsResponse = {
    data: Product[];
};

export class ProductRestAdapter implements ProductRepository {
    async get(filter: string): Promise<Either<DataError, Product[]>> {
        return new Promise(async (resolve, _reject) => {
            try {
                const { data, status } = await axios.get<GetProductsResponse>((window as any).apiBaseUrl + "/products");

                const products = data.data;

                console.log('response status is: ', status);
                console.log(JSON.stringify(data, null, 4));

                if (filter) {
                    const filteredProducts = products.filter((p: Product) => {
                        return p.title.toLowerCase().includes(filter.toLowerCase());
                    });

                    resolve(Either.right(filteredProducts));
                } else {
                    resolve(Either.right(products));
                }
            } catch (error) {
                if (error instanceof Error) {
                    resolve(Either.left({ kind: "UnexpectedError", error }));
                }
            }
        });
    }
}
