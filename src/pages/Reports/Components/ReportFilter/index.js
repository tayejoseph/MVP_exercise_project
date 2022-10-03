import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup } from 'components';

const ReportFilter = (props) => {
  const { filterData, handleInput, projectLists, gateWayLists, handleGenerateReport } = props;

  return (
    <>
      <InputGroup
        type="select"
        name="projectId"
        value={filterData.projectId}
        onChange={handleInput}
        optionLists={
          <>
            <option value="" disabled>
              Select project
            </option>
            <option value={'all'}>All Project</option>
            {projectLists.length > 0
              ? projectLists.map((item) => (
                  <option value={item.projectId} key={item.projectId}>
                    {item.name}
                  </option>
                ))
              : null}
          </>
        }
      />
      <InputGroup
        type="select"
        name="gatewayId"
        className="gateway-item"
        value={filterData.gatewayId}
        optionLists={
          <>
            <option value="" disabled>
              Select gateway
            </option>
            <option value={'all'}>All Gateway</option>
            {gateWayLists.length > 0
              ? gateWayLists.map((item) => (
                  <option value={item.gatewayId} key={item.gatewayId}>
                    {item.name}
                  </option>
                ))
              : null}
          </>
        }
        onChange={handleInput}
      />
      <InputGroup
        type="date"
        flexLabel="From"
        value={filterData.from}
        onChange={handleInput}
        // min="1900-01-01" max="2016-06-06"
        min="2021-01-01"
        max="2021-12-31"
        name="from"
      />
      <InputGroup
        type="date"
        flexLabel="To"
        value={filterData.to}
        onChange={handleInput}
        min="2021-01-01"
        max="2021-12-31"
        name="to"
      />
      <button onClick={() => handleGenerateReport(filterData)}>Generate Report</button>
    </>
  );
};

ReportFilter.propTypes = {
  filterData: PropTypes.shape({
    gatewayId: PropTypes.string,
    projectId: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string
  }),
  handleInput: PropTypes.func,
  projectLists: PropTypes.array,
  gateWayLists: PropTypes.array,
  handleGenerateReport: PropTypes.func
};

export default ReportFilter;
