document.addEventListener("DOMContentLoaded", function () {

    listing(); //필수 DOM제어하기 api 사용하여 DOM로드되었을 때 영화 리스트함수 실행시킴

});

function options() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTkwMzExYjc0MTJjOGU3ODhjMTIyNTJhMmZjMTRjYyIsInN1YiI6IjY0NzIyOTU4OTQwOGVjMDExZjJiODFhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wfetSlU-tf2XcEn1dKqUydIpBL-n4h_xqrEqgWkfo3Y'
        }
    };
    return options
}
// 검색 자동완성 기능을 구현하고 싶어서 타이틀을 따로 받음
function getMovieinfo() {
    const response = fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
    return response.then(res => res.json());
}

// 타이틀만 따로 모아서 array에 담음
async function exec() {

    let arr = [];
    try {
        let movieinfo = await getMovieinfo();
        let data = movieinfo.results;

        data.map(a => {
            let title = a.title;
            return arr.push(title);
        }) //map을사용해 영화제목 담기

    }
    catch (error) {
        console.log(error);
    }

    return arr;
}


//페이지가 켜졌을 때 영화 리스트 보여주는 함수
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


                titlepath.insertAdjacentHTML("beforeend", temp_html);
            });

        })
        .catch(err => console.error(err));

}

//검색 클릭시 영화가 검색되게 구현
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchmovie();
})

//영화 검색시 자동완성 기능을 만드려고 했음, 검색할 때 마다 검색예상되는 영화 제목이 계속 추가되는 현상은 해결하지 못함
async function findmovie(value) {
    let movietitles = await exec();
    const listpath = document.getElementById("list");
    const option = document.getElementById("option");

    if (value) {
        let arr = movietitles.filter(v => v.includes(value));
        arr.forEach(a => {
            
            let temp_html = `<option value="${a}" id="option"></option>`
            listpath.insertAdjacentHTML("beforeend", temp_html);
            console.log(temp_html);
        })

        console.log(arr);
    }
    else {
        listpath.removeChild(option);
    }

}

//영화 이름 검색시 단어가 들어간 영화는 전부 검색하여 보여줌
function searchmovie() {
    let name;
    const val = searchInput.value.toUpperCase();
    let card = document.getElementsByClassName("col");

    for (i = 0; i < card.length; i++) {
        name = card[i].getElementsByClassName("card-title");
        if (name[0].innerHTML.toUpperCase().indexOf(val) > -1) {
            card[i].style.display = "";
        }

        else {
            card[i].style.display = "none";
        }

    }
}

//영화 id 알람기능
function idAlert(id) {
    alert("영화 id :" + id);
}