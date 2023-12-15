import { makeAutoObservable } from "mobx";

export default class CarStore {
    constructor() {
        this._cars = []
        //делаем наш объект отслеживаемыми
        makeAutoObservable(this)
    }

    setCars(cars) {
        this._cars = cars
    }
    get cars() {
        return this._cars
    }
}