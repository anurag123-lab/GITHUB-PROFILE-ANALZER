# GitHub Profile Analyser

A web app where you enter any GitHub username and instantly see their profile, stats, top repositories and most used languages. It uses the public GitHub API, so no login or API key is needed.

(<Screenshot (1).png>)

## Features

- **Profile overview:** avatar, name, username link and bio
- **Public profile stats:** total repositories, stars, forks, followers and following
- **Top repositories:** the 8 most starred repos, with description, language, stars and forks
- **Languages used:** a progress bar for each language, with percentage and repo count
- **Error handling:** a clear message for unknown usernames, and a check for an empty search box

## Built With

- HTML5
- CSS3
- JavaScript (ES6)

## What I Practised

- Fetching data from a REST API with `fetch` and `async/await`
- Handling errors with `try/catch` and `response.ok`
- ES6 features: arrow functions, destructuring, template strings, spread operator
- Array methods: `map`, `filter`, `reduce`, `sort`, `slice`, `forEach`
- Updating the page with DOM methods: `querySelector`, `createElement`, `appendChild`, `innerHTML`, `textContent`
- Counting values and turning them into percentages (language bars)

## How It Works

1. The user types a GitHub username and submits the form.
2. The app fetches the profile from `https://api.github.com/users/{username}`.
3. It then fetches up to 100 public repositories from `https://api.github.com/users/{username}/repos?per_page=100`.
4. The data is shown in four sections: profile, stats, languages and top repositories.

## How to Run

1. Clone the repository:
   ```
   git clone https://github.com/your-username/github-profile-analyzer.git
   ```
2. Open the project folder.
3. Open `index.html` in your browser.
4. Enter a GitHub username, for example `octocat`, and click **Analyze profile**.

## Project Structure

```
github-profile-analyzer/
├── index.html
├── style.css
├── script.js
├── screenshot.png
└── README.md
```

## Limitations

- GitHub allows only about 60 API requests per hour without login, so too many searches may show an error for a while.
- Only the latest 100 public repositories are analysed.
- Repositories with no language set are left out of the language percentages.

## Future Improvements

- Dark mode toggle
- Compare two users side by side
- Clickable suggested usernames
- Loading spinner while data is being fetched
- Sort repositories by forks or recent updates
