import Form from 'form-data'
import { updateProductAPI } from "../api/updateProductAPI";

const handleProductEditSubmit = async (event: any, setPostSuccess: any, setPostError: any, setLoading: any, productId: string) => {
    event.preventDefault();
    try {
        const {
            product_name,
            product_category,
            product_sub_category,
            product_description,
            product_price,
            product_quantity,
            product_weight,
            product_size,
            product_code,
            product_demos_links,
            product_photos_links,
            product_photos
        } = event.target.elements;

        let formData = new Form();

        try {
            let filesObject = document.querySelector('#product_pictures') as any;
            for (let file of filesObject.files) {
                formData.append('product_pictures', file);
            }
        } catch (error) {
            console.log(error);
        }

        formData.append('product_name', product_name.value);
        formData.append('product_category', product_category.value);
        formData.append('product_sub_category', product_sub_category.value);
        formData.append('product_description', product_description.value,);
        formData.append('product_price', product_price.value);
        formData.append('product_quantity', product_quantity.value);
        formData.append('product_weight', product_weight.value);
        formData.append('product_size', product_size.value);
        formData.append('product_code', product_code.value);
        formData.append('product_demos_links', product_demos_links.value);
        formData.append('product_photos_links', product_photos_links.value);
        formData.append('product_photos', product_photos.value);
        await updateProductAPI(formData, setPostSuccess, setPostError, setLoading);

    } catch (error) {
        console.warn(error)
    }

};

export {
    handleProductEditSubmit
}