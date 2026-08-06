const ACCESS_HASH = '23d7fab2ebe9ef8308592d34fa2bb234a0aef2e9a0c03672347ab3d1ff827eed';
const ACCESS_SESSION_KEY = 'murmia-prototype-access-v1';

async function accessHash(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function unlockPrototype() {
  document.body.classList.remove('gate-locked');
  sessionStorage.setItem(ACCESS_SESSION_KEY, 'granted');
}

const isLocalPreview = location.protocol === 'file:' || ['localhost', '127.0.0.1', '::1'].includes(location.hostname);

if (isLocalPreview || sessionStorage.getItem(ACCESS_SESSION_KEY) === 'granted') {
  unlockPrototype();
} else {
  document.querySelector('#accessGateForm').addEventListener('submit', async event => {
    event.preventDefault();
    const input = document.querySelector('#accessPassword');
    const error = document.querySelector('#accessGateError');
    const valid = await accessHash(input.value) === ACCESS_HASH;
    if (valid) {
      unlockPrototype();
      return;
    }
    error.textContent = '密码不正确';
    input.select();
  });
}
