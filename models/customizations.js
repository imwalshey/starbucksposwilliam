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
    'Liquid Cane Sugar':new Syrup('LC','syrup'), 'Sugar Free Vanilla Syrup':new Syrup('SFV','syrup'),'Mocha Sauce':new Syrup('M','syrup'),'White Mocha Sauce':new Syrup('WM','syrup'), 'Caramel Sauce':new Syrup('CS','syrup'),
    'Dark Caramel Sauce Sauce':new Syrup('DC','syrup')
}
modifiers.milk={
    'Extra':new Syrup('Extra','button'),'Light':new Syrup('Light','button'),'Nonfat Milk':new Syrup('N','milk'),'1% Milk':new Syrup('1%','milk'),
    'with Nonfat Milk':new Syrup('w/N','milk'),'with 1% Milk':new Syrup('w/1%','milk'),'2% Milk':new Syrup('%','milk'),'Whole Milk':new Syrup('W','milk'),
    'with 2% Milk':new Syrup('w/2%','milk'),'with Whole Milk':new Syrup('w/W','milk'),'Soy Milk':new Syrup('S','milk'),'Oatmilk':new Syrup('O','milk'),
    'with Soy Milk':new Syrup('w/S','milk'),'with Oatmilk':new Syrup('w/O','milk'),'Coconut Milk':new Syrup('C','milk'),'Almondmilk':new Syrup('A','milk'),
    'with Coconut Milk':new Syrup('w/C','milk'),'with Almondmilk':new Syrup('w/A','milk'),'Half & Half (Breve)':new Syrup('B','milk'),'Heavy Cream':new Syrup('HC','milk'),
    'with Half & Half Cream':new Syrup('CRM','milk'),'with Heavy Cream':new Syrup('w/HC','milk'),
}
modifiers.custom={
    'No':new Syrup('No','button'),'Sub':new Syrup('sub','button'),'Extra':new Syrup('XTR','button'),'Light':new Syrup('Lt','button'),
    'Ice':'','Water':'','Whipped Cream':'','Vanilla Sweet Cream':'','Agave':'',
    'Splenda':'','Sugar':'','Stevia':'','Honey':'','Raw Sugar':'','Strawberry Puree':'',
    'Frappuccino Chips':'','Vanilla Bean Powder':'','Matcha':'','Add blueberries':'',
    'Strawberry Inclusions':'','Mango Dragonfruit Inclusions':'','Pineapple Inclusions':'',
    'Lemonade':'','Mocha Drizzle':'','Caramel Drizzle':'','Strawberry Acai Refresher Base':'',
    'Dragonfruit Refresher Base':'','Pineapple Refresher Base':'',
    'Line the Cup w/Mocha':'','Line the Cup w/Caramel':'','Foam':'','Vanilla Sweet Cream Cold Foam':'',
    'Salted Cream Cold Foam':'','Chocolate Cream Cold Foam':'','With Room':'','Extra Hot':''
}



module.exports={
    customizations: modifiers
}