import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createQouteAPI } from "./api/createQouteAPI";
import * as React from "react";

export function AddQoute(props: any) {
    const [success, setSuccess] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState('');

    const handleSubmit = async (event: any) => {
        setLoading('Sending data..')
        await createQouteAPI(event, setSuccess, setError, setLoading);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate={false}
            sx={{ m: 2, borderRadius: 20 }}
        >
            <h3>Request Qoute(s)</h3>

            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type='email'
                autoFocus
            />

            <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone"
                type="text"
                id="phone"
            />

            <TextField
                margin="normal"
                required
                fullWidth
                name="product_id"
                label="Product ID"
                id="productId"
                defaultValue={props.productId}
                disabled
                hidden
            />

            <TextField
                margin="normal"
                required
                fullWidth
                name="message"
                label="Message"
                type='default'
                defaultValue={'What is the latest price for this?'}
                id="message"
                multiline
            />
            {loading && <Box textAlign={"center"} sx={{ color: "green" }}>{loading.toUpperCase()}</Box>}
            {success && <Box textAlign={"center"} sx={{ color: "green" }}>{success.toUpperCase()}</Box>}
            {error && <Box textAlign={"center"} sx={{ color: "red" }}>{error.toUpperCase()}</Box>}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color='success'
                sx={{ mt: 3, mb: 2 }}
            >
                Get Qoute
            </Button>
        </Box>
    )
}