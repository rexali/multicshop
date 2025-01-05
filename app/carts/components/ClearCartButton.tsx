'use client'

import ClearAll from "@material-ui/icons/ClearAll";
import Button from "@mui/material/Button";
import { clearUserCartsAPI } from "../api/clearCartsAPI";
import { useAuth } from "../../../hooks/use-auth";
import { getToken } from "../../../utils/getToken";

export default function ClearCartButton(props: any) {

    const auth = useAuth();
    const userId = auth.user?._id || getToken('_id') as string;

    return (
        <Button
            type="submit"
            size="large"
            fullWidth
            variant="contained"
            color='warning'
            onClick={async () => {
                try {
                    if (await clearUserCartsAPI(userId)) {
                        props.refreshCart();
                    } else {
                        alert('Clear Cart failed');
                    }    
                } catch (error) {
                    console.warn(error);  
                }

            }}
            sx={{ mt: 3, mb: 2 }}
            startIcon={<ClearAll />}
        >
            Clear Cart
        </Button>
    )
}