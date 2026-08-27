// Random Joke Generator
// Primary API: Official Joke API (https://official-joke-api.appspot.com/random_joke)
// Fallback: icanhazdadjoke (https://icanhazdadjoke.com/) if primary fails

const els = {
  loading: document.getElementById('loading'),
  jokeArea: document.getElementById('joke-area'),
  setup: document.getElementById('setup'),
  punchline: document.getElementById('punchline'),
  error: document.getElementById('error'),
  newJokeBtn: document.getElementById('new-joke'),
  copyBtn: document.getElementById('copy'),
  shareBtn: document.getElementById('share'),
};

function setLoading(on){
  els.loading.hidden = !on;
  if(on){
    els.jokeArea.hidden = true;
    els.error.hidden = true;
  }
}

function showError(msg){
  els.error.hidden = false;
  els.error.textContent = msg;
  els.jokeArea.hidden = true;
}

function showJoke(setup, punchline){
  els.setup.textContent = setup || '';
  els.punchline.textContent = punchline || '';
  els.jokeArea.hidden = false;
  els.error.hidden = true;
}

// Fetch from Official Joke API
async function fetchOfficialJoke(){
  const res = await fetch('https://official-joke-api.appspot.com/random_joke', {cache: 'no-store'});
  if(!res.ok) throw new Error('Official Joke API error');
  return await res.json(); // {setup, punchline, ...}
}

// Fallback: icanhazdadjoke (returns single-line joke)
async function fetchIcanHazDadJoke(){
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: { Accept: 'application/json' },
    cache: 'no-store'
  });
  if(!res.ok) throw new Error('icanhazdadjoke error');
  return await res.json(); // {joke: "..."}
}

async function loadJoke(){
  setLoading(true);
  try{
    // Try primary API
    const data = await fetchOfficialJoke();
    const setup = data.setup || '';
    const punchline = data.punchline || '';
    showJoke(setup, punchline);
  }catch(primaryErr){
    try{
      // fallback
      const data = await fetchIcanHazDadJoke();
      // Use the single-line joke as setup + punchline
      showJoke(data.joke, '');
    }catch(fallbackErr){
      showError('Could not load a joke. Please try again.');
      console.error(primaryErr, fallbackErr);
    }
  }finally{
    setLoading(false);
  }
}

function copyJokeToClipboard(){
  const setup = els.setup.textContent.trim();
  const punch = els.punchline.textContent.trim();
  const text = punch ? `${setup}\n\n${punch}` : setup;
  if(!text) return;
  navigator.clipboard?.writeText(text).then(() => {
    els.copyBtn.textContent = 'Copied!';
    setTimeout(() => els.copyBtn.textContent = 'Copy', 1200);
  }).catch(() => {
    // fallback: select + prompt
    alert('Copy failed — select the text manually.');
  });
}

async function shareJoke(){
  const setup = els.setup.textContent.trim();
  const punch = els.punchline.textContent.trim();
  const text = punch ? `${setup}\n\n${punch}` : setup;
  if(navigator.share){
    try{
      await navigator.share({text, title: 'Joke for you!'});
    }catch(e){
      // user cancelled or failed
    }
  }else{
    // fallback: copy to clipboard and inform user
    copyJokeToClipboard();
    alert('Sharing not supported — the joke was copied to your clipboard.');
  }
}

// Event bindings
els.newJokeBtn.addEventListener('click', loadJoke);
els.copyBtn.addEventListener('click', copyJokeToClipboard);
els.shareBtn.addEventListener('click', shareJoke);

// Load initial joke
loadJoke();
