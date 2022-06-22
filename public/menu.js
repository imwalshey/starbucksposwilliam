

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function nameShortener(name){
    
    let bob= name.toLowerCase().split('').filter((elem)=>{
        if(elem.toString().charCodeAt()-96 > 0 && elem.toString().charCodeAt()-96 < 27){
            return elem
        }
    }).join('')
    return bob
    
}

let heroku = 'https://starbucks-coffee.herokuapp.com/api/coredrinks'
let local = 'http://localhost:8000/api/coredrinks'
let theDrinks = {}




function createCat(data){
    Object.keys(data).forEach((element)=>{
        console.log(element)
        let category = document.createElement('div')
        category.classList.add(`${element}`)
        category.classList.add('cats')
        category.innerText= capitalizeFirstLetter(element)
        document.querySelector('.drinkType').appendChild(category)
        category.addEventListener('click',(click)=>{
            pageRender(data[click.target.innerText.toLowerCase()])
        })
    })
}

function pageRender(click){
    removeAllChildNodes(document.querySelector('.items'))
    click.forEach((element)=>{
        console.log(element.name)
        let item = document.createElement('div')
        item.innerText=`${element['name']}`
        item.classList.add(`${nameShortener(element['name'])}`)
        document.querySelector('.items').appendChild(item)
    })
}






async function apiRequest(){
    
    try{
        const response = await fetch(heroku)
        const data = await response.json()
        createCat(data)
        pageRender(data.espresso)
        
    }catch(error){
        console.log(error)
    }
}





apiRequest()


