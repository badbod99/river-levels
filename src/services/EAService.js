const getStations = async (q) => {
  const url = 'http://environment.data.gov.uk/flood-monitoring/id/stations?';
  const params = new URLSearchParams({
    parameter: 'level',
    status: 'Active'
  });
  if (q) params.set('riverName', q);
  const stationData = await fetch(url + params);
  const allData = await stationData.json();
  const riverData = allData.items.filter((s) => !!(s.riverName));
  return riverData;
}

const getStation = async (id) => {
  const url = `http://environment.data.gov.uk/flood-monitoring/id/stations/${id}.json`;
  const stationData = await fetch(url);
  const allData = await stationData.json();
  const station = allData.items;
  return station;
}

export { getStation, getStations };