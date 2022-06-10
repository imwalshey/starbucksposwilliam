



async function apiRequest(){
    
    try{
        const response = await fetch(`http://localhost:8000/api/roasts`)
        const data = await response.json()

        Object.keys(data).forEach(key => {
            console.log(key, data[key]);
          });
        
    }catch(error){
        console.log(error)
    }
}
apiRequest()