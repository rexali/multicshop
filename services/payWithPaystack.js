'use client'

import { clearUserCartsAPI } from "@/app/carts/api/clearCartsAPI";
import { createOrderAPI } from "@/app/orders/api/createOrderAPI";
import { createTransactionAPI } from "@/app/transactions/api/createTransactionAPI";
import { getToken } from "@/utils/getToken";
import PaystackPop from "@paystack/inline-js";

export function payWithPaystack(
    email,
    amount,
    orderData,
    transactionData,
    setPostSuccess,
    setPostError,
    setLoading
) {

    const paystack = new PaystackPop();

    paystack.newTransaction({
        key: "pk_live_9522ac67d8f164271cafe16df7fc01b4613af4f7",
        email: email,
        amount: amount * 100,
        // endpoint:'http://localhost:3000/webhook',
        onSuccess: async (transaction) => {
            setLoading('Sending data..');
            try {
                // callback to handle add order data
                const orderId = await createOrderAPI(orderData);

                if (orderId) {
                    // setPostSuccess("Order success");
                    setLoading('');
                    console.log("Order success");
                    // callback to handle transaction data
                    const transactionId = await createTransactionAPI({
                        ...transactionData,
                        orderId,
                        reference: transaction.reference
                    });

                    if (transactionId) {
                        setPostSuccess("success")
                        setLoading('')

                        await clearUserCartsAPI(getToken("_id"));
                    } else {
                        console.log("Transaction failed");
                        setPostError("Transaction failed");
                        setLoading('')
                    }

                } else {
                    console.log("Order failed");
                    setPostError("Order failed");
                    setLoading('')


                }

            } catch (error) {
                console.warn(error)
                setPostError("Error! " + error.message);
                setLoading('');
            } finally {
                console.log(transaction.reference);
                setTimeout(() => {
                    setPostSuccess('')
                    setPostError("")
                }, 10000);
            }

        },
        onCancel: () => {
            // user close pop up
            () => {
                alert("\n\n\n\n Thank you. If you have any complaint, don't hesitate to send us a message");
            }
        }
    });
}