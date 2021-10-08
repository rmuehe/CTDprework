// Learn Fetch API in 6 minutes
// https://www.youtube.com/watch?v=cuEtnrL9-H0

// console.log("hello");

// console.log(fetch("https://reqres.in/api/users/"));

// fetch("https://reqres.in/api/users/"/*, {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body : JSON.stringify({
//         name: "User 1"
//     })
// }*/)
//     .then(res => res.json())
//     .then(data => console.log(data));

// let SWObj = [];

// fetch("https://swapi.dev/api/films/")
//     .then(res => res.json())
//     .then(data => {
//         // console.log(data);
//         for (let property in data) {
//             // SWObj.push(data[property]);
//             console.log(property);
//             console.log(data[property]);
//             SWObj.push(property);
//         }
//     });
//     // .then(data => SWObj = JSON.stringify(data));

// console.log(SWObj);

fetch("https://swapi.dev/api/films")
    .then(res => res.json())
    .then(data => console.log(data));

// fetch("https://www.swapi.tech/api/films")
//     .then(res => res.json())
//     .then(data => console.log(data));

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

// function appendData(data) {
//     var mainContainer = document.getElementById("myData");
//     for (var i = 0; i < data.results.length; i++) {
//         // append each title to our page
//         var div = document.createElement("div");
//         div.innerHTML = "Episode " 
//             + data.results[i].episode_id 
//             + ': ' + data.results[i].title;
//         mainContainer.appendChild(div);
        
//         var p = document.createElement("p");
//         p.innerHTML = data.results[i].opening_crawl;
//         mainContainer.appendChild(p);
//     }
// }

//// Turn the Episodes into buttons.

//// renders HTML of the opening Crawl after an episode is clicked

function characterDetails(charUrl) {
    // const container = document.getElementById("myData");
    // const charStats = document.createElement("div");
    // charStats.innerText = `Birth Year: ${char.birth_year}`;
    // container.append(charStats);
    console.log(charUrl);
    
    
    // fetch(charUrl)
    //     .then(x => x.json())
    //     .then(char => {
    //         const details = document.createElement("p");
    //         for (property in char) {
    //             details.innerText = `${property}: ${char[property]}
    //             `;
    //         }
            
    //         myData.append(details);        
    //     })
    //     .catch(er => console.log(err));

    
}

function generateCharacters(characterArr) {
    //console.log(characterArr);
    const myData = document.getElementById("myData");
    characterArr.forEach((x, i) => {
        const button2 = document.createElement("button");
        fetch(x)
            .then(res => res.json())
            .then(character => {
                console.log(character);
                button2.innerText = character.name;
                button2.setAttribute("type", "button");
                // button2.setAttribute("onclick", `characterDetails(${character.name});`);

                // TODO: add event listener instead of onclick attribute.
                button2.setAttribute("onclick", characterDetails(character.url));
                // const details = document.createElement("p");
                // details.innerText = ``;
                // myData.append(details);
            })
            .catch(err => console.log(err));
        myData.append(button2);

        // button.innerText = 
    });
}

function openCrawl(index) {
    const scroll = document.getElementsByClassName("scroll-text")[0];
    // console.log(scroll);
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

function appendData(data) {
    const mainContainer = document.getElementById("myData");
    for (let i = 0; i < data.results.length; i++) {
        // append each title to our page
        const button = document.createElement("button");
        button.innerText = "Episode " 
            + data.results[i].episode_id 
            + ': ' + data.results[i].title;
        button.setAttribute("type", "button");
        button.setAttribute("onclick", `openCrawl(${i});`)

        mainContainer.appendChild(button);
        
        // var p = document.createElement("p");
        // p.innerHTML = data.results[i].opening_crawl;
        // mainContainer.appendChild(p);
    }
}




// fetch("https://swapi.dev/api/films")
//     .then(res => res.json())
//     .then(data => console.log(data));