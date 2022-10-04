
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
        if(!Array.isArray(this.decaf)){
            this.decaf=[DecafAmount]
        }
        this.shots=Shots
        if(!Array.isArray(this.shots)){
            this.shots=[Shots]
        }
        this.pumps= [Pumps]
        this.syrup=[Syrup]
        this.milk=[Milk]
        this.custom = Custom
        if(!Array.isArray(this.custom)){
            this.custom=[Custom]
        }
        this.abbr=ABBR
        
        if(SIZE){
            this.size=SIZE
        }else this.size = 'Gr'
    }
}



// coreDrinks.brewed.push(new Brewed("Pour Over Pike Place Roast",new DrinkBuild(false,[''],['','','','',null],['','','','',null],'','','','POPP'),null,'Pour Over Pike',true,false))
// coreDrinks.brewed.push(new Brewed("Pour Over Dark Roast",new DrinkBuild(false,[''],['','','','',null],['','','','',null],'','','','PODR'),null,'Pour Over Dark',true,false))
// coreDrinks.brewed.push(new Brewed("Pour Over Blonde Roast",new DrinkBuild(false,[''],['','','','',null],['','','','',null],'','','','POBR'),null,'Pour Over Blonde',true,false))
// coreDrinks.brewed.push(new Brewed("Pour Over Decaf Pike Place Reserve",new DrinkBuild(false,[''],['','','','',null],['','','','',null],'','','','PODPP'),null,'Decaf Pour Over',true,false))

coreDrinks.brewed.push(new Brewed("Iced Coffee",null,new DrinkBuild(true,[''],[null,'','','',''],[null,3,4,6,7],'C','','','IC'),'Iced Coffee',false,true))
coreDrinks.brewed.push(new Brewed("Iced Coffee w/Milk",null,new DrinkBuild(true,[''],[null,'','','',''],[null,3,4,6,7],'C','%','','IC/M'),'Iced Coffee w/ Milk',false,true))
coreDrinks.brewed.push(new Brewed("Decaf Iced Coffee",null,new DrinkBuild(true,['D'],[null,'','','',''],[null,3,4,6,7],'C','','','DIC'),'Decaf Iced Coffee',false,true))
coreDrinks.brewed.push(new Brewed("Decaf Iced Coffee w/Milk",null,new DrinkBuild(true,['D'],[null,'','','',''],[null,3,4,6,7],'C','%','','DIC/M'),'Decaf Iced Coffee w/Milk',false,true))
coreDrinks.brewed.push(new Brewed("Iced Coffee Refill",null,new DrinkBuild(true,[''],[null,'','','',''],[null,3,4,6,7],'C','','','ICR'),'Iced Coffee Refill',false,true))
coreDrinks.brewed.push(new Brewed("Cold Brew",null,new DrinkBuild(true,[''],[null,'','','',''],[null,3,4,6,7],'','','','CB'),'Cold Brew',false,true))
coreDrinks.brewed.push(new Brewed("Cold Brew w/Milk",null,new DrinkBuild(true,[''],[null,'','','',''],[null,3,4,6,7],'','%','','CB/M'),'Cold Brew w/Milk',false,true))
coreDrinks.brewed.push(new Brewed("Cold Brew w/Cold Foam",null,new DrinkBuild(true,[''],[null,'','','',''],[null,3,4,6,7],'','','CF','CB'),'Cold Foam Cold Brew',false,true))
coreDrinks.brewed.push(new Brewed("Cold Brew Refill",null,new DrinkBuild(true,[''],[null,'','','',''],[null,3,4,6,7],'','','','CBR'),'Cold Brew Refill',false,true))
coreDrinks.brewed.push(new Brewed("Vanilla Sweet Cream Cold Brew",null,new DrinkBuild(true,[''],[null,'','','',''],[null,2,3,4,5],'V','','VSC','VSCB'),'Van Sweet Crm Cold Brew',false,true))
coreDrinks.brewed.push(new Brewed("Salted Caramel Cream Cold Brew",null,new DrinkBuild(true,[''],[null,'','','',''],[null,2,3,4,5],'V','','SCCF','SCCB'),'Slted Crml Cold Brew',false,true))
coreDrinks.brewed.push(new Brewed("Chocolate Cream Cold Brew",null,new DrinkBuild(true,[''],[null,'','','',''],[null,2,3,4,5],'V','','CCCF','CCCB'),'Choc Crm Cold Brew',false,true))
coreDrinks.brewed.push(new Brewed("Pumpkin Cream Cold Brew",null,new DrinkBuild(true,[''],[null,'','','',''],[null,2,3,4,5],'V','','PCCF','PCB'),'Pnkn Crm Cold Brew',false,true))
coreDrinks.brewed.push(new Brewed("Nitro Cold Brew",null,new DrinkBuild(true,[''],[null,'','','',''],[null,3,4,null,null],'','','','NCB'),'Nitro Cold Brew',false,true))
coreDrinks.brewed.push(new Brewed("Vanilla Sweet Cream Nitro Cold Brew",null,new DrinkBuild(true,[''],[null,'','',null,null],[null,2,3,null,null],'','','VSC','VSNCB'),'Van SC Nitro Cold Brew',false,true))
coreDrinks.brewed.push(new Brewed("Pumpkin Cream Nitro Cold Brew",null,new DrinkBuild(true,[''],[null,'','',null,null],[null,1,2,null,null],'','','PCCF','PCNCB'),'Pnkn Crm Nitro Cold Brew',false,true))
coreDrinks.brewed.push(new Brewed("Cafe Misto",new DrinkBuild(false,[''],['','','','',null],[2,3,4,5,null],'','%','F','CFM'),null,'Cafè Misto',true,false))
coreDrinks.brewed.push(new Brewed("Pike Place Roast",new DrinkBuild(false,[''],['','','','',null],[2,3,4,5,null],'','','','PPR'),null,'Pike Place',true,false))
coreDrinks.brewed.push(new Brewed("Dark Roast",new DrinkBuild(false,[''],['','','','',null],[2,3,4,5,null],'','','','DRC'),null,'Dark Roast',true,false))
coreDrinks.brewed.push(new Brewed("Blonde Roast",new DrinkBuild(false,[''],['','','','',null],[2,3,4,5,null],'','','','BRC'),null,'Blonde Roast',true,false))
coreDrinks.brewed.push(new Brewed("Decaf Pike Place Roast",new DrinkBuild(false,['D'],['','','','',null],[2,3,4,5,null],'','','','DPPR'),null,'Decaf Pike',true,false))
coreDrinks.brewed.push(new Brewed("Hot Coffee Refill",new DrinkBuild(false,[''],['','','','',null],[2,3,4,5,null],'','','','PPRR'),null,'Hot Coffee Refill',true,false))
console.log(coreDrinks.brewed.length)
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
                                    new DrinkBuild(true,[''],[null,1,2,3,null],[null,3,4,6,null],'M','%',['WC'],'M')))
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
coreDrinks.blended.push(new Frappucino('White Mocha Frappucino',['pump coffee','pour milk','add to blender','pump flavor','add ice','add base','blend','pour into cup','top with whipped cream'],['milk','frapp roast','white mocha syrup','ice'],true,'',false,"White Mocha Frapp",false,true, new DrinkBuild(true,'',[null,'','','',null],[null,2,3,4,null],'WM','W',['FR','WC'],'WCMF'),null))
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
coreDrinks.blended.push(new Frappucino('Blended Strawberry Lemonade',['pour milk','add to blender','add ice','add base','blend','pour into cup'],['lemonade','strawberry puree','ice'],false,'',false,'Blnded Str Lem',false,true, 
new DrinkBuild(true,'',[null,'','','',null],[null,2,3,4,null],'','',['LE','SP'],'BSL'),null))

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
                                                    new DrinkBuild(true,'',[null,'','','',null],[null,3,4,6,null],'LC','%','TB','EBTL'),
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
coreDrinks.tea.push(new Tea("Peach Green Tea Lemonade",null,
                                            new DrinkBuild(true,'',[null,'','','',''],[null,3,4,6,7],'','',['PB','GT',"L"],'PGTL'),
                                            'Peach Green Tea Lem',false,true))                                          
coreDrinks.tea.push(new Tea("Passion Tango Tea Lemonade",null,
                                            new DrinkBuild(true,'',[null,'','','',''],[null,3,4,6,7],'','',['PTT',"L"],'PTL'),
                                            'Passion Tea Lemonade',false,true))
                                            
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
coreDrinks.other.push(new Other('White Hot Chocolate',new DrinkBuild(false,'',['','','','',null],[2,3,4,5,null],'WM','%',['WC'],'WHC'),null,'White Hot Choc',true, false))
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
coreDrinks.other.push(new Other('Strawberry Acai Refresher',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','',['SB','H2O','SP'],'SAR'),'Straw Acai',false, true))
coreDrinks.other.push(new Other('Mango Dragonfruit Refresher',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','',['MB','H2O','MDP'],'MDR'),'Mango Drgonfruit',false, true))
coreDrinks.other.push(new Other('Pineapple Passionfruit Refresher',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','',['MB','H2O','PFP'],'PPR'),'Pineapple Passionfruit',false, true))
coreDrinks.other.push(new Other('Cup Of Water',null, new DrinkBuild(true,'',[null,'','','',''],[null,'','','',''],'','',['H2O'],'W'),'Cup Of Water',false, true))
coreDrinks.other.push(new Other('Strawberry Acai Lemonade Refresher',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','',['SB','LM','SAP'],'SALR'),'Strw Acai Lem',false, true))
coreDrinks.other.push(new Other('Mango Dragonfruit Lemonade Refresher',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','',['MB','LM','MDP'],'SALR'),'Mngo Drgonfruit Lem',false, true))
coreDrinks.other.push(new Other('Pineapple Passionfruit Lemonade Refresher',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','',['PB','LM','PFP'],'PPFR'),'Pinapple Pass Lem',false, true))
coreDrinks.other.push(new Other('Cup Of Ice',null, new DrinkBuild(true,'',[null,'','','',''],[null,'','','',''],'','',[''],'I'),'Cup Of Ice',false, true))
coreDrinks.other.push(new Other('Pink Drink',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','C',['SB','SP'],'PD'),'Pink Drink',false, true))
coreDrinks.other.push(new Other('Dragon Drink',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','C',['MB','MDP'],'PD'),'Dragon Drink',false, true))
coreDrinks.other.push(new Other('Paradise Drink',null, new DrinkBuild(true,'',[null,'','','',''],[null,2,3,4,6],'','C',['PB','PFP'],'PD'),'Paradise Drink',false, true))
coreDrinks.other.push(new Other('Pup Cup',null, new DrinkBuild(true,'',[null,'','','',''],[null,'','','',''],'','',['WC'],'PC'),'Pup Cup',false, true))

module.exports = coreDrinks