'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Money from "@material-ui/icons/Money";
import { handleCheckoutSubmit } from './utils/handleCheckoutSubmit';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useProfile } from '../users/hooks/useProfile';
import { useAuth } from '../../hooks/use-auth';
import { getToken } from '../../utils/getToken';
import { goToSavedLinkpath } from '../../utils/goToSavedLinkPath';
import { useRouter } from 'next/navigation';
import { AppContext } from '../../context/AppContext';
import { getCarts } from '../../store/actions/app-actions';
import ThankYouPage from './thankyou/page';

export default function CheckoutForm({
    tax,
    shippingMethod,
    shippingCost,
    cartTotal,
    orderData,
    transactionData,
}: {
    tax: any,
    shippingMethod: any,
    shippingCost: any,
    cartTotal: any
    orderData: any,
    transactionData: any,

}) {

    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [loading, setLoading] = React.useState('');
    const [method, setMethod] = React.useState('paystack');
    const [directPayment, setDirectPayment] = React.useState(false);
    const [cashAndCarry, setCashAndCarry] = React.useState(false);
    const [callToOrder, setCallToOrder] = React.useState(false);
    const auth = useAuth();
    const userId = auth.user?._id || getToken('_id') as string;
    const router = useRouter();
    const { dispatch } = React.useContext(AppContext);

    const { user } = useProfile(userId);

    const handleSubmit = async (event: any) => {
        if (userId) {
            setLoading('Sending data..')
            await handleCheckoutSubmit(
                event,
                setSuccess,
                setError,
                setLoading,
                orderData,
                transactionData,
                userId
            );
            // empty cart
            dispatch(getCarts([]));

        } else {
            router.replace('/auth/signin?next=' + goToSavedLinkpath());
        }
    }

    if (success === 'success') {
        // router.push('/checkout/thankyou');
        return <ThankYouPage />
    }

    return (
        <Container>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
            >
                <Box>
                    Billing/Contact Address Details:
                </Box>
                <TextField
                    autoComplete="given-name"
                    name="first_name"
                    required
                    fullWidth
                    margin={"normal"}
                    id="first_name"
                    label="First Name"
                    defaultValue={user?.firstName}
                    autoFocus
                />

                <TextField
                    autoComplete="given-name"
                    name="last_name"
                    required
                    fullWidth
                    margin={"normal"}
                    id="last_name"
                    label="Last Name"
                    defaultValue={user?.lastName}
                    autoFocus

                />

                <TextField
                    autoComplete="given-name"
                    name="email_address"
                    required
                    fullWidth
                    margin={"normal"}
                    id="email_address"
                    type='email'
                    label="Email Address"
                    defaultValue={user?.user.email}
                    disabled
                    autoFocus

                />

                <TextField
                    autoComplete="given-name"
                    name="street_address"
                    required
                    fullWidth
                    margin={"normal"}
                    id="street_address"
                    label="Address"
                    defaultValue={user?.streetAddress}
                    autoFocus

                />

                <TextField
                    autoComplete="given-name"
                    name="local_govt"
                    required
                    fullWidth
                    margin={"normal"}
                    id="local_govt"
                    label="Local Govt"
                    defaultValue={user?.localGovt}
                    autoFocus

                />

                <TextField
                    autoComplete="given-name"
                    name="state"
                    required
                    fullWidth
                    margin={"normal"}
                    id="state"
                    label="State"
                    defaultValue={user?.state}
                    autoFocus

                />

                <TextField
                    autoComplete="given-name"
                    name="shipping_method"
                    required
                    fullWidth
                    margin={"normal"}
                    id="shipping_method"
                    label="Shipping Method"
                    defaultValue={shippingMethod}
                    disabled
                />

                <TextField
                    autoComplete="given-name"
                    name="shipping_cost"
                    required
                    fullWidth
                    margin={"normal"}
                    id="shipping_cost"
                    label="Shipping Cost"
                    defaultValue={shippingCost}
                    disabled
                    autoFocus

                />

                <TextField
                    autoComplete="given-name"
                    name="tax"
                    required
                    fullWidth
                    margin={"normal"}
                    id="tax"
                    label="Tax"
                    defaultValue={tax}
                    disabled
                />

                <TextField
                    autoComplete="given-name"
                    name="total_amount"
                    required
                    fullWidth
                    margin={"normal"}
                    id="total_amount"
                    label="Total Amount"
                    defaultValue={cartTotal}
                    disabled
                />

                <FormControl>
                    <FormLabel id='payment_method'>Payment Method</FormLabel>
                    <RadioGroup
                        aria-labelledby='demo-controlled-radio-button-group'
                        name='payment_method'
                        value={method}
                        onChange={(evt) => {
                            const { value } = evt.target;
                            setMethod(value);

                            if (value === 'direct-bank-transfer') {
                                setDirectPayment(true);
                            } else {
                                setDirectPayment(false);
                            }

                            if (value === 'call-to-order') {
                                setCallToOrder(true);
                            } else {
                                setCallToOrder(false);
                            }

                            if (value === 'cash-and-carry') {
                                setCashAndCarry(true);
                            } else {
                                setCashAndCarry(false);
                            }

                        }}
                    >
                        {auth.user.role === 'admin' && <FormControlLabel value={'pos'} control={<Radio />} label='POS'></FormControlLabel>}
                        {auth.user.role === 'admin' && <FormControlLabel value={'cash-and-carry'} control={<Radio />} label='Cash'></FormControlLabel>}
                        {auth.user.role === 'admin' && <FormControlLabel value={'direct-bank-transfer'} control={<Radio />} label='Direct bank transfer'></FormControlLabel>}
                        <FormControlLabel value={'pay-on-delivery'} control={<Radio />} label='Pay on delivery'></FormControlLabel>
                        <FormControlLabel value={'call-to-order'} control={<Radio />} label='Call to place an order'></FormControlLabel>
                        <FormControlLabel value={'paystack'} control={<Radio />} label='Paystack'></FormControlLabel>
                        <FormControlLabel value={'ussd'} control={<Radio />} label='USSD via Paystack'></FormControlLabel>
                        <FormControlLabel value={'opay'} control={<Radio />} label='Opay via Paystack'></FormControlLabel>
                        <FormControlLabel value={'card'} control={<Radio />} label='Card via Paystack'></FormControlLabel>
                        <FormControlLabel value={'bank-transfer'} control={<Radio />} label='Bank transfer via Paystack'></FormControlLabel>
                    </RadioGroup>
                </FormControl>
                {
                    directPayment &&
                    (<Box sx={{ backgroundColor: 'green', color: "white", borderRadius: 5 }}>
                        <Box><span>&nbsp;&nbsp;Bank Name: </span> Jaiz Bank</Box>
                        <Box><span>&nbsp;&nbsp;Acct. Number: </span> 0016938829</Box>
                        <Box><span>&nbsp;&nbsp;Acct. Name: </span> Siniotech Ltd</Box>
                    </Box>)
                }
                {
                    cashAndCarry &&
                    (<Box sx={{ backgroundColor: 'green', color: "white", borderRadius: 5 }}>
                        <Box><span>&nbsp;&nbsp;Visit: </span>Siniotech Ltd</Box>
                        <Box><span>&nbsp;&nbsp;Address: </span><span style={{ textAlign: 'center' }}>230 Naibawa Gasa A,Line Dan Hassan, Kumbotso, Kano Sate</span></Box>
                        <Box><span>&nbsp;&nbsp;Call: </span>07016807004</Box>
                    </Box>)
                }
                {
                    callToOrder &&
                    (<Box sx={{ backgroundColor: 'green', color: "white", borderRadius: 5 }}>
                        <Box><span>&nbsp;&nbsp; Call: </span> 07016807004</Box>
                        <Box><span>&nbsp;&nbsp; Visit: </span> Siniotech Ltd</Box>
                        <Box><span>&nbsp;&nbsp; Address: </span><span style={{ textAlign: 'center' }}>230 Naibawa Gasa A,Line Dan Hassan, Kumbotso, Kano Sate</span></Box>
                    </Box>)
                }
                {success && <Box textAlign={"center"} sx={{ backgroundColor: 'green', color: "white", padding: 2, borderRadius: 2 }}>{success.toUpperCase()}</Box>}
                {error && <Box textAlign={"center"} sx={{ backgroundColor: 'red', color: 'white', padding: 2, borderRadius: 2 }}>{error.toUpperCase()}</Box>}
                {loading && <Box textAlign={"center"} sx={{ backgroundColor: 'green', color: 'white', padding: 2, borderRadius: 2 }}>{loading.toUpperCase()}</Box>}


                <Button
                    type="submit"
                    size="large"
                    fullWidth
                    variant="contained"
                    color='success'
                    sx={{ mt: 3, mb: 2 }}
                    startIcon={<Money />}
                >
                    PAY NOW
                </Button>

            </Box>
        </Container>
    )
}