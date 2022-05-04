export default {
  namespaced: true,
  state: {
    // Example: [{icon: '', value: ''}]
    data: [],
    pointId: '',
    popupReference: null,
  },
  getters: {
    data: state => state.data,
    pointId: state => state.pointId,
    popupReference: state => state.popupReference,
  },
  mutations: {
    setData: (state, payload) => (state.data = payload),
    setPointId: (state, payload) => (state.pointId = payload),
    setPopupOrganismRef: (state, payload) => (state.popupReference = payload),
    removePopupOrganismRef: (state) => (state.popupReference = null),
  },
};
