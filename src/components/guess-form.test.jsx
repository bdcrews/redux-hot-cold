import React from 'react';
import {shallow, mount} from 'enzyme';

import {GuessForm} from './guess-form';
import {makeGuess} from '../actions';

const mockAction = {
    type: 'MAKE_GUESS'
};
jest.mock('../actions', () => Object.assign({},
    require.requireActual('../actions'),
    {
        makeGuess: jest.fn().mockImplementation(() => {
            return mockAction;
        })
    }
));


describe('<GuessForm />', () => {
    it('Renders without crashing', () => {
        shallow(<GuessForm />);
    });

	it('should dispatch makeGuess when the form is submitted', () => {
		const value = "42";
        const dispatch = jest.fn();
        const wrapper = mount(<GuessForm dispatch={dispatch} />);
		wrapper.find('input[type="text"]').node.value = value;
		wrapper.simulate('submit');
        expect(dispatch).toHaveBeenCalledWith(makeGuess(value));
	});

    it('Should reset the input when the form is submitted', () => {
        const wrapper = mount(<GuessForm dispatch={() => {}}/>);
        const input = wrapper.find('input[type="text"]');
        input.node.value = 10;
        wrapper.simulate('submit');
        expect(input.node.value).toEqual('');
    });

});