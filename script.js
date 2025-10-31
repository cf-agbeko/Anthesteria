(() => {
  const MAX_CAPACITY = 70;
  let remaining = MAX_CAPACITY;

  const remainingEl = document.getElementById('remainingCount');
  const form = document.getElementById('ticketForm');
  const result = document.getElementById('ticketResult');

  function setRemaining(value){
    remaining = Math.max(0, value);
    remainingEl.textContent = remaining.toString();
  }

  function setError(fieldId, message){
    const el = document.querySelector(`.error[data-for="${fieldId}"]`);
    if(el){ el.textContent = message || ''; }
  }

  function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Grab values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const qty = parseInt(document.getElementById('quantity').value, 10) || 1;
    const notes = document.getElementById('notes').value.trim();

    // Reset errors
    setError('fullName', '');
    setError('email', '');

    // Basic validation
    let ok = true;
    if(!fullName){
      setError('fullName', 'Please enter your name.');
      ok = false;
    }
    if(!validateEmail(email)){
      setError('email', 'Please enter a valid email address.');
      ok = false;
    }
    if(!ok) return;

    if(qty > remaining){
      result.hidden = false;
      result.innerHTML = `
        <strong>Not enough tickets left.</strong><br/>
        You requested ${qty}, but only ${remaining} ${remaining === 1 ? 'is' : 'are'} available.
      `;
      return;
    }

    // "Reserve" tickets
    setRemaining(remaining - qty);

    // Show confirmation
    const when = '18 Oct 2025, 11:00–18:00';
    result.hidden = false;
    result.innerHTML = `
      <strong>Reservation confirmed!</strong><br/>
      Name: <em>${fullName}</em><br/>
      Email: <em>${email}</em><br/>
      Tickets: <em>${qty}</em>${notes ? `<br/>Notes: <em>${notes}</em>` : ''}<br/>
      Event: <em>Anthesteria — Naiposha Gardens, Kenya</em><br/>
      Date & Time: <em>${when}</em><br/>
      Remaining capacity: <strong>${remaining}</strong>
    `;

    // Reset form for convenience
    form.reset();
    document.getElementById('quantity').value = '1';
  });

  // Initialize
  setRemaining(remaining);
})();
