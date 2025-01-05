import Box from "@mui/material/Box";
import { RatingReviewList } from "./RatingReviewList";
import Container from "@mui/material/Container";

export default function ReviewPage(props: any) {


    if (!props.ratings?.length) {
        <Container component={"main"} maxWidth="md" sx={{ mt: 8, minHeight: 420, display: "flex", justifyContent: 'center', alignItems: 'center' }}>
            <h3>Reviews</h3>
            <Box textAlign={'center'}>No review(s) found for this product</Box>
        </Container>
    }

    return (
        <Container component={"main"} maxWidth="md">
            <h3>Reviews</h3>
            <RatingReviewList ratings={props.ratings} />
        </Container>
    )
}