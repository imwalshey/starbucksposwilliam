





function nameShortener(name){
    
    let bob= name.toLowerCase().split('').filter((elem)=>{
        if(elem.toString().charCodeAt()-96 > 0 && elem.toString().charCodeAt()-96 < 27){
            return elem
        }
    }).join('')
    return bob
    
}

let heroku = 'https://coffee-trainer.herokuapp.com/api/roasts'
let local = 'http://localhost:8000/api/roasts'
async function apiRequest(){
    
    try{
        const response = await fetch(heroku)
        const data = await response.json()

        Object.keys(data).forEach((element)=>{
            data[element].forEach((roasty)=>{
                
                let newRoastDiv = document.createElement('div')
                newRoastDiv.classList.add(`${nameShortener(roasty.name)}`)
                newRoastDiv.innerHTML =
                `<h1>${roasty.name}</h1>
                 <em>"${roasty.description}"</em>
                 <p><b>Notes:</b> ${roasty.flavorNotes}
                 <p><b>Body:</b> ${roasty.body}
                 <p><b>Acidity:</b> ${roasty.acidity}
                 <p><b>Wash:</b> ${roasty.processing}
                 <p><b>Region:</b> ${roasty.region}`
                
                newRoastDiv.classList.add('individualRoast')
                document.querySelector(`.${roasty.roast.toLowerCase()}`).appendChild(newRoastDiv)
                
                console.log(roasty)
            })
        })
        
        
    }catch(error){
        console.log(error)
    }
}
apiRequest()