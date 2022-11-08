import renderer from 'react-test-renderer';
import SignupPage from '../../pages/Signup';
import { emptyFunction } from '../const';
import { RenderRouteWithOutletContext } from '../helpers/RenderRouteWithOutletContext';

const mockOutletContext = {
  username: 'test',
  setUsername: emptyFunction,
  password: '#TeSt123',
  setPassword: emptyFunction,
  handleSignup: emptyFunction
};

it('Signup page renders correctly', () => {
  const tree = renderer
    .create(
      <RenderRouteWithOutletContext context={mockOutletContext}>
        <SignupPage />
      </RenderRouteWithOutletContext>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
