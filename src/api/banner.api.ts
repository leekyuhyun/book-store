import {requestHandler} from "@/api/http.ts";
import type {Banner} from "@/models/banner.model.ts";

export const fetchBanners = async () => {
    return await requestHandler<Banner[]>("get", "/banners")
}