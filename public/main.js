



async function apiRequest(){
    
    try{
        const response = await fetch(`https://starbucks-coffee.herokuapp.com/api/coredrinks`)
        const data = await response.json()

        Object.keys(data).forEach(key => {
            console.log(key, data[key]);
          });
        
    }catch(error){
        console.log(error)
    }
}
apiRequest()