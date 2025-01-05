import { SERVER_URL } from '../../../constants/url';

const getUsersCartsAPI = async (page: number = 1) => {

    try {
        let data = await fetch(`${SERVER_URL}/carts?page=` + page).then(res => res.json());
        if (data.data === null) {
            return [];
        }
        let carts = data.data?.carts;
        let newcarts = carts.map((cart: any) => {
            return {
                ...cart,
                product: {
                    ...cart.product,
                    cartId: cart?._id,
                    cartQuantity: cart?.quantity,
                    totalCarts: cart?.totalCarts
                }
            }
        });


        return newcarts.map((cart: any) => cart.product);
    } catch (error) {
        console.warn(error);
    }
};

export {
    getUsersCartsAPI
}