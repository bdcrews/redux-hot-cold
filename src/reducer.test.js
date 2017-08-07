import reducer from './reducer';
import {newGame, makeGuess, toggleInfoModal} from './actions';

describe('reducer', ()=>{
	// set up some dummy data
	const testGuesses= [50, 25, 35];
	const feedback= 'This is test feedback';
	const testCorrectAnswer= 42;
	const testShowInfoModal= true;

    it('Should set the initial state when nothing is passed in', () => {
        const state = reducer(undefined, {type: '__UNKNOWN'});
        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(state.correctAnswer).toBeLessThanOrEqual(100);
        expect(state.showInfoModal).toEqual(false);
    });

    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = reducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });

    describe('newGame', () => {
        it('Should start a new game', () => {
            let state;
            state = reducer(state, newGame());
	        expect(state.guesses).toEqual([]);
	        expect(state.feedback).toEqual('Make your guess!');
	        expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
	        expect(state.correctAnswer).toBeLessThanOrEqual(100);
	        expect(state.showInfoModal).toEqual(false);
        });
    });

    describe('makeGuess', () => {
        it('Should make a guess', () => {
            let state = {
			    guesses: testGuesses,
			    feedback: feedback,
			    correctAnswer: testCorrectAnswer,
			    showInfoModal: testShowInfoModal
            };

            state = reducer(state, makeGuess(testCorrectAnswer));
	        expect(state.guesses).toEqual([...testGuesses, testCorrectAnswer]);
	        expect(state.feedback).toEqual('You got it!');
	        expect(state.correctAnswer).toEqual(testCorrectAnswer);
	        expect(state.showInfoModal).toEqual(testShowInfoModal);
        });
    });

    describe('toggleInfoModal', () => {
        it('Should toggle the info modal state', () => {
            let state = {
			    guesses: testGuesses,
			    feedback: feedback,
			    correctAnswer: testCorrectAnswer,
			    showInfoModal: testShowInfoModal
            };

            state = reducer(state, toggleInfoModal());
	        expect(state.showInfoModal).toEqual(!testShowInfoModal);
        });
    });


});