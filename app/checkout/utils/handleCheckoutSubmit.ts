'use client'

import { sendOrderAndTransaction } from "../../../app/payment/sendOrderAndTransaction";
import { payWithPaystack } from "../../../services/payWithPaystack";
import { updateUserProfileAPI } from "../../users/api/updateUserProfile";
import Form from 'form-data';

const handleCheckoutSubmit = async (
    event: any,
    setPostSuccess: any,
    setPostError: any,
    setLoading: any,
    orderData: any,
    transactionData?: any,
    userId?: any
) => {

    event.preventDefault();

    const {
        email_address,
        first_name,
        last_name,
        street_address,
        local_govt,
        state,
        total_amount,
        shipping_cost,
        shipping_method,
        tax,
        payment_method

    } = event.target.elements;

    const contactData = {
        email: email_address.value,
        lastName: last_name.value,
        firstName: first_name.value,
        address: street_address.value,
        localGovt: local_govt.value,
        state: state.value,
        amount: total_amount.value,
        shippingCost: shipping_cost.value,
        shippingMethod: shipping_method.value,
        tax: tax.value,
        method: payment_method.value
    }
    try {

        const formData = new Form()
        formData.append('firstName', contactData.firstName);
        formData.append('lastName', contactData.lastName);
        formData.append('streetAddress', contactData.address);
        formData.append('localGovt', contactData.localGovt);
        formData.append('state', contactData.state);
        formData.append('user', userId);

        await updateUserProfileAPI(formData, setPostSuccess, setPostError, setLoading);

        switch (contactData.method) {
            case 'paystack':
            case 'ussd':
            case 'opay':
            case 'bank-transfer':
            case 'card':
                payWithPaystack(
                    contactData.email ?? '',
                    contactData.amount ?? 0,
                    { ...orderData, paymentStatus: 'paid' },
                    transactionData,
                    setPostSuccess,
                    setPostError,
                    setLoading
                );
                break;

            case 'pos':
                await sendOrderAndTransaction(
                    { ...orderData, paymentStatus: 'paid' },
                    { ...transactionData, paymentMethod: 'POS' },
                    setPostSuccess,
                    setPostError,
                    setLoading
                );
                break;

            case 'pay-on-delivery':
                await sendOrderAndTransaction(
                    orderData,
                    { ...transactionData, paymentMethod: 'Pay on Delivery' },
                    setPostSuccess,
                    setPostError,
                    setLoading
                );
                break;

            case 'direct-bank-transfer':
                await sendOrderAndTransaction(
                    orderData,
                    { ...transactionData, paymentMethod: 'Direct Bank Transfer' },
                    setPostSuccess,
                    setPostError,
                    setLoading
                );
                alert(
                    'Use the details below for direct bank transfer'
                );
                break;

            case 'call-to-order':
                await sendOrderAndTransaction(
                    orderData,
                    { ...transactionData, paymentMethod: 'Call to Place Order' },
                    setPostSuccess,
                    setPostError,
                    setLoading
                );

                alert(
                    'Use the details below to call us'
                );

                break;

            case 'cash-and-carry':
                await sendOrderAndTransaction(
                    { ...orderData, paymentStatus: 'paid' },
                    { ...transactionData, paymentMethod: 'Cash' },
                    setPostSuccess,
                    setPostError,
                    setLoading
                );

                break;

            default:
                console.log('I am the default');
                break;
        }

    } catch (error) {
        console.log(error)
    }

};

export {
    handleCheckoutSubmit
}