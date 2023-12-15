import { $authHost, $host } from "./index";

export const fetchPlaces = async () => {
    const { data } = await $host.get('api/place');
    return data;
}

export const fetchPlaceById = async (id) => {
    const { data } = await $host.get('api/place/' + id);
    return data;
}

export const reservePlace = async (id) => {
    await $authHost.post('api/place/' + id);
}