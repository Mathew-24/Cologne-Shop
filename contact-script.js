/* contact-script.js
   - Handles contact form submit
   - Redirects to email_mockup.html or social_mockup.html with query params
   - Saves messages into localStorage (for Customer Messages later)
*/

(function(){
  const form = document.getElementById('contactForm');
  const platformSelect = document.getElementById('platform');
  const socialPick = document.getElementById('socialPick');
  const saveBtn = document.getElementById('saveMsg');
  const notice = document.getElementById('savedNotice');

  // show/hide social pick
  platformSelect.addEventListener('change', () => {
    if (platformSelect.value === 'social') socialPick.style.display = 'block';
    else socialPick.style.display = 'none';
  });

  // handle submit: redirect with encoded params
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getFormData();
    if (!data.platform) { alert('Please select a platform.'); return; }

    const params = new URLSearchParams();
    params.set('name', data.name);
    params.set('email', data.email);
    params.set('phone', data.phone);
    params.set('subject', data.subject);
    params.set('message', data.message);
    if (data.platform === 'email') {
      window.location = `email_mockup.html?${params.toString()}`;
    } else {
      params.set('platform', document.getElementById('socialPlatform').value || 'facebook');
      window.location = `social_mockup.html?${params.toString()}`;
    }
  });

  // Save message locally (simulate storing contact messages)
  saveBtn.addEventListener('click', () => {
    const data = getFormData();
    const saved = JSON.parse(localStorage.getItem('vc_messages') || '[]');
    const date = new Date().toISOString().slice(0,10);
    saved.push({ id: Date.now(), name: data.name, email: data.email, phone: data.phone, subject: data.subject, message: data.message, date });
    localStorage.setItem('vc_messages', JSON.stringify(saved));
    notice.innerHTML = `<div class="small" style="color:green">Message saved locally. You can view it later (Customer Messages page) — ${date}</div>`;
    setTimeout(()=>notice.innerHTML='', 4500);
  });

  function getFormData(){
    return {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim(),
      platform: document.getElementById('platform').value
    };
  }

})();
