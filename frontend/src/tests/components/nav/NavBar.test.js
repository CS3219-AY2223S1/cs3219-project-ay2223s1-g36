import renderer from 'react-test-renderer';
import NavBar from '../../../components/nav/NavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import NAV_CONFIG from '../../../components/nav/NavConfig';

it('NavBar renders correctly', () => {
  const tree = renderer
    .create(
      <Router>
        <NavBar navConfig={NAV_CONFIG} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
