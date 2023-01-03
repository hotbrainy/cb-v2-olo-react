import reducer, {initialState} from '../user';

/**
 * Testing the initial state
 */
test('Should return initial state', () => {
    expect(reducer(undefined, {type : undefined})).toEqual(initialState);
});


// TODO: define appropriate tests
