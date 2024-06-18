async function fetchSheetData() {
    const url = 'https://jsoneditoronline.org/#left=cloud.e5dffe2cc3f4445d932f6344de9a4595';
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

function searchContent(query, data) {
    const results = data.filter(page => 
        page.title.toLowerCase().includes(query.toLowerCase()) || 
        page.content.toLowerCase().includes(query.toLowerCase()) ||
        page.items.some(item => 
            item.description.toLowerCase().includes(query.toLowerCase())
        )
    );
    displayResults(results);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';
    results.forEach(result => {
        result.items.forEach(item => {
            const resultElement = document.createElement('div');
            resultElement.innerHTML = `<div>${result.title}</div><div><strong>${item.number}</strong>: <a href="${item.url}" target="_blank">${item.description}</a></div>`;
            resultsContainer.appendChild(resultElement);
        });
    });
}

document.getElementById('search-bar').addEventListener('input', async (event) => {
    const query = event.target.value;
    const data = await fetchSheetData();
    searchContent(query, data);
});