import { clearUserCartsAPI } from "@/app/carts/api/clearCartsAPI";
import { createOrderAPI } from "@/app/carts/api/createOrderAPI";
import { createTransactionAPI } from "@/app/carts/api/createTransactionAPI";
import { getToken } from "@/utils/getToken";
import PaystackPop from "@paystack/inline-js";

export function payWithPaystack(
    email,
    amount,
    orderData,
    transactionData,
    setPostSuccess,
    setPostError
) {
    const paystack = new PaystackPop();
    paystack.newTransaction({
        key: "pk_live_9522ac67d8f164271cafe16df7fc01b4613af4f7",
        email: email,
        amount: amount * 100,
        // endpoint:'http://localhost:3000/webhook',
        onSuccess: async (transaction) => {
            try {
                // payment complete
                const orderId = await createOrderAPI(orderData); // callback to handle add order and transaction data
                if (orderId) {
                    setPostSuccess("Order success")
                    console.log("Order success")
                    const transactionId = await createTransactionAPI({
                        ...transactionData,
                        orderId,
                        reference: transaction.reference
                    });

                    if (transactionId) {
                        setPostSuccess("Order success")
                        await clearUserCartsAPI(getToken("_id"));
                    } else {
                        console.log("Transaction failed");
                        setPostError("Transaction failed");
                    }

                } else {
                    console.log("Order failed");
                    setPostError("Transaction failed");

                }

            } catch (error) {
                console.warn(error)
                setPostError("Error! "+error.message);

            } finally {
                console.log(transaction.reference);
            }

        },
        onCancel: () => {
            // user close pop up
            () => {
                alert("Thank you. If you have any complaint, don't hesitate to send us a message");
            }
        }
    });
}