import { Card, CardContent, Typography, Box,} from "@mui/material";
import Link from "next/link";

export default function TransactionCard({ transaction }: { transaction: any }) {


    return (
        <Box marginTop={4} display={"flex"} justifyContent={'center'}>
            <Card sx={{ maxWidth: 345, margin: 1 }}>
                <CardContent >
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Typography gutterBottom variant="body2" component="div">
                            <Link href={'mailto:' + transaction?.user.email}>{transaction?.user?.email}</Link>
                        </Typography>
                        <Typography gutterBottom variant="body2" component="div">
                            N {transaction?.amount}
                        </Typography>
                        <Typography gutterBottom variant="body2" component="div">
                            {transaction?.createdAt?.split('T')[0]}
                        </Typography>
                        <Typography gutterBottom variant="body2" component="div">
                            <Link href={'/orders/' + transaction?.order?._id}>View order</Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}