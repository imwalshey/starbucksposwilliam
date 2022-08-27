

console.log(window.location.href.toString())

function changeTheLinks(url){
    document.querySelector('.drinkVis').href = url+'coreDrinks'
    document.querySelector('.menu').href = url+'pos'
    document.querySelector('.roasts').href = url+'roasts'
    document.querySelector('.apiDrinks').href = url+'api/coreDrinks'
    document.querySelector('.apiRoasts').href = url+'api/Roasts'
    document.querySelector('.apiCust').href = url+'api/customizations'
    document.querySelector('.apiCustomers').href = url+'api/allCustomers'
}



changeTheLinks(window.location.href.toString())













async function apiRequest(){
    
    try{
        const response = await fetch(`https://cofee-trainer.herokuapp.com/api/coredrinks`)
        const data = await response.json()

        Object.keys(data).forEach(key => {
            console.log(key, data[key]);
          });
        
    }catch(error){
        console.log(error)
    }
}
