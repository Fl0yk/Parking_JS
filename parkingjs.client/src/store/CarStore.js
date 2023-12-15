import { makeAutoObservable } from "mobx";

export default class CarStore {
    constructor() {
        this._cars = []
        //������ ��� ������ ��������������
        makeAutoObservable(this)
    }

    setCars(cars) {
        this._cars = cars
    }
    get cars() {
        return this._cars
    }
}