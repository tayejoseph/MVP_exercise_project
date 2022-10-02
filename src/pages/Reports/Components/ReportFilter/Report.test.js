import renderer from 'react-test-renderer';
import ReportFilter from './index';

it('renders correctly', () => {
  const filterData = {
    gatewayId: '',
    projectId: '',
    from: '2021-01-01',
    to: '2021-12-31'
  };
  const tree = renderer
    .create(
      <ReportFilter
        {...{
          filterData,
          handleInput: () => console.log,
          projectLists: [],
          gateWayLists: [],
          handleGenerateReport: () => console.log
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
