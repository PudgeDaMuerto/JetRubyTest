async function getTrendingRepos() {
    const response = await fetch("https://api.github.com/search/repositories?" + new URLSearchParams({
        q: "javascript",    
        sort: "stars",
        order: "desc"
    }));
    const jsonResponse = await response.json();
    let formattedResponse = { 
        items: []
    };
    jsonResponse.items.forEach(item => {
        formattedResponse.items.push({
            repoId: item.id,
            name: item.name,
            full_name: item.full_name,
            private: item.private,
            html_url: item.html_url,
            description: item.description,
            url: item.url,
            created_at: item.created_at,
            updated_at: item.updated_at,
            pushed_at: item.pushed_at,
            stargazers_count: item.stargazers_count,
            watchers_count: item.watchers_count,
            language: item.language
        })
    });
    
    return formattedResponse;
}

module.exports = { getTrendingRepos };