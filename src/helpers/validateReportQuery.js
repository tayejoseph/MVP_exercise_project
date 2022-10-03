const validateReportQuery = (filterData) => {
  const { projectId, gatewayId } = filterData;

  if (!projectId && !gatewayId) return 'You need to select a project and gateway before a report can be generated';
  else if (!projectId) return 'You need to select a project before a report can be generated';
  else if (!gatewayId) return 'You need to select a gateway before the report can be generated';
};

export default validateReportQuery;
