document.addEventListener("DOMContentLoaded", function () {

    listing();

});

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTkwMzExYjc0MTJjOGU3ODhjMTIyNTJhMmZjMTRjYyIsInN1YiI6IjY0NzIyOTU4OTQwOGVjMDExZjJiODFhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wfetSlU-tf2XcEn1dKqUydIpBL-n4h_xqrEqgWkfo3Y'
    }
};



function listing() {
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then((data) => {
    

            let rows = data.results;
            rows.forEach(a => {
                let title = a.title;
                let overview = a.overview;
                let vote_average = a.vote_average;
                let poster_path = a.poster_path;
                let movieId = a.id;
                const titlepath = document.getElementById("cards-box");
                console.log(data.results);
               
                let temp_html = `<div class="col" id=${movieId} onclick=idAlert(this.id)>
                                    <div class="cards" id="cards">
                                        <img src="https://image.tmdb.org/t/p/w300${poster_path}"
                                            class="card-img-top">
                                        <div class="card-body" id="card-body">
                                            <h5 class="card-title" id="title">${title}</h5>
                                            <p class="card-text" id="overview">${overview}</p>
                                            <p class="vote" id="vote">${vote_average}</p>
                                        </div>
                                    </div>
                                </div>`
                                    
                
                titlepath.insertAdjacentHTML("beforeend",temp_html);
            });  

        })
        .catch(err => console.error(err));

}

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click',(e) => {
   e.preventDefault();
    const val = searchInput.value;
    console.log(val);
    
})

function filter(){
    let name;
    const val = searchInput.value.toUpperCase();
    let card = document.getElementsByClassName("col");

    for(i=0;i<card.length;i++){
        name = card[i].getElementsByClassName("card-title");
        if(name[0].innerHTML.toUpperCase().indexOf(val)>-1){
            card[i].style.display = "";
        }
        
        else{
            card[i].style.display = "none";
        }
      
    }
}

function idAlert(id){
    alert("영화 id :"+id);
}