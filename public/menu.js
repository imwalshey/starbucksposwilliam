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
    document.querySelectorAll('.customizations div div').forEach((div)=>{
        div.innerText=''
    })
    drinksArray=[]
    drinkIsIced=[]
    numberOfDrinksAdded=0
    
})

document.querySelector('.void').addEventListener('click',async function awomdawd(){
    try{
        let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
        drinksArray[drinkNum]= null
        drinkIsIced[drinkNum]=undefined
        document.querySelector('.pickedDrinks .selected').remove()
        document.querySelectorAll('.customizations div div').forEach((div)=>{
            div.div=''
        })
        
    }catch(error){
        console.log(error)
        errorMessage('Select an item to void','blue')
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
    
    let hots = JSON.parse(JSON.stringify(element.menuBuildHot )); 
    let colds= JSON.parse(JSON.stringify(element.menuBuildIced));
    if(drinksArray.length>30){
        errorMessage("Stop. You're gonna break it.",'Red')
    }


    if(!document.querySelector('.pickedDrinks .selected .drinkName') || document.querySelector('.pickedDrinks .selected .drinkName').innerText !== '[Drink]'){
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
        div.addEventListener('click',(click)=>{
            selectDrink(click.target.parentElement, element)
        })
        numberOfDrinksAdded+=1
        removeAllSelected()
        selectDrink(div)
        let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
        if(drinkIsIced[drinkNum]===true) {addTheIcedWord()}
        renderHotDrinkContents(drinksArray[drinkNum])
        
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
       
        changeHotAndIced(drinksArray[drinkNum],'size',sizeSelected)
        
        document.querySelector(`.drink${drinkNum}`).addEventListener('click',(click)=>{
            selectDrink(click.target.parentElement, element)
        })
        document.querySelector('.pickedDrinks .selected .drinkName').innerText=element['abbr']
        renderHotDrinkContents(drinksArray[drinkNum])


    }    
}


let sizeSelected
function renderHotDrinkContents(value,modify){
    
    if(value.hot && !value.iced){
        sizeSelected = value.hot.size
        bool = value.hot
    }else
    if(value.iced && !value.hot){
        
        sizeSelected = value.iced.size
        bool=value.iced
    }
    let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
    


    if(drinkIsIced[drinkNum]===true && value.iced){
        bool=value.iced
    }else
    if(drinkIsIced[drinkNum]===false && value.hot){
        bool=value.hot
    }
    
    if(drinkIsIced[drinkNum]===true && value.iced===undefined){
        
        bool=value.hot
        document.querySelector('.pickedDrinks .selected .icedArea').remove()
        document.querySelector('.iceCheck div').innerText=''
        drinkIsIced[drinkNum]=false
        errorMessage('Entry not available on active levels')
    }
    if(drinkIsIced[drinkNum]===false && (value.hot===null || value.hot===undefined)){
        bool=value.iced
        document.querySelector('.iceCheck div').innerText=''
        drinkIsIced[drinkNum]=true
        addTheIcedWord()
        errorMessage('Entry not available on active levels','red')
    }
    
    showDrinkContentsInDivs(bool)
       
    
} // ADDS VALUE TO THE INSIDE OF THE DRINK CONTENTS BOXES, NOT THE ARRAY ITSELF


function showDrinkContentsInDivs(bool){
    let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
    document.querySelector('.decafCheck div').innerText=bool.decaf
    if(bool.size === 'Sh'){
        document.querySelector('.shotsCheck div').innerText=bool.shots[0]
        if(bool.syrup !== ''){
            document.querySelector('.syrupCheck div').innerText=`${bool.pumps[0]}${bool.syrup}`
        }else{
            document.querySelector('.syrupCheck div').innerText=`${bool.syrup}`
        }
    }else
    if(bool.size === 'Tl'){
        document.querySelector('.shotsCheck div').innerText=bool.shots[1]
        if(bool.syrup !== ''){
            document.querySelector('.syrupCheck div').innerText=`${bool.pumps[1]}${bool.syrup}`
        }else{
            document.querySelector('.syrupCheck div').innerText=`${bool.syrup}`
        }
    }else
    if(bool.size === 'Gr'){
        document.querySelector('.shotsCheck div').innerText=bool.shots[2]
        if(bool.syrup !== ''){
            document.querySelector('.syrupCheck div').innerText=`${bool.pumps[2]}${bool.syrup}`
        }else{
            document.querySelector('.syrupCheck div').innerText=`${bool.syrup}`
        }
    }else
    if(bool.size === 'Vt'){
        document.querySelector('.shotsCheck div').innerText=bool.shots[3]
        if(bool.syrup !== ''){
            document.querySelector('.syrupCheck div').innerText=`${bool.pumps[3]}${bool.syrup}`
        }else{
            document.querySelector('.syrupCheck div').innerText=`${bool.syrup}`
        }
    }else
    if(bool.size === 'Tr'){
        document.querySelector('.shotsCheck div').innerText=bool.shots[4]
        if(bool.syrup !== ''){
            document.querySelector('.syrupCheck div').innerText=`${bool.pumps[4]}${bool.syrup}`
        }else{
            document.querySelector('.syrupCheck div').innerText=`${bool.syrup}`
        }
        sizeNotAvailable(bool.shots[4])
    }
    if(bool.shots===''){
        document.querySelector('.shotsCheck div').innerText=''
    }
    document.querySelector('.sizeCheck div').innerText=bool.size
    document.querySelector('.drinkCheck div').innerText=bool.abbr
    document.querySelector('.milkCheck div').innerText=bool.milk
    if(drinkIsIced[drinkNum]===true){
        document.querySelector('.iceCheck div').innerText= '✓'
    }else{
        document.querySelector('.iceCheck div').innerText= ''
    }
    document.querySelector('.customCheck div').innerText=bool.custom.toString().replace(',', ' ')
}


function sizeNotAvailable(value){
    if(value===null){
        errorMessage('Product not active on current levels','REd')
        document.querySelector('.pickedDrinks .selected').remove()
        clearContentDivs()
    }
}

function clearContentDivs(){
    document.querySelectorAll('.customizations div div').forEach((elem)=>{
        elem.innerText=''
    })
}

function selectDrink(drink,element){
    removeAllSelected() 
    drink.classList.add('selected')
    document.querySelectorAll('.customizations div div').forEach((div)=>{
        div.innerText=''
    })
    if(element !== undefined){
        renderHotDrinkContents(drinksArray[Number(drink.classList[0].replace('drink',''))])
    }
    checkForSelection()
}

function addTheIcedWord(){
    if(document.querySelector('.selected .drinkName').innerText.includes('Iced')){
        document.querySelector('.selected .drinkName').innerText=document.querySelector('.selected .drinkName').innerText.split(' ').filter(e=>e!='Iced').join(' ')
    }
    let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
    if(drinkIsIced[drinkNum]===true && !document.querySelector('.selected .icedArea')){
        let elementContainer = document.querySelector('.selected .drinkName').parentElement
        let element = document.querySelector('.selected .drinkName')
        const icedArea = document.createElement('section')
        icedArea.innerText = 'Iced '
        icedArea.classList.add('icedArea')
        elementContainer.insertBefore(icedArea,element)
        
        
    }else
    if(drinkIsIced[drinkNum]===false){
        let element = document.querySelector('.selected .icedArea')
        element.remove()
    }
}






let heroku = 'https://coffee-trainer.herokuapp.com/api/coredrinks'
let local = 'http://localhost:8000/api/coredrinks'

const statusLight = document.querySelector('.statusLight')
async function apiRequest(url){  //Calls the API and brings drink data to the 
    document.querySelector('.menuWrapper').classList.add('loading')
    document.querySelector('.customerArea').classList.add('hidden')
    statusLight.style.backgroundImage='linear-gradient(161deg,rgb(0, 0, 0),rgb(255, 0, 0))'
    try{
        const response = await fetch(url)
        document.querySelector('.menuWrapper').classList.add('loading')
    document.querySelector('.customerArea').classList.add('hidden')
        const data = await response.json()
        document.querySelector('.menuWrapper').classList.remove('loading')
        document.querySelector('.customerArea').classList.remove('hidden')
        statusLight.style.backgroundImage='linear-gradient(161deg,rgb(0, 0, 0),rgb(0, 255, 51))'
        
        createCat(data)
        document.querySelector('.items').className=`items espresso`
        renderCustomsMenu('shotsMenu')
        
    }catch(error){
        console.log(error)
        statusLight.style.backgroundImage='linear-gradient(161deg,rgb(0, 0, 0),rgb(255, 0, 0))'
    }
}
let customerID


let menuData
async function apiRequestForCustomizations(url){
    document.querySelector('.menuWrapper').classList.add('loading')
    document.querySelector('.customerArea').classList.add('hidden')
    try{
        const response = await fetch(url)
        document.querySelector('.menuWrapper').classList.add('loading')
        document.querySelector('.customerArea').classList.add('hidden')
        const data = await response.json()
        document.querySelector('.menuWrapper').classList.remove('loading')
        document.querySelector('.customerArea').classList.remove('hidden')
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
        
        if(value==='shotNumber'){
            let bool 
            if(drinkIsIced[drinkNum]){
                bool = drink.iced
            }else{
                bool=drink.hot
            }
            if(element ==='Single'){
                changeHotAndIced(drink,'shotNumber',1)
                createModifier('Single','')
            }
            if(element ==='Double'){
                changeHotAndIced(drink,'shotNumber',2)
                createModifier('Double','')
            }
            if(element ==='Triple'){
                changeHotAndIced(drink,'shotNumber',3)
                createModifier('Triple','')
            }
            if(element ==='Quad'){
                changeHotAndIced(drink,'shotNumber',4)
                createModifier('Quad','')
            }
            if(element === 'More shots'){
                let wholeNum = []
                document.querySelector('.displayAmount p').innerText=''
                //removeAllChildNodes(document.querySelector('.items'))
                document.querySelector('.quantityForShots').classList.add('active')
                document.querySelectorAll('.quantityNums div').forEach((elem)=>{
                    elem.addEventListener('click',(click)=>{
                        if(click.target.classList.contains('number')){
                            
                            wholeNum.push(click.target.innerText)
                            console.log(wholeNum.join(''))
                            
                            document.querySelector('.displayAmount p').innerText=wholeNum.join('')
                            
                        }
                        if(click.target.classList.contains('clearError')){
                            console.log(wholeNum.join(''))
                            if(Number(wholeNum.join(''))<=99 && Number(wholeNum.join(''))>0 ){
                                changeHotAndIced(drink,'shotNumber',Number(wholeNum.join('')))
                                console.log(wholeNum.join(''))
                                document.querySelector('.quantityForShots').classList.remove('active')
                                renderHotDrinkContents(drink)
                            }
                        }
                        if(click.target.classList.contains('cancelError')){
                            document.querySelector('.quantityForShots').classList.remove('active')
                        }
                    })
                })
                
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
            
        }
        if(value==='iced' && document.querySelector('.pickedDrinks .selected .drinkName').innerText==='[Drink]'){
            
        }else renderHotDrinkContents(drink)
    }else{
        if(value==='iced'){
            console.log("words")
            createTemplate(element)
            let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
            if(drinkIsIced[drinkNum]===false){
                drinkIsIced[drinkNum]=true
                addTheIcedWord()
            }else
            if(drinkIsIced[drinkNum]===true){
                drinkIsIced[drinkNum]=false
                addTheIcedWord()
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
    document.querySelector(`.drink${numberOfDrinksAdded}`).addEventListener('click',(click)=>{
        selectDrink(click.target.parentElement)
    })
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
function createModifier(first,second){
    let div = document.createElement('div')
    div.classList.add('modifier')
    document.querySelector('.pickedDrinks .selected').appendChild(div)
    div.innerText=`${first} ${second}`
}
let drinkIsModified = []



function changeHotAndIced(drink,element,value){
    if(element==='size'){
        if(drink.hot){
            drink.hot[element]=value
        }
        if(drink.iced){
            drink.iced[element]=value
        }
    }
    if(element==='shotNumber'){
        if(drink.hot){
            drink.hot.shots.forEach((e,i)=>{
                console.log(value)
                drink.hot.shots[i]=value
            })
        }
        if(drink.iced){
            drink.iced.shots.forEach((e,i)=>{
                console.log(value)
                if(e!==null)drink.iced.shots[i]=value
            })
        }
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
    document.querySelectorAll('.customizations div div').forEach((div)=>{
        div.innerText=''
    })
}



function errorMessage(message,color){
    document.querySelector('.errorMessage').classList.add('active')
    document.querySelector('.errorMessage .errorBox p').innerText=`${message}`
    document.querySelector('.errorBox').style.border=`8px solid ${color}`
    document.querySelector('.clearError').addEventListener('click',()=>{
        document.querySelector('.errorMessage').classList.remove('active')
    })
    document.querySelector('.cancelError').addEventListener('click',()=>{
        document.querySelector('.errorMessage').classList.remove('active')
    })
    
}

let postUrl
let production = 'dev'
let uhhh = "https://coffee-trainer.herokuapp.com/menu"
function dynamicURL(word){
    let loc = window.location.href.includes('coffee')
    if(loc){
        production='live'
    }else{
        production='dev'
    }
    
}
dynamicURL()
// if(localStorage.getItem('LastClicked')){
//     apiRequestForCustomizations(localStorage.getItem('LastClicked').split(',')[0])
//     apiRequest(localStorage.getItem('LastClicked').split(',')[1])
//     apiRequestCustomer(localStorage.getItem('LastClicked').split(',')[2])
// }else
if(production === 'dev'){
    localStorage.setItem('LastClicked',["http://localhost:8000/api/customizations",local,'http://localhost:8000/api/customers','https://localhost:8000/order'])
    removeAllChildNodes(document.querySelector('.items'))
    removeAllChildNodes(document.querySelector('.drinkType'))
    apiRequestForCustomizations("http://localhost:8000/api/customizations")
    apiRequest(local)
    apiRequestCustomer('http://localhost:8000/api/customers')
    postUrl ='http://localhost:8000/order'
}else
if(production=== 'live'){
    localStorage.setItem('LastClicked',["https://coffee-trainer.herokuapp.com/api/customizations",heroku,"https://coffee-trainer.herokuapp.com/api/customers,'https://coffee-trainer.herokuapp.com/order'"])
    removeAllChildNodes(document.querySelector('.items'))
    removeAllChildNodes(document.querySelector('.drinkType'))
    apiRequestForCustomizations("https://coffee-trainer.herokuapp.com/api/customizations")
    apiRequestCustomer('https://coffee-trainer.herokuapp.com/api/customers')
    apiRequest(heroku)
    postUrl ='https://coffee-trainer.herokuapp.com/order'
}





// document.querySelector('.findOrder').addEventListener('click',()=>{
//     let body = JSON.stringify({drinksArray,drinkIsIced,customerID})
//     fetch(postUrl, {
//         method: 'POST',
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body: body
//        }).then(res=>{
//         console.log(res.json())
//        })
//        console.log(body)
    
// })
document.querySelector('.findOrder').addEventListener('click',postAnswer)
async function apiRequestCustomer(url){
    document.querySelector('.menuWrapper').classList.add('loading')
    document.querySelector('.customerArea').classList.add('hidden')
    try{
        
        const response = await fetch(url)
        document.querySelector('.menuWrapper').classList.add('loading')
        document.querySelector('.customerArea').classList.add('hidden')
        const data = await response.json()
        document.querySelector('.menuWrapper').classList.remove('loading')
        document.querySelector('.customerArea').classList.remove('hidden')
        document.querySelector('.customerName').innerText=data.name
        document.querySelector('.customerAsk').innerText=data.phrase
        customerID=data.id
        console.log(data)
    }catch(error){
        console.log(error)
    }
}
async function postAnswer(){
    document.querySelector('.menuWrapper').classList.add('loading')
    document.querySelector('.customerArea').classList.add('hidden')
    let body = JSON.stringify({drinksArray,drinkIsIced,customerID})
    try{
        const response = await fetch(postUrl, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: body
           })
        document.querySelector('.menuWrapper').classList.add('loading')
        document.querySelector('.customerArea').classList.add('hidden')
        const data = await response.json()
        document.querySelector('.menuWrapper').classList.remove('loading')
        document.querySelector('.customerArea').classList.remove('hidden')
        if(data==='win'){
            document.getElementById('winOrLose').classList='win'
            document.querySelector('#winOrLose .winCont').classList.remove('hidden')
            document.querySelector('#winOrLose h1').innerText='CORRECT!'
            document.querySelector('.loseTry').classList.add('hidden')
            document.querySelector('.drinkType').classList.add('hidden')
            document.querySelector('.loseSkip').classList.add('hidden')
            document.querySelector('#winOrLose .winCont').addEventListener('click',(targ)=>{
                document.querySelector('.drinkType').classList.remove('hidden')
                document.getElementById('winOrLose').classList='hidden'
                removeAllChildNodes(document.querySelector('.pickedDrinks'))
                document.querySelectorAll('.customizations div div').forEach((div)=>{
                    div.innerText=''
                })
                drinksArray=[]
                drinkIsIced=[]
                numberOfDrinksAdded=0
                apiRequestCustomer(localStorage.getItem('LastClicked').split(',')[2])
            })

        }
        if(data==='lose'){
            document.getElementById('winOrLose').classList='lose'
            document.querySelector('#winOrLose .winCont').classList.add('hidden')
            document.querySelector('#winOrLose h1').innerText='NOT QUITE!'
            document.querySelector('.loseTry').classList.remove('hidden')
            document.querySelector('.loseSkip').classList.remove('hidden')
            document.querySelector('.drinkType').classList.add('hidden')
            document.querySelector('#winOrLose .loseSkip').addEventListener('click',(targ)=>{
                document.getElementById('winOrLose').classList='hidden'
                removeAllChildNodes(document.querySelector('.pickedDrinks'))
                document.querySelectorAll('.customizations div div').forEach((div)=>{
                    div.innerText=''
                })
                document.querySelectorAll('.drinkType').classList.remove('hidden')
                drinksArray=[]
                drinkIsIced=[]
                numberOfDrinksAdded=0
                apiRequestCustomer(localStorage.getItem('LastClicked').split(',')[2])
            })
            document.querySelector('#winOrLose .loseTry').addEventListener('click',(targ)=>{
                document.querySelector('.drinkType').classList.remove('hidden')
                document.getElementById('winOrLose').classList='hidden'
                removeAllChildNodes(document.querySelector('.pickedDrinks'))
                document.querySelectorAll('.customizations div div').forEach((div)=>{
                    div.innerText=''
                })
                drinksArray=[]
                drinkIsIced=[]
                numberOfDrinksAdded=0
            })

        }
        
    }catch(error){
        console.log(error)
    }
}


    // async function sendit() {
    //     let answer = JSON.stringify(drinksArray)
    //     const rawResponse = await fetch(postUrl, {
    //       method: 'POST',
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //       },
    //       body: answer
          
    //     });
    //     const content = await rawResponse.json();
        
      
    //     ;
    //   }



