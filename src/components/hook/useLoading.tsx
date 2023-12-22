import { useContext } from "react"
import { LoadingContext } from "../context/loadingcontext"

export const useLoading = ()=>{
    return useContext(LoadingContext);
}