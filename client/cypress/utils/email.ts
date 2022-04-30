export const getLinkFromEmail = (email: { body?: string }) => {
  const domWrapper = document.createElement('div');
  domWrapper.innerHTML = email.body;
  return domWrapper.getElementsByTagName('a')[0].href;
};
