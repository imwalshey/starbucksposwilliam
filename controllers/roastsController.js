const express =require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const roasts ={
    'blonde':[],
    'medium':[],
    'dark':[],
}
class Roasts{
    constructor(title,desc,darkness,flavor,Body,acid,process,country){
        this.name = title
        this.description = desc
        this.roast=darkness
        this.flavorNotes = flavor
        this.body = Body
        this.acidity = acid
        this.processing = process
        this.region = country
    }
}
roasts.blonde.push(new Roasts("Veranda",'Subtle with delicate nuances of soft cocoa and lightly toasted nuts.','Blonde','Mellow and soft','Light','Medium','Washed','Latin America'))
roasts.blonde.push(new Roasts("Blonde Espresso",'Incredibly smooth and subtly sweet with a creamy mouthfeel.','Blonde','Smooth and sweet','Medium','Medium','Washed','Multi-Region'))
roasts.medium.push(new Roasts("Siren's Blend",'Notes of citrus and floral aromas balanced by the taste of cocoa.','Medium','Citrus and chocolate','Medium','Medium','Washed','Multi-Region'))
roasts.medium.push(new Roasts("Pike's Place",'Well rounded with subtle notes of cocoa and toasted nuts balancing the smooth mouthfeel.','Medium','Smooth and balanced','Medium','Medium','Washed','Latin America'))
roasts.medium.push(new Roasts("Yukon Blend",'Big and balanced, with a liveliness at the start and herbal depth in the finish.','Medium','Hearty and well-rounded','Full','Medium','Washed and Semi-Washed','Multi-Region'))
roasts.dark.push(new Roasts("Sumatra",'Full-bodied with a smooth mouthfeel and lingering herbal flavors.','Dark','Earthy and Herbal','Full','Low','Semi-Washed','Asia/Pacific'))
roasts.dark.push(new Roasts("Komodo Dragon Blend",'Earthy and layered with notes of fresh herbs and a lingering spice.','Dark','Complex and Herbal','Full','Low','Washed and Semi-Washed','Asia/Pacific'))
roasts.dark.push(new Roasts("Cafè Verona",'Well balanced and rich with a dark cocoa texture.','Dark','Roasty sweet and Dark Cocoa','Full','Low','Washed and Semi-Washed','Multi-Region'))
roasts.dark.push(new Roasts("Espresso Roast",'Intense, caramelly sweet and perfect with steamed milk. Delicious as brewed coffee too','Dark','Rich and Caramelly','Full','Medium','Washed','Multi-Region'))
roasts.dark.push(new Roasts("Italian Roast",'Intense with a rich,deep flavor and notes of caramelized sugar.','Dark','Roasty and sweet','Medium','Low','Washed','Multi-Region'))

module.exports={
    sendRoasts: (req,res)=>{
        res.json(roasts)
    }
}