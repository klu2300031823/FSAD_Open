// 10.18

import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { SignInContainer } from "../components/SignIn"; // component to be tested

describe('SignIn', () => { // tests for the SignIn component are wrapped inside a describe block with the name SignIn
    describe('SignInContainer', () => { // tests for the SignInContainer component are wrapped inside a describe block with the name SignInContainer
        it('calls onSubmit func with correct args when the form is submitted', async () => { 
            const onSubmit = jest.fn(); // create a mock function
            const { getByTestId } = render(<SignInContainer onSubmit={onSubmit} />); // render the SignInContainer component with the mock function as the onSubmit prop

            fireEvent.changeText(getByTestId('usernameField'), 'Testikissa');
            fireEvent.changeText(getByTestId('passwordField'), 'salasana');
            fireEvent.press(getByTestId('submitButton'));

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);
                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'Testikissa',
                    password: 'salasana',
                });
            }
            );
        });
    });

});

