import { Card, CardContent, Typography, Box } from "@mui/material";
import Link from "next/link";

export default function QouteCard({ qoute }: { qoute: any }) {

    return (
        <Card sx={{ maxWidth: 345, margin: 1 }}>
            <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography gutterBottom variant="body2" component="div">
                        <Link href={'mailto:' + qoute?.email}>Reply</Link>
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                        <Link href={'tel:' + qoute?.phone}>Call</Link>
                    </Typography>
                    <Typography>
                        <Link style={{ textDecoration: 'none' }} href={'/products/' + qoute?.product._id}>View</Link>
                    </Typography>
                </Box>
                <Typography gutterBottom variant="body2" component="div">
                    {qoute?.message}
                </Typography>
            </CardContent>
        </Card>
    )
}