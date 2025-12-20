if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js') // leading slash important
    .then(reg => console.log('SW Registered:', reg))
    .catch(err => console.log('SW Failed:', err));
}
