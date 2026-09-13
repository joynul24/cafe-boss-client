import { useEffect, useState } from "react"
import useAxiosPublic from "./useAxiosPublic";
import { toast } from "react-toastify";

function useReviewsData() {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic()

    useEffect(()=>{
        axiosPublic.get("/reviews")
        .then(res=> {
            setReviews(res.data);
            setLoading(false)
        }).catch(err => {
            toast.error(err?.response?.data?.message || "Failed to load reviews data!");
            setLoading(false)
        })
    },[axiosPublic])

  return [reviews, loading]
}

export default useReviewsData