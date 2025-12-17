import Axios from "../utils/Axios.js"
import summaryApi from "../common/summaryApi"

const uploadImage = async (image) => {
    try {
        const formData = new FormData()
        formData.append("image", image)

        const response = await Axios({
            ...summaryApi.uploadImage,
            data: formData,
        })

        return response

    } catch (error) {
        return error
    }
}

export default uploadImage;