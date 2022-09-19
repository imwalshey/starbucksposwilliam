
 




function nameShortener(name){
    
    let bob= name.toLowerCase().split('').filter((elem)=>{
        if(elem.toString().charCodeAt()-96 > 0 && elem.toString().charCodeAt()-96 < 27){
            return elem
        }
    }).join('')
    return bob
    
}

let heroku = 'https://coffee-trainer.herokuapp.com/api/coredrinks'
let local = 'http://localhost:8000/api/coredrinks'
async function apiRequest(){
    
    try{
        const response = await fetch(heroku)
        const data = await response.json()

        Object.keys(data).forEach((element)=>{
            
            let div = document.createElement('div')
            div.classList.add(element)
            
            div.classList.add('drinkType') //created a div for categories
            div.innerHTML=`<div class="title"><h1>${element.toUpperCase()}</h1></div>`
            document.querySelector('.coreDrinks').appendChild(div)
            
            
            data[element].forEach((roasty)=>{
                
                if(element === 'brewed'){
                    let theDrink = document.createElement('div')
                    theDrink.classList.add(nameShortener(roasty.name))
                    theDrink.classList.add('drink')
                    document.querySelector(`.${element}`).appendChild(theDrink)
                    let cup = document.createElement('div')
                    let container = document.createElement('div')
                    container.classList.add('container')
                    cup.appendChild(container)
                    cup.classList.add('frapp')
                    
                    theDrink.appendChild(cup)
                    let text = document.createElement('div')
                    text.classList.add('info')
                    
                    text.innerHTML=`
                        <h2>${roasty.name.toUpperCase()}</h2>
                    `
                    theDrink.appendChild(text)
                }
                if(element ==='blended'){
                    let whipped = document.createElement('div')
                    whipped.classList.add('whipped')
                    if(roasty.whippedCream!==false){
                        
                        whipped.innerHTML ='<img draggable=false src="../IMG/whipped.png" alt="">'
                        if(roasty.topping!==''){
                            whipped.innerHTML = `<img draggable=false src="../IMG/whipped.png" alt="">`
                            roasty.topping.split(',').forEach((toppingName,i)=>{
                                let top = document.createElement('img')
                                top.draggable = false
                                
                                
                                top.src=`../IMG/${nameShortener(toppingName)}.png`
                                whipped.appendChild(top)
                            })
                            
                        }
                        // if(roasty.topping=== 'caramel drizzle'){
                        //     whipped.innerHTML = '<img draggable=false src="../IMG/whipped.png" alt=""> <img draggable=false src="../IMG/carameldrizzle.png" alt="">'
                        // }
                        // if(roasty.topping=== 'mocha drizzle'){
                        //     whipped.innerHTML = '<img draggable=false src="../IMG/whipped.png" alt=""> <img draggable=false src="../IMG/mochadrizzle.png" alt="">'
                        // }
                    }

                    let theDrink = document.createElement('div')
                    theDrink.classList.add(nameShortener(roasty.name))
                    theDrink.classList.add('drink')
                    document.querySelector(`.${element}`).appendChild(theDrink) //created sections for each drink appended to the category
                    
                    let cup = document.createElement('div')
                    theDrink.appendChild(whipped)
                    theDrink.appendChild(cup)
                    let Build = roasty.build
                    let container = document.createElement('div')
                    container.classList.add('container')
                    cup.appendChild(container)
                    cup.classList.add('frapp')
                    
                    roasty.build.forEach((word,index)=>{
                        let ingred = document.createElement('div')
                        ingred.classList.add(nameShortener(word))
                        ingred.classList.add('ingredient')
                        ingred.style.zIndex= 100+index
                        container.appendChild(ingred)
                    })
                    if(roasty.layered !== false){
                        let layers = document.createElement('div')
                        cup.classList.add('layered')
                        layers.classList.add('layers')
                        roasty.layered.forEach((name)=>{
                            let layer = document.createElement('div')
                            layer.classList.add(`${nameShortener(name)}`)
                            layers.appendChild(layer)
                            
                        })
                        cup.appendChild(layers)
                    }
                    let text = document.createElement('div')
                    text.classList.add('info')
                    
                    text.innerHTML=`
                        <h2>${roasty.name.toUpperCase()}</h2>
                    `
                    theDrink.appendChild(text)
                }



                if(element === 'espresso'){
                    let theDrink = document.createElement('div')
                    theDrink.classList.add(nameShortener(roasty.name))
                    theDrink.classList.add('drink')
                    document.querySelector(`.${element}`).appendChild(theDrink) //created sections for each drink appended to the category
                    
                    let cup = document.createElement('div')
                    
                    theDrink.appendChild(cup)
                    let Build = roasty.hotBuild
                    let container = document.createElement('div')
                    container.classList.add('container')
                    cup.appendChild(container)
                    cup.classList.add('cup')
                    Object.keys(Build).forEach((part)=>{
                        
                        let ingred = document.createElement('div')
                        ingred.classList.add(nameShortener(part))
                        ingred.classList.add('ingred')
                        ingred.style.height = Build[part]
                        if(part !== 'room'){
                        ingred.innerHTML = `<p>${part.toUpperCase()}</p>`
                        }
                        container.appendChild(ingred)
                        
                    })
                    if(roasty.iced===true){
                        let cover = document.createElement('div')
                        cover.classList.add('iceOverlay')
                        cover.classList.add('hidden')
                        if(roasty.hot===false){
                            cover.classList.remove('hidden')
                        }
                        document.querySelector(`.${nameShortener(roasty.name)}.drink .cup`).appendChild(cover)
                        if(roasty.hot===true){
                            cup.addEventListener('click',(click)=>{
                                
                                if(click.target.classList.contains('iceOverlay')){
                                    let parent
                                    if(click.target.classList.contains('iceOverlay')){
                                        parent = click.target.parentElement.firstChild
                                    }else{
                                        parent = click.target.parentElement.parentElement
                                    }
                                    
                                    
                                    if(!click.target.classList.contains('hidden')){
                                        
                                        while(parent.firstChild){
                                            
                                            parent.removeChild(parent.firstChild);
                                        }
                                        Build = roasty.hotBuild
                                        Object.keys(Build).forEach((part)=>{
                                            
                                            cup.classList.remove('iced')
                                            let ingred = document.createElement('div')
                                            ingred.classList.add(nameShortener(part))
                                            ingred.classList.add('ingred')
                                            ingred.style.height = Build[part]
                                            if(part !== 'room'){
                                            ingred.innerHTML = `<p>${part.toUpperCase()}</p>`
                                            }
                                            container.appendChild(ingred)
                            
                                        })
                                        
                                    }
                                    if(click.target.classList.contains('hidden')){
                                        console.log('true')

                                            while(parent.firstChild){
                                                parent.removeChild(parent.firstChild);
                                            }
                                            Build = roasty.icedBuild
                                            Object.keys(Build).forEach((part,index)=>{
                                                cup.classList.add('iced')
                                                let ingred = document.createElement('div')
                                                ingred.classList.add(nameShortener(part))
                                                ingred.classList.add('ingred')
                                                ingred.style.height = Build[part]
                                                if(part !== 'room'){
                                                ingred.innerHTML = `<p>${part.toUpperCase()}</p>`
                                                }
                                                container.appendChild(ingred)
                                                
                                                if(Build['room']!= undefined){
                                    
                                                    cover.style.backgroundPosition = `0% ${Build['room']}`
                                                }
                                                if(Build['whipped cream']!= undefined){
                                                    
                                                    cover.style.backgroundPosition = `0% ${Build['whipped cream']}`
                                                }
                                                if(Build['caramel drizzle']!= undefined){
                                                    
                                                    cover.style.backgroundPosition = `0% ${Build['caramel drizzle']}`
                                                }
                                                if(Build['whipped cream']!= undefined && Build['room']!= undefined){
                                                    
                                                    cover.style.backgroundPosition = `0% ${Number(Build['whipped cream'].slice(0,-1))+ Number(Build['room'].slice(0,-1))}%`
                                                }
                                                


                                            })
                                        

                                }
                            
                                if(click.target.tagName!='P'){
                                click.target.classList.toggle('hidden')}
                            }
                        })
                        
                    }//
                }
                let text = document.createElement('div')
                text.classList.add('info')
                
                text.innerHTML=`
                <h2>${roasty.name.toUpperCase()}</h2>
                `
                theDrink.appendChild(text)
                    
                    

                
                }
                
                
            })
        })
        
        
    }catch(error){
        console.log(error)
    }
}








apiRequest()