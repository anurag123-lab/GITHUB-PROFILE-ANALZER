const usernameInput = document.querySelector('#username');
const searchForm  = document.querySelector('#search-form');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username  = usernameInput.value.trim();
    const url = `https://api.github.com/users/${username}`;
    try{
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`HTTP error occured: ${response.status}`);
    }
    const data = await response.json();
    const repositories = await fetchRepositories(username);

    console.log(data);
    console.log(repositories);
}catch(error){
    console.error('Error fetching user data:', error);
}
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

