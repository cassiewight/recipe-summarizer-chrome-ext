//global chrome

//API key set by user
//var apiKey = '82cdfabf5a544ab8b4fc2a377f5fcde3';

function parseURL(query, apiKey){
    return query + apiKey;
}

export function extractRecipeByUrl(url, apiKey){

    var query = 'https://api.spoonacular.com/recipes/extract?url=' + url + '&apiKey=';

    return parseURL(query, apiKey);
}