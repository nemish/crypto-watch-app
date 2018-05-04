import React from 'react';
import { Async } from 'react-select';
import { connect } from 'react-redux';
import 'react-select/dist/react-select.css';
import { store } from '@/index';
import { submit } from 'redux-form';

const allCoinsCache = localStorage.getItem('all-coins');

let options = allCoinsCache ? JSON.parse(allCoinsCache) : [];

const getFiterFn = input => item => item.label.toLowerCase().includes(input);

const getOptions = (input) => {
  if (!input) {
    return Promise.resolve({options: []});
  }
  if (options.length) {
    return Promise.resolve({options: options.filter(getFiterFn(input))});
  }
  return fetch('http://localhost:8080/coinslist/')
    .then(resp => resp.json())
    .then(({ options }) => {
      localStorage.setItem('all-coins', JSON.stringify(options));
      return { options: options.filter(getFiterFn(input)) };
    });
}

const TrackCurrencySelect = props => (
  <Async
    {...props}
    value={props.input.value}
    onChange={value => props.input.onChange(value)}
    onBlur={() => props.input.onBlur(props.input.value)}
    autoload={false}
    loadOptions={getOptions}
  />
);

export default connect()(TrackCurrencySelect);
