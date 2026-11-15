const usernameInput = document.querySelector('#username');
const searchForm  = document.querySelector('#search-form');
const analysisResults = document.querySelector('#analysis-results');
const profileAvatar = document.querySelector('#profile-avatar');
const profileName = document.querySelector('#profile-name');
const profileHandle = document.querySelector('#profile-handle');
const profileBio = document.querySelector('#profile-bio');
const profileStats = document.querySelector('#stats-grid');
const repoList = document.querySelector('#repositories-list');
const languageLists = document.querySelector('#languages-list');
const errorMessage = document.querySelector('#search-status');


searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username  = usernameInput.value.trim();
    if(!username){
        return alert(`Please enter a username`);
    }
    const url = `https://api.github.com/users/${username}`;
    try{
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`HTTP error occured: ${response.status}`);
    }
    const data = await response.json();
    const repositories = await fetchRepositories(username);
    errorMessage.hidden = true;

    profileanalysis(data);
    statsgrid(data, repositories);
    repolistdisplay(repositories);
    languageslist(repositories);

}catch(error){
    console.error('Error fetching user data:', error);
    errorMessage.textContent = `User not found: ${username}`;
    errorMessage.hidden = false;
    analysisResults.hidden = true;

}
searchForm.reset();
})

const fetchRepositories = async (username) => {
    const url = `https://api.github.com/users/${username}/repos?per_page=100`;
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`repositories error occured:${response.status}`);
        }
        const data = await response.json();
        return data;
    }   
    catch (error) {
        console.error('Error fetching repositories:', error);
        return [];
    }   
}
const profileanalysis = (data) =>{
    const { name, login, bio, avatar_url, html_url } = data;
    profileAvatar.src = avatar_url;
    profileAvatar.alt = `${name}'s avatar`;
    profileAvatar.hidden = false;

    profileName.textContent  = name|| login;
    profileHandle.textContent = `@${login}`;
    profileBio.textContent = bio || `No bio available`;

    profileHandle.href = html_url;

    analysisResults.hidden = false;
} 

const statsgrid = (data, repositories) =>{
    const totalRepos = repositories.length;
    const totalStars = repositories.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const totalForks = repositories.reduce((acc, repo) => acc + repo.forks_count, 0);


    const statsElements = [
        { Label : 'Total Repositories', value: totalRepos},
        { Label : 'Total Stars', value: totalStars},
        { Label : 'Total Forks', value: totalForks},
        { Label : 'Total followers', value: data.followers},    
        { Label : 'Total following', value: data.following}
    ];

    profileStats.innerHTML = '';
    statsElements.forEach( stat =>{
        const statItem = document.createElement('div');
        statItem.classList.add('stat-item');
        statItem.innerHTML = `
        <h3>${stat.value}</h3>
        <p> ${stat.Label}</p>
        `;
        profileStats.appendChild(statItem);
    })
}

const repolistdisplay = (repositories) =>{
    repoList.innerHTML = '';
    if(repositories.length === 0){
        const noRepoItem = document.createElement('li');
        noRepoItem.classList.add('no-repo-item');
        noRepoItem.textContent = 'No repositories found';
        repoList.appendChild(noRepoItem);
        return;
    }  
    const topRepos = [...repositories]
    .sort((a,b) => b.stargazers_count - a.stargazers_count) 
    .slice(0, 8);
    topRepos.forEach((repo) =>{
        repoList.innerHTML += ` <article class="repository-card">
                <a class="repository-name" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
                <p class="repository-description">${repo.description || 'No description'}</p>
                <div class="repository-meta">
                    <span class="repository-language">${repo.language || 'Unknown'}</span>
                    <span>★ ${repo.stargazers_count}</span>
                    <span>Forks: ${repo.forks_count}</span>
                </div>
            </article>`})

    }

const languageslist = (repositories) =>{
    const count = {};
    let total = 0;
    repositories.forEach((repo) =>{
        if(repo.language){
            count[repo.language] = (count[repo.language] || 0) + 1;
            total++;
        }
    });
     if(total === 0){
        languageLists.innerHTML = '<p>No languages found</p>';
        return;
    }

        languageLists.innerHTML = '';
        for(const language in count){
            const percentage = ((count[language]/total) * 100).toFixed(1);
            languageLists.innerHTML += ` <div class="language-item">
                    <div class="language-heading">
                        <span class="language-name">${language}</span>
                        <span class="language-count">${percentage}% (${count[language]} repos)</span>
                    </div>
                    <div class="language-track">
                        <div class="language-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>`
        }
    }

