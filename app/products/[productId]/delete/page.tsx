'use client'

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Close from '@mui/icons-material/Close';
import Remove from '@mui/icons-material/Remove';
import Link from "next/link";
import { deleteProductAPI } from "../../api/deleteProductAPI";
import { useAuth } from "../../../../hooks/use-auth";
import { usePathname } from "next/navigation";

export default function Page() {
    const pathname = usePathname();
    const params = pathname.split('/').filter(param => param !== '');
    const productId = params[1];
    const { user } = useAuth();

    return (

        <Container
            maxWidth="md"
            component={'main'}
            sx={{ minHeight: 520, display: "flex", flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}
        >
            <Box component={'div'} width={'100%'} textAlign={'center'}>Do you really want to delete this item?</Box>

            <Box width={'100%'} sx={{ display: "flex", flexDirection: 'row', justifyContent: 'space-around' }} component={'div'} >
                <Link href={`/${user.role === 'user' ? 'users' : 'admins'}`} >
                    <Button onClick={() => {
                    }} startIcon={<Close />} >
                        Close
                    </Button>
                </Link>
                <Button
                    color="warning"
                    onClick={async () => {
                        if (user.role === 'admin') {
                            if (await deleteProductAPI(productId)) {
                                alert('Deleted successfully');
                            } else {
                                alert('Failed');
                            }
                        } else {
                            alert('You are not authorised')
                        }
                    }
                    }
                    startIcon={<Remove />} >
                    Delete
                </Button>
            </Box>
        </Container >
    )
}
