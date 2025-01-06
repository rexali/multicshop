import { createReviewAPI } from "../api/createReviewAPI";
import { isBoughtByUserAPI } from "../api/isBoughtByUserAPI";
import { goToSavedLinkpath } from "../../../utils/goToSavedLinkPath";

const handleReviewSubmit = async (event: any, setPostSuccess: any, setPostError: any, setLoading:any, toast:any) => {
    event.preventDefault();
    
    const {
        user_id,
        product_id,
        review,
        rating_score
    } = event.target.elements;

    const reviewData = {
        userId: user_id.value,
        productId: product_id.value,
        review: review.value,
        ratingScore: Number(rating_score.value)
    }
    if (reviewData.userId) {
        
        if (await isBoughtByUserAPI(reviewData.userId, reviewData.productId)) {
            setLoading('Sending data.. ')
            await createReviewAPI(reviewData, setPostSuccess, setPostError, setLoading);
        } else {
            toast.info(`Buy this product first, and post a review thereafter`);
            // alert(`\n\n\n\n Buy this product first, and post a review thereafter`)
        }
    } else {
        window.location.assign('/auth/signin?next='+goToSavedLinkpath());
    }

};

export {
    handleReviewSubmit
}