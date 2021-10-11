

fetch("https://swapi.dev/api/films")
    .then(res => res.json())
    .then(data => console.log(data));

// https://howtocreateapps.com/fetch-and-display-json-html-javascript/



fetch("https://swapi.dev/api/films/")
  .then(function (response) {

    // https://stackoverflow.com/questions/51781137/how-can-i-handle-error-404-in-async-await-fetch-api

    // if (response.status === 200) {
        return response.json();
    // } else {
            // fetch("https://www.swapi.tech/api/films")
            //// this alternate API has different data
            //     .then(function (response) {
            //         return response.json(); //...
                     
    // }
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log(err);
  });

function includesString (str, subStr) {
    const strLen = str.length;
    const subStrLen = subStr.length;

    if (!subStrLen) return false; 

    for (let i = 0; i <= strLen - subStrLen; i++) {
        let counter = 0;
        if (str[i] === subStr[0] ) {
            let idx = i;
            for (let j = 0; j < subStrLen; j++) {
                if (str[idx] === subStr[j]) {
                    counter++;
                    idx++;
                } else {
                    break;
                }    
            }
            if (counter === subStrLen) return true;
        }
    }
    return false;
}

function handleHTMLArr(htmlArr) {
    //// this seems to makes an endless call to every HTML request
    //// don't run it.
    // htmlArr.forEach(x => {
    //     characterDetails(x);
    // });

    htmlArr.forEach(x => {
        
        if (!(includesString(x, "people") || includesString(x, "films"))) {
            characterDetails(x);
        }
    });

    // console.log(htmlArr);
}

function htmlCheck(string) {
    return !(string.substring(0, 4) === "http");
}

function propCheck(prop) {
     return !(prop === "created" || prop === "edited" || prop === "url");
 }

function detailsButton(url) {
    fetch(url)
        .then(x => x.json())
        .then(newObj => {
            console.log(newObj);
            for (property in newObj) {
                if (typeof newObj[property] === "string") {
                    const isHtml = !htmlCheck(newObj[property]);
                    const isProp = propCheck(property);
                    if (isHtml && isProp) {
                        const button = document.createElement("button");
                        button.innerText = `${property}`;
                        button.setAttribute("type", "button");
                        button.setAttribute("onclick", `characterDetails("${newObj[property]}")`)
                        myData.append(button);
                    }
                }
            }
        })
        .catch(err => console.log(err));
}

function characterDetails(charUrl) {
    fetch(charUrl)
        .then(x => x.json())
        .then(char => {
            const details = document.createElement("p");
            for (property in char) {
                if (typeof char[property] === "string") {
                    // TODO: rename these bools
                    const bool = htmlCheck(char[property]);
                    const bool2 = propCheck(property);
                    if (bool && bool2) { 
                        details.innerText += `${property}: ${char[property]}
                        `;
                    }
                    if (!bool) {    
                        detailsButton(char[property]);
                    }
                } else if (typeof char[property] === "object") {
                    handleHTMLArr(char[property]);
                }
            }
            myData.append(details);        
        })
        .catch(err => console.log(err));
}

function generateCharacters(characterArr) {
    const myData = document.getElementById("myData");
    characterArr.forEach(x => {
        const button2 = document.createElement("button");
        fetch(x)
            .then(res => res.json())
            .then(character => {
                console.log(character);
                button2.innerText = character.name;
                button2.setAttribute("type", "button");

                // TODO: maybe add eventListener instead of onclick attribute.
                button2.setAttribute("onclick", `characterDetails("${character.url}")`);
            })
            .catch(err => console.log(err));
        myData.append(button2);
    });
}

//// renders HTML of the opening Crawl after an episode is clicked
function openCrawl(index) {
    const scroll = document.getElementsByClassName("scroll-text")[0];
    const p = document.createElement("p");

    fetch("https://swapi.dev/api/films/")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            generateCharacters(data.results[index].characters);
            
            p.innerText = data.results[index].opening_crawl;
            p.classList.add("scroll-text");
            scroll.appendChild(p);

        })
        .catch(function (err) {
            console.log(err);
        });
}

//// Turn the Episodes into buttons.
function appendData(data) {
    const mainContainer = document.getElementById("myData");
    for (let i = 0; i < data.results.length; i++) {
        // append each title to the page
        const button = document.createElement("button");
        button.innerHTML = "Episode " 
            + data.results[i].episode_id 
            + ': ' + data.results[i].title;
        button.setAttribute("type", "button");
        button.setAttribute("onclick", `openCrawl(${i});`)

        mainContainer.appendChild(button);
    }
    // const br = document.createElement("br");
    // mainContainer.appendChild(br);
}

