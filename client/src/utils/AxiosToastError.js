import taost from "react-hot-toast";

const AxiosToastError = (error) => {
    taost.error(
        error?.response?.data?.message
    )
}

export default AxiosToastError;