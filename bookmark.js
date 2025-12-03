(async()=>{
  if(!location.hostname.includes('mrmikey-boy.vercel.app'))
    return alert('Only works on https://mrmikey-boy.vercel.app');
  const sid = localStorage.sessionId;
  if(!sid) return alert('Session ID not found – reload the game first.');
  const raw = prompt('How many coins do you want?');
  const coins = Number(raw);
  if(!Number.isFinite(coins)||coins<0) return alert('Enter a positive number.');
  const api = ep => `https://s.${location.hostname}/${ep}?s=${sid}`;
  const stats = await fetch(api('login')).then(r=>r.ok?r.json():Promise.reject());
  stats.coinsOwned = coins;
  const save = await fetch(api('save'),{
    method:'POST',
    body:JSON.stringify(stats),
    headers:{'Content-Type':'application/json'}
  });
  if(!save.ok) return alert('Save failed – try again.');
  location.reload();
})();
