const express = require('express')
const app = express()
const PORT = 8000
const CORS = require('cors')
app.use(express.static('public'))
app.use(express.static('IMG'))
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(CORS())

app.use('/IMG', express.static(__dirname + '/IMG'));







const modifiers={
    shotsMenu:[],
    syrup:[],
    milk:[],
    custom:[]
}
modifiers.shotsMenu={'Iced':'iced','Blonde':'coffeeType','Decaf':'coffeeType','1/2 Decaf':'coffeeType','2/3 Decaf':'coffeeType','1/3 Decaf':'coffeeType','Single':'shotNumber','Single':'shotNumber','Double':'shotNumber','Triple':'shotNumber','Quad':'shotNumber','More shots':'shotNumber'}



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


const coreDrinks = {
    brewed:[],
    espresso:[],
    blended : [],
    tea : [],
    other : [],
}
class Espresso{
    constructor(Name,Steps,hotContents,HotBoolean,IcedBoolean,IcedBuild,ABBR,MenuBuildHot,MenuBuildIced){
        this.name = Name
        this.instructions = Steps
        this.hotBuild = hotContents
        this.hot= HotBoolean
        this.iced = IcedBoolean
        this.icedBuild = IcedBuild
        this.abbr =ABBR
        this.menuBuildHot=MenuBuildHot
        this.menuBuildIced =MenuBuildIced
    }
}
class DrinkBuild{
    constructor(IcedBool,DecafAmount,Shots,Pumps,Syrup,Milk,Custom,ABBR){
        this.iced=IcedBool
        this.decaf=DecafAmount
        this.shots=Shots
        this.pumps=Pumps
        this.syrup=Syrup
        this.milk=Milk
        this.custom=Custom
        this.abbr=ABBR
    }
}
coreDrinks.espresso.push(new Espresso('Americano',['que','add water','pour'],{'room':'1%','water':'72%','espresso':'27%'},true,true,{'room':'1%','water':'72%','espresso':'27%'},'Americano',new DrinkBuild('','',[1,2,3,4],[2,3,4,5],'','','H2O','A'),new DrinkBuild('','',[1,2,3,4],[2,3,4,6],'','','H2O','A')))
coreDrinks.espresso.push(new Espresso('Espresso',['que','pour'],{'room':'87%','espresso':'13%'},true,true,{'room':'87%','espresso':'13%'},'Espresso'))
coreDrinks.espresso.push(new Espresso('Espresso Macchiatto',['que','pour'],{'room':'57%','foam':'30%','espresso':'13%'},true,true,{'room':'57%','espresso':'13%','milk':'30%'},'Espresso Machiatto'))
coreDrinks.espresso.push(new Espresso('Espresso Con Panna',['que','pour'],{'room':'77%','whipped cream':'10%','espresso':'13%'},true,true,{'whipped cream':'10%','room':'74%','espresso':'13%'},'Espresso Con Panna'))
coreDrinks.espresso.push(new Espresso('Iced Shaken Espresso',['que shots','pump syrup into shaker','add ice to shaker','pour shots into shakes','shake ten times','pour into cup','pour milk to 1/4" below top'],{'milk':'13%','espresso foam':'22%','espresso':'58%','syrup':'7%'},false,true,{},'Iced Shaken Esp'))
coreDrinks.espresso.push(new Espresso('Brown Sugar Oat Shaken Espresso',['que shots','pump syrup into shaker','add ice to shaker','pour shots into shakes','shake ten times','pour into cup','pour milk to 1/4" below top'],{'oatmilk':'13%','espresso foam':'22%','espresso':'58%','syrup':'7%'},false,true,{},'Brwn Sug Oat Shkn Espr'))
coreDrinks.espresso.push(new Espresso('Chocolate Almondmilk Shaken Espresso',['que shots','scoop powder into shaker','add ice to shaker','pour shots into shakes','shake ten times','pour into cup','pour milk to 1/4" below top'],{'almondmilk':'13%','espresso foam':'22%','espresso':'58%','chocolate powder':'7%'},false,true,{},'Choc Alm Shkn Espr'))
coreDrinks.espresso.push(new Espresso('Toasted Vanilla Oat Shaken Espresso',['que shots','pump syrup into shaker','add ice to shaker','pour shots into shakes','shake ten times','pour into cup','pour milk to 1/4" below top'],{'oatmilk':'13%','espresso foam':'22%','espresso':'58%','syrup':'7%'},false,true,{},'Tstd Oat Shkn Espr'))
coreDrinks.espresso.push(new Espresso('Latte',['steam','que','pump syrup','pour'],{'room':'1%','foam':'15%','steamed milk':'71%','espresso':'13%'},true,true,{'room':'1%','milk':'86%','espresso':'13%'},'Latte'))
coreDrinks.espresso.push(new Espresso('Cinnamon Dolce Latte',['steam','que','pump syrup','pour'],{'whipped cream':'6%','foam':'11%','steamed milk':'63%','espresso':'13%','syrup':'7%'},true,true,{'whipped cream':'6%','milk':'74%','espresso':'13%','syrup':'7%'},'Cinnamon Dolce Latte'))
coreDrinks.espresso.push(new Espresso('Cappuccino',['steam','que','pump syrup','pour'],{'room':'1%','foam':'71%','steamed milk':'15%','espresso':'13%'},true,false,{},'Cappuccino'))
coreDrinks.espresso.push(new Espresso('Flat White',['steam','que','pump syrup','pour'],{'room':'1%','foam':'15%','steamed milk':'74%','espresso':'10%'},true,true,{'milk':'90%','espresso':'10%'},'Flat White'))
coreDrinks.espresso.push(new Espresso('Honey Almondmilk Flat White',['steam','que','pump syrup','pour'],{'room':'1%','foam':'15%','almond milk':'67%','espresso':'10%','syrup':'7%'},true,true,{'almond milk':'83%','espresso':'10%','syrup':'7%'},'Hny Alm Flat White'))
coreDrinks.espresso.push(new Espresso('Caramel Macchiatto',['steam milk','que shots','pump syrup','pour milk'],{'caramel drizzle':'3%','foam':'10%','espresso':'13%','steamed milk':'67%','syrup':'7%'},true,true,{'caramel drizzle':'3%','espresso':'13%','milk':'77%','syrup':'7%'},'Caramel Macchiato'))
coreDrinks.espresso.push(new Espresso('White Mocha',['steam milk','que shots','pump syrup','pour milk','add whip'],{'whipped cream':'6%','foam':'11%','steamed milk':'63%','espresso':'13%','syrup':'7%'},true,true,{'whipped cream':'6%','milk':'74%','espresso':'13%','syrup':'7%'},'White Mocha'))
coreDrinks.espresso.push(new Espresso('Mocha',['steam milk','que shots','pump syrup','pour milk','add whip'],{'whipped cream':'6%','foam':'11%','steamed milk':'63%','espresso':'13%','syrup':'7%'},true,true,{'whipped cream':'6%','milk':'74%','espresso':'13%','syrup':'7%'},'Mocha'))
class Frappucino{
    constructor(Name,Steps,Build,Bool,Topping,Layered,ABBR){
        this.name = Name
        this.instructions = Steps
        this.build = Build
        this.whippedCream = Bool
        this.topping = Topping
        this.layered = Layered
        this.abbr =ABBR
        
    }
}

coreDrinks.blended.push(new Frappucino('Coffee Frappucino',['pump coffee','pour milk','add to blender','add ice','add base','blend','pour into cup'],['milk','frapp roast','ice'],false,'',false,"Coffee Frapp"))
coreDrinks.blended.push(new Frappucino('Mocha Frappucino',['pump coffee','pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],['milk','frapp roast','mocha syrup','ice'],true,'',false,"Mocha Frapp"))
coreDrinks.blended.push(new Frappucino('Caramel Frappucino',['pump coffee','pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],['milk','frapp roast','caramel syrup','ice'],true,'caramel drizzle',false,"Caramel Frapp"))
coreDrinks.blended.push(new Frappucino('Java Chip Frappucino',['pump coffee','pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],['milk','frapp roast','mocha syrup','java chips','ice'],true,'mocha drizzle',false,"Java Chip Frapp"))
coreDrinks.blended.push(new Frappucino('Cafè Vanilla Frappucino',['pump coffee','pour milk','add to blender','add ice','add base','blend','pour into cup'],['milk','frapp roast','vanilla bean','ice'],true,'',false,"Cafè Vanilla Frapp"))
coreDrinks.blended.push(new Frappucino('Espresso Frappucino',['pump coffee','pour milk','add to blender','add ice','add base','blend','pour into cup'],['milk','frapp roast','espresso','ice'],false,'',false,"Espresso Frapp"))
coreDrinks.blended.push(new Frappucino('White Mocha Frappucino',['pump coffee','pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],['milk','frapp roast','white mocha syrup','ice'],true,'',false,"White Mocha Frapp"))
coreDrinks.blended.push(new Frappucino('Caramel Ribbon Crunch Frappucino',['pump coffee','pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],['milk','frapp roast','dark caramel','ice'],true,'caramel drizzle,caramel crunch',['dark caramel','whipped cream'],"Caramel Crunch Frapp"))
coreDrinks.blended.push(new Frappucino('Mocha Cookie Crumble Frappucino',['pump coffee','pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],['milk','frapp roast','mocha syrup','java chips','ice'],true,'mocha drizzle,cookie crumble',['cookie crumble','whipped cream'],"Mocha Cookie Crmbl Frapp"))
coreDrinks.blended.push(new Frappucino('Chai Crème Frappucino',['pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],['chai','milk','ice'],true,'cinnamon',false,"Chai Crm Frapp"))
coreDrinks.blended.push(new Frappucino('Double Chocolatey Chip Crème Frappucino',['pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],['milk','mocha syrup','java chips','ice'],true,'mocha drizzle',false,"Dbl Choc Crm Frapp"))
coreDrinks.blended.push(new Frappucino('Vanilla Bean Crème Frappucino',['pour milk','add to blender','add ice','add base','blend','pour into cup'],['milk','vanilla bean','ice'],true,'',false,"Vanilla Bean Crm Frapp"))
coreDrinks.blended.push(new Frappucino('White Mocha Crème Frappucino',['pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],['milk','white mocha syrup','ice'],true,'',false,"White Mocha Crm Frapp"))
coreDrinks.blended.push(new Frappucino('Matcha Crème Frappucino',['pour milk','add to blender','add flavor','add ice','add base','blend','pour into cup'],['milk','matcha','ice'],true,'',false,"Matcha Creme Frapp"))
coreDrinks.blended.push(new Frappucino('Syrup Crème Frappucino',['pour milk','add to blender','add ice','add base','blend','pour into cup'],['milk','ice'],true,'',false,"Syrup Crm Frapp"))
coreDrinks.blended.push(new Frappucino('Strawberry Crème Frappucino',['pour strawberry puree to bottom ridge','pour milk','add to blender','add ice','add base','blend','pour into cup'],['milk','strawberry puree','ice'],true,'',false,"Strawberry Crm Frapp"))
coreDrinks.blended.push(new Frappucino('Caramel Ribbon Crunch Crème Frappucino',['pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],['milk','dark caramel','ice'],true,'caramel drizzle,caramel crunch',['dark caramel','whipped cream'],"Crml Ribbon Crm Frapp"))
coreDrinks.blended.push(new Frappucino('Chocolate Cookie Crumble Crème Frappucino',['pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],['milk','mocha syrup','java chips','ice'],true,'mocha drizzle,cookie crumble',['cookie crumble','whipped cream'],"Choc Cookie Crm Frapp"))
coreDrinks.blended.push(new Frappucino('Blended Strawberry Lemonade',['pour milk','add to blender','add ice','add base','blend','pour into cup'],['lemonade','strawberry puree','ice'],false,'',false))




app.post('/order',(req,res)=>{
    console.log(req.body)
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})
app.get('/roasts',(req,res)=>{
    res.sendFile(__dirname+'/public/roasts.html')
})
app.get('/coredrinks',(req,res)=>{
    res.sendFile(__dirname+'/public/coreDrinks.html')
})
app.get('/menu',(req,res)=>{
    res.sendFile(__dirname+'/public/menu.html')
})
app.get('/coredrinks/',(req,res)=>{
    res.sendFile(__dirname+'/public/coreDrinks.html')
})
app.get('/api/coreDrinks'.toLowerCase(),(req,res)=>{
    res.json(coreDrinks)
})
app.get('/api/customizations'.toLowerCase(),(req,res)=>{
    res.json(modifiers)
})
app.get('/api/roasts'.toLowerCase(),(req,res)=>{
    res.json(roasts)
})

app.listen(process.env.PORT || PORT)