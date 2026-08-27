# Random Joke Generator

A tiny static app that fetches a random joke from the web.

Features
- Gets random jokes from the Official Joke API (setup + punchline).
- Falls back to icanhazdadjoke if needed.
- Copy-to-clipboard and Web Share support.
- No build tools or API keys required — static HTML/CSS/JS.

How to run
1. Save the files (index.html, styles.css, script.js, README.md) into a folder.
2. Open index.html in any modern browser (Chrome, Edge, Firefox, Safari).
3. Click "New Joke" to fetch a fresh joke.

Notes / CORS
- Official Joke API supports cross-origin requests and requires no API key.
- If any API becomes unavailable, the app falls back to icanhazdadjoke, which also supports CORS.

Ideas for improvements
- Add categories or jokes filter.
- Add animations for punchline reveal.
- Persist favorite jokes to localStorage.
- Deploy to GitHub Pages / Netlify for a public link.

License
- Use however you like — MIT-compatible.
