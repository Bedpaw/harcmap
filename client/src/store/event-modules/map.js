const initState = () => ({
  mapLongitude: 0,
  mapLatitude: 0,
  mapDefaultLongitude: 0,
  mapDefaultLatitude: 0,
  mapZoom: 2,
  mapDefaultZoom: 2,
  mapRefreshTime: 60, // TODO check this magic numbers;
});
export default {
  state: {
    ...initState(),
  },
  getters: {
    mapRefreshTime: state => state.mapRefreshTime,
    mapPosition: state => ({
      mapLongitude: state.mapLongitude,
      mapLatitude: state.mapLatitude,
      mapZoom: state.mapZoom,
    }),
    mapDefaultPosition: state => ({
      mapDefaultLongitude: state.mapDefaultLongitude,
      mapDefaultLatitude: state.mapDefaultLatitude,
      mapDefaultZoom: state.mapDefaultZoom,
    }),
  },
  mutations: {
    setMapPosition: (state, { mapLatitude, mapLongitude }) => {
      state.mapLatitude = mapLatitude;
      state.mapLongitude = mapLongitude;
    },
    setMapZoom: (state, mapZoom) => (state.mapZoom = mapZoom),
    resetMapState: (state) => {
      Object.assign(state, initState());
    },
  },
  actions: {},
};
