import React from 'react';
import {shallow, mount} from 'enzyme';

import {GuessCount} from './guess-count';

describe('<GuessCount />', () => {
    it('Renders without crashing', () => {
        shallow(<GuessCount />);
    });

    it('Renders should display the count', () => {
    	const wrapper = shallow(<GuessCount count="42"/>);
    	expect(wrapper.text()).toEqual('Guess #42!');
    });
});