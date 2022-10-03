export function projectTitle(reportData, list) {
  return reportData.activeProject === 'all'
    ? 'All project'
    : list.find((data) => data.projectId === reportData.activeProject)?.name;
}

export function gatewayTitle(reportData, list) {
  return reportData.activeGateWay === 'all'
    ? 'All gateways'
    : list.find((data) => data.gatewayId === reportData.activeGateWay)?.name;
}
