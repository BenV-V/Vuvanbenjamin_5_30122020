const content = document.getElementById('content');

fetch('http://localhost:3000/api/cameras')
    .then(response => {return response.json()})
    .then((data) => {
        console.log(data)
    });