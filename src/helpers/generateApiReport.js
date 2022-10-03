const generateApiReport = ({ data, filterData, gateWayLists, projectLists }) => {
  const { gatewayId, projectId } = filterData;

  let total = 0;

  const formatedData = {};

  data.forEach((item) => {
    total += item.amount;

    if (projectId === 'all') {
      formatedData[item.projectId] = {
        ...(formatedData[item.projectId] || {}),
        transactionsLists: [
          ...(formatedData[item.projectId]?.transactionsLists || []),
          {
            ...item,
            gateWayData: gateWayLists.find((data) => data.gatewayId === item.gatewayId)
          }
        ],
        total: (formatedData[item.projectId]?.total || 0) + item.amount
      };

      if (!formatedData[item.projectId]?.name) {
        formatedData[item.projectId] = {
          ...formatedData[item.projectId],
          ...(projectLists.find((data) => data.projectId === item.projectId) || {})
        };
      }
    } else if (gatewayId === 'all') {
      formatedData[item.gatewayId] = {
        ...(formatedData[item.gatewayId] || {}),
        transactionsLists: [...(formatedData[item.gatewayId]?.transactionsLists || []), item],
        total: (formatedData[item.gatewayId]?.total || 0) + item.amount
      };

      if (!formatedData[item.gatewayId]?.name) {
        formatedData[item.gatewayId] = {
          ...formatedData[item.gatewayId],
          ...(gateWayLists.find((data) => data.gatewayId === item.gatewayId) || {})
        };
      }
    } else {
      formatedData[item.projectId] = {
        ...(formatedData[item.projectId] || {}),
        transactionsLists: [...(formatedData[item.projectId]?.transactionsLists || []), item],
        total: (formatedData[item.projectId]?.total || 0) + item.amount
      };

      if (!formatedData[item.projectId]?.name) {
        formatedData[item.projectId] = {
          ...formatedData[item.projectId],
          ...(projectLists.find((data) => data.projectId === item.projectId) || {})
        };
      }
    }
  });

  const reportLists = Object.values(formatedData).sort((a, b) => (a.name > b.name ? 1 : -1));

  return {
    reportData: {
      activeProject: projectId,
      total,
      activeGateWay: gatewayId,
      reportLists
    },
    activeProjectKey: reportLists[0]?.projectId || reportLists[0]?.gatewayId
  };
};

export default generateApiReport;
