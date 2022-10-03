import renderer from 'react-test-renderer';
import EmptyReport from './index';

it('renders correctly', () => {
  const tree = renderer.create(<EmptyReport />).toJSON();
  expect(tree).toMatchSnapshot();
});
