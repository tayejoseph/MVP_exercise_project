import React from 'react';
import { EmptyState } from 'assets/svgImg';
import Container from './emptyReport.style';

const Reports = () => {
  return (
    <Container>
      <h2>No reports</h2>
      <p>
        Currently you have no data for the reports to be generated. Once you start generating traffic through the
        Balance application the reports will be shown.
      </p>
      <img src={EmptyState} alt="Empty State" />
    </Container>
  );
};

export default Reports;
