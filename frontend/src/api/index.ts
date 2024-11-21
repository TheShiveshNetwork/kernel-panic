import { config } from "@/config";
import axios from "axios";

export const PanicApi = axios.create({
    baseURL: config.backendApiUrl,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
});
