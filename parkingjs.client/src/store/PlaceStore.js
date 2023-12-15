import { makeAutoObservable } from "mobx";

export default class PlaceStore {
    constructor() {
        this._places = []
        //������ ��� ������ ��������������
        makeAutoObservable(this)
    }

    setPlaces(places) {
        this._places = places
    }
    get places() {
        return this._places
    }
}