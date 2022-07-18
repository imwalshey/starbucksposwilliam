const capitalAlphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const alphabet = []
capitalAlphabet.forEach((letter)=>{
    alphabet.push(letter.toLowerCase())
})
//Defines an alphabet(lowercase) to assign grid area positions

function removeAllSelected(){
    document.querySelectorAll('.pickedDrinks div').forEach((element)=>{
        while(element.classList.contains('selected')){
            element.classList.remove('selected')
        }
    })
}
//
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeAllChildNodes(parent) {
    if(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
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


let theDrinks = []
let drinkIsIced=[]



function createCat(data){
    Object.keys(data).forEach((element)=>{
        
        let category = document.createElement('div')
        category.classList.add(`${element}`)
        category.classList.add('cats')
        category.innerText= capitalizeFirstLetter(element)
        document.querySelector('.drinkType').appendChild(category)
        category.addEventListener('click',(click)=>{
            document.querySelector('.items').className=`items ${(click.target.innerText.toLowerCase())}`
            pageRender(data[click.target.innerText.toLowerCase()],data)
        })
    })
}

function pageRender(click,data){
    removeAllChildNodes(document.querySelector('.items'))
    
    click.forEach((element,i)=>{
        
        let item = document.createElement('div')
        item.style.gridArea = `${alphabet[i]}`
        item.innerText=`${element['name']}`
        item.classList.add(`${nameShortener(element['name'])}`)
        
        document.querySelector('.items').appendChild(item)
        item.addEventListener('click',()=>{
            addToOrder(element)
        })
    })
   
}




document.querySelector('.LOCK').addEventListener('click',()=>{
    removeAllChildNodes(document.querySelector('.pickedDrinks'))
    document.querySelectorAll('.customizations input').forEach((input)=>{
        input.value=''
    })
    drinksArray=[]
    
    numberOfDrinksAdded=0
    
})

document.querySelector('.void').addEventListener('click',async function awomdawd(){
    try{
        let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
        drinksArray[drinkNum]= null
        document.querySelector('.pickedDrinks .selected').remove()
        document.querySelectorAll('.customizations input').forEach((input)=>{
            input.value=''
        })
        
    }catch(error){
        console.log(error)
        errorMessage('Select an item to void')
    }

})

let numberOfDrinksAdded=0;
let drinksArray = []
class Drink{
    constructor(IcedBool,DecafAmount,Shots,Pumps,Syrup,Milk,Custom,ABBR){
        this.iced=IcedBool
        this.decaf=DecafAmount
        this.shots=Shots
        this.pumps=Pumps
        this.syrup=Syrup
        this.milk=Milk
        this.custom=Custom
        this.abbr=ABBR
        this.size = 'Gr'
    }
}

function addToOrder(element){
    
    let hots = element.menuBuildHot 
    let colds= element.menuBuildIced
    


    if(!document.querySelector('.pickedDrinks .selected div+div') || document.querySelector('.pickedDrinks .selected div+div').innerText !== '[Drink]'){
        
        //document.querySelector(`.items .${nameShortener(element['name'])}`)
        //<input type="text" name="drink" value="words" class="drinkAbbr" readonly>
        
        
        //drinksArray[numberOfDrinksAdded-1] = {hot:element.menuBuildHot,iced:element.menuBuildIced}
        let div= document.createElement('div')
        div.classList.add(`drink${numberOfDrinksAdded}`)
        let size = document.createElement('div')
        size.readOnly=true
        size.classList.add('sizeIdentifier')
        let drink = document.createElement('div')
        document.querySelector('.pickedDrinks').appendChild(div)
        div.appendChild(size)
        div.appendChild(drink)
        if(hots != null && colds != null){
            drinksArray.push({
                hot:new Drink(hots.iced,hots.decaf,hots.shots,hots.pumps,hots.syrup,hots.milk,hots.custom,hots.abbr,hots.size),
                iced:new Drink(colds.iced,colds.decaf,colds.shots,colds.pumps,colds.syrup,colds.milk,colds.custom,colds.abbr,colds.size)
                
            })
            drinkIsIced.push(false)
            size.innerText=element.menuBuildHot.size
        }
        if(hots != null && colds === null){
            drinksArray.push({
                hot:new Drink(hots.iced,hots.decaf,hots.shots,hots.pumps,hots.syrup,hots.milk,hots.custom,hots.abbr,hots.size)
            })
            drinkIsIced.push(false)
            size.innerText=element.menuBuildHot.size
        }
        if(hots === null && colds != null){
            drinksArray.push({
                iced:new Drink(colds.iced,colds.decaf,colds.shots,colds.pumps,colds.syrup,colds.milk,colds.custom,colds.abbr,colds.size)
            })
            drinkIsIced.push(true)
            size.innerText=element.menuBuildIced.size
        }
        drink.innerHTML=element['abbr']
        drink.classList.add('drinkName')
        
        
        drink.readOnly=true
        div.addEventListener('click',(click)=>{
            selectDrink(click.target.parentElement, element)
        })
        numberOfDrinksAdded+=1
        removeAllSelected()
        selectDrink(div)
        let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
        if(drinkIsIced[drinkNum]===true) {drink.innerText='Iced '+element['abbr']}
        renderHotDrinkContents(drinksArray[drinkNum],'none')
        console.log(drinkIsIced[drinkNum])
    }
    if(document.querySelector('.pickedDrinks .selected .drinkName') && document.querySelector('.pickedDrinks .selected .drinkName').innerText === '[Drink]'){
        
        let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
        
        if(hots != null && colds != null){
            drinksArray[drinkNum]={
                hot:new Drink(hots.iced,hots.decaf,hots.shots,hots.pumps,hots.syrup,hots.milk,hots.custom,hots.abbr,hots.size),
                iced:new Drink(colds.iced,colds.decaf,colds.shots,colds.pumps,colds.syrup,colds.milk,colds.custom,colds.abbr,colds.size)
            }
            drinkIsIced.push(false)
        }
        if(hots != null && colds === null){
            drinksArray[drinkNum]={
                hot:new Drink(hots.iced,hots.decaf,hots.shots,hots.pumps,hots.syrup,hots.milk,hots.custom,hots.abbr,hots.size)
            }
            drinkIsIced.push(false)
        }
        if(hots === null && colds != null){
            drinksArray[drinkNum]={
                iced:new Drink(colds.iced,colds.decaf,colds.shots,colds.pumps,colds.syrup,colds.milk,colds.custom,colds.abbr,colds.size)
            }
            drinkIsIced.push(true)
        }
        console.log(drinkIsIced[drinkNum])
        changeHotAndIced(drinksArray[drinkNum],'size',sizeSelected)
        
        document.querySelector(`.drink${drinkNum}`).addEventListener('click',(click)=>{
            selectDrink(click.target.parentElement, element)
        })
        document.querySelector('.pickedDrinks .selected div+div').innerText=element['abbr']
        renderHotDrinkContents(drinksArray[drinkNum],'size')


    }    
}


let sizeSelected
function renderHotDrinkContents(value,modify){
    
    if(value.hot && value.iced){
        sizeSelected = value.hot.size
        bool = value.hot
    }else
    if(value.iced && !value.hot){
        
        sizeSelected = value.iced.size
        bool=value.iced
    }
    let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
    
    if(drinkIsIced[drinkNum]){
        
        bool=value.iced
    }else bool = value.hot
    
    
        
        document.querySelector('.decafCheck input').value=bool.decaf
        if(sizeSelected === 'Sh'){
            document.querySelector('.shotsCheck input').value=bool.shots[0]
            if(bool.syrup !== ''){
                document.querySelector('.syrupCheck input').value=`${bool.pumps[0]}${bool.syrup}`
            }else{
                document.querySelector('.syrupCheck input').value=`${bool.syrup}`
            }
        }else
        if(sizeSelected === 'Tl'){
            document.querySelector('.shotsCheck input').value=bool.shots[1]
            if(bool.syrup !== ''){
                document.querySelector('.syrupCheck input').value=`${bool.pumps[1]}${bool.syrup}`
            }else{
                document.querySelector('.syrupCheck input').value=`${bool.syrup}`
            }
        }else
        if(sizeSelected === 'Gr'){
            document.querySelector('.shotsCheck input').value=bool.shots[2]
            if(bool.syrup !== ''){
                document.querySelector('.syrupCheck input').value=`${bool.pumps[2]}${bool.syrup}`
            }else{
                document.querySelector('.syrupCheck input').value=`${bool.syrup}`
            }
        }else
        if(sizeSelected === 'Vt'){
            document.querySelector('.shotsCheck input').value=bool.shots[3]
            if(bool.syrup !== ''){
                document.querySelector('.syrupCheck input').value=`${bool.pumps[3]}${bool.syrup}`
            }else{
                document.querySelector('.syrupCheck input').value=`${bool.syrup}`
            }
        }
        
        document.querySelector('.sizeCheck input').value=sizeSelected
        document.querySelector('.drinkCheck input').value=bool.abbr
        document.querySelector('.milkCheck input').value=bool.milk
        document.querySelector('.customCheck input').value=bool.custom.toString().replace(',', ' ')
    
} // ADDS VALUE TO THE INSIDE OF THE DRINK CONTENTS BOXES, NOT THE ARRAY ITSELF





function renderColdDrinkContents(value){
    document.querySelector('.icedCheck input').value= '✓'
}

function selectDrink(drink,element){
    removeAllSelected() 
    drink.classList.add('selected')
    document.querySelectorAll('.customizations input').forEach((input)=>{
        input.innerText=''
    })
    
    renderHotDrinkContents(drinksArray[Number(drink.classList[0].replace('drink',''))])
    checkForSelection()
}

function addTheIcedWord(){
    let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
    if(drinkIsIced[drinkNum]===true){
        let elementContainer = document.querySelector('.selected div+div').parentElement
        let element = document.querySelector('.selected div+div')
        const icedArea = document.createElement('section')
        icedArea.innerText = 'Iced '
        icedArea.classList.add('icedArea')
        elementContainer.insertBefore(icedArea,element)
        console.log(element)
    }
    if(drinkIsIced[drinkNum]===false){
        let element = document.querySelector('.icedArea')
        element.remove()
    }
}






let heroku = 'https://coffee-trainer.herokuapp.com/api/coredrinks'
let local = 'http://localhost:8000/api/coredrinks'

const statusLight = document.querySelector('.statusLight')
async function apiRequest(url){
    statusLight.style.backgroundImage='linear-gradient(161deg,rgb(0, 0, 0),rgb(255, 0, 0))'
    try{
        const response = await fetch(url)
        const data = await response.json()
        statusLight.style.backgroundImage='linear-gradient(161deg,rgb(0, 0, 0),rgb(0, 255, 51))'
        
        createCat(data)
        document.querySelector('.items').className=`items espresso`
        renderCustomsMenu('shotsMenu')
        
    }catch(error){
        console.log(error)
        statusLight.style.backgroundImage='linear-gradient(161deg,rgb(0, 0, 0),rgb(255, 0, 0))'
    }
}

let menuData
async function apiRequestForCustomizations(url){
    try{
        const response = await fetch(url)
        const data = await response.json()
        
        menuData=data
        
    }catch(error){
        console.log(error)
    }
}




function renderCustomsMenu(menu){
    removeAllChildNodes(document.querySelector('.items'))
    Object.keys(menuData[menu]).forEach((element,i)=>{
        
        let item = document.createElement('div')
        item.style.gridArea = `${alphabet[i]}`
        item.innerText=`${element}`
        item.classList.add(`${nameShortener(element)}`)
        document.querySelector('.items').appendChild(item)
        item.addEventListener('click',()=>{
            processCustom(element,menuData[menu][element])
        })
    })
    document.querySelector('.items').className=`items ${menu}`
}

function processCustom(element,value){
    console.log('word')
    if(document.querySelector('.pickedDrinks .selected')){
        let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
        let drink = drinksArray[drinkNum]
        
        if(value === 'size'){
            if(element ==='Trenta'){
                sizeSelected='Tr'
            }
            if(element ==='Venti'){
                sizeSelected='Vt'
            }
            if(element ==='Grande'){
                sizeSelected='Gr'
            }
            if(element ==='Tall'){
                sizeSelected='Tl'
            }
            if(element ==='Short'){
                sizeSelected='Sh'
            }
            if(element ==='Kids'){
                sizeSelected='Sh'
            }
            changeHotAndIced(drink,'size',sizeSelected)
            
            //drinksArray[drinkNum].hot.size = sizeSelected
            
            drink.hot!==undefined? document.querySelector('.pickedDrinks .selected .sizeIdentifier').innerText=drink.hot.size : document.querySelector('.pickedDrinks .selected .sizeIdentifier').innerText=drink.iced.size
            if(element ==='Kids'){
                document.querySelector('.pickedDrinks .selected .sizeIdentifier').innerText='Kids'
            }
        }
        if(value === 'iced'){
            if(drinkIsIced[drinkNum]===undefined){
                drinkIsIced[drinkNum]=false
            }
            if(drinkIsIced[drinkNum]===false){
                drinkIsIced[drinkNum]=true
                addTheIcedWord()
            }else
            if(drinkIsIced[drinkNum]===true){
                drinkIsIced[drinkNum]=false
                addTheIcedWord()
            }
            console.log(drinkIsIced[drinkNum])
        }
        if(value==='iced' && document.querySelector('.pickedDrinks .selected .drinkName').innerText==='[Drink]'){
            console.log('words')
        }else renderHotDrinkContents(drink)
    }else{
        if(value==='iced'){
            createTemplate(element)
            let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
            if(drinkIsIced[drinkNum]===false){
                drinkIsIced[drinkNum]=true
            }else
            if(drinkIsIced[drinkNum]===true){
                drinkIsIced[drinkNum]=false
            }
            
        }
        if(value === 'size'){
            if(element ==='Trenta'){
                sizeSelected='Tr'
            }
            if(element ==='Venti'){
                sizeSelected='Vt'
            }
            if(element ==='Grande'){
                sizeSelected='Gr'
            }
            if(element ==='Tall'){
                sizeSelected='Tl'
            }
            if(element ==='Short'){
                sizeSelected='Sh'
            }
            if(element ==='Kids'){
                sizeSelected='Sh'
            }
            // changeHotAndIced(drink,'size',sizeSelected)
            // if(element ==='Kids'){
            //     document.querySelector('.pickedDrinks .selected .sizeIdentifier').innerText='Kids'
            // }
            
            createTemplate(sizeSelected)
        }
        
    }
}
function createTemplate(modifier){
    const itemsArea = document.querySelector('.pickedDrinks')
    const drinkArea = document.createElement('div')
    drinkArea.classList.add(`drink${numberOfDrinksAdded}`)
    removeAllSelected()
    drinkArea.classList.add(`selected`)
    itemsArea.appendChild(drinkArea)
    
    drinksArray.push({})
    numberOfDrinksAdded+=1
    const sizeArea = document.createElement('div')
    sizeArea.classList.add('sizeIdentifier')
    const icedArea=document.createElement('section')
    icedArea.innerText="Iced"

    if(sizeSelected === undefined){
        sizeSelected='Gr'
    }
    sizeArea.innerText=sizeSelected
    const drinkName = document.createElement('div')
    drinkName.innerText='[Drink]'
    drinkName.classList.add('drinkName')
    drinkArea.appendChild(sizeArea)
    
    
    drinkArea.appendChild(drinkName)
    checkForSelection()
}


function changeHotAndIced(drink,element,value){
    if(drink.hot){
        drink.hot[element]=value
    }
    if(drink.iced){
        drink.iced[element]=value
    }
}

document.querySelector('.shotsMenu').addEventListener('click', ()=>{
    renderCustomsMenu('shotsMenu')
})


function checkForSelection(){
    if(document.querySelector('.pickedDrinks .selected')){
        document.querySelector('.nextDrink').classList.add('active')
        document.querySelector('.nextDrink').addEventListener('click',()=>{
            nextDrink()
        })
    }else{
        document.querySelector('.nextDrink').classList.remove('active')
    }
}
function nextDrink(){
    removeAllSelected()
    renderCustomsMenu('shotsMenu')
}



function errorMessage(message){
    document.querySelector('.errorMessage').classList.add('active')
    document.querySelector('.errorMessage .errorBox p').innerText=`${message}`
    document.querySelector('.clearError').addEventListener('click',()=>{
        document.querySelector('.errorMessage').classList.remove('active')
    })
    document.querySelector('.cancelError').addEventListener('click',()=>{
        document.querySelector('.errorMessage').classList.remove('active')
    })
}


if(localStorage.getItem('LastClicked')){
    apiRequestForCustomizations(localStorage.getItem('LastClicked').split(',')[0])
    apiRequest(localStorage.getItem('LastClicked').split(',')[1])
}

document.querySelector('.local').addEventListener('click', ()=>{
    localStorage.setItem('LastClicked',["http://localhost:8000/api/customizations",local])
    removeAllChildNodes(document.querySelector('.items'))
    removeAllChildNodes(document.querySelector('.drinkType'))
    apiRequestForCustomizations("http://localhost:8000/api/customizations")
    apiRequest(local)
})


document.querySelector('.heroku').addEventListener('click', ()=>{
    localStorage.setItem('LastClicked',["https://coffee-trainer.herokuapp.com/api/customizations",heroku])
    removeAllChildNodes(document.querySelector('.items'))
    removeAllChildNodes(document.querySelector('.drinkType'))
    apiRequestForCustomizations("https://coffee-trainer.herokuapp.com/api/customizations")
    apiRequest(heroku)
})

document.querySelector('.findOrder').addEventListener('click',()=>{
    sendit()
})
    async function sendit() {
        const rawResponse = await fetch(postUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(drinksArray)
        });
        const content = await rawResponse.json();
      
        ;
      }

const postUrl ='http://localhost:8000/order'

