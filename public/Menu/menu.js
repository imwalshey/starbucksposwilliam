

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
        this.ogSyrup=JSON.parse(JSON.stringify(Syrup))
        this.ogPumps=JSON.parse(JSON.stringify(Pumps))
        this.ogShots=JSON.parse(JSON.stringify(Shots))
        this.ogMilk = JSON.parse(JSON.stringify(Milk))
        this.ogCustom = JSON.parse(JSON.stringify(Custom))
    }
}


//adds menu categories for the each drinks category
function createCat(data){
    //cycle through each category 
    Object.keys(data).forEach((element)=>{

        let category = document.createElement('div')
        category.classList.add(`${element}`)
        category.classList.add('cats')
        category.innerText= capitalizeFirstLetter(element)
        document.querySelector('.drinkType').appendChild(category)
        category.addEventListener('click',(click)=>{
            document.querySelector('.items').className=`items ${(click.target.innerText.toLowerCase())}`
            pageRender(data[click.target.innerText.toLowerCase()],data)
            document.querySelectorAll('.highlight').forEach((div)=>{
                div.classList.remove('highlight')
            })
            click.target.classList.add('highlight')
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
        size.readOnly=true //readOnly for size Modifier
        size.classList.add('sizeIdentifier')//classlist for the size identifier
        size.classList.add('selectedSpecific')//adds selected specific to the drink
        let drink = document.createElement('div') // creates a div to hold the drink in the selected Items tab
        document.querySelector('.pickedDrinks').appendChild(div) // adds the drink div to the itemsSelected
        div.appendChild(size) //adds size to the drink div
        div.appendChild(drink)//adds the name to the drink div
        
        if(hots != null && colds != null){//checks if the drink can be hot and iced
            drinksArray.push({
                hot:new Drink(hots.iced,hots.decaf,hots.shots,hots.pumps,hots.syrup,hots.milk,hots.custom,hots.abbr,hots.size),
                iced:new Drink(colds.iced,colds.decaf,colds.shots,colds.pumps,colds.syrup,colds.milk,colds.custom,colds.abbr,colds.size)
                
            })
            drinkIsIced.push(false)//default pushes false to the isIced Array
            size.innerText=element.menuBuildHot.size
        }
        if(hots != null && colds === null){ //checks if the drink can be hot but not iced
            drinksArray.push({
                hot:new Drink(hots.iced,hots.decaf,hots.shots,hots.pumps,hots.syrup,hots.milk,hots.custom,hots.abbr,hots.size)
            })
            drinkIsIced.push(false) //default pushes false to the isIcedArray
            size.innerText=element.menuBuildHot.size
        }
        if(hots === null && colds != null){ //checks if the drink can be iced but not hot
            drinksArray.push({
                iced:new Drink(colds.iced,colds.decaf,colds.shots,colds.pumps,colds.syrup,colds.milk,colds.custom,colds.abbr,colds.size)
            })
            drinkIsIced.push(true) //default pushes the true value to the isIced Array
            size.innerText=element.menuBuildIced.size
        }
        drink.innerHTML=element['abbr'] //Adds the abbreviated drink name to the drink div
        drink.classList.add('drinkName') //adds the drinkName classlist to the drink div
        drink.addEventListener('click',()=>{ //listens for a click so the name can be selected
            addSpecificSelectToNameBar()
        })
        drink.classList.add('selectedSpecific') //adds the selected specific classlist so we can tell if the core of the drink has been selected or if a modifier has been selected
        div.addEventListener('click',(click)=>{ //listens for a click so the entire drink section can have a parent classlist of selected
            selectDrink(click.target.parentElement, element)
        })
        numberOfDrinksAdded+=1 //number of drinks added gets increased by one
        removeAllSelected() //all selected drinks get the classlist selected removed
        selectDrink(div) //selects the drink
        let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink','')) //a useful way to find the drinkArray position
        if(drinkIsIced[drinkNum]===true) {addTheIcedWord()} //checks if the drinks is iced and adds 'iced' in front of the drink name
        renderHotDrinkContents(drinksArray[drinkNum])//adds contents of the drinks to the sidebar ingredients list
        
    }
    // checks if a drink is only partial before integrating the selected modifiers into the drink contents of the array.  Partial drinks appear when only a customization has been selected and not a whole drink
    if(document.querySelector('.pickedDrinks .selected .drinkName') && document.querySelector('.pickedDrinks .selected .drinkName').innerText === '[Drink]'){
        
        let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink','')) //finds the array position
        const drinkToBeAdded ={ //stores the hot and cold values for the drink to be added
            hot: hots,
            iced: colds
        }
        Object.keys(drinksArray[drinkNum]).forEach((cool)=>{ //goes through each property hot or iced of the drink
            if(drinkToBeAdded.hot === null || drinkToBeAdded.hot === undefined){ //if drink is undefined or null
                drinkIsIced[drinkNum] = true //Defines drink as iced
                drinksArray[drinkNum].hot = undefined //Sets drink.hot to undefined if drink.hot doesn't exist
            }
            if(drinkToBeAdded[`${cool}`]!==null && drinkToBeAdded[`${cool}`]!==undefined){ //checks if drinktobeadded.x is available
            Object.keys(drinksArray[drinkNum][`${cool}`]).forEach((bool)=>{ // iterates through all of the properties of hot and iced objects
                if(drinksArray[drinkNum][`${cool}`][bool]=== ''){ //if the element is blank, 
                    drinksArray[drinkNum][`${cool}`][bool]= drinkToBeAdded[`${cool}`][bool] // add the element to the actual drink array
                }
                if(bool==='ogPumps'){
                    drinksArray[drinkNum][`${cool}`][bool]=drinkToBeAdded[`${cool}`]['pumps'] //Makes OG pumps
                }
                if(bool==='ogShots'){
                    drinksArray[drinkNum][`${cool}`][bool]=drinkToBeAdded[`${cool}`]['shots'] //Makes OG shot
                }
                if(bool==='ogMilk'){
                    drinksArray[drinkNum][`${cool}`][bool]= JSON.parse(JSON.stringify(drinkToBeAdded[`${cool}`]['milk'])) //adds OGMIlk
                }
                if(bool==='ogCustom'){
                    drinksArray[drinkNum][`${cool}`][bool]= JSON.parse(JSON.stringify(drinkToBeAdded[`${cool}`]['custom'])) //adds OGMIlk
                }
                if(bool==='milk'){
                    drinksArray[drinkNum][`${cool}`].milk.forEach((elem,i)=>{ //cycles through the milk array
                        if(elem === '' && elem.length===0 && drinkToBeAdded[`${cool}`]['milk'][i]){ 
                            drinksArray[drinkNum][`${cool}`][bool][i]= drinkToBeAdded[`${cool}`]['milk'][i] //only changes the first value of array
                            //milks from the backend are always single value, only the first value needs to be updated
                        }
                    })
                }
                if(bool==='shots'){ 
                    //cycles through shots
                    //if the element for the backend drink.shot amount is null make the current element null as well
                    drinkToBeAdded[`${cool}`][bool].forEach((num,i)=>{ 
                        if(num==null){ 
                            drinksArray[drinkNum][`${cool}`][bool][i] = null
                        }
                        //if not, push the value into the array
                        if(num!==null && drinksArray[drinkNum][`${cool}`][bool][i]=== ''){
                            drinksArray[drinkNum][`${cool}`][bool][i] = drinkToBeAdded[`${cool}`][bool][i]
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
                    drinkToBeAdded[`${cool}`][bool].forEach((val,i)=>{
                        if(!drinksArray[drinkNum][`${cool}`][bool].includes(val)){
                            if(drinksArray[drinkNum][`${cool}`][bool][i]===''){
                                drinksArray[drinkNum][`${cool}`][bool][i]=val
                            }else drinksArray[drinkNum][`${cool}`][bool].push(val)
                        }
                    })
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
    setTimeout(()=>{
    document.querySelectorAll('.selectedSpecific').forEach((elem,i)=>{
        elem.classList.remove('selectedSpecific')
    })
    document.querySelector('.selected .drinkName').classList.add('selectedSpecific')
    if(document.querySelector('.selected .icedArea')){
        document.querySelector('.selected .icedArea').classList.add('selectedSpecific')
    }
    
    document.querySelector('.selected .sizeIdentifier').classList.add('selectedSpecific')
},50)
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
    document.querySelector('.milkCheck div').innerText=bool.milk.join(' ')
    if(drinkIsIced[drinkNum]===true){
        document.querySelector('.iceCheck div').innerText= '✓'
    }else{
        document.querySelector('.iceCheck div').innerText= ''
    }
    document.querySelector('.customCheck div').innerText=''
    bool.custom.forEach((elem)=>{
        if(elem !== ''){
        let spans = document.createElement('span')
        //document.querySelector('.customCheck div').innerText=bool.custom.join(' ')
        spans.innerText=elem + ' '
        if(elem.includes('NO')){
            spans.classList.add('NO')
            spans.innerText= (elem.split('w/').join('').split('XTR').join('').split('LT').join('').split('SUB').join('').split('NO').join(''))
        }
        
        document.querySelector('.customCheck div').appendChild(spans)
        console.log(elem)
        }
    })

}
function removeDrinkContentsFromDivs(element){
    let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
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
    if(element.classList.toString().includes('milk')){
        let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
        if(element.classList.contains( 'milk')){
            if(drinksArray[drinkNum].iced){
                drinksArray[drinkNum].iced.milk[0]= JSON.parse(JSON.stringify(drinksArray[drinkNum].iced.ogMilk))[0]
            }
            if(drinksArray[drinkNum].hot){
                drinksArray[drinkNum].hot.milk[0]= JSON.parse(JSON.stringify(drinksArray[drinkNum].hot.ogMilk))[0]
            }
        }else{
            element.classList.forEach((name)=>{
                if(name.includes('milk')){
                    let itemToRemove= (name.split('milk')[0].split('-').join('/'))
                    itemToRemove.split('').forEach((elem)=>{
                        if(! isNaN(elem) && elem !== '/'){
                            itemToRemove = itemToRemove+'%'
                        }
                    })
                    if(drinksArray[drinkNum].hot){
                        let indexHot = drinksArray[drinkNum].hot.milk.indexOf(itemToRemove);
                        if (indexHot !== -1) {
                            drinksArray[drinkNum].hot.milk.splice(indexHot, 1);
                        }
                    }
                    if(drinksArray[drinkNum].iced){
                        let indexIced = drinksArray[drinkNum].iced.milk.indexOf(itemToRemove);
                        if (indexIced !== -1) {
                            drinksArray[drinkNum].iced.milk.splice(indexIced, 1);
                        }
                    }
                }
            })
        }
    }
    if(element.classList.toString().includes('syrup')){
        element.classList.forEach((elem)=>{
            if(elem.includes('syrup')){
                let abbr = elem.split('syrup')[0].toUpperCase()
                let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
                let drink = drinksArray[drinkNum]
                if(drink.hot){
                    
                    let index = drink.hot.syrup.indexOf(abbr)
                    drink.hot.syrup.splice(index,1)
                    drink.hot.pumps.splice(index,1)
                }
                if(drink.iced){
                    let index = drink.iced.syrup.indexOf(abbr)
                    drink.iced.syrup.splice(index,1)
                    drink.iced.pumps.splice(index,1)
                }
            }
        })
    }
    if(element.classList.toString().includes('custom')){
        let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
        let drink = drinksArray[drinkNum]
        let toBeRemoved
        element.classList.forEach((elem)=>{
            if(elem.includes('custom')){
                toBeRemoved= elem.split('custom')[0]
            }
        })
        if(drink.hot){
            let removeHot = drink.hot.custom.map((elem,i)=>{
                if(elem.includes(toBeRemoved.toUpperCase())){
                    
                    if(drink.hot.ogCustom.includes(toBeRemoved.toUpperCase())){
                        let indexOfCustom = drink.hot.ogCustom.indexOf(toBeRemoved.toUpperCase())
                        drink.hot.custom.splice(i,1,drink.hot.ogCustom[indexOfCustom])
                    }else{
                        drink.hot.custom.splice(i,1)
                    }
                }
                
            })
        }
        if(drink.iced){
            let removeIced = drink.iced.custom.map((elem,i)=>{
                if(elem.includes(toBeRemoved.toUpperCase())){
                    drink.iced.custom.splice(i,1)
                }
                
            })
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
        setTimeout(()=>{
            location.reload()
        },500)
    }
}
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

async function allcustom(){
    try{
        const response = await fetch('http://localhost:8000/api/allnames')
        const data = await response.json()
        console.log(data)
    }
    catch{

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
        item.addEventListener('click',(click)=>{
            processCustom(element,menuData[menu][element],click)
        })
    })
    document.querySelector('.items').className=`items ${menu}`
}
let tempDrink = {
    hot: new Drink(false,[''],['','','','',''],[[1,1,1,1,1]],[''],[''],[''],''),
    iced: new Drink(true,[''],['','','','',''],[['','','','','']],[''],[''],[''],''),
}

document.querySelector('.quantity').addEventListener('click',renderQuantities)

function renderQuantities(){
    document.querySelectorAll('.buttons>div').forEach((elem)=>{
        currentQuantity = []
        document.querySelector('.numbers .input').innerText= Number(currentQuantity.join(''))
        elem.classList.toggle('hidden')
    })
}
let currentQuantity = []
let buttonActive = false
let buttonActiveType =''
let buttonActiveName = ''
document.querySelectorAll('.numbers button').forEach((butt)=>{
    butt.addEventListener('click',()=>{
        if(!isNaN(Number(butt.innerText))){

            currentQuantity.push(Number(butt.innerText))
            document.querySelector('.numbers .input').innerText= Number(currentQuantity.join(''))
        }
        if(butt.innerText==='Backspace'){
            currentQuantity.pop()
            document.querySelector('.numbers .input').innerText= Number(currentQuantity.join(''))
        }
        if(butt.innerText==='Enter'){
            if(document.querySelector('.selectedSpecific')){
                setTimeout(()=>{renderQuantities()},50)
                let drinkNum = Number(document.querySelector('.pickedDrinks .selected').classList[0].replace('drink',''))
                drink = drinksArray[drinkNum]
                changeHotAndIced(drink,'pumps',Number(currentQuantity.join('')))
                renderHotDrinkContents(drink)
                
            }
        }
        if(butt.innerText==='Cancel'){
            currentQuantity=[]
            renderQuantities()
        }
    })
})

function processCustom(element,value,click){
    let drink
    let drinkNum
    if(value.type!=='button'){
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
    }else{
        document.querySelectorAll('.items div').forEach((elem)=>{
            
            if(elem===click.target){
                click.target.classList.toggle('selected')
                
            }
            else{
                elem.classList.remove('selected')
            }
            
            if(click.target.classList.contains('selected')){
                buttonActive = true
                buttonActiveType = value.abbr
                buttonActiveName = element
            }else{
                buttonActive=false
                buttonActiveType = ''
                buttonActiveName=''
            }
        })
        
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
        Object.keys(drink).forEach((bool)=>{
            if(drink[bool]){
                if(! drink[bool].syrup.includes(value.abbr) && currentQuantity.length === 0){
                    changeHotAndIced(drink,value.type,value.abbr)
                    createModifier(`${drinksArray[drinkNum][bool].pumps[drinksArray[drinkNum][bool].syrup.indexOf(value.abbr)][translateSize(drink[bool].size)]} pumps`,`${element}`,`${nameShortener(value.abbr)}${value.type}`)
                }
                if(drink[bool].syrup.includes(value.abbr) && currentQuantity.length === 0){
                    createModifier(`${drinksArray[drinkNum][bool].pumps[drinksArray[drinkNum][bool].syrup.indexOf(value.abbr)][translateSize(drink[bool].size)]} pumps`,`${element}`,`${nameShortener(value.abbr)}${value.type}`)
                }
                if(drink[bool].syrup.includes(value.abbr) && currentQuantity.length !== 0){
                    createModifier(`${Number(currentQuantity.join(''))} pumps`,`${element}`,`${nameShortener(value.abbr)}${value.type}`)
                    changeHotAndIced(drink,'pumps',Number(currentQuantity.join('')))
                    
                }
                if(! drink[bool].syrup.includes(value.abbr) && currentQuantity.length !== 0){
                    changeHotAndIced(drink,value.type,value.abbr)
                    createModifier(`${Number(currentQuantity.join(''))} pumps`,`${element}`,`${nameShortener(value.abbr)}${value.type}`)
                    changeHotAndIced(drink,'pumps',Number(currentQuantity.join('')))  
                }
            }
        })
    
    }
    
    if(value.type==='custom'){
        // Object.keys(drink).forEach((bool)=>{
            
        //     if(! drink[bool].custom.includes(value.abbr)){
        //         changeHotAndIced(drink,value.type,value.abbr)
        //     }
        // })
        // createModifier(`Add`,`${value.menuName}`,`${nameShortener(value.abbr)}${value.type}`)
        // renderHotDrinkContents(drink)
        if(element.includes('With')){
            element = element.replace('With ','')
        }
        if(buttonActive){
            let changeAbbr
            if(value.abbr !=='CRM'){
                changeAbbr = buttonActiveType + JSON.parse(JSON.stringify(value.abbr))
            }else{
                changeAbbr = buttonActiveType + JSON.parse(JSON.stringify(value.abbr))
            }
            changeHotAndIced(drink,value.type,changeAbbr)
            createModifier(`${buttonActiveName} ${element}`,'',`${nameShortener(value.abbr)}custom`)
            document.querySelectorAll('.items div').forEach((elem)=>{
                elem.classList.remove('selected')
                            
            })
        }else{
        
        createModifier(`Add ${element}`,'',`${nameShortener(value.abbr)}custom`)
        changeHotAndIced(drink,value.type,value.abbr)
        }
    }
    if(value.type==='milk'){
        
        if(!value.abbr.includes('w/') && ! value.abbr.includes('CRM')){
            if(buttonActive){
                errorMessage('Entry Not Available On Active Levels','red')
                document.querySelectorAll('.items div').forEach((elem)=>{
                    elem.classList.remove('selected')
                })
            }
            createModifier(element,'',`${value.type}`)
            changeHotAndIced(drink,value.type,value.abbr)
        }else{
            if(buttonActive){
                let changeAbbr
                if(value.abbr !=='CRM'){
                    changeAbbr = buttonActiveType + JSON.parse(JSON.stringify(value.abbr.split('/')[1]))
                }else{
                    changeAbbr = buttonActiveType + JSON.parse(JSON.stringify(value.abbr.split('/')[0]))
                }
                changeHotAndIced(drink,value.type,changeAbbr)
                createModifier(`${buttonActiveName} ${element.split('with')[1]}`,'',`${value.abbr.split('/').join('-').split('%')[0]}milk`)
                document.querySelectorAll('.items div').forEach((elem)=>{
                    elem.classList.remove('selected')
                                
                })
            }else{
            createModifier(`${element}`,'',`${value.abbr.split('/').join('-').split('%')[0]}milk`)
            changeHotAndIced(drink,value.type,value.abbr)
            }
        }
        
        
    }
    document.querySelectorAll('.buttons>div').forEach((elem)=>{
        currentQuantity = []
        elem.classList.add('hidden')
    })
    document.querySelector('.buttons .shows').classList.remove('hidden')
    document.querySelector('.buttons .submits').classList.remove('hidden')
    if(value.type!=='button'){
        renderHotDrinkContents(drink)
        if(document.querySelector('.selected .modifier')){
            document.querySelectorAll('.selected .modifier').forEach((elem)=>{
                if(elem.classList.toString('').includes('syrup')){
                    elem.classList.forEach((value)=>{
                        if(value.includes('syrup')){
                            let abbr = value.split('syrup')[0].toUpperCase()
                            const before = elem.innerText.split(' ')
                            let after
                            if(drinkIsIced[drinkNum] === true && drink.iced) after = drink.iced.pumps[drink.iced.syrup.indexOf(abbr)][translateSize(drink.iced.size)]
                            if(drinkIsIced[drinkNum] === false && drink.hot) after = drink.hot.pumps[drink.hot.syrup.indexOf(abbr)][translateSize(drink.hot.size)]
                            
                            before.forEach((elem,i)=>{
                                if(i!==0){
                                    after += ` ${elem}`
                                }
                            })
                            elem.innerText=after
                        }
                    })
                }

            })
        }
        buttonActive = false
        buttonActiveType =''
        buttonActiveName = ''
        
    }
}
function translateSize(string){
    if(string==='Sh'){
        return 0
    }
    if(string==='Tl'){
        return 1
    }
    if(string==='Gr'){
        return 2
    }
    if(string==='Vt'){
        return 3
    }
    if(string==='Tr'){
        return 4
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
    if(document.querySelector('.shows.hidden')){
    }
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
        if(drink.hot){
            drink.hot.syrup.push(value)
            drink.hot.pumps.push(JSON.parse(JSON.stringify(drink.hot.ogPumps[0])))
        }
        if(drink.iced){
            drink.iced.syrup.push(value)
            drink.iced.pumps.push(JSON.parse(JSON.stringify(drink.iced.ogPumps[0])))
        }
    }
    if(element === 'custom'){
        function addCustomWithPotModifiers(bool){
            
            if(bool){
                bool.custom.forEach((val,i)=>{
                    if(val.includes(value.split('w/').join('').split('XTR').join('').split('LT').join('').split('SUB').join('').split('NO').join(''))){
                        bool.custom.splice(i,1)
                    }
                })
                if(! bool.custom.includes(value)){
                    bool.custom.push(value)
                    console.log(value.split('w/').join('').split('XTR').join('').split('LT').join('').split('SUB').join('').split('NO').join(''))
                }
            }
        }
        addCustomWithPotModifiers(drink.iced)
        addCustomWithPotModifiers(drink.hot)

        document.querySelectorAll('.items div').forEach((elem)=>{
            elem.classList.remove('selected')
                        
        })
    }
    if(element==='milk'){
        if(!value.includes('w/') && ! value.includes('CRM') && ! value.includes('XTR')&& ! value.includes('LT')&& ! value.includes('NO')){
            if(drink.iced){drink.iced.milk[0]= value}
            if(drink.hot){drink.hot.milk[0]= value}
        }else{
            if(! value.includes('CRM')){
                
            }
            function processModifier(type,bool){
                if(drink[bool]){
                    drink[bool].milk.forEach((val,i)=>{
                        
                        //console.log(value.split('w/').join('').split('XTR').join(''))
                        console.log(val.includes(value.split('w/').join('').split('XTR').join('')))
                        if((val.includes('w/') || val.includes('XTR') || val.includes('LT') || val.includes('NO') || val.includes('SUB')) && val.includes(value.split('w/').join('').split('XTR').join('').split('LT').join('').split('SUB').join('').split('NO').join(''))){
                            console.log('word' + bool)
                            drink[bool].milk[i]=value
                            
                        }
                            
                        
                    })
                }
                if(drink[bool] && ! drink[bool].milk.includes(value)){
                    console.log('pushed' + bool)
                    drink[bool].milk.push(value)
                }
            }
            processModifier(buttonActiveType,'hot')
            processModifier(buttonActiveType,'iced')
            
            
        }
    }
    if(element === 'pumps'){
        let abbr
        //grabs the syrup type from the classlist string
        document.querySelector('.selectedSpecific').classList.forEach((elem,i)=>{
            if(elem.includes('syrup')){
                abbr = document.querySelector('.selectedSpecific').classList[i].split('syrup')[0]
            }
        })
        if(drink.hot){
            drink.hot.pumps[drink.hot.syrup.indexOf(abbr.toUpperCase())].forEach((elem,i)=>{
                if(elem!==null){
                    drink.hot.pumps[drink.hot.syrup.indexOf(abbr.toUpperCase())][i]= Number(currentQuantity.join(''))
                }
            })
            
        }
        if(drink.iced){
            drink.iced.pumps[drink.iced.syrup.indexOf(abbr.toUpperCase())].forEach((elem,i)=>{
                if(elem!==null){
                    drink.iced.pumps[drink.iced.syrup.indexOf(abbr.toUpperCase())][i]= Number(currentQuantity.join(''))
                }
            })
            
        }
        let samePumps = (drink.iced.pumps[drink.iced.syrup.indexOf(abbr.toUpperCase())][translateSize(drink.iced.size)] === drink.iced.ogPumps[0][translateSize(drink.iced.size)])

        
        //console.log(drink.iced.ogPumps[0])
        const before = document.querySelector('.selectedSpecific').innerText.split(' ')
        let after = Number(currentQuantity.join(''))
        before.forEach((elem,i)=>{
            if(i!==0){
                after += ` ${elem}`
            }

        })
        document.querySelector('.selectedSpecific').innerText=after
        
    }
}



document.querySelector('.shotsMenu').addEventListener('click', (click)=>{
    document.querySelectorAll('.highlight').forEach((div)=>{
        div.classList.remove('highlight')
    })
    document.querySelector('.customizations .shotsMenu').classList.add('highlight')
    renderCustomsMenu('shotsMenu')
})
document.querySelector('.syrupMenu').addEventListener('click', ()=>{
    document.querySelectorAll('.highlight').forEach((div)=>{
        div.classList.remove('highlight')
    })
    document.querySelector('.syrupMenu').classList.add('highlight')
    renderCustomsMenu('syrup')
    document.querySelector('.pumps').addEventListener('click',renderQuantities)
})
document.querySelector('.milkMenu').addEventListener('click', ()=>{
    document.querySelectorAll('.highlight').forEach((div)=>{
        div.classList.remove('highlight')
    })
    document.querySelector('.milkMenu').classList.add('highlight')
    renderCustomsMenu('milk')
})
document.querySelector('.customMenu').addEventListener('click', ()=>{
    document.querySelectorAll('.highlight').forEach((div)=>{
        div.classList.remove('highlight')
    })
    document.querySelector('.customMenu').classList.add('highlight')
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
    document.querySelectorAll('.highlight').forEach((div)=>{
        div.classList.remove('highlight')
    })
    document.querySelector('.customizations .shotsMenu').classList.add('highlight')
    document.querySelectorAll('.customizations div div').forEach((div)=>{
        div.innerText=''
    })
}



function errorMessage(message,color){
    document.querySelector('.errorMessage').classList.add('active')
    document.querySelector('.errorMessage .errorBox p').innerHTML=`${message}`
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

document.querySelectorAll('.findOrder').forEach((elem)=>{
    elem.addEventListener('click',postAnswer)
})
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
if(! localStorage.getItem('totalCorrect')){
    localStorage.setItem('totalCorrect',0)
}
async function postAnswer(){
    document.querySelector('#winOrLose p').innerText= ''
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
        if(data.result==='win'){
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
                renderCustomsMenu('shotsMenu')
                document.querySelectorAll('.highlight').forEach((div)=>{
                    div.classList.remove('highlight')
                })
                document.querySelector('.customizations .shotsMenu').classList.add('highlight')
                drinksArray=[]
                drinkIsIced=[]
                numberOfDrinksAdded=0
                apiRequestCustomer(localStorage.getItem('LastClicked').split(',')[2])
            })
            localStorage.setItem('totalCorrect',(Number(localStorage.getItem('totalCorrect'))+1))
            localStorage.setItem('streak',(Number(localStorage.getItem('streak'))+1))

        }
        console.log(data.result)
        if(data.result==='lose'){
            document.getElementById('winOrLose').classList='lose'
            document.querySelector('#winOrLose .winCont').classList.add('hidden')
            document.querySelector('#winOrLose h1').innerText='NOT QUITE!'
            document.querySelector('#winOrLose p').innerText= data.advice
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
                renderCustomsMenu('shotsMenu')
                document.querySelectorAll('.highlight').forEach((div)=>{
                    div.classList.remove('highlight')
                })
                document.querySelector('.customizations .shotsMenu').classList.add('highlight')
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
                renderCustomsMenu('shotsMenu')
                document.querySelectorAll('.highlight').forEach((div)=>{
                    div.classList.remove('highlight')
                })
                document.querySelector('.customizations .shotsMenu').classList.add('highlight')
                drinksArray=[]
                drinkIsIced=[]
                numberOfDrinksAdded=0
            })
            localStorage.setItem('totalWrong',(Number(localStorage.getItem('totalWrong'))+1))
            localStorage.setItem('streak',0)
        }
        
    }catch(error){
        console.log(error)
    }
}

function changeTheLinks(url){
    document.querySelector('.apiDrinks').href = url+'/api/coreDrinks'
    document.querySelector('.apiRoasts').href = url+'/api/Roasts'
    document.querySelector('.apiCust').href = url+'/api/customizations'
    document.querySelector('.apiCustomers').href = url+'/api/allCustomers'
}
changeTheLinks(window.location.href.toString().split('/pos')[0])


function getAbsoluteHeight(el) {
  // Get the DOM Node if you pass in a string
  el = (typeof el === 'string') ? document.querySelector(el) : el; 

  var styles = window.getComputedStyle(el);
  var margin = parseFloat(styles['marginTop']) +
               parseFloat(styles['marginBottom']) +
               parseFloat(styles['borderBottom']) +
               parseFloat(styles['borderTop']);

  return Math.ceil(el.offsetHeight + margin);
}


let totalViableHeights = getAbsoluteHeight('header') + getAbsoluteHeight('.customerArea') + getAbsoluteHeight('.menuWrapper')
//console.log(totalViableHeights)
if(screen.height>= totalViableHeights){
    document.querySelector('.api').style.marginTop= `${screen.height - totalViableHeights }px`
}
//document.querySelector('.api').style.marginTop= `${document.querySelector('.customerArea').offsetHeight}px`

document.querySelectorAll('.sections div').forEach((elem)=>{
    elem.addEventListener('click',(ind)=>{
        document.querySelectorAll('.sections div div').forEach((div)=>{
            div.classList.remove('selected')
        })
        if(ind.target.parentElement.nodeName === 'DIV'){
            ind.target.parentElement.childNodes.forEach((each)=>{
                if(each.nodeName==='DIV'){
                    
                    each.classList.add('selected')
                    if(each.innerText !== ''){
                        renderFunction(each.innerText)
                    }
                }
            })
            
        }
        
    })
    
})
function renderFunction(type){
    if(type === 'Order'){
        renderCustomsMenu('shotsMenu')
        document.querySelectorAll('.highlight').forEach((div)=>{
            div.classList.remove('highlight')
        })
        document.querySelector('.customizations .shotsMenu').classList.add('highlight')
        document.querySelector('.categories').classList.remove('notVisible')
        document.querySelector('.drinkType').classList.remove('notVisible')
        document.querySelector('.customizations').classList.remove('notVisible')
        document.querySelector('.extras').classList.remove('notVisible')
        document.querySelector('.buttons').classList.remove('notVisible')
        document.querySelector('.customerArea').classList.remove('notVisible')
    }

    if(type === 'Functions'){
        document.querySelector('.categories').classList.add('notVisible')
        document.querySelector('.drinkType').classList.add('notVisible')
        document.querySelector('.customizations').classList.add('notVisible')
        document.querySelector('.extras').classList.add('notVisible')
        document.querySelector('.buttons').classList.add('notVisible')
        document.querySelector('.customerArea').classList.add('notVisible')
        setTimeout(()=>{
            removeAllChildNodes(document.querySelector('.items'))
            document.querySelector('.items').classList='items'
            document.querySelector('.items').classList.add('functions')
            document.querySelector('.items').innerHTML = `
            <div class = 'selectName'>Name: ${localStorage.getItem('myName')}</div>
            <div class = 'streak'>Streak: ${localStorage.getItem('streak')}</div>
            <div class = 'total'>Total Correct: ${localStorage.getItem('totalCorrect')}</div>
            <div class = 'total'>Total Incorrect: ${localStorage.getItem('totalWrong')}</div>
            `
            document.querySelector('.selectName').addEventListener('click',()=>{
                dataMessage('Enter Name: <input></input>', 'green')
            })
            
        },2)
        
        //removeAllChildNodes(document.querySelector('.items'))
    }
}
if(! localStorage.getItem('streak')){
    localStorage.setItem('streak',0)
}
if(! localStorage.getItem('totalWrong')){
    localStorage.setItem('totalWrong',0)
}

if(! localStorage.getItem('myName')){
    localStorage.setItem('myName','Jacob Harper')
}
document.querySelector('.namebar p').innerText=`${localStorage.getItem('myName')}`
if(! localStorage.getItem('IsNew')){
    
}

function dataMessage(message,color){
    document.querySelector('.errorMessage').classList.add('active')
    document.querySelector('.errorMessage .errorBox p').innerHTML=`${message}`
    document.querySelector('.errorBox').style.border=`8px solid ${color}`
    document.querySelector('.clearError').addEventListener('click',()=>{
        if(document.querySelector('.errorBox p input').value.length >= 1){
        localStorage.setItem('myName',document.querySelector('.errorBox p input').value)
        document.querySelector('.namebar p').innerText=`${localStorage.getItem('myName')}`
        document.querySelector('.selectName').innerText=`Name: ${localStorage.getItem('myName')}`
        document.querySelector('.errorMessage').classList.remove('active')
        }
    })
    document.querySelector('.cancelError').addEventListener('click',()=>{
        document.querySelector('.errorMessage').classList.remove('active')
    })
    
}


const cursor = document.getElementById('mousePointer')
function cursorSet(top,right,bottom,left){
    const divHeight = document.querySelector('.items div').offsetHeight / 2
    
    cursor.style.top = `${top+divHeight}px`
    cursor.style.bottom = `${bottom+divHeight}px`
    cursor.style.right=`${right}px`
    cursor.style.left=`${left}px`
}
function placeCursorOnElement(element){
    cursor.classList.remove('notVisible')
    var rect = document.querySelector(`.${element}`).getBoundingClientRect();
    cursorSet(rect.top, rect.right, rect.bottom, rect.left);
    setTimeout(()=>{
        cursor.classList.add('notVisible')
    },1000)
}
function pseudoClick(element){
    placeCursorOnElement(element)
    setTimeout(() => {
        document.querySelector(`.${element}`).click()
    }, 1000);
    
    
}

