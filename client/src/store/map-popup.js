export default {
  namespaced: true,
  state: {
    // Example: [{icon: '', value: ''}]
    data: [],
    pointId: '',
    popupReference: null,
    popupPointReference: null,
  },
  getters: {
    data: state => state.data,
    pointId: state => state.pointId,
    popupReference: state => state.popupReference,
    popupPointReference: state => state.popupPointReference,
  },
  mutations: {
    setData: (state, payload) => (state.data = payload),
    setPointId: (state, payload) => (state.pointId = payload),
    setPopupOrganismRef: (state, payload) => (state.popupReference = payload),
    setPopupPointOrganismRef: (state, payload) => (state.popupPointReference = payload),
    removePopupOrganismRef: (state) => {
      state.popupReference = null;
      state.popupPointReference = null;
    },
  },
};
