import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic"

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
                console.log(err)
                setLoading(false)
            })
    }, [axiosPublic]);
    return [menu, loading];
}

export default useMenuData