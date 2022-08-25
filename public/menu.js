/*





Known Bugs: fun AddtoOrder() errorMessage Currently: line 162


Definitions: Partial Drink- When adding a drink to the menu and starting with size first, the drink is simply defined as "[drink]"


*/



const capitalAlphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","BB",'CC','DD','EE','FF','GG','HH','II','JJ','KK'];
const alphabet = []
capitalAlphabet.forEach((letter)=>{
    alphabet.push(letter.toLowerCase())
})
//Defines an alphabet(lowercase) to assign grid area positions


//Searches document for "selected" classlist and remove the "selected" classlist from the element
function removeAllSelected(){
    document.querySelectorAll('.pickedDrinks div').forEach((element)=>{
        while(element.classList.contains('selected')){
            element.classList.remove('selected')
        }
    })
}
//Just a ease of access function to reduce repetition of code. 
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// Removes all the children of a given parent element
function removeAllChildNodes(parent) {
    if(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
}

//Gets rid of spaces and special characters of string and returns a lowercase condensed output
function nameShortener(name){
    
    let bob= name.toLowerCase().split('').filter((elem)=>{
        if(elem.toString().charCodeAt()-96 > 0 && elem.toString().charCodeAt()-96 < 27){
            return elem
        }
    }).join('')
    return bob
    
}


// Defines a "iced array" for identifying which key of the drinksArray Object to use
let drinkIsIced=[]

//a counter for adding 'drinkX' to each classlist for the drinks
let numberOfDrinksAdded=0;

//defines an array of drinks for storing the currently used drinks
let drinksArray = []

//a constructor for having continuity across the front-end and back-end for drinks
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
        this.ogPumps=JSON.parse(JSON.stringify(Pumps))
        this.ogShots=JSON.parse(JSON.stringify(Shots))
    }
}


//adds menu categories for the each drinks category
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

//Generates the menu items and adds event listeners to each element in the "items" section.
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



// adds an event listener to the "LOCK" button which functions as the "clear all button" 
// removes all the elements from the "drinks content divs", removes the 'drinks que section', and resets values of the containing elements
document.querySelector('.LOCK').addEventListener('click',()=>{
    removeAllChildNodes(document.querySelector('.pickedDrinks'))
    document.querySelectorAll('.customizations div div').forEach((div)=>{
        div.innerText=''
    })
    drinksArray=[]
    drinkIsIced=[]
    numberOfDrinksAdded=0
    
})


//Adds functionality to the 'void item' button
//uses an async await function for easier readability when throwing errors to the client side
//
document.querySelector('.void').addEventListener('click',async function voidItems(click){
    try{
        if(! document.querySelector('.pickedDrinks .selected .modifier.selectedSpecific')){ //if a specific drink modifier is not selected...
            let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink','')) 
            drinksArray[drinkNum]= null 
            drinkIsIced[drinkNum]=undefined
            document.querySelector('.pickedDrinks .selected').remove()
            document.querySelectorAll('.customizations div div').forEach((div)=>{
                div.innerText=''
            })
        }else{
            let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
            removeDrinkContentsFromDivs(document.querySelector('.pickedDrinks .selected .modifier.selectedSpecific'))
            document.querySelector('.pickedDrinks .selected .modifier.selectedSpecific').remove()
            let bool
            if(drinkIsIced[drinkNum]){
                bool=drinksArray[drinkNum].iced
            }else{
                bool=drinksArray[drinkNum].hot
            }
            addSpecificSelectToNameBar()
            showDrinkContentsInDivs(bool)
        }
    }catch(error){
        console.log(error)
        errorMessage('Select an item to void','blue')
    }

})


//adds drinks to the order
function addToOrder(element){
    
    let hots = JSON.parse(JSON.stringify(element.menuBuildHot )); //Deep copies the element from the API
    let colds= JSON.parse(JSON.stringify(element.menuBuildIced)); // ^^
    if(drinksArray.length>30){ 
        errorMessage("Stop. You're gonna break it.",'Red')  //I haven't fixed this bug yet and it feels less important DEFINITELY A BUG
    }
    
    //checks to make sure the drink isn't partial*... 
    if(!document.querySelector('.pickedDrinks .selected .drinkName') || document.querySelector('.pickedDrinks .selected .drinkName').innerText !== '[Drink]'){
        let div= document.createElement('div') // creates a new div
        div.classList.add(`drink${numberOfDrinksAdded}`) //dive the div a classlist of drinkX
        let size = document.createElement('div') //creates a div to contain the size Modifier that comes before every drink
        size.readOnly=true
        size.classList.add('sizeIdentifier')
        size.classList.add('selectedSpecific')
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
        drink.addEventListener('click',()=>{
            addSpecificSelectToNameBar()
        })
        drink.classList.add('selectedSpecific')
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
        
        // if(hots != null && colds != null){
        //     drinksArray[drinkNum]={
        //         hot:new Drink(hots.iced,hots.decaf,hots.shots,hots.pumps,hots.syrup,hots.milk,hots.custom,hots.abbr,hots.size),
        //         iced:new Drink(colds.iced,colds.decaf,colds.shots,colds.pumps,colds.syrup,colds.milk,colds.custom,colds.abbr,colds.size)
        //     }
        //     drinkIsIced.push(false)
        // }
        // if(hots != null && colds === null){
        //     drinksArray[drinkNum]={
        //         hot:new Drink(hots.iced,hots.decaf,hots.shots,hots.pumps,hots.syrup,hots.milk,hots.custom,hots.abbr,hots.size)
        //     }
        //     drinkIsIced.push(false)
        // }
        // if(hots === null && colds != null){
        //     drinksArray[drinkNum]={
        //         iced:new Drink(colds.iced,colds.decaf,colds.shots,colds.pumps,colds.syrup,colds.milk,colds.custom,colds.abbr,colds.size)
        //     }
        //     drinkIsIced.push(true)
        // }
        
        // changeHotAndIced(drinksArray[drinkNum],'size',sizeSelected)
        const drinkToBeAdded ={
            hot: hots,
            iced: colds
        }
        //console.log(drinkToBeAdded)
        Object.keys(drinksArray[drinkNum]).forEach((cool)=>{
            if(drinkToBeAdded.hot === null || drinkToBeAdded.hot === undefined){
                drinkIsIced[drinkNum] = true
                drinksArray[drinkNum].hot = undefined
            }
            if(drinkToBeAdded[`${cool}`]!==null && drinkToBeAdded[`${cool}`]!==undefined){
            Object.keys(drinksArray[drinkNum][`${cool}`]).forEach((bool)=>{
                if(drinksArray[drinkNum][`${cool}`][bool]=== ''){
                    drinksArray[drinkNum][`${cool}`][bool]= drinkToBeAdded[`${cool}`][bool]
                }
                if(bool === 'abbr'){
                }
                if(bool==='ogPumps'){
                    drinksArray[drinkNum][`${cool}`][bool]=drinkToBeAdded[`${cool}`]['pumps']
                    //console.log(drinksArray[drinkNum][`${cool}`][bool])
                }
                if(bool==='ogShots'){
                    drinksArray[drinkNum][`${cool}`][bool]=drinkToBeAdded[`${cool}`]['shots']
                    //console.log(drinksArray[drinkNum][`${cool}`][bool])
                }
                if(bool==='shots'){
                    drinkToBeAdded[`${cool}`][bool].forEach((num,i)=>{
                        if(num==null){
                            drinksArray[drinkNum][`${cool}`][bool][i] = null
                            //console.log(drinksArray[drinkNum][`${cool}`][bool][i])
                        }
                        if(num!==null && drinksArray[drinkNum][`${cool}`][bool][i]=== ''){
                            drinksArray[drinkNum][`${cool}`][bool][i] = drinkToBeAdded[`${cool}`][bool][i]
                            //console.log(drinksArray[drinkNum][`${cool}`][bool][i])
                        }
                    })
                }
                if(bool = 'decaf'){
                    drinkToBeAdded[`${cool}`][bool].forEach((num,i)=>{
                        if(num=='' && drinksArray[drinkNum][`${cool}`][bool][i]!== ''){
                            drinksArray[drinkNum][`${cool}`][bool][i] = ''
                        }
                        if(num!==''){
                            
                            if(! drinksArray[drinkNum][`${cool}`][bool].includes(drinkToBeAdded[`${cool}`][bool][i])){
                                if(drinksArray[drinkNum][`${cool}`][bool][i] ===('')){
                                    drinksArray[drinkNum][`${cool}`][bool].splice(i,1)
                                }
                                drinksArray[drinkNum][`${cool}`][bool].push(drinkToBeAdded[`${cool}`][bool][i])
                            }
                            
                        }
                    })
                }
                if(bool = 'pumps'){
                    drinkToBeAdded[`${cool}`][bool][0].forEach((num,i)=>{
                        if(num===null){
                            drinksArray[drinkNum][cool][bool][0][i]=null
                            //console.log(drinksArray[drinkNum][cool][bool][0][i])
                        }
                        if(num!==null){
                            drinksArray[drinkNum][cool][bool][0][i]= drinkToBeAdded[`${cool}`][bool][0][i]
                        }
                    })
                }
                if(bool = 'syrup'){
                    drinkToBeAdded[`${cool}`][bool].forEach((num,i)=>{
                        if(num=='' && drinksArray[drinkNum][`${cool}`][bool][i]!== ''){
                            drinksArray[drinkNum][`${cool}`][bool][i] = null
                        }
                        if(num!=='' && drinksArray[drinkNum][`${cool}`][bool][i]=== ''){
                            drinksArray[drinkNum][`${cool}`][bool][i] = drinkToBeAdded[`${cool}`][bool][i]
                        }
                    })
                }
                
                if(bool = 'custom'){
                    drinksArray[drinkNum][`${cool}`][bool] = drinkToBeAdded[`${cool}`][bool]
                    // drinkToBeAdded[`${cool}`][bool].forEach((num,i)=>{
                    //     if(num==='' && drinksArray[drinkNum][`${cool}`][bool][i]!== ''){
                    //         drinksArray[drinkNum][`${cool}`][bool][i] = null
                    //     }
                    //     if(num!=='' && drinksArray[drinkNum][`${cool}`][bool][i]=== ''){
                    //         drinksArray[drinkNum][`${cool}`][bool][i] = drinkToBeAdded[`${cool}`][bool][i]
                    //     }
                    // })
                }
                
            })
        }
        })
        document.querySelector(`.drink${drinkNum}`).addEventListener('click',(click)=>{
            selectDrink(click.target.parentElement, element)
        })
        document.querySelector('.pickedDrinks .selected .drinkName').innerText=element['abbr']
        renderHotDrinkContents(drinksArray[drinkNum])


    }    
}
function addSpecificSelectToNameBar(){
    document.querySelectorAll('.selectedSpecific').forEach((elem,i)=>{
        elem.classList.remove('selectedSpecific')
    })
    document.querySelector('.selected .drinkName').classList.add('selectedSpecific')
    if(document.querySelector('.selected .icedArea')){
        document.querySelector('.selected .icedArea').classList.add('selectedSpecific')
    }
    
    document.querySelector('.selected .sizeIdentifier').classList.add('selectedSpecific')
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
    // if(bool.decaf==='B'){

    // }
    

    if(drinkIsIced[drinkNum]===true && value.iced){
        bool=value.iced
    }else
    if(drinkIsIced[drinkNum]===false && value.hot){
        bool=value.hot
    }
    
    if(drinkIsIced[drinkNum]===true && value.iced===undefined){
        
        bool=value.hot
        document.querySelector('.pickedDrinks .selected .icedArea').remove()
        document.querySelector('.isIced').classList.remove('isIced')
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
    document.querySelector('.decafCheck div').innerText=bool.decaf.toString().replace(',', ' ')
    
    
    if(! bool.decaf.includes('B')){
        if(document.querySelector('.modifier.shotType')){
            document.querySelector('.modifier.shotType').remove()
        }
    }
    if(bool.size === 'Sh'){
        sizeChangesPumps(0)
    }else
    if(bool.size === 'Tl'){
        sizeChangesPumps(1)
    }else
    if(bool.size === 'Gr'){
        sizeChangesPumps(2)
    }else
    if(bool.size === 'Vt'){
        sizeChangesPumps(3)
    }else
    if(bool.size === 'Tr'){
        sizeChangesPumps(4)
    }
    function sizeChangesPumps(amount){
        document.querySelector('.shotsCheck div').innerText=bool.shots[amount]
        let full = ''
        bool.syrup.forEach((elem,i)=>{
            if(bool.syrup[i] !== ''){
                full = full + ` ${bool.pumps[i][amount]}${bool.syrup[i]}`
                document.querySelector('.syrupCheck div').innerText=full
            }else{
                document.querySelector('.syrupCheck div').innerText=`${bool.syrup[i]}`
            }
        sizeNotAvailable(bool.shots[amount])
        })    
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
function removeDrinkContentsFromDivs(element){
    if(element.classList.toString().includes('coffeeType')){
        if(element.innerText.includes('Decaf')){
            simultaneouslyRemove(element.innerText.split('ecaf')[0],'decaf','hot')
            simultaneouslyRemove(element.innerText.split('ecaf')[0],'decaf','iced')
        }else{
            simultaneouslyRemove(element.innerText.split('')[0],'decaf','hot')
            simultaneouslyRemove(element.innerText.split('')[0],'decaf','iced')
        }
    }
    
    if(element.classList.contains('shotNumber')){
        let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
        if(drinksArray[drinkNum].iced){
            drinksArray[drinkNum].iced.shots= JSON.parse(JSON.stringify(drinksArray[drinkNum].iced.ogShots))
        }
        if(drinksArray[drinkNum].hot){
            drinksArray[drinkNum].hot.shots= JSON.parse(JSON.stringify(drinksArray[drinkNum].hot.ogShots))
        }
}
}
function simultaneouslyRemove(itemToRemove,itemType,bool){
    let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
    if(itemType==='decaf'){
        if(drinksArray[drinkNum][bool]){
            var index = drinksArray[drinkNum][bool][itemType].indexOf(itemToRemove);
            if (index !== -1) {
                drinksArray[drinkNum][bool][itemType].splice(index, 1);
            }
        }
    }
    if(itemType==='syrup'){
        var index = drinksArray[drinkNum][bool][itemType].indexOf(itemToRemove);
        if (index !== -1) {
            drinksArray[drinkNum][bool][itemType].splice(index, 1);
        }
    }
    

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
        icedArea.addEventListener('click',addSpecificSelectToNameBar)
        icedArea.classList.add('selectedSpecific')
        element.classList.add('isIced')
        elementContainer.insertBefore(icedArea,element)
        addSpecificSelectToNameBar()
        
    }else
    if(drinkIsIced[drinkNum]===false){
        let element = document.querySelector('.selected .icedArea')
        element.remove()
        document.querySelector('.isIced').classList.remove('isIced')
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
let tempDrink = {
    hot: new Drink(false,[''],['','','','',''],[['','','','','']],[''],'',[''],''),
    iced: new Drink(true,[''],['','','','',''],[['','','','','']],[''],'',[''],''),
}
function processCustom(element,value){
    let drink
    let drinkNum
    if(document.querySelector('.pickedDrinks .selected') && document.querySelector('.selected .drinkName')){
        drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
        drink = drinksArray[drinkNum]
    }else{
        createTemplate()
        drinksArray.push(JSON.parse(JSON.stringify(tempDrink)))
        drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
        drink = drinksArray[drinkNum]
        addSpecificSelectToNameBar()
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
            createModifier('Single','',value)
        }
        if(element ==='Double'){
            changeHotAndIced(drink,'shotNumber',2)
            createModifier('Double','',value)
        }
        if(element ==='Triple'){
            changeHotAndIced(drink,'shotNumber',3)
            createModifier('Triple','',value)
        }
        if(element ==='Quad'){
            changeHotAndIced(drink,'shotNumber',4)
            createModifier('Quad','',value)
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
                        document.querySelector('.displayAmount p').innerText=wholeNum.join('')
                    }
                    if(click.target.classList.contains('clearError')){
                        if(Number(wholeNum.join(''))<=99 && Number(wholeNum.join(''))>0 ){
                            changeHotAndIced(drink,'shotNumber',Number(wholeNum.join('')))
                            document.querySelector('.quantityForShots').classList.remove('active')
                            renderHotDrinkContents(drink)
                            createModifier(Number(wholeNum.join('')),'shots',value)
                        }
                    }
                    if(click.target.classList.contains('cancelError')){
                        document.querySelector('.quantityForShots').classList.remove('active')
                    }
                })
            })
            
        }
        if(element==='Affogato Shot'){
            
        }
        
    }
    
    if(value === 'coffeeType'){
        
        changeHotAndIced(drink,value,element)
        if(document.querySelector(`.${nameShortener(element)}${value}`)){
            document.querySelector(`.${nameShortener(element)}${value}`).remove()
        }
        createModifier(element,'',`${nameShortener(element)}${value}`)
        renderHotDrinkContents(drink)
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
    if(value.type==='syrup'){
        if(! drink.hot.syrup.includes(value.abbr)){
            createModifier(`${element}`,'',`${nameShortener(element)}${value.type}`)
            changeHotAndIced(drink,value.type,value.abbr)
        }
    }
    
    renderHotDrinkContents(drink)
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
    drinkIsIced.push(false)
    numberOfDrinksAdded+=1
    const sizeArea = document.createElement('div')
    sizeArea.classList.add('sizeIdentifier')
    sizeArea.addEventListener('click',addSpecificSelectToNameBar)
    const icedArea=document.createElement('section')
    icedArea.innerText="Iced"

    
    if(sizeSelected === undefined){
        sizeSelected='Gr'
    }
    sizeArea.innerText=sizeSelected
    const drinkName = document.createElement('div')
    drinkName.innerText='[Drink]'
    drinkName.classList.add('drinkName')
    drinkName.addEventListener('click',()=>{
        addSpecificSelectToNameBar()
    })
    drinkArea.appendChild(sizeArea)
    
    
    drinkArea.appendChild(drinkName)
    checkForSelection()
}

function createModifier(first,second,type){
    if(document.querySelector(`.selected .modifier.${type}`)!==null){
        
        document.querySelector(`.selected .modifier.${type}`).remove()
    }
    document.querySelectorAll('.selectedSpecific').forEach((elem)=>{
        elem.classList.remove('selectedSpecific')
    })
    let div = document.createElement('div')
    div.classList.add('modifier')
    div.classList.add('selectedSpecific')
    div.classList.add(type)
    document.querySelector('.pickedDrinks .selected').appendChild(div)
    div.innerText=`${first} ${second}`
    div.addEventListener('click',(click)=>{
        document.querySelectorAll('.selectedSpecific').forEach((elem)=>{
            elem.classList.remove('selectedSpecific')
        })
        click.target.classList.add('selectedSpecific')
    })
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
                if(drink.hot.shots[i]!== null){
                    drink.hot.shots[i]=value
                }
                
            })
        }
        if(drink.iced){
            drink.iced.shots.forEach((e,i)=>{
                
                if(e!==null)drink.iced.shots[i]=value
            })
        }
    }
    if(element==='coffeeType'){
        
        if(value==='Blonde'){
            if(drink.iced && drink.iced.decaf.includes('B')){
                let myindex = drink.iced.decaf.indexOf('B')
                drink.iced.decaf.splice(myindex,1)
                
            }else{
                if(drink.iced){
                    drink.iced.decaf.push('B')
                }
            } 

            if(drink.hot && drink.hot.decaf.includes('B')){
                let myindex = drink.hot.decaf.indexOf('B')
                drink.hot.decaf.splice(myindex,1)
                
            }else{
                if(drink.hot){
                    drink.hot.decaf.push('B')
                }
            } 
        }else
        if(value.includes('Decaf')){
            if(Array.isArray(drink.hot.decaf)){
                drink.hot.decaf.forEach((elem,i)=>{
                    if(drink.hot.decaf[i].toString().includes('D')){
                        drink.hot.decaf.splice(i,1)
                    }
                })
            }
            drink.hot.decaf.push(value.split('ecaf')[0])
            if(Array.isArray(drink.iced.decaf)){
                drink.iced.decaf.forEach((elem,i)=>{
                    if(drink.iced.decaf[i].toString().includes('D')){
                        drink.iced.decaf.splice(i,1)
                    }
                })
            }
            drink.iced.decaf.push(value.split('ecaf')[0])
        }else{
            if(drink.iced.decaf.includes(value.split('')[0])){
                let myindex = drink.iced.decaf.indexOf(value.split('')[0])
                drink.iced.decaf.splice(myindex,1)
                
            }else drink.iced.decaf.push(value.split('')[0])

            if(drink.hot.decaf.includes(value.split('')[0])){
                let myindex = drink.hot.decaf.indexOf(value.split('')[0])
                drink.hot.decaf.splice(myindex,1)
                
            }else drink.hot.decaf.push(value.split('')[0])
        }

    }
    if(element==='syrup'){
        drink.hot.syrup.push(value)
        drink.hot.pumps.push(JSON.parse(JSON.stringify(drink.hot.ogPumps[0])))
        drink.iced.syrup.push(value)
        drink.iced.pumps.push(JSON.parse(JSON.stringify(drink.iced.ogPumps[0])))
    }
}



document.querySelector('.shotsMenu').addEventListener('click', ()=>{
    renderCustomsMenu('shotsMenu')
})
document.querySelector('.syrupMenu').addEventListener('click', ()=>{
    renderCustomsMenu('syrup')
})
document.querySelector('.milkMenu').addEventListener('click', ()=>{
    renderCustomsMenu('milk')
})
document.querySelector('.customMenu').addEventListener('click', ()=>{
    renderCustomsMenu('custom')
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
                document.querySelector('.drinkType').classList.remove('hidden')
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

