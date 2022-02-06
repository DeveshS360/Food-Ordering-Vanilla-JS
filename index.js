const RESTAURANT_DATA = [
    {
        name: 'Kanha',
        id:'knaha',
        rating: 2.5,
        eta: 30,
        location: 'Central Spine',
        image: './images/food1.jpeg',
        tags: ['North Indian' , 'South Indian', 'Chinese, Mexican', 'Veg', 'Healthy'],
        isFavourite: false,
    },
    {
        name: 'Burger King',
        id:'burgerKing',
        rating: 4.5,
        eta: 25,
        location: 'Triton Mall',
        image: './images/food2.jpeg',
        tags: ['Burger', 'Whopper', 'Veg', 'Non Veg'],
        isFavourite: false
    },
    {
        name: 'Dominos',
        id:'dominos',
        rating: 3,
        eta: 60,
        location: 'Alankar Plaza',
        image: './images/food3.jpeg',
        tags: ['Pizza', 'Brownie', 'Combo', 'Veg', 'Non Veg'],
        isFavourite: false
    },
    {
        name: 'Rominus',
        id:'rominus',
        rating: 3.5,
        eta: 45,
        location: 'Vidhyadhar Nagar',
        image: './images/food4.jpeg',
        tags: ['Pizza', 'American', 'Veg', 'Non Veg'],
        isFavourite: false
    },
    {
        name: 'Brown Sugar',
        id:'brownSugar',
        rating: 5,
        eta: 120,
        location: 'Central Spine',
        image: './images/food5.jpeg',
        tags: ['Mexican', 'Mojito', 'Chinese', 'North Indian', 'South Indian','Fast food'],
        isFavourite: false
    },
    {
        name: 'Burger Farm',
        id:'burgerFarm',
        rating: 3.5,
        eta: 40,
        location: 'Central Spine',
        image: './images/food6.jpeg',
        tags: ['Burger', 'Veg', 'Non Veg', 'Combo'],
        isFavourite: false
    }
]

const searchEle = document.querySelector('.searchBar')
const viewFavEle = document.querySelector('.favourites')
const selectEle = document.querySelector('.selectSort')


function generateView(restaurantData){
    // hex code for star to insert in html - &#11088

    function handleCheck(e){
        const target = e.target
        const identifier = target.getAttribute('name')
        const targetRest = restaurantData.find(item => item.id === identifier)
        targetRest.isFavourite = !targetRest.isFavourite
        if(targetRest.isFavourite) target.style.backgroundColor = 'red'
        else target.style.backgroundColor = 'white'
        let favourites = {}
        const localFavItem = localStorage.getItem('favourites')
        if(localFavItem) favourites = JSON.parse(localFavItem)
        favourites[targetRest.id] = targetRest.isFavourite
        localStorage.setItem('favourites',JSON.stringify(favourites))

    }

    const cardsContainer = document.querySelector('.cardsOverLay')
    cardsContainer.innerHTML = ''
    const favourites = {}
    restaurantData.forEach(item => {
        if(item.isFavourite) favourites[item.id]=true
        const card = document.createElement('div')
        card.classList.add('cards')

        card.innerHTML = `
                            <div>
                                <img src=${item.image}>
                                <span>
                                    <div class='favCheck' name=${item.id}></div>
                                </span>
                                <h3>${item.name}
                                    <span class='rating'>
                                        ${item.rating} &#11088
                                    </span>
                                </h3>
                                <p class='location'>${item.location}</p>
                                <p class='tags'>${item.tags}</p>
                                <p class='eta'>ETA: ${item.eta} mins</p>
                            </div>
                        `

        cardsContainer.appendChild(card)
        const checkEle = card.querySelector('.favCheck')
        checkEle.addEventListener('click',handleCheck)
        const favourite = JSON.parse(localStorage.getItem('favourites'))
        if(favourite){
            if(favourite[item.id]) {
                checkEle.style.backgroundColor = 'red'
                item.isFavourite = true
            }
            else {
                checkEle.style.backgroundColor = 'white'
                item.isFavourite = false
            }
        }
       


    })

    
}


generateView(RESTAURANT_DATA)

function isRender(item,searchString){
    let render = false
    if(typeof item === 'object'){
        const keys = Object.keys(item)
        keys.forEach(entity => {
            const toMatch = item[entity].toString().toLowerCase()
            if(['location','name','tags'].includes(entity) && toMatch.includes(searchString)) render = true
        })
        
    }

    return render
}

function search(){

   const searchString = searchEle.value.toLowerCase()
   const data = RESTAURANT_DATA.filter(item => isRender(item, searchString))
   generateView(data)
}

function handleSort(){
    const data = RESTAURANT_DATA
    const sortParameter = selectEle.value
    data.sort((a,b) => {
        if( sortParameter === 'eta' && a[sortParameter] < b[sortParameter]) return -1
        if(sortParameter === 'rating' && a[sortParameter] > b[sortParameter]) return -1
        return 0
    })
    generateView(data)
}

function showFavourites(){
    const data = RESTAURANT_DATA.filter(item => JSON.parse(localStorage.getItem('favourites'))[item.id] === true)
    generateView(data)
}

searchEle.addEventListener('keyup',search)
selectEle.addEventListener('change',handleSort)

viewFavEle.addEventListener('click',showFavourites)

