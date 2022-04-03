import './App.css';

import React, { useEffect, useReducer, useState } from 'react';

import axios from 'axios';
import moment from 'moment';

function App() {

    const [error, setError] = useState('');
    const [weather, setWeather] = useState({});
    const [city, setCity] = useState('Bihar');
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        name: ''
    });

    const initialState = {
        date: moment(new Date())
    }

    const incAction = {
        type: 'INCREMENT',
        payload: {
            days: 10,
            value: 'days'
        }
    }

    const decAction = {
        type: 'DECREMENT',
        payload: {
            days: 10,
            value: 'days'
        }
    }

    const reducer = (state, action) => {
        console.log(action);
        switch (action.type) {
            case 'INCREMENT':
                return {
                    ...state,
                    date: moment(state.date).add(action.payload.days, action.payload.value)
                }
            case 'DECREMENT':
                return {
                    ...state,
                    date: moment(state.date).subtract(action.payload.days, action.payload.value)
                }
            default: return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const decButton = (e) => {
        e.preventDefault();
        dispatch(decAction)
    }

    const incButton = (e) => {
        e.preventDefault();
        dispatch(incAction)
    }

    // DATE SECTION END ----
    // FORM SECTION --- 

    const handleInput = (e) => {
        e.persist();
        const { name, value } = e.target;

        setInput({ ...input, [name]: value });
    }

    const weaterButton = async (e) => {
        e.preventDefault();

        setCity(input.name);
        setInput({name: ''})
    }

    // WEATHER SECTION

    const getApi = async () => {
        try {
            const response = await axios.get(`https://goweather.herokuapp.com/weather/${city}`);
            setWeather(response.data);
            setError('');
            setLoading(true);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    }

    useEffect(() => {
        getApi();
    }, [city]);

    return (
        <div className="App mt-5">
            <div className="container">
                <div className="card shadow">
                    <div className="card-body text-center">
                        <div className="mycard">
                            <div className="card__info">
                                <p className="card__info__place">{city}</p>
                                <p className="card__info__time">{state.date.format('h:mm a')}</p>
                                <p className="card__info__date"> {`${state.date.format('MMMM Do yy')} | ${state.date.format('dddd')} `}</p>
                            </div>
                            <div className="card__weather">
                                <svg width="34" className="card__weather__icon" height="24" viewBox="0 0 34 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M31.7764 13.3718C30.8073 12.1841 29.5779 11.4201 28.0897 11.0793C28.5632 10.3633 28.7992 9.57921 28.7992 8.72709C28.7992 7.52249 28.3664 6.49418 27.5014 5.64182C26.6361 4.78976 25.592 4.36354 24.3688 4.36354C23.2612 4.36354 22.3034 4.71584 21.496 5.42044C20.8155 3.80682 19.7334 2.50001 18.251 1.50001C16.7682 0.500241 15.1152 0 13.2921 0C10.8461 0 8.75757 0.852482 7.02679 2.55703C5.29589 4.26116 4.43071 6.31818 4.43071 8.72727C4.43071 8.89777 4.44229 9.1419 4.46532 9.46011C3.12694 10.0738 2.04801 11.0027 1.22884 12.2473C0.409735 13.4913 0 14.8637 0 16.3637C0 18.4659 0.758789 20.2642 2.27594 21.7583C3.79316 23.2528 5.61918 24 7.75375 24H26.5847C28.4191 24 29.9853 23.3603 31.2836 22.0823C32.5816 20.804 33.2308 19.2615 33.2308 17.4545C33.2306 15.9206 32.7457 14.5591 31.7764 13.3718Z"
                                        fill="#567DF4" />
                                </svg>

                                <p className="card__weather__temp">{loading ? weather.temperature : 'loding...'}</p>
                            </div>
                        </div>
                        <div className="my-3">
                            <div className="btn-group">
                                <button className='btn btn-dark btn-sm mr-1' onClick={decButton}>- Dec</button>
                                <button className='btn btn-dark btn-sm' onClick={incButton}>+ Inc</button>
                            </div>
                        </div>
                        <div className="my-3">
                            <input type="text" name="name" onChange={handleInput} value={input.name} className="form-control" placeholder="Enter State Name" />
                            <button className='btn btn-sm btn-success float-center px-4 mt-3' onClick={weaterButton}>Send</button>
                        </div>
                        <div className="alert">
                            <p className="alert-danger">{error ? 'Something Wrong!' : '' }</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;
