





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
async function apiRequest(){
    
    try{
        const response = await fetch(heroku)
        const data = await response.json()

        Object.keys(data).forEach((element)=>{
            
            let div = document.createElement('div')
            div.classList.add(element)
            div.classList.add('drinkType') //created a div for categories
            document.querySelector('.coreDrinks').appendChild(div)

            data[element].forEach((roasty)=>{
                
                let theDrink = document.createElement('div')
                theDrink.classList.add(nameShortener(roasty.name))
                theDrink.classList.add('drink')
                document.querySelector(`.${element}`).appendChild(theDrink) //created sections for each drink appended to the category
                
                let cup = document.createElement('div')
                cup.classList.add('cup')
                theDrink.appendChild(cup)
                let Build = roasty.hotBuild
                let container = document.createElement('div')
                container.classList.add('container')
                cup.appendChild(container)
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
                    document.querySelector(`.${nameShortener(roasty.name)}.drink .cup`).appendChild(cover)
                    cup.addEventListener('click',(click)=>{
                        
                        if(click.target.classList.contains('iceOverlay') || click.target.parentElement.parentElement.parentElement.lastChild.classList.contains('iceOverlay')){
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
                    
                    
                    

                    
                }
                let text = document.createElement('div')
                text.classList.add('info')
                
                text.innerHTML=`
                <h2>${roasty.name.toUpperCase()}</h2>
                `
                theDrink.appendChild(text)
            })
        })
        
        
    }catch(error){
        console.log(error)
    }
}
apiRequest()