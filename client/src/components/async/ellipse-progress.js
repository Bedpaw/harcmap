export const EllipseProgress = () => new Promise((resolve, reject) => {
  import(
    /* webpackChunkName: "ellipse-modules" */
    'vue-ellipse-progress'
  )
    .then(({ VeProgress }) => {
      resolve(VeProgress);
    })
    .catch(reject);
});
