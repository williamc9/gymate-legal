// Turn on only after the public App Store listing loads successfully.
const APP_STORE_LIVE = false;
const APP_STORE_URL = 'https://apps.apple.com/app/id6809275248';

const params = new URLSearchParams(window.location.search);
const code = params.get('code')?.toLowerCase() ?? '';
const referral = params.get('ref')?.toUpperCase() ?? '';
const validCode = /^[0-9a-f]{32}$/.test(code);
const validReferral = !referral || /^[0-9a-f]{10}$/i.test(referral);

if (validCode && validReferral) {
  const invite = new URL('gymate://connect');
  invite.searchParams.set('code', code);
  if (referral) invite.searchParams.set('ref', referral);
  document.getElementById('open-app').href = invite.toString();
  document.getElementById('valid-invite').hidden = false;
  if (APP_STORE_LIVE) {
    document.getElementById('download-app').hidden = false;
    document.getElementById('launch-note').hidden = true;
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      // Universal Links open the installed app before this page loads. Website
      // fallback means the app is unavailable, so send iPhone visitors to Store.
      let redirectTimer = window.setTimeout(() => window.location.assign(APP_STORE_URL), 1800);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) window.clearTimeout(redirectTimer);
      }, { once: true });
    }
  }
} else {
  document.getElementById('invalid-invite').hidden = false;
}
