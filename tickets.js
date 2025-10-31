(() => {
  const form = document.getElementById('ticketsForm');
  const steps = [...document.querySelectorAll('.step')];
  const stepper = [...document.querySelectorAll('.stepper li')];
  const result = document.getElementById('result');
  const reviewBox = document.getElementById('review');

  let current = 0;

  function go(i){
    steps[current].classList.remove('current');
    stepper[current].classList.remove('active');
    current = i;
    steps[current].classList.add('current');
    stepper[current].classList.add('active');
  }

  function next(){
    if(current === 0){
      // Basic validation for name/email
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      document.querySelector('[data-for="name"]').textContent = name.value.trim() ? '' : 'Please enter your name.';
      document.querySelector('[data-for="email"]').textContent = emailOk ? '' : 'Please enter a valid email.';
      if(!name.value.trim() || !emailOk) return;
    }
    if(current === 2){
      // Prepare review
      const data = new FormData(form);
      const ws = data.getAll('workshops').join(', ') || 'None';
      reviewBox.innerHTML = `
        <strong>Summary</strong><br>
        Name: <em>${data.get('name')}</em><br>
        Email: <em>${data.get('email')}</em><br>
        Phone: <em>${data.get('phone') || '—'}</em><br>
        Tickets: <em>${data.get('qty')}</em> × <em>${data.get('tier')}</em><br>
        Workshops: <em>${ws}</em><br>
        Notes: <em>${data.get('notes') || '—'}</em>
      `;
    }
    if(current < steps.length - 1) go(current + 1);
  }

  function prev(){ if(current > 0) go(current - 1); }

  document.querySelectorAll('.next').forEach(b => b.addEventListener('click', next));
  document.querySelectorAll('.prev').forEach(b => b.addEventListener('click', prev));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    result.hidden = false;
    result.innerHTML = `<strong>Reservation received!</strong> You’ll get an on-page confirmation and follow-up by email.`;
    form.reset();
    go(0);
  });
})();
