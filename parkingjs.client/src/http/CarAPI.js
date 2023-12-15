import { $authHost } from "./index";

export const fetchCars = async () => {
    const { data } = await $authHost.get('api/car');
    return data;
}

export const fetchCarById = async (id) => {
    const { data } = await $authHost.get('api/car/' + id);
    return data;
}

export const createCar = async (car) => {
    await $authHost.post('api/car', car);
}

export const updateCar = async (car) => {
    await $authHost.put('api/car', car);
}

export const deleteCar = async (number) => {
    await $authHost.delete('api/car/' + number);
}