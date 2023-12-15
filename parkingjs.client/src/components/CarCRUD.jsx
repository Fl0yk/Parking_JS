/* eslint-disable react/prop-types */
import React from 'react';
import Context from '../Context';
import { fetchCars, createCar, updateCar } from '../http/CarAPI';

class CarForm extends React.Component {
    //props - ���������, ������� ���������� � ���������
    constructor(props) {
        super(props);
        
        this.onNumberChange = this.onNumberChange.bind(this);
        this.onBrandChange = this.onBrandChange.bind(this);
        this.onModelChange = this.onModelChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        //���������������� ��������� ����� ������ � ������������
        this.state = this.initState(this.props);
    }

    //���������� ����� ����� ���������� ����������
    componentDidUpdate(prevProps) {
        if (prevProps.number !== this.props.number ||
            prevProps.model !== this.props.model ||
            prevProps.brand !== this.props.brand) {
            //�������� ��������� ����� ��� ������ ������
            //����� ��������� ������� ��������� ��������� ����������
            this.setState(this.initState(this.props));
        }
    }
    //������ ����������� �������� ���������
    //
    initState(props) {
        let number = props.number;
        console.log(number);
        const numberIsValid = this.validateNumber(number);
        let brand = props.brand;
        const brandIsValid = this.validateBrand(brand);
        let model = props.model;
        const modelIsValid = this.validateModel(model);

        return {
            isCreate: this.props.isCreate,
            number: this.props.number,
            brand: this.props.brand,
            model: this.props.model,
            numberValid: numberIsValid,
            brandValid: brandIsValid,
            modelValid: modelIsValid,
        };
    }

    //������ ��������� �����
    validateModel(model) {
        return model.length > 2;
    }
    validateBrand(brand) {
        return brand.length > 2;
    }
    validateNumber(number) {
        const regex = /^\d{4}\s\w{2}-\d$/;
        return regex.test(number);
    }

    //������� ��� ��������� �����
    onNumberChange(e) {
        let val = e.target.value;
        let valid = this.validateNumber(val);
        this.setState({ number: val, numberValid: valid });
    }
    onModelChange(e) {
        let val = e.target.value;
        let valid = this.validateModel(val);
        this.setState({ model: val, modelValid: valid });
    }
    onBrandChange(e) {
        let val = e.target.value;
        console.log(val);
        let valid = this.validateBrand(val);
        this.setState({ brand: val, brandValid: valid });
    }

    handleSubmit(car) {
        if (this.state.brandValid === true && this.state.modelValid === true && this.state.numberValid === true) {
            if (this.state.isCreate) {
                createCar({
                    number: this.state.number,
                    brand: this.state.brand,
                    model: this.state.model,
                });
            } else {
                updateCar({
                    number: this.state.number,
                    brand: this.state.brand,
                    model: this.state.model,
                });
            }
            fetchCars().then((data) => car.setCars(data));
        }
    }

    render() {
        // ���� ������� ��� ���� ��� ����� ������
        let numColor = this.state.numberValid === true ? "green" : "red";
        // ���� ������� ��� ���� ��� ����� ������
        let brandColor = this.state.brandValid === true ? "green" : "red";
        // ���� ������� ��� ���� ��� ����� ������
        let modelColor = this.state.modelValid === true ? "green" : "red";
        //alert('render');
        //console.log(this.state.number);
        return (
            <Context.Consumer>
                { value => (
                    <form onSubmit={(e) => { e.preventDefault(); this.handleSubmit(value.car); }}>
                        <div>
                            {this.state.isCreate ?
                                <>
                                    <p>
                                        <label>Car number:</label><br />
                                        <input type="text" value={this.state.number}
                                            onChange={this.onNumberChange} style={{ borderColor: numColor }} />
                                    </p>
                                </>
                                :
                                <p>{this.state.number}</p>
                            }
                        </div>
                        <p>
                            <label>Brand:</label><br />
                            <input type="text" value={this.state.brand}
                                onChange={this.onBrandChange} style={{ borderColor: brandColor }} />
                        </p>
                        <p>
                            <label>Model:</label><br />
                            <input type="text" value={this.state.model}
                                onChange={this.onModelChange} style={{ borderColor: modelColor }} />
                        </p>
                        <button type="submit" className={'sbm'}>
                            {this.state.isCreate ? 'Create' : 'Update'}
                        </button>
                    </form>
                )}
            </Context.Consumer>
        );
    }
}

//������������� ����������� �������� ����������
CarForm.defaultProps = { isCreate: true, number: '', model: '', brand: '' };

export default CarForm;