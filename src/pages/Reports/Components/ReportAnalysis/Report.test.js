import renderer from 'react-test-renderer';
import ReportAnalysis from './index';

it('renders correctly', () => {
  const reportData = {
    errorMessage: '',
    activeProject: '',
    activeGateWay: '',
    total: 0,
    reportLists: null
  };
  const tree = renderer
    .create(
      <ReportAnalysis
        {...{
          reportData,
          type: ''
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
