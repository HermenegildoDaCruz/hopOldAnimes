//Fetch animes
const fetchAnimes = async () => {
    const response = await fetch('https://api.jikan.moe/v4/anime') // change fetch url to get all animes
    if (response.status === 200){
        return await response.json()
    } else {
        throw new Error('Unable to fetch Animes')
    }
}

//Render animes
const renderAnimes = (animes) => {
    document.querySelector('.animes').innerHTML = ""       
    animes.forEach(anime => {
        const imageUrl = anime.images.webp.image_url 
        const title = anime.title
        const dateISO =  `${anime.aired.from}`
        const date = new Date(dateISO)
        const formatMonth = (date.getUTCMonth() + 1) < 10 ? `0${date.getUTCMonth()}`:date.getUTCMonth()


        document.querySelector('.animes').innerHTML += `
        <div class='anime'>
        <a href="${anime.url}" target = '_blank'><img src="${imageUrl}" alt=""></a>
        <div class="info">
            <a href="${anime.url}" target = '_blank'><h2>${title}</h2></a>
            <div>
                <span>Release: ${date.getUTCDate()}-${formatMonth}-${date.getUTCFullYear()}</span>
                <a href="${anime.trailer.url}" target = "_blank" class='seeTrailer'>Trailer: <button class="seeTrailer"><img src="play-svgrepo-com.svg" alt="play" class="play"></button></a>
            </div>
        </div>
        </div>
        
        `      
    });
}

//Render all animes
try {
    fetchAnimes().then((animes) => {
        renderAnimes(animes.data)
    })
} catch (error) {
    console.log(error)
    alert(error)
}

//Search
document.querySelector('#search').addEventListener('input', (e) => {
    try {
        fetchAnimes().then((animes) => {
            const filteredAnimes = animes.data.filter((anime)=>{
                return anime.title.toLowerCase().includes(e.target.value.toLowerCase())
            })

            if(filteredAnimes.length > 0){
                renderAnimes(filteredAnimes)
            }
        })
    } catch (error) {
        console.log(error)
        alert(error)
    }
})

//Scroll Event
window.addEventListener('scroll', () => {
    //Adding a background color to menu when user scroll down
    if (window.scrollY > 240 ) {
        document.querySelector('.navigation').classList.add('navigationSDBackground')
        document.querySelector('.navigation').classList.add('fixed')
    } else {
        document.querySelector('.navigation').classList.remove('navigationSDBackground')
        document.querySelector('.navigation').classList.remove('fixed')
    }

    //Showing the button to scroll up when scrollY > 320
    if(window.scrollY > 320){
        document.querySelector('.toTop').style.display = 'block'
        document.querySelector('.toTop').addEventListener('click', (e) => {
            window.scroll(
                {
                    top: 0,
                    behavior: 'smooth'
                }
            )
        })
    } else {
        document.querySelector('.toTop').style.display = 'none'
    }
});
