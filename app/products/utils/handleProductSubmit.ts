import Form from 'form-data'
import { createProductAPI } from "../api/createProductAPI";

const handleProductSubmit = async (event: any, setPostSuccess: any, setPostError: any, setLoading: any, userId: string) => {
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
            product_demos_links
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
        formData.append('user', userId);

        await createProductAPI(formData, setPostSuccess, setPostError, setLoading);

    } catch (error) {
        console.log(error);
    }
};

export {
    handleProductSubmit
}