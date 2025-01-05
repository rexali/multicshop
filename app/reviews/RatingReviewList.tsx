import Grid from "@mui/material/Grid";
import RatingReviewCard from "./RatingReviewCard";

export function RatingReviewList({ ratings }: { ratings: any }) {

    return (
        <Grid container columnSpacing={1} marginTop={5} display={"flex"} justifyContent={'center'}>
            {ratings?.map((rating: any) => (
                <Grid item xs={12} md={6} key={rating._id}>
                    <RatingReviewCard key={rating._id} review={rating.review} ratingScore={rating.ratingScore} />
                </Grid>
            )
            )}
        </Grid>)
}