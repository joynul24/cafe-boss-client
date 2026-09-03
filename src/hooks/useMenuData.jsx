import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic"
import { toast } from "react-toastify";

function useMenuData() {
    const axiosPublic = useAxiosPublic();
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axiosPublic.get("/menu")
            .then(res => {
                setMenu(res.data)
                setLoading(false)
            })
            .catch(err => {
                toast.error(err?.response?.data?.message || "Failed to load menu data!");
                setLoading(false)
            })
    }, [axiosPublic]);
    return [menu, loading];
}

export default useMenuData