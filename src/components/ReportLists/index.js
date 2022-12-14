import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { toMoney } from 'helpers';
import Container from './reportLists.style';

const ReportLists = (props) => {
  const { reportLists, activeProject, activeGateWay, handleSetActiveProject, activeProjectKey } = props;

  const renderLists = (data) => {
    const { total, projectId, gatewayId, name, transactionsLists } = data;
    const uniqueKey = projectId || gatewayId;
    const showShowLabel = activeProject !== 'all' && activeGateWay !== 'all';
    const showGateWay = activeGateWay === 'all' && activeProject === 'all';

    return (
      <>
        <div
          className="project-item"
          key={uniqueKey}
          style={{ display: showShowLabel ? 'none' : 'flex' }}
          onClick={() => {
            handleSetActiveProject(uniqueKey);
          }}>
          <h3>{name}</h3>
          <h3>TOTAL: {toMoney(total.toFixed(2))} USD</h3>
        </div>
        {/* 22.06.2022 */}
        {transactionsLists && activeProjectKey === uniqueKey ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  {showGateWay && <th>Gateway</th>}
                  <th>Transaction ID</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactionsLists
                  .sort((a, b) => (moment(a.modified).isAfter(b.modified) ? 1 : -1))
                  .map((item) => (
                    <tr key={item.paymentId}>
                      <td>{moment(item.modified).format('DD.MM.YYYY')}</td>
                      {showGateWay && <td>{item?.gateWayData?.name}</td>}
                      <td>{item.paymentId}</td>
                      <td>{toMoney(item.amount)} USD</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          ''
        )}
      </>
    );
  };

  return (
    <Container>
      <>
        {reportLists.map((item) => (
          <React.Fragment key={item.projectId || item.gatewayId}>{renderLists(item)}</React.Fragment>
        ))}
      </>
    </Container>
  );
};

ReportLists.propTypes = {
  reportLists: PropTypes.array,
  activeProject: PropTypes.string,
  activeGateWay: PropTypes.string,
  handleSetActiveProject: PropTypes.func,
  activeProjectKey: PropTypes.string
};

export default ReportLists;
