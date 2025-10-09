import {v4 as uuidv4} from 'uuid';

import axios from "axios";
import { Cart, CartRepository, DataError, Either } from '@machb/front-base';

type OrderSubmitRequest = {
    id: string;
    userId: { id: string }
};

export class CartAdapter implements CartRepository {
    cart = new Cart([]);

    get(): Promise<Either<DataError, Cart>> {
        return new Promise((resolve, _reject) => {
            setTimeout(() => {
                try {
                    resolve(Either.right(this.cart));
                } catch (error) {
                    if (error instanceof Error) {
                        resolve(Either.left({ kind: "UnexpectedError", error }));
                    }
                }
            }, 100);
        });
    }

    save(cart: Cart): Promise<Either<DataError, boolean>> {
        return new Promise((resolve, _reject) => {
            setTimeout(() => {
                try {
                    this.cart = cart;
                    resolve(Either.right(true));
                } catch (error) {
                    if (error instanceof Error) {
                        resolve(Either.left({ kind: "UnexpectedError", error }));
                    }
                }
            }, 100);
        });
    }

    async checkout(cart: Cart): Promise<Either<DataError, boolean>> {

        let orderId = uuidv4();
        let userId = uuidv4();
        const jwt = sessionStorage.getItem('jwt');
        const order: OrderSubmitRequest = {id: orderId, userId: userId};
        try {
            const { data, status } = await axios.post<OrderSubmitRequest>((window as any).apiBaseUrl + "/order", order, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            }
            );

            console.log('response status is: ', status);
            console.log(JSON.stringify(data, null, 4));

            alert(`Order ${data['id']} has been successfully submitted!`);

            return new Promise((resolve, _reject) => {
                setTimeout(() => {
                    try {
                        this.cart = cart;
                        resolve(Either.right(true));
                    } catch (error) {
                        if (error instanceof Error) {
                            resolve(Either.left({ kind: "UnexpectedError", error }));
                        }
                    }
                }, 100);
            });

        } catch (error) {
            alert(`Order submit failed!`);
            return new Promise((resolve, _reject) => {
                setTimeout(() => {
                    try {
                        this.cart = cart;
                        resolve(Either.right(true));
                    } catch (error) {
                        if (error instanceof Error) {
                            resolve(Either.left({ kind: "UnexpectedError", error }));
                        }
                    }
                }, 100);
            });
        }
    }
}
