import renderer from 'react-test-renderer';
import LoginForm from '../../pages/Login';
import { emptyFunction } from '../const';
import { RenderRouteWithOutletContext } from '../helpers/RenderRouteWithOutletContext';

const mockOutletContext = {
  username: 'test',
  setUsername: emptyFunction,
  password: '#TeSt123',
  setPassword: emptyFunction,
  handleSignup: emptyFunction
};

it('Login page renders correctly', () => {
  const tree = renderer
    .create(
      <RenderRouteWithOutletContext context={mockOutletContext}>
        <LoginForm />
      </RenderRouteWithOutletContext>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
