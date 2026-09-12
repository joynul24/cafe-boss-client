import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

function useCartsData() {
  const {user} = useAuth();
  const axiosPublic = useAxiosPublic()

  const {data: cart = [], refetch} = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async ()=> {
      const res = await axiosPublic.get(`/carts?email=${user?.email}`);
      return res.data;
    }
  })
  return [cart, refetch]
}

export default useCartsData