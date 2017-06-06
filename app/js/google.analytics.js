export function trackUser() {
  window.addEventListener('hashchange', () => {
    ga('send', 'pageview', document.location.hash);
  });
}
