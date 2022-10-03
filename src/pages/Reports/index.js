import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { axios } from 'lib';
import { Spinner } from 'components';
import { generateApiReport, handleError, gatewayTitle, projectTitle, validateReportQuery, toMoney } from 'helpers';
import Container from './Report.styles';
import ReportAnalysis from './components/ReportAnalysis';
import ReportFilter from './components/ReportFilter';
import EmptyReport from './components/EmptyReport';
import ReportLists from './components/ReportLists';

const initfilterData = {
  gatewayId: '',
  projectId: '',
  from: '2021-01-01',
  to: '2021-12-31'
};

const Reports = () => {
  const [{ gateWayLists, projectLists }, setApiData] = useState({
    gateWayLists: [],
    projectLists: []
  });

  const [loading, setLoading] = useState(false);
  const [activeProjectKey, setActiveProjectKey] = useState('');

  const [filterData, setFilterData] = useState(initfilterData);
  const [reportData, setReportData] = useState({
    errorMessage: '',
    activeProject: '',
    activeGateWay: '',
    total: 0,
    reportLists: []
  });

  const showTotal =
    (reportData.activeProject === 'all' && reportData.activeGateWay === 'all') ||
    (reportData.activeProject !== 'all' && reportData.activeGateWay !== 'all');

  const showGatewayAnalysis = reportData.activeProject === 'all' && reportData.activeGateWay !== 'all';

  const showProjectAnalysis = reportData.activeProject !== 'all' && reportData.activeGateWay === 'all';

  const handleInput = ({ target: { value, name } }) => {
    if (reportData.errorMessage)
      setReportData((s) => ({
        ...s,
        errorMessage: ''
      }));
    setFilterData((s) => ({
      ...s,
      [name]: value
    }));
  };

  const handleGenerateReport = useCallback(
    (filterData) => {
      const getReport = async () => {
        const { gatewayId, projectId, from, to } = filterData;

        let errorMessage = validateReportQuery(filterData);

        if (!moment(from).isBefore(to)) {
          errorMessage = 'Your start date should be before the end date';
        }

        if (errorMessage) {
          setReportData((s) => ({
            ...s,
            errorMessage
          }));
          return;
        }

        setLoading(true);

        const { data: response } = await axios.post('/report', {
          ...filterData,
          projectId: projectId === 'all' ? '' : projectId,
          gatewayId: gatewayId === 'all' ? '' : gatewayId
        });

        setLoading(false);

        const { reportData, activeProjectKey } = generateApiReport({
          data: response.data || [],
          filterData,
          gateWayLists,
          projectLists
        });

        setReportData(reportData);

        setActiveProjectKey(activeProjectKey);
      };
      getReport();
    },
    [projectLists, gateWayLists]
  );

  const fetchProjects = () => {
    axios
      .get('/projects')
      .then((res) => {
        setApiData((s) => ({ ...s, projectLists: res.data.data }));
      })
      .catch(handleError);
  };

  const fetchGateways = () => {
    axios
      .get('/gateways')
      .then((res) => {
        setApiData((s) => ({ ...s, gateWayLists: res.data.data }));
      })
      .catch(handleError);
  };

  useEffect(() => {
    fetchGateways();
    fetchProjects();
  }, []);

  return (
    <Container>
      <header>
        <div className="col-1">
          <h1>Reports</h1>
          <p>Easily generate a report of your transactions</p>
          <p className="error-msg">{reportData.errorMessage}</p>
        </div>
        <div className="col-2">
          <ReportFilter
            {...{
              filterData,
              handleInput,
              projectLists,
              gateWayLists,
              handleGenerateReport
            }}
          />
        </div>
      </header>
      {loading ? (
        <div className="loading-container">
          <Spinner size={'55px'} />
        </div>
      ) : (
        <>
          {reportData.reportLists.length === 0 ? (
            <EmptyReport />
          ) : (
            <div className="report-row">
              <div className="report-container-col">
                <div className="report-content">
                  <h1>
                    {projectTitle(reportData, projectLists)} | {gatewayTitle(reportData, gateWayLists)}
                  </h1>

                  <ReportLists
                    {...{
                      reportLists: reportData.reportLists,
                      activeProject: reportData.activeProject,
                      activeGateWay: reportData.activeGateWay,
                      activeProjectKey,
                      handleSetActiveProject: (key) => {
                        setActiveProjectKey((s) => (s === key ? null : key));
                      }
                    }}
                  />
                </div>

                {showTotal && (
                  <div className="total-container">
                    <h3>TOTAL: {toMoney(reportData.total)} USD</h3>
                  </div>
                )}
              </div>
              {showGatewayAnalysis && (
                <ReportAnalysis
                  {...{
                    type: 'gateway',
                    reportLists: reportData.reportLists,
                    total: reportData.total
                  }}
                />
              )}
              {showProjectAnalysis && (
                <ReportAnalysis
                  {...{
                    type: 'project',
                    reportLists: reportData.reportLists,
                    total: reportData.total
                  }}
                />
              )}
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Reports;
