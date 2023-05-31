window.onload = () => {  //(웹브라우저 자체를 담당하는 window라는 객체가, 웹 문서를 불러올 때, 문서가 사용되는 시점에 실행되는 onload라는 함수를 내가 다시 재정의 한다는 개념이다.)
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjYzYzI0YzE1NWI3M2U0NGZkOTgyOGE4ODVkOWE2YSIsInN1YiI6IjY0NzA4NzU1NzcwNzAwMDExOTI0ODBmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NW6r9roMbf0EkTIMoxPk1YMX3qTqHSbEytT93W6byYs'
        }
    };

    function search() {
        
        const searchInputValue = searchInput.value;
        fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
            .then(response => response.json())
            .then(data => {
                let rows = data['results'];
                //  대소문자를 구분하지 않고 검색 가능                    소문자로 변환 시키는  내장함수 / 불리언 트루 펄스 
                let filteredRows = rows.filter(a => a['original_name'].toLowerCase().includes(searchInputValue.toLowerCase()));
                let html = ''; // 변수를 빈 문자열로 초기화
                // api 객체등을 가져오는 것
                filteredRows.forEach((a) => {
                    let id = a['id']
                    let img = a ['poster_path'];
                    let NAME = a['original_name'];
                    let sodyd = a['overview']
                    let vudwja = a['vote_average'];

                    let temp_html = `<div class="movie" class="${id}">
                        <img a href="" onclick="alert(${id})" src="https://image.tmdb.org/t/p/w500/${img}" alt= "" >
                        <h2>${NAME}</h2>
                        <p>${sodyd}</p>
                        <p>${vudwja}</p> 
                    </div>`;

                    html += temp_html; // 연산자를 이용 템프를 추가함

                    console.log(NAME, sodyd, vudwja,img);
                });

                document.getElementById('movie').innerHTML = html;  // 화면표시 
            })
            .catch(err => console.error(err));
    }
     
   
    // 검색기능

    let searchInput = document.getElementById('search');
    let searchBtn = document.getElementById('searchBtn');
   
    searchBtn.addEventListener('click', (e) => {
        // 기본 동작을 방지 또한 사용자가 원하는 동작을 세밀하게 제어
        e.preventDefault();
        search();
    });

    search();
}