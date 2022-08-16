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
app.use(express.json())






const modifiers={
    shotsMenu:[],
    syrup:[],
    milk:[],
    custom:[]
}
class Syrup{
    constructor(ABB,TYPE){
        this.type=TYPE
        this.abbr=ABB
    }
}
modifiers.shotsMenu={'Iced':'iced','Blonde':'coffeeType','Decaf':'coffeeType','1/2 Decaf':'coffeeType','2/3 Decaf':'coffeeType',
                    '1/3 Decaf':'coffeeType','Single':'shotNumber','Double':'shotNumber','Triple':'shotNumber',
                    'Quad':'shotNumber','More shots':'shotNumber','Affogato Shot':'shotNumber','Frappucino Roast':'pumps','Kids':"size",'Updosed':'coffeeType',
                    'Long Shot':'coffeeType','Ristretto':'coffeeType','Short':'size','Tall':'size','Grande':'size','Venti':'size','Trenta':'size'}
modifiers.syrup={
    'No':new Syrup('No','button'),'Sub':new Syrup('sub','button'),'Pumps':new Syrup('Pumps','button'),'Extra':new Syrup('XTR','button'),'Light':new Syrup('Lt','button'),
    'Caramel Syrup':new Syrup('CR','syrup'),'Cinnamon Dolce Syrup':new Syrup('CD','syrup'),
    'Hazelnut Syrup':new Syrup('H','syrup'),'Toffee Nut Syrup':new Syrup('TN','syrup'),'Vanilla Syrup':new Syrup('V','syrup'),'Classic Syrup':new Syrup('C','syrup'),'Peppermint Syrup':new Syrup('P','syrup'),
    'Raspberry Syrup':new Syrup('R','syrup'),'Toasted Vanilla Syrup':new Syrup('TV','syrup'),'Brown Sugar Syrup':new Syrup('BS','syrup'),'Chai':new Syrup('CH','syrup'),'Honey Blend':new Syrup('HB','syrup'),
    'Liquid Cane Sugar':new Syrup('LC','syrup'), 'Sugar Free Vanilla Syrup':new Syrup('SFV','syrup'),'Mocha Sauce':new Syrup('M','syrup'),'White Mocha Sauce':new Syrup('WC','syrup'), 'Caramel Sauce':new Syrup('CS','syrup'),
    'Dark Caramel Sauce Sauce':new Syrup('DC','syrup')
}


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

class Brewed{
    constructor(Name,Build,IcedBuild, ABBR,Hot,Iced){
        this.name = Name
        this.menuBuildHot =Build
        this.menuBuildIced = IcedBuild
        this.abbr = ABBR
        this.hot = Hot
        this.iced =Iced
    }
}
class DrinkBuild{
    constructor(IcedBool,DecafAmount,Shots,Pumps,Syrup,Milk,Custom,ABBR,SIZE){
        this.iced=IcedBool
        this.decaf=DecafAmount
        this.shots=Shots
        this.pumps= [Pumps]
        this.syrup=[Syrup]
        this.milk=Milk
        this.custom=Custom
        this.abbr=ABBR
        
        if(SIZE){
            this.size=SIZE
        }else this.size = 'Gr'
    }
}



coreDrinks.brewed.push(new Brewed("Pour Over Pike Place Roast",new DrinkBuild(false,[''],'','','','','','POPP'),null,'Pour Over Pike',true,false))
coreDrinks.brewed.push(new Brewed("Pour Over Dark Roast",new DrinkBuild(false,[''],'','','','','','PODR'),null,'Pour Over Dark',true,false))
coreDrinks.brewed.push(new Brewed("Pour Over Blonde Roast",new DrinkBuild(false,[''],'','','','','','POBR'),null,'Pour Over Blonde',true,false))
coreDrinks.brewed.push(new Brewed("Pour Over Decaf Pike Place Reserve",new DrinkBuild(false,[''],'','','','','','PODPP'),null,'Decaf Pour Over',true,false))
coreDrinks.brewed.push(new Brewed("Iced Coffee",null,new DrinkBuild(true,[''],'','','','','','IC'),'Iced Coffee',false,true))
coreDrinks.brewed.push(new Brewed("Iced Coffee w/Milk",null,new DrinkBuild(true,[''],'','','','%','','IC/M'),'Iced Coffee w/ Milk',false,true))
coreDrinks.brewed.push(new Brewed("Decaf Iced Coffee",null,new DrinkBuild(true,['D'],'','','','','','DIC'),'Decaf Iced Coffee',false,true))
coreDrinks.brewed.push(new Brewed("Decaf Iced Coffee w/Milk",null,new DrinkBuild(true,['D'],'','','','%','','DIC/M'),'Decaf Iced Coffee w/Milk',false,true))
coreDrinks.brewed.push(new Brewed("Iced Coffee Refill",null,new DrinkBuild(true,[''],'','','','','','ICR'),'Iced Coffee Refill',false,true))
coreDrinks.brewed.push(new Brewed("Cold Brew",null,new DrinkBuild(true,[''],'','','','','','CB'),'Cold Brew',false,true))
coreDrinks.brewed.push(new Brewed("Cold Brew w/Milk",null,new DrinkBuild(true,[''],'','','','%','','CB/M'),'Cold Brew w/Milk',false,true))
coreDrinks.brewed.push(new Brewed("Cold Brew w/Cold Foam",null,new DrinkBuild(true,[''],'','','','','CF','CB'),'Cold Foam Cold Brew',false,true))
coreDrinks.brewed.push(new Brewed("Cold Brew Refill",null,new DrinkBuild(true,[''],'','','','','','CBR'),'Cold Brew Refill',false,true))
coreDrinks.brewed.push(new Brewed("Vanilla Sweet Cream Cold Brew",null,new DrinkBuild(true,[''],'',[1,2,3,4],'V','','VSCF','VSCB'),'Van Sweet Crm Cold Brew',false,true))
coreDrinks.brewed.push(new Brewed("Salted Caramel Cream Cold Brew",null,new DrinkBuild(true,[''],'',[1,2,3,4],'V','','SCCF','SCCB'),'Slted Crml Cold Brew',false,true))
coreDrinks.brewed.push(new Brewed("Chocolate Cream Cold Brew",null,new DrinkBuild(true,[''],'',[1,2,3,4],'V','','CCCF','CCCB'),'Choc Crm Cold Brew',false,true))
coreDrinks.brewed.push(new Brewed("Cafe Misto",new DrinkBuild(false,[''],'','','','%','F','CFM'),null,'Cafè Misto',true,false))
coreDrinks.brewed.push(new Brewed("Pike Place Roast",new DrinkBuild(false,[''],'','','','','','PPR'),null,'Pike Place',true,false))
coreDrinks.brewed.push(new Brewed("Dark Roast",new DrinkBuild(false,[''],'','','','','','DRC'),null,'Dark Roast',true,false))
coreDrinks.brewed.push(new Brewed("Blonde Roast",new DrinkBuild(false,[''],'','','','','','BRC'),null,'Blonde Roast',true,false))
coreDrinks.brewed.push(new Brewed("Decaf Pike Place Roast",new DrinkBuild(false,['D'],'','','','','','DPPR'),null,'Decaf Pike',true,false))
coreDrinks.brewed.push(new Brewed("Hot Coffee Refill",new DrinkBuild(false,[''],'','','','','','PPRR'),null,'Hot Coffee Refill',true,false))
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

coreDrinks.espresso.push(new Espresso('Americano',['que','add water','pour'],{'room':'1%','water':'72%','espresso':'27%'},true,true,
                                    {'room':'1%','water':'72%','espresso':'27%'},'Americano',
                                    new DrinkBuild(false,[''],[1,2,3,4,null],[2,3,4,5,null],'','','H2O','A'),
                                    new DrinkBuild(true,[''],[null,2,3,4,null],[null,3,4,6,null],'','','H2O','A')))
coreDrinks.espresso.push(new Espresso('Espresso',['que','pour'],{'room':'87%','espresso':'13%'},true,true,{'room':'87%','espresso':'13%'},'Espresso'))
coreDrinks.espresso.push(new Espresso('Espresso Macchiatto',['que','pour'],{'room':'57%','foam':'30%','espresso':'13%'},true,true,{'room':'57%','espresso':'13%','milk':'30%'},'Espresso Machiatto'))
coreDrinks.espresso.push(new Espresso('Espresso Con Panna',['que','pour'],{'room':'77%','whipped cream':'10%','espresso':'13%'},true,true,{'whipped cream':'10%','room':'74%','espresso':'13%'},'Espresso Con Panna'))
coreDrinks.espresso.push(new Espresso('Iced Shaken Espresso',['que shots','pump syrup into shaker',
                                    'add ice to shaker','pour shots into shakes','shake ten times','pour into cup','pour milk to 1/4" below top'],
                                    {'milk':'13%','espresso foam':'22%','espresso':'58%','syrup':'7%'},false,true,{},'Iced Shaken Esp',
                                    null,
                                    new DrinkBuild(true,[''],[null,2,3,4,null],[null,3,4,6,null],'C','%','','A')))
coreDrinks.espresso.push(new Espresso('Brown Sugar Oat Shaken Espresso',['que shots','pump syrup into shaker','add ice to shaker','pour shots into shakes','shake ten times','pour into cup','pour milk to 1/4" below top'],
                                    {'oatmilk':'13%','espresso foam':'22%','espresso':'58%','syrup':'7%'},false,true,{},'Brwn Sug Oat Shkn Espr',
                                    null,
                                    new DrinkBuild(true,['B'],[null,2,3,4,null],[null,3,4,6,null],'BS','O','CNP','BOSE')))
coreDrinks.espresso.push(new Espresso('Chocolate Almondmilk Shaken Espresso',['que shots','scoop powder into shaker','add ice to shaker','pour shots into shakes','shake ten times','pour into cup','pour milk to 1/4" below top'],
                                    {'almondmilk':'13%','espresso foam':'22%','espresso':'58%','chocolate powder':'7%'},false,true,{},'Choc Alm Shkn Espr',
                                    null,
                                    new DrinkBuild(true,['B'],[null,2,3,4,null],[null,3,4,6,null],'BS','O','MP','CASE')))
coreDrinks.espresso.push(new Espresso('Toasted Vanilla Oat Shaken Espresso',['que shots','pump syrup into shaker','add ice to shaker','pour shots into shakes','shake ten times','pour into cup','pour milk to 1/4" below top'],{'oatmilk':'13%','espresso foam':'22%','espresso':'58%','syrup':'7%'},false,true,{},'Tstd Oat Shkn Espr',
                                    null,
                                    new DrinkBuild(true,['B'],[null,2,3,4,null],[null,3,4,6,null],'TV','O','','TOSE')))
coreDrinks.espresso.push(new Espresso('Latte',['steam','que','pump syrup','pour'],{'room':'1%','foam':'15%','steamed milk':'71%','espresso':'13%'},true,true,{'room':'1%','milk':'86%','espresso':'13%'},'Latte',
                                    new DrinkBuild(false,[''],[1,1,2,2,null],[2,3,4,5,null],'','%','F','L'),
                                    new DrinkBuild(true,[''],[null,1,2,3,null],[null,3,4,6,null],'','%','','L')))
coreDrinks.espresso.push(new Espresso('Cinnamon Dolce Latte',['steam','que','pump syrup','pour'],{'whipped cream':'6%','foam':'11%','steamed milk':'63%','espresso':'13%','syrup':'7%'},true,true,{'whipped cream':'6%','milk':'74%','espresso':'13%','syrup':'7%'},'Cinnamon Dolce Latte',
                                    new DrinkBuild(false,[''],[1,1,2,2,null],[2,3,4,5,null],'CD','%','F','CDL'),
                                    new DrinkBuild(true,[''],[null,1,2,3,null],[null,3,4,6,null],'CD','%','','CDL')))
coreDrinks.espresso.push(new Espresso('Cappuccino',['steam','que','pump syrup','pour'],{'room':'1%','foam':'71%','steamed milk':'15%','espresso':'13%'},true,false,{},'Cappuccino',
                                    new DrinkBuild(false,[''],[1,1,2,2,null],[2,3,4,5,null],'','%','F','C'),
                                    null))
coreDrinks.espresso.push(new Espresso('Flat White',['steam','que','pump syrup','pour'],{'room':'1%','foam':'15%','steamed milk':'74%','espresso':'10%'},true,true,{'milk':'90%','espresso':'10%'},'Flat White',
                                    new DrinkBuild(false,['R'],[2,2,3,4,null],[2,3,4,5,null],'','W','F','FW'),
                                    new DrinkBuild(true,['R'],[null,2,3,4,null],[null,3,4,6,null],'','W','','FW')))
coreDrinks.espresso.push(new Espresso('Honey Almondmilk Flat White',['steam','que','pump syrup','pour'],{'room':'1%','foam':'15%','almond milk':'67%','espresso':'10%','syrup':'7%'},true,true,{'almond milk':'83%','espresso':'10%','syrup':'7%'},'Hny Alm Flat White',
                                    new DrinkBuild(false,['R', 'B'],[2,2,3,4,null],[2,3,4,5,null],'HB','A','F','HAFW'),
                                    new DrinkBuild(true,['R','B'],[null,2,3,4,null],[null,3,4,6,null],'HB','A','','HAFW')))
coreDrinks.espresso.push(new Espresso('Caramel Macchiatto',['steam milk','que shots','pump syrup','pour milk'],{'caramel drizzle':'3%','foam':'10%','espresso':'13%','steamed milk':'67%','syrup':'7%'},true,true,{'caramel drizzle':'3%','espresso':'13%','milk':'77%','syrup':'7%'},'Caramel Macchiato',
                                    new DrinkBuild(false,[''],[1,1,2,2,null],[1,2,3,4,null],'V','%',['F','CD'],'CM'),
                                    new DrinkBuild(true,[''],[null,1,2,3,null],[null,2,3,5,null],'V','%','CD','CM')))
coreDrinks.espresso.push(new Espresso('White Mocha',['steam milk','que shots','pump syrup','pour milk','add whip'],{'whipped cream':'6%','foam':'11%','steamed milk':'63%','espresso':'13%','syrup':'7%'},true,true,{'whipped cream':'6%','milk':'74%','espresso':'13%','syrup':'7%'},'White Mocha',
                                    new DrinkBuild(false,[''],[1,1,2,2,null],[2,3,4,5,null],'WM','%',['F','WC'],'WCM'),
                                    new DrinkBuild(true,[''],[null,1,2,3,null],[null,3,4,6,null],'WM','%','WC','WCM')))
coreDrinks.espresso.push(new Espresso('Mocha',['steam milk','que shots','pump syrup','pour milk','add whip'],{'whipped cream':'6%','foam':'11%','steamed milk':'63%','espresso':'13%','syrup':'7%'},true,true,{'whipped cream':'6%','milk':'74%','espresso':'13%','syrup':'7%'},'Mocha',
                                    new DrinkBuild(false,[''],[1,1,2,2,null],[2,3,4,5,null],'M','%',['F','WC'],'M'),
                                    new DrinkBuild(true,[''],[null,1,2,3,null],[null,3,4,6,null],'M','%','WC','M')))
class Frappucino{
    constructor(Name,Steps,Build,Bool,Topping,Layered,ABBR,Hot,Iced,MBI,MBH){
        this.name = Name
        this.instructions = Steps
        this.build = Build
        this.whippedCream = Bool
        this.topping = Topping
        this.layered = Layered
        this.abbr =ABBR
        this.hot=Hot
        //this.iced=Iced
        this.menuBuildHot=MBH
        this.menuBuildIced=MBI
    }
}

coreDrinks.blended.push(new Frappucino('Coffee Frappucino',['pump coffee','pour milk','add to blender','add ice','add base','blend','pour into cup'],['milk','frapp roast','ice'],false,'',false,"Coffee Frapp",false,true, new DrinkBuild(true,'',[null,'','','',null],[null,2,3,4,null],'','W','FR','CF'),null))
coreDrinks.blended.push(new Frappucino('Mocha Frappucino',['pump coffee','pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],['milk','frapp roast','mocha syrup','ice'],true,'',false,"Mocha Frapp",false,true, new DrinkBuild(true,'',[null,'','','',null],[null,2,3,4,null],'M','W',['FR','WC'],'MF'),null))
coreDrinks.blended.push(new Frappucino('Caramel Frappucino',['pump coffee','pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],['milk','frapp roast','caramel syrup','ice'],true,'caramel drizzle',false,"Caramel Frapp",false,true, new DrinkBuild(true,'',[null,'','','',null],[null,2,3,4,null],'C','W',['FR','CD','WC'],'CRF'),null))
coreDrinks.blended.push(new Frappucino('Java Chip Frappucino',['pump coffee','pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],['milk','frapp roast','mocha syrup','java chips','ice'],true,'mocha drizzle',false,"Java Chip Frapp",false,true, new DrinkBuild(true,'',[null,'','','',null],[null,2,3,4,null],'M','W',['JC','FR','MDR','WC'],'JCF'),null))
coreDrinks.blended.push(new Frappucino('Cafè Vanilla Frappucino',['pump coffee','pour milk','add to blender','add ice','add base','blend','pour into cup'],['milk','frapp roast','vanilla bean','ice'],true,'',false,"Cafè Vanilla Frapp",false,true, new DrinkBuild(true,'',[null,'','','',null],[null,2,3,4,null],'','W',['FR','WC','VB'],'VBF'),null))
coreDrinks.blended.push(new Frappucino('Espresso Frappucino',['pump coffee','pour milk','add to blender','add ice','add base','blend','pour into cup'],['milk','frapp roast','espresso','ice'],false,'',false,"Espresso Frapp",false,true, new DrinkBuild(true,'',[null,1,1,1,null],[null,2,3,4,null],'','W','FR','EF'),null))
coreDrinks.blended.push(new Frappucino('White Mocha Frappucino',['pump coffee','pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],['milk','frapp roast','white mocha syrup','ice'],true,'',false,"White Mocha Frapp",false,true, new DrinkBuild(true,'',[null,'','','',null],[null,2,3,4,null],'WCM','W',['FR','WC'],'WCMF'),null))
coreDrinks.blended.push(new Frappucino('Caramel Ribbon Crunch Frappucino',['pump coffee','pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],
    ['milk','frapp roast','dark caramel','ice'],true,'caramel drizzle,caramel crunch',['dark caramel','whipped cream'],"Caramel Crunch Frapp",false,true,
    new DrinkBuild(true,'',[null,'','','',null],[null,2,3,4,null],'DC','W',['FR','WC','CRT'],'CRCF'),null))
coreDrinks.blended.push(new Frappucino('Mocha Cookie Crumble Frappucino',['pump coffee','pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],
    ['milk','frapp roast','mocha syrup','java chips','ice'],true,'mocha drizzle,cookie crumble',['cookie crumble','whipped cream'],
    "Mocha Cookie Crmbl Frapp",false,true, new DrinkBuild(true,'',[null,'','','',null],[null,2,3,4,null],'M','W',['FR','JC','WC','CCT'],'MCCF'),null))
coreDrinks.blended.push(new Frappucino('Chai Crème Frappucino',
    ['pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],
    ['chai','milk','ice'],true,'cinnamon',false,"Chai Crm Frapp",false,true, 
    new DrinkBuild(true,'',[null,'','','',null],[null,2,3,4,null],'CH','W',['CP'],'CF'),null))
coreDrinks.blended.push(new Frappucino('Double Chocolatey Chip Crème Frappucino',
    ['pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],
    ['milk','mocha syrup','java chips','ice'],
    true,'mocha drizzle',false,"Dbl Choc Crm Frapp",false,true, 
    new DrinkBuild(true,'',[null,'','','',null],[null,2,3,4,null],'M','W',['WC','MDR'],'DCCF'),null))
coreDrinks.blended.push(new Frappucino('Vanilla Bean Crème Frappucino',['pour milk','add to blender','add ice','add base','blend','pour into cup'],['milk','vanilla bean','ice'],true,'',false,"Vanilla Bean Crm Frapp",false,true,
     new DrinkBuild(true,'',[null,'','','',null],[null,2,3,4,null],'','W',['VB','WC'],'VBCF'),null))
coreDrinks.blended.push(new Frappucino('White Mocha Crème Frappucino',['pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],
    ['milk','white mocha syrup','ice'],true,'',false,"White Mocha Crm Frapp",false,true,
     new DrinkBuild(true,'',[null,'','','',null],[null,2,3,4,null],'','W',['WC'],'WMCF'),null))
coreDrinks.blended.push(new Frappucino('Matcha Crème Frappucino',['pour milk','add to blender','add flavor','add ice','add base','blend','pour into cup'],['milk','matcha','ice'],
    true,'',false,"Matcha Creme Frapp",false,true, 
    new DrinkBuild(true,'',[null,'','','',null],[null,2,3,4,null],'','W',['WC','M'],'MTCF'),null))
coreDrinks.blended.push(new Frappucino('Syrup Crème Frappucino',['pour milk','add to blender','add ice','add base','blend','pour into cup'],['milk','ice'],true,'',false,"Syrup Crm Frapp",false,true, 
new DrinkBuild(true,'',[null,'','','',null],[null,2,3,4,null],'','W',['WC'],'CRMF'),null))
coreDrinks.blended.push(new Frappucino('Strawberry Crème Frappucino',['pour strawberry puree to bottom ridge','pour milk','add to blender','add ice','add base','blend','pour into cup'],['milk','strawberry puree','ice'],true,'',false,"Strawberry Crm Frapp",false,true, 
new DrinkBuild(true,'',[null,'','','',null],[null,2,3,4,null],'','W',['WC','SP'],'SCF'),null))
coreDrinks.blended.push(new Frappucino('Caramel Ribbon Crunch Crème Frappucino',['pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],['milk','dark caramel','ice'],true,'caramel drizzle,caramel crunch',['dark caramel','whipped cream'],"Crml Ribbon Crm Frapp",false,true, 
new DrinkBuild(true,'',[null,'','','',null],[null,2,3,4,null],'DC','W',['WC','CCT'],'CRCF'),null))
coreDrinks.blended.push(new Frappucino('Chocolate Cookie Crumble Crème Frappucino',['pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],['milk','mocha syrup','java chips','ice'],true,'mocha drizzle,cookie crumble',['cookie crumble','whipped cream'],"Choc Cookie Crm Frapp",false,true, 
new DrinkBuild(true,'',[null,'','','',null],[null,2,3,4,null],'M','W',['WC','MDR','JC'],'CCRF'),null))
coreDrinks.blended.push(new Frappucino('Blended Strawberry Lemonade',['pour milk','add to blender','add ice','add base','blend','pour into cup'],['lemonade','strawberry puree','ice'],false,'',false,'Str Crm Frapp',false,true, 
new DrinkBuild(true,'',[null,'','','',null],[null,2,3,4,null],'','',['LE','SP'],'CRMF'),null))

class Tea{
    constructor(Name,Build,IcedBuild, ABBR,Hot,Iced){
        this.name = Name
        this.menuBuildHot =Build
        this.menuBuildIced = IcedBuild
        this.abbr = ABBR
        this.hot = Hot
        this.iced =Iced
    }
}
coreDrinks.tea.push(new Tea("Classic Chai Tea Latte",new DrinkBuild(false,'',['','','','',null],[2,3,4,5,null],'','%','F','CTL'),
                                                    new DrinkBuild(true,'',[null,'','','',null],[null,3,4,6,null],'','%','','CTL'),
                                                    'Chai Tea Latte',true,true))
coreDrinks.tea.push(new Tea("Matcha Green Tea Latte",new DrinkBuild(false,'',['','','','',null],[2,3,4,5,null],'','%',['M','F'],'MTL'),
                                                    new DrinkBuild(true,'',[null,'','','',null],[null,3,4,6,null],'','%','M','MTL'),
                                                    'Matcha Tea Latte',true,true))
coreDrinks.tea.push(new Tea("Royal English Breakfast Tea Latte",new DrinkBuild(false,'',['','','','',null],[2,3,4,5,null],'LC','%',['TB','F'],'MTL'),
                                                    new DrinkBuild(true,'',[null,'','','',null],[null,3,4,6,null],'LC','%','TB','MTL'),
                                                    'Royal EB Latte',true,true))
coreDrinks.tea.push(new Tea("London Fog Tea Latte",new DrinkBuild(false,'',['','','','',null],[2,3,4,5,null],'V','%',['TB','F'],'LFL'),
                                                    new DrinkBuild(true,'',[null,'','','',null],[null,3,4,6,null],'V','%','TB','LFL'),
                                                    'London Fog',true,true))        
coreDrinks.tea.push(new Tea("Custom Tea Latte",new DrinkBuild(false,'',['','','','',null],[2,3,4,5,null],'','%',['TB','F'],'CTL'),
                                                    new DrinkBuild(true,'',[null,'','','',null],[null,3,4,6,null],'','%','TB','CTL'),
                                                    'Custom Tea',true,true))                                                                                                     
coreDrinks.tea.push(new Tea("Black Iced Tea",null,
                                            new DrinkBuild(true,'',[null,'','','',''],[null,3,4,6,7],'','',['BT',"H2O"],'BT'),
                                            'Black Tea',false,true))
coreDrinks.tea.push(new Tea("Green Iced Tea",null,
                                            new DrinkBuild(true,'',[null,'','','',''],[null,3,4,6,7],'','',['GT',"H2O"],'GT'),
                                            'Green Tea',false,true))
coreDrinks.tea.push(new Tea("Peach Green Iced Tea",null,
                                            new DrinkBuild(true,'',[null,'','','',''],[null,3,4,6,7],'','',['PB','GT',"H2O"],'PGT'),
                                            'Peach Green Tea',false,true))                                            
coreDrinks.tea.push(new Tea("Passion Tango Iced Tea",null,
                                            new DrinkBuild(true,'',[null,'','','',''],[null,3,4,6,7],'','',['PTT',"H2O"],'PTT'),
                                            'Passion Tea',false,true))
coreDrinks.tea.push(new Tea("Custom Iced Tea",null,
                                            new DrinkBuild(true,'',[null,'','','',''],[null,3,4,6,7],'','',['',"H2O"],'CIT'),
                                            'Custom Tea',false,true))    

coreDrinks.tea.push(new Tea("Black Tea Lemonade",null,
                                            new DrinkBuild(true,'',[null,'','','',''],[null,3,4,6,7],'','',['BT',"L"],'BTL'),
                                            'Black Tea Lemonade',false,true))
coreDrinks.tea.push(new Tea("Green Tea Lemonade",null,
                                            new DrinkBuild(true,'',[null,'','','',''],[null,3,4,6,7],'','',['GT',"L"],'GTL'),
                                            'Green Tea Lemonade',false,true))
coreDrinks.tea.push(new Tea("Passion Tango Tea Lemonade",null,
                                            new DrinkBuild(true,'',[null,'','','',''],[null,3,4,6,7],'','',['PTT',"L"],'PTL'),
                                            'Passion Tea Lemonade',false,true))
coreDrinks.tea.push(new Tea("Peach Green Tea Lemonade",null,
                                            new DrinkBuild(true,'',[null,'','','',''],[null,3,4,6,7],'','',['PB','GT',"L"],'PGTL'),
                                            'Peach Green Tea Lem',false,true))                                              
coreDrinks.tea.push(new Tea("Custom Tea Lemonade",null,
                                            new DrinkBuild(true,'',[null,'','','',''],[null,3,4,6,7],'','',['',"L"],'CTL'),
                                            'Custom Tea Lemonade',false,true))    
coreDrinks.tea.push(new Tea("Royal English Breakfast Tea",new DrinkBuild(false,'',[null,'','','',''],[null,3,4,6,7],'','',['TB'],'REB'),null,
                                            'Royal EB Tea',true,false))      
coreDrinks.tea.push(new Tea("Earl Grey Tea",new DrinkBuild(false,'',[null,'','','',''],[null,3,4,6,7],'','',['TB'],'EG'),null,
                                            'Earl Grey',true,false))             
coreDrinks.tea.push(new Tea("Chai Tea",new DrinkBuild(false,'',[null,'','','',''],[null,3,4,6,7],'','',['TB'],'ChT'),null,
                                            'Chai',true,false))    

coreDrinks.tea.push(new Tea("Emperor's Cloud Tea",new DrinkBuild(false,'',['','','','',null],[2,3,4,6,null],'','',['TB'],'ECT'),null,
                                            'Emp Cld Tea',true,false))      
coreDrinks.tea.push(new Tea("Jade Citrus Mint Tea",new DrinkBuild(false,'',['','','','',null],[2,3,4,6,null],'','',['TB'],'JCMT'),null,
                                            'Jade Citrus',true,false))             
coreDrinks.tea.push(new Tea("Mint Majesty Tea",new DrinkBuild(false,'',['','','','',null],[2,3,4,6,null],'','',['TB'],'MMT'),null,
                                            'Mint Majesty',true,false))        
coreDrinks.tea.push(new Tea("Peach Tranquility Tea",new DrinkBuild(false,'',['','','','',null],[2,3,4,6,null],'','',['TB'],'PTT'),null,
                                            'Peach Tranquility',true,false))  
coreDrinks.tea.push(new Tea("Honey Citrus Mint Tea",new DrinkBuild(false,'',['','','','',null],[1,1,2,2,null],'HB','',['TB','L'],'HCMT'),null,
                                            'Hny Citrus Mnt',true,false))

class Other{
    constructor(Name,Build,IcedBuild, ABBR,Hot,Iced){
        this.name = Name
        this.menuBuildHot =Build
        this.menuBuildIced = IcedBuild
        this.abbr = ABBR
        this.hot = Hot
        this.iced =Iced
    }
}
coreDrinks.other.push(new Other('Hot Chocolate',new DrinkBuild(false,'',['','','','',null],[2,3,4,5,null],'M','%',['WC'],'HC'),null,'Hot Choc',true, false))
coreDrinks.other.push(new Other('White Hot Chocolate',new DrinkBuild(false,'',['','','','',null],[2,3,4,5],null,'WCM','%',['WC'],'WHC'),null,'White Hot Choc',true, false))
coreDrinks.other.push(new Other('Cold Milk',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','%',[''],'CLDM'),'Cold Milk',false, true))
coreDrinks.other.push(new Other('Steamed Milk',new DrinkBuild(false,'',['','','','',null],[2,3,4,5,null],'','%',[''],'STMM'),null,'Steamed Milk',true, false))
coreDrinks.other.push(new Other('Syrup Crème',new DrinkBuild(false,'',['','','','',null],[2,3,4,5,null],'','%',['WC'],'SC'),null,'Sryup Crm',true, false))
coreDrinks.other.push(new Other('Vanilla Crème',new DrinkBuild(false,'',['','','','',null],[2,3,4,5,null],'V','%',['WC'],'VC'),null,'Vanilla Crm',true, false))
coreDrinks.other.push(new Other('Cinnamon Dolce Crème',new DrinkBuild(false,'',['','','','',null],[2,3,4,5,null],'CD','%',['WC','CDT'],'CDC'),null,'Cinn Dol Crm',true, false))
coreDrinks.other.push(new Other('Lemonade',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','',['LM'],'LEM'),'Lemonade',false, true))
coreDrinks.other.push(new Other('Matcha Lemonade',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','',['M','LM'],'LEM'),'Mtcha Lem',false, true))
coreDrinks.other.push(new Other('Cold Apple Juice',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','',['AJ'],'CJ'),'Cold Juice',false, true))
coreDrinks.other.push(new Other('Steamed Apple Juice',new DrinkBuild(false,'',['','','','',null],[2,3,4,5,null],'','',['AJ'],'SAJ'),null,'Steamed Apple',true, false))
coreDrinks.other.push(new Other('Caramel Apple Spice',new DrinkBuild(false,'',['','','','',null],[2,3,4,5,null],'CD','',['AJ','WC','CD'],'CAS'),null,'Crml App Spice',true, false))
coreDrinks.other.push(new Other('Strawberry Acai Refreshers',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','',['SB','H2O','SP'],'SAR'),'Straw Acai',false, true))
coreDrinks.other.push(new Other('Mango Dragonfruit Refreshers',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','',['MB','H2O','MDP'],'MDR'),'Mango Drgonfruit',false, true))
coreDrinks.other.push(new Other('Pineapple Passionfruit Refreshers',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','',['MB','H2O','PFP'],'PPR'),'Pineapple Passionfruit',false, true))
coreDrinks.other.push(new Other('Cup Of Water',null, new DrinkBuild(true,'',[null,'','','',''],[null,'','','',''],'','',['H2O'],'W'),'Cup Of Water',false, true))
coreDrinks.other.push(new Other('Strawberry Acai Lemonade Refreshers',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','',['SB','LM','SAP'],'SALR'),'Strw Acai Lem',false, true))
coreDrinks.other.push(new Other('Mango Dragonfruit Lemonade Refreshers',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','',['MB','LM','MDP'],'SALR'),'Mngo Drgonfruit Lem',false, true))
coreDrinks.other.push(new Other('Pineapple Passionfruit Lemonade Refreshers',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','',['PB','LM','PFP'],'PPFR'),'Pinapple Pass Lem',false, true))
coreDrinks.other.push(new Other('Cup Of Ice',null, new DrinkBuild(true,'',[null,'','','',''],[null,'','','',''],'','',[''],'I'),'Cup Of Ice',false, true))
coreDrinks.other.push(new Other('Pink Drink',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','C',['SB','SP'],'PD'),'Pink Drink',false, true))
coreDrinks.other.push(new Other('Dragon Drink',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','C',['MB','MDP'],'PD'),'Dragon Drink',false, true))
coreDrinks.other.push(new Other('Paradise Drink',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','C',['PB','PFP'],'PD'),'Paradise Drink',false, true))
coreDrinks.other.push(new Other('Pup Cup',null, new DrinkBuild(true,'',[null,'','','',''],[null,'','','',''],'','',['WC'],'PC'),'Pup Cup',false, true))





const customers = []
const customerCorrectAnswers = []
class CustomerMaker{
    constructor(ID,Name,Phrase){
        this.id=ID
        this.name=Name
        this.phrase = Phrase
    }
}

//document.querySelectorAll('.name_heading').forEach((elem)=>{array.push(elem.innerText)})
let names = ['Leia', 'Sadie', 'Jose', 'Liberty', 'Bella', 'Caitlin', 'Sara', 'Sinead', 'Priya', 'Ray', 'Matilda',
'Rosie', 'Claudia', 'Sophie', 'Theresa', 'Lara', 'Khadijah', 'Felicity', 'Agnes', 'Anita', 'Gloria', 'Stephanie',
'Jemima', 'Abby', 'Charlie', 'Casey', 'Lowri', 'Anna', 'Rosa', 'Zaynab', 'Isabelle', 'Annie', 'Callie', 'Jennifer',
'Rosemary', 'Jodie', 'Monica', 'Eden', 'Kimberley', 'Nora', 'Maddie', 'Aisha', 'Diana', 'Stacey', 'Imogen', 'Elle', 'Tara', 
'Alina', 'Kelly', 'Rachel', 'Darcie', 'Kayla', 'Kathryn', 'India', 'Anisa', 'Adrian', 'Gracie', 'Cerys', 'Isla', 'Mabel', 
'Yasmin', 'Melody', 'Ayla', 'Kyra', 'Jasmin', 'Ana', 'Ellie-Mae', 'Crystal', 'Marie', 'Ciaran', 'Christina', 'Samantha', 'Violet', 
'Robin', 'Salma', 'Joanne', 'Esther', 'Molly', 'Melanie', 'Jenna', 'Emilie', 'Mariam', 'Sharon', 'Lucia',
'Milly', 'Anika', 'Julie', 'Tamara', 'Lola', 'Constance', 'Jesse', 'Edith', 'Caroline', 'Hattie', 'Joel', 'Amy', 'Alexa (Alexi)',
'Hafsah', 'Anastasia', 'Margaret','Jemima', 'Kayleigh ', 'Lisa', 'Thea', 'Nannie', 'Chelsea', 'Isabella',
'Orla', 'Beatrice', 'Jessie', 'Autumn', 'Ellen', 'Joyce', 'Alyssa', 'Syeda', 'Scarlett', 'Heather', 'Bailey',
'Demi', 'Carla', 'Elsa', 'Lillian', 'Katelyn ', 'Kiara', 'Georgia', 'Amelia', 'Milly', 'Georgie', 'Paige',
'Kye', 'Jean', 'Harris', 'Ray', 'Yasmine', 'Leona', 'Cerys', 'Louisa', 'Annabel', 'Zainab', 'Maya', 'Neve',
'Crystal', 'Rosie', 'Anne', 'Madeleine', 'Madeline', 'Gemma', 'Dorothy (Thema)', 'Mason', 'Ebony', 'Lois', 
'Alex', 'Betty', 'Natasha', 'Genevieve', 'Arabella', 'Kayla', 'Florence', 'Laila', 'Edie', 'Elizabeth', 
'Halima', 'Michaela', 'Jennifer', 'Isla', 'Lottie', 'Felix', 'Sarah', 'Abbie', 'Sapphire', 'Rose', 'Aimee',
'Gertrude', 'Lacey', 'Anisa', 'Brianna (Bree)', 'Frances (Fanny)', 'Kitty', 'Tia', 'Charlotte', 'Christine',
'Harmony', 'Fern', 'Stella', 'Karen', 'Maryam', 'Annabelle', 'Fannie', 'Salma', 'Shane', 'Tallulah', 'Kate',
'Catherine', 'Kiera', 'Evelyn', 'Olivia', 'Hafsah', 'Violet', 'Ruth', 'Kyla','Dale', 'Teresa (Terri)', 'Beatrice', 
'Darcie', 'Emilia', 'Cora', 'Kye', 'Cleo', 'Bethan', 'Robbie', 'Frances (Franki)', 'Sofia (Saffi)', 'Violet', 'Annie', 
'Terry (Tess)', 'Amira', 'Claudia', 'Edie', 'Hafsa', 'Joanne (Joann)', 'Heather', 'Lisa', 'Ana', 'Erica', 'Bethany', 
'Mariam (Mitzi)', 'Jodie', 'Alana', 'Madeline', 'Keira', 'Fatima', 'Annabelle', 'Alfie', 'Melanie', 'Zoe', 'Marie', 'Jay', 
'Jasmine', 'Iqra', 'Ellis', 'Morgan', 'Karen (Karie)', 'Barbara', 'Robin', 'Lillian (Lili)', 'Martha', 'Ellen (Ellia)', 
'Georgie', 'Heidi (Addie)', 'Rowan', 'Katie (Katya)', 'Elise', 'Alexa', 'Harley', 'Grace', 'Sandra (Shura)',
'Maryam (Mitzi)', 'Holly', 'Molly', 'Serena', 'Natasha (Tassa)', 'Kathleen (Kathy)', 'Veronica', 'Elsie', 'Maisie (Maja)', 
'Nora', 'Hanna', 'Roxanne', 'Emmie', 'Orla', 'Zaynab', 'Erika', 'Carys', 'Florence', 'Tyler', 'Nancy', 'Khadijah',
'Daniella (Dannelle)', 'Abbie', 'Aliyah', 'Isabelle', 'Alexia (Alex)', 'Nannie', 'India', 'Isobel', 'Evelyn (Eila)', 'Elizabeth (Liz)', 
'Neve', 'Nettie', 'Naomi', 'Lucy (Lulu)', 'Christine (Chrissy)', 'Danielle (Danylynn)', 'Alina', 'Genevieve', 'Theresa', 'Stella',
'Tabitha', 'Felix', 'Jerry','Rebecca (Becca)', 'Mariam (Mitzi)', 'Kimberly', 'Samantha', 'Taylor', 'Annie', 
'Evie', 'Ayesha', 'Lola', 'Tiffany', 'Flora', 'Mia', 'Yasmin', 'Erica', 'Amina', 'Leona (Loni)', 'Nia', 'Miriam (Mitzi)', 
'Jay', 'Hayley (Halle)', 'Michelle (Mia)', 'Daisy', 'Megan (Meg)', 'Eva', 'Iqra', 'Jerry', 'Alfie', 'Bailey', 'Kelly', 'Mabel', 
'Nellie (Nella)', 'Kyra', 'Katy', 'Kira', 'Deborah', 'Zahra', 'Rowan', 'Rachel', 'Ebony', 'Michaela (Michal)', 'Thea', 'Gracie', 
'Willie', 'Melanie', 'Hattie (Etta)', 'Rita', 'Sofia (Sofi)', 'Cory', 'Paula', 'Nancy', 'Evangeline', 'Anisa', 'Lana', 'Savannah', 
'Tilly', 'Jacqueline', 'Susan (Sue)', 'Lachlan', 'Monica', 'Amy', 'Aminah', 'Mason', 'Hazel', 'Rosa', 'Claudia', 'Vanessa', 
'Melissa (Lyssa)', 'Isobel', 'Anita', 'Jennifer (Jennah)', 'Ellis', 'Eliza (Telsa)', 'Spencer', 'Haleema', 'Jamie', 'Alisha', 
'Darcie', 'Tanisha', 'Maryam (Mitzi)', 'Isla', 'Connie', 'Phoebe', 'Sophie (Sofi)', 'Kiera', 'Katie (Catia)', 'Cara', 'Sarah',
'Harley', 'Laura (Lori)', 'Kaitlyn (Cait)', 'Tina', 'Teresa (Terrie)', 'Faith', 'Alesha', 'Lara', 'Sadie', 'Anne', 'Tamara', 'Tia', 'Lucie',
'Lee', 'Yasin', 'Kira', 'Alexander (Sashenka)', 'Ross', 'Albert (Al)', 'Owain', 'Travis', 'Taylor', 'Harold (Harry)', 'Keaton',
'Timothy', 'Henry (Hank)', 'Evangeline', 'Muhammad', 'Rufus', 'Ellis', 'Scott', 'Dominic', 'Maximilian (Maks)',
'Nathaniel', 'Hamzah', 'Yahya', 'John (Jack)', 'Luis', 'Fletcher', 'Ruben', 'Simon', 'Aiden', 'Marco', 'Mark',
'Zac', 'Sana', 'Hugh', 'Morgan', 'Yusuf', 'Declan', 'Sara', 'Tomos', 'David (Dai)', 'Tanya', 'Robin', 'Harley', 'Ronan', 
'Mitchell', 'Maximillian', 'Anton (Ton)', 'Noah', 'Raymond', 'Archie', 'Curtis', 'Ebony', 'Ronald (Ronny)', 'Benjamin (Ben)', 
'George', 'Muhammed', 'Ethan', 'Jerry', 'Charlie (Chas)', 'Justin', 'Jesse', 'Thomas', 'Hussain', 'Troy', 'Andre (Andy)', 
'Lawrence (Larry)', 'Jonathan (Jon)', 'Ewan', 'Ioan', 'Damien', 'Herbert', 'Angus (Gus)', 'Kenneth (Ken)', 'Shane', 'Stella', 'Niall', 
'Sam', 'Homer', 'Harry', 'Marcel', 'Arjun', 'Ralph', 'Hamish (Jamie)', 'Walter', 'Aadam', 'Juan (Jax)', 'Mohammad', 'Anthony (Topias)', 
'Max', 'Chester', 'Ronnie', 'Brendan (Bran)', 'Mohammed', 'Euan', 'Laurence (Larry)', 'Eliza', 'Umar', 'Tobias', 'Musa', 'Xander']

let sizes = [
    'tall',   'tall',   'venti',  'large',  'venti',  'venti',
    'venti',  'tall',   'medium', 'tall',   'tall',   'large',
    'large',  'small',  'medium', 'grande', 'large',  'grande',
    'venti',  'venti',  'grande', 'medium', 'grande', 'venti',
    'grande', 'medium', 'medium', 'venti',  'large',  'tall',
    'medium', 'venti',  'tall',   'grande', 'small',  'medium',
    'venti',  'grande', 'grande', 'large',  'medium', 'grande',
    'grande', 'small',  'medium', 'short',  'large',  'grande',
    'large',  'venti',  'tall',   'short',  'venti',  'large',
    'large',  'small',  'grande', 'large',  'medium', 'grande',
    'grande', 'large',  'small',  'large',  'tall',   'tall',
    'small',  'small',  'grande', 'grande', 'grande', 'tall',
    'grande', 'small',  'tall',   'large',  'large',  'medium',
    'medium', 'venti',  'large',  'large',  'small',  'grande',
    'medium', 'small',  'large',  'large',  'venti',  'tall',
    'medium', 'tall',   'small',  'medium', 'medium', 'venti',
    'small',  'medium', 'medium', 'venti',
    'tall',   'tall',   'venti',  'large',  'venti',  'venti',
    'venti',  'tall',   'medium', 'tall',   'tall',   'large',
    'large',  'small',  'medium', 'grande', 'large',  'grande',
    'venti',  'venti',  'grande', 'medium', 'grande', 'venti',
    'grande', 'medium', 'medium', 'venti',  'large',  'tall',
    'medium', 'venti',  'tall',   'grande', 'small',  'medium',
    'venti',  'grande', 'grande', 'large',  'medium', 'grande',
    'grande', 'small',  'medium', 'short',  'large',  'grande',
    'large',  'venti',  'tall',   'short',  'venti',  'large',
    'large',  'small',  'grande', 'large',  'medium', 'grande',
    'grande', 'large',  'small',  'large',  'tall',   'tall',
    'small',  'small',  'grande', 'grande', 'grande', 'tall',
    'grande', 'small',  'tall',   'large',  'large',  'medium',
    'medium', 'venti',  'large',  'large',  'small',  'grande',
    'medium', 'small',  'large',  'large',  'venti',  'tall',
    'medium', 'tall',   'small',  'medium', 'medium', 'venti',
    'small',  'medium', 'medium', 'venti',
    'tall',   'tall',   'venti',  'large',  'venti',  'venti',
    'venti',  'tall',   'medium', 'tall',   'tall',   'large',
    'large',  'small',  'medium', 'grande', 'large',  'grande',
    'venti',  'venti',  'grande', 'medium', 'grande', 'venti',
    'grande', 'medium', 'medium', 'venti',  'large',  'tall',
    'medium', 'venti',  'tall',   'grande', 'small',  'medium',
    'venti',  'grande', 'grande', 'large',  'medium', 'grande',
    'grande', 'small',  'medium', 'short',  'large',  'grande',
    'large',  'venti',  'tall',   'short',  'venti',  'large',
    'large',  'small',  'grande', 'large',  'medium', 'grande',
    'grande', 'large',  'small',  'large',  'tall',   'tall',
    'small',  'small',  'grande', 'grande', 'grande', 'tall',
    'grande', 'small',  'tall',   'large',  'large',  'medium',
    'medium', 'venti',  'large',  'large',  'small',  'grande',
    'medium', 'small',  'large',  'large',  'venti',  'tall',
    'medium', 'tall',   'small',  'medium', 'medium', 'venti',
    'small',  'medium', 'medium', 'venti',
    'tall',   'tall',   'venti',  'large',  'venti',  'venti',
    'venti',  'tall',   'medium', 'tall',   'tall',   'large',
    'large',  'small',  'medium', 'grande', 'large',  'grande',
    'venti',  'venti',  'grande', 'medium', 'grande', 'venti',
    'grande', 'medium', 'medium', 'venti',  'large',  'tall',
    'medium', 'venti',  'tall',   'grande', 'small',  'medium',
    'venti',  'grande', 'grande', 'large',  'medium', 'grande',
    'grande', 'small',  'medium', 'short',  'large',  'grande',
    'large',  'venti',  'tall',   'short',  'venti',  'large',
    'large',  'small',  'grande', 'large',  'medium', 'grande',
    'grande', 'large',  'small',  'large',  'tall',   'tall',
    'small',  'small',  'grande', 'grande', 'grande', 'tall',
    'grande', 'small',  'tall',   'large',  'large',  'medium',
    'medium', 'venti',  'large',  'large',  'small',  'grande',
    'medium', 'small',  'large',  'large',  'venti',  'tall',
    'medium', 'tall',   'small',  'medium', 'medium', 'venti',
    'small',  'medium', 'medium', 'venti',
    'tall',   'tall',   'venti',  'large',  'venti',  'venti',
    'venti',  'tall',   'medium', 'tall',   'tall',   'large',
    'large',  'small',  'medium', 'grande', 'large',  'grande',
    'venti',  'venti',  'grande', 'medium', 'grande', 'venti',
    'grande', 'medium', 'medium', 'venti',  'large',  'tall',
    'medium', 'venti',  'tall',   'grande', 'small',  'medium',
    'venti',  'grande', 'grande', 'large',  'medium', 'grande',
    'grande', 'small',  'medium', 'short',  'large',  'grande',
    'large',  'venti',  'tall',   'short',  'venti',  'large',
    'large',  'small',  'grande', 'large',  'medium', 'grande',
    'grande', 'large',  'small',  'large',  'tall',   'tall',
    'small',  'small',  'grande', 'grande', 'grande', 'tall',
    'grande', 'small',  'tall',   'large',  'large',  'medium',
    'medium', 'venti',  'large',  'large',  'small',  'grande',
    'medium', 'small',  'large',  'large',  'venti',  'tall',
    'medium', 'tall',   'small',  'medium', 'medium', 'venti',
    'small',  'medium', 'medium', 'venti',
    'tall',   'tall',   'venti',  'large',  'venti',  'venti',
    'venti',  'tall',   'medium', 'tall',   'tall',   'large',
    'large',  'small',  'medium', 'grande', 'large',  'grande',
    'venti',  'venti',  'grande', 'medium', 'grande', 'venti',
    'grande', 'medium', 'medium', 'venti',  'large',  'tall',
    'medium', 'venti',  'tall',   'grande', 'small',  'medium',
    'venti',  'grande', 'grande', 'large',  'medium', 'grande',
    'grande', 'small',  'medium', 'short',  'large',  'grande',
    'large',  'venti',  'tall',   'short',  'venti',  'large',
    'large',  'small',  'grande', 'large',  'medium', 'grande',
    'grande', 'large',  'small',  'large',  'tall',   'tall',
    'small',  'small',  'grande', 'grande', 'grande', 'tall',
    'grande', 'small',  'tall',   'large',  'large',  'medium',
    'medium', 'venti',  'large',  'large',  'small',  'grande',
    'medium', 'small',  'large',  'large',  'venti',  'tall',
    'medium', 'tall',   'small',  'medium', 'medium', 'venti',
    'small',  'medium', 'medium', 'venti',
    'tall',   'tall',   'venti',  'large',  'venti',  'venti',
    'venti',  'tall',   'medium', 'tall',   'tall',   'large',
    'large',  'small',  'medium', 'grande', 'large',  'grande',
    'venti',  'venti',  'grande', 'medium', 'grande', 'venti',
    'grande', 'medium', 'medium', 'venti',  'large',  'tall',
    'medium', 'venti',  'tall',   'grande', 'small',  'medium',
    'venti',  'grande', 'grande', 'large',  'medium', 'grande',
    'grande', 'small',  'medium', 'short',  'large',  'grande',
    'large',  'venti',  'tall',   'short',  'venti',  'large',
    'large',  'small',  'grande', 'large',  'medium', 'grande',
    'grande', 'large',  'small',  'large',  'tall',   'tall',
    'small',  'small',  'grande', 'grande', 'grande', 'tall',
    'grande', 'small',  'tall',   'large',  'large',  'medium',
    'medium', 'venti',  'large',  'large',  'small',  'grande',
    'medium', 'small',  'large',  'large',  'venti',  'tall',
    'medium', 'tall',   'small',  'medium', 'medium', 'venti',
    'small',  'medium', 'medium', 'venti',
    'tall',   'tall',   'venti',  'large',  'venti',  'venti',
    'venti',  'tall',   'medium', 'tall',   'tall',   'large',
    'large',  'small',  'medium', 'grande', 'large',  'grande',
    'venti',  'venti',  'grande', 'medium', 'grande', 'venti',
    'grande', 'medium', 'medium', 'venti',  'large',  'tall',
    'medium', 'venti',  'tall',   'grande', 'small',  'medium',
    'venti',  'grande', 'grande', 'large',  'medium', 'grande',
    'grande', 'small',  'medium', 'short',  'large',  'grande',
    'large',  'venti',  'tall',   'short',  'venti',  'large',
    'large',  'small',  'grande', 'large',  'medium', 'grande',
    'grande', 'large',  'small',  'large',  'tall',   'tall',
    'small',  'small',  'grande', 'grande', 'grande', 'tall',
    'grande', 'small',  'tall',   'large',  'large',  'medium',
    'medium', 'venti',  'large',  'large',  'small',  'grande',
    'medium', 'small',  'large',  'large',  'venti',  'tall',
    'medium', 'tall',   'small',  'medium', 'medium', 'venti',
    'small',  'medium', 'medium', 'venti',
    'tall',   'tall',   'venti',  'large',  'venti',  'venti',
    'venti',  'tall',   'medium', 'tall',   'tall',   'large',
    'large',  'small',  'medium', 'grande', 'large',  'grande',
    'venti',  'venti',  'grande', 'medium', 'grande', 'venti',
    'grande', 'medium', 'medium', 'venti',  'large',  'tall',
    'medium', 'venti',  'tall',   'grande', 'small',  'medium',
    'venti',  'grande', 'grande', 'large',  'medium', 'grande',
    'grande', 'small',  'medium', 'short',  'large',  'grande',
    'large',  'venti',  'tall',   'short',  'venti',  'large',
    'large',  'small',  'grande', 'large',  'medium', 'grande',
    'grande', 'large',  'small',  'large',  'tall',   'tall',
    'small',  'small',  'grande', 'grande', 'grande', 'tall',
    'grande', 'small',  'tall',   'large',  'large',  'medium',
    'medium', 'venti',  'large',  'large',  'small',  'grande',
    'medium', 'small',  'large',  'large',  'venti',  'tall',
    'medium', 'tall',   'small',  'medium', 'medium', 'venti',
    'small',  'medium', 'medium', 'venti',
    'tall',   'tall',   'venti',  'large',  'venti',  'venti',
    'venti',  'tall',   'medium', 'tall',   'tall',   'large',
    'large',  'small',  'medium', 'grande', 'large',  'grande',
    'venti',  'venti',  'grande', 'medium', 'grande', 'venti',
    'grande', 'medium', 'medium', 'venti',  'large',  'tall',
    'medium', 'venti',  'tall',   'grande', 'small',  'medium',
    'venti',  'grande', 'grande', 'large',  'medium', 'grande',
    'grande', 'small',  'medium', 'short',  'large',  'grande',
    'large',  'venti',  'tall',   'short',  'venti',  'large',
    'large',  'small',  'grande', 'large',  'medium', 'grande',
    'grande', 'large',  'small',  'large',  'tall',   'tall',
    'small',  'small',  'grande', 'grande', 'grande', 'tall',
    'grande', 'small',  'tall',   'large',  'large',  'medium',
    'medium', 'venti',  'large',  'large',  'small',  'grande',
    'medium', 'small',  'large',  'large',  'venti',  'tall',
    'medium', 'tall',   'small',  'medium', 'medium', 'venti',
    'small',  'medium', 'medium', 'venti'
  ]
// let temparray=[]
// function sizeGenerator(length){
//     let tempsize = ['small','tall','small','tall','small','tall','grande','medium','grande','medium','grande','medium','grande','medium','grande','medium','grande','medium','venti','large','venti','large','venti','large','venti','large','venti','large','short']
    
//     for(i=0;i<length;i++){
//         let randomNum = Math.floor(Math.random() * tempsize.length)
//         temparray.push(tempsize[randomNum])
//     }
// }
// sizeGenerator(100)

function translateSize(input){
    let string = input.toLowerCase()
    if(string === 'large'|| string === 'venti'){
        return 'Vt'
    }
    if(string === 'medium'|| string === 'grande'){
        return 'Gr'
    }
    if(string === 'tall'|| string === 'small'){
        return 'Tl'
    }
}

customers.push(new CustomerMaker('0','Lucille','large black coffee'))
customerCorrectAnswers.push(new DrinkBuild(false,'','','','','','','PPR','Vt'))
customers.push(new CustomerMaker('1','Deborah','large bold roast'))
customerCorrectAnswers.push(new DrinkBuild(false,'','','','','','','DRC','Vt'))
customers.push(new CustomerMaker('2','James','venti iced coffee'))
customerCorrectAnswers.push(new DrinkBuild(true,'','','','','','','IC','Vt'))
customers.push(new CustomerMaker('3','Carl','venti cold brew, black'))
customerCorrectAnswers.push(new DrinkBuild(true,'',[''],'','','','','CB','Vt'))
coreDrinks.espresso.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.hot===true && elem.name!=='Espresso Con Panna' && elem.name!=='Espresso' && elem.name!=='Espresso Macchiatto'){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[i]}`,`${sizes[i]} hot ${elem.name}`))
    elem.menuBuildHot.size = translateSize(sizes[i])
    //console.log(translateSize(sizes[i]))
    customerCorrectAnswers.push(elem.menuBuildHot)
    
}
})
coreDrinks.espresso.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.iced===true && elem.menuBuildIced!==undefined){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[i + Number(customers[customers.length-1].id)]}`,`${sizes[i]} iced ${elem.name}`))
    elem.menuBuildIced.size = translateSize(sizes[i])
    customerCorrectAnswers.push(elem.menuBuildIced)
    
    }
})
coreDrinks.espresso.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.iced===true && elem.menuBuildIced!==undefined){
        customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[i + Number(customers[customers.length-1].id)]}`,`${sizes[i]} triple iced ${elem.name}`))
        elem.menuBuildIced.size = translateSize(sizes[i])
        elem.menuBuildIced.shots= [null,3,3,3,null]
        customerCorrectAnswers.push(elem.menuBuildIced)
        //console.log(elem.menuBuildIced.shots)
    }
})
coreDrinks.brewed.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.iced===true && elem.menuBuildIced!==undefined){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[i + Number(customers[customers.length-1].id)]}`,`${sizes[i]} ${elem.name}`))
    elem.menuBuildIced.size = translateSize(sizes[i])
    customerCorrectAnswers.push(elem.menuBuildIced)
    
    }
})
coreDrinks.blended.forEach((element,i)=>{
    
    elem = JSON.parse(JSON.stringify(element))
    if(elem.hot===false && elem.menuBuildIced!==undefined){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[i + Number(customers[customers.length-1].id)]}`,`${sizes[i]} ${elem.name}`))
    elem.menuBuildIced.size = translateSize(sizes[i])
    customerCorrectAnswers.push(elem.menuBuildIced)
    
    }
})
coreDrinks.brewed.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.hot===true && elem.name!=='Espresso Con Panna' && elem.name!=='Espresso' && elem.name!=='Espresso Macchiatto'){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[i]}`,`${sizes[i]} hot ${elem.name}`))
    elem.menuBuildHot.size = translateSize(sizes[i])
    //console.log(translateSize(sizes[i]))
    customerCorrectAnswers.push(elem.menuBuildHot)
}
})
coreDrinks.tea.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.hot===true && elem.name!=='Espresso Con Panna' && elem.name!=='Espresso' && elem.name!=='Espresso Macchiatto'){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[i]}`,`${sizes[i]} hot ${elem.name}`))
    elem.menuBuildHot.size = translateSize(sizes[i])
    //console.log(translateSize(sizes[i]))
    customerCorrectAnswers.push(elem.menuBuildHot)
}
})
coreDrinks.tea.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.iced===true && elem.menuBuildIced!==undefined){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[i + Number(customers[customers.length-1].id)]}`,`${sizes[i]} ${elem.name}`))
    elem.menuBuildIced.size = translateSize(sizes[i])
    customerCorrectAnswers.push(elem.menuBuildIced)
    
    }
})
coreDrinks.blended.forEach((element,i)=>{
    
    elem = JSON.parse(JSON.stringify(element))
    if(elem.hot===false && elem.menuBuildIced!==undefined){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[i + Number(customers[customers.length-1].id)]}`,`${sizes[i]} ${elem.name} with a shot`))
    elem.menuBuildIced.size = translateSize(sizes[i])
    elem.menuBuildIced.shots =[null,1,1,1,null]
    customerCorrectAnswers.push(elem.menuBuildIced)
    
    }
})
console.log(customers.length)
customerCorrectAnswers.forEach((elem)=>{
    //console.log(JSON.parse(JSON.stringify(elem)).size)
})
//console.log(customerCorrectAnswers)
app.post('/order',(req,res)=>{
    let points = 0
    
    req.body.drinksArray.forEach((drink,i)=>{
        let answer
        
        if(req.body.drinkIsIced[i]===true){
            answer = req.body.drinksArray[i].iced
            delete req.body.drinksArray[i].iced.ogPumps
        }
        if(req.body.drinkIsIced[i]===false){
            answer = req.body.drinksArray[i].hot
            delete req.body.drinksArray[i].hot.ogPumps
        }
        console.log(JSON.stringify(answer))
        console.log(JSON.stringify(customerCorrectAnswers[Number(req.body.customerID)]))
        if(JSON.stringify(answer) ===JSON.stringify(customerCorrectAnswers[Number(req.body.customerID)])){
            points+=1
            
        }
    })
    if(points>=1){
            res.json('win')
    }else{
            res.json('lose')
    }
    
})

app.get('/api/customers',(req,res)=>{
    //console.log(req.body.randomNum)
    const randomNum = Math.floor(Math.random() * (customers.length))
    res.json(customers[randomNum])
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
app.get('/api/customer'.toLowerCase(),(req,res)=>{
    res.json(customer.phrase)
})

app.listen(process.env.PORT || PORT)