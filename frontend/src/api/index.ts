import { config } from "@/config";
import axios from "axios";

export const apiUrl:string = import.meta.env.MODE === "development" ? config.localBackendUrl : config.backendApiUrl;

export const PanicApi = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export const socketUrl = import.meta.env.MODE === "development" ? config.localSocketUrl : config.socketUrl;
