function searchPokemon(query){
    const url = `https://hungry-woolly-leech.glitch.me/api/pokemon/search/${query}`
    fetch(url, {
        credentials: 'include'
    })
   .then(response => response.json())
   .then((jsonData) => {
       const results = jsonData
        renderResults(results);
        if(Object.keys(results).includes('nextPage')){
            const nextPageNumber = results.nextPage
            console.log('nextPageNumber', nextPageNumber)
            const url1 = `https://hungry-woolly-leech.glitch.me/api/pokemon/search/${query}?page=${nextPageNumber}`;
            fetchNextPage(url1);
        }  
        document.getElementById("errorMessage").innerHTML = "";
     })
   .catch((err)=>{
       console.log('Oops! something went wrong!', err)
       document.getElementById("errorMessage").innerHTML = err;
       renderResults([]);
   })
}


function fetchNextPage(url1){
        fetch(url1)
        .then(response => response.json())
        .then((nextData) =>{
            console.log('in fetch', nextData)
            renderNextPageData(nextData);
            if(Object.keys(nextData).includes('nextPage')){
                console.log('present')
            }
        })
        .catch((error) =>{
            console.log('error in next page', error)
        })
}

function renderResults(results){
    const list1 = document.getElementById('displayResults');
    const q = document.getElementById('inputQuery');

    //list1.innerHTML = "";
    const element = document.createElement('li');
    element.innerText = JSON.stringify(results)
    list1.appendChild(element);
    
    /*
    if(Object.keys(results).includes('nextPage')){
        const nextPageNumber = results.nextPage
        fetchNextPage(nextPageNumber, q);
    }    */
}


function renderNextPageData(nextData){
    const list2 = document.getElementById('displayResults');
        const element2 = document.createElement('li');
        element2.innerText = JSON.stringify(nextData);
        list2.appendChild(element2);    
}


let searchTimeoutID = 0;

window.onload = () => {
    const searchedQuery = document.getElementById("inputQuery")
    searchedQuery.onkeyup = (event) =>{

        clearTimeout(searchTimeoutID);

        if(searchedQuery.value.trim().length===0){
            return;
        }
       searchTimeoutID = setTimeout(()=>{
            searchPokemon(searchedQuery.value)
        }, 500)
        
    }
}

   
   
