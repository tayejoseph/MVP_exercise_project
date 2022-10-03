import * as React from 'react';
import PropTypes from 'prop-types';

const SvgPieChart = ({ isActive, ...props }) => (
  <svg width="1em" height="1em" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M24.882 13.21h-12.11l-8.56 8.56a12.46 12.46 0 0 0 20.67-8.56ZM3.112 20.66A12.45 12.45 0 0 1 11.672 0v12.11l-8.56 8.56v-.01Z"
      fill={isActive ? '#2DAEE5' : '#CDCCCC'}
    />
    <path d="M13.232 0v11.65h11.65A12.44 12.44 0 0 0 13.232 0Z" fill={isActive ? '#005B97' : '#CDCCCC'} />
  </svg>
);

SvgPieChart.propTypes = {
  isActive: PropTypes.bool
};

export default SvgPieChart;
