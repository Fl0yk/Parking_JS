import { $host } from "./index";

export const fetchNews = async () => {
    const { data } = await $host.get('api/news');
    return data;
}

export const fetchNewsById = async (id) => {
    const { data } = await $host.get('api/news/' + id);
    return data;
}