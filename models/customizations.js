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
    'No':new Syrup('NO','button'),'Sub':new Syrup('SUB','button'),'Pumps':new Syrup('Pumps','button'),'Extra':new Syrup('XTR','button'),'Light':new Syrup('LT','button'),
    'Caramel Syrup':new Syrup('CR','syrup'),'Cinnamon Dolce Syrup':new Syrup('CD','syrup'),
    'Hazelnut Syrup':new Syrup('H','syrup'),'Toffee Nut Syrup':new Syrup('TN','syrup'),'Vanilla Syrup':new Syrup('V','syrup'),'Classic Syrup':new Syrup('C','syrup'),'Peppermint Syrup':new Syrup('P','syrup'),
    'Raspberry Syrup':new Syrup('R','syrup'),'Toasted Vanilla Syrup':new Syrup('TV','syrup'),'Brown Sugar Syrup':new Syrup('BS','syrup'),'Chai':new Syrup('CH','syrup'),'Honey Blend':new Syrup('HB','syrup'),
    'Liquid Cane Sugar':new Syrup('LC','syrup'), 'Sugar Free Vanilla Syrup':new Syrup('SFV','syrup'),'Mocha Sauce':new Syrup('M','syrup'),'White Mocha Sauce':new Syrup('WM','syrup'), 'Caramel Sauce':new Syrup('CS','syrup'),
    'Dark Caramel Sauce':new Syrup('DC','syrup')
}
modifiers.milk={
    'Extra':new Syrup('XTR','button'),'Light':new Syrup('LT','button'),'Nonfat Milk':new Syrup('N','milk'),'1% Milk':new Syrup('1%','milk'),
    'with Nonfat Milk':new Syrup('w/N','milk'),'with 1% Milk':new Syrup('w/1%','milk'),'2% Milk':new Syrup('%','milk'),'Whole Milk':new Syrup('W','milk'),
    'with 2% Milk':new Syrup('w/2%','milk'),'with Whole Milk':new Syrup('w/W','milk'),'Soy Milk':new Syrup('S','milk'),'Oatmilk':new Syrup('O','milk'),
    'with Soy Milk':new Syrup('w/S','milk'),'with Oatmilk':new Syrup('w/O','milk'),'Coconut Milk':new Syrup('C','milk'),'Almondmilk':new Syrup('A','milk'),
    'with Coconut Milk':new Syrup('w/C','milk'),'with Almondmilk':new Syrup('w/A','milk'),'Half & Half (Breve)':new Syrup('B','milk'),'Heavy Cream':new Syrup('HC','milk'),
    'with Half & Half Cream':new Syrup('CRM','milk'),'with Heavy Cream':new Syrup('w/HC','milk'),
}
modifiers.custom={
    'No':new Syrup('NO','button'),'Sub':new Syrup('SUB','button'),'Extra':new Syrup('XTR','button'),'Light':new Syrup('LT','button'),
    'Ice':new Syrup('ICE','custom'),'Water':new Syrup('H2O','custom'),'Whipped Cream':new Syrup('WC','custom'),'Vanilla Sweet Cream':new Syrup('VSC','custom'),'Agave':new Syrup('AGV','packet'),
    'Splenda':new Syrup('SPL','packet'),'Sugar':new Syrup('SUG','packet'),'Stevia':new Syrup('STV','packet'),'Honey':new Syrup('HN','packet'),'Raw Sugar':new Syrup('RAW','packet'),'Strawberry Puree':new Syrup('SP','custom'),
    'Frappuccino Chips':new Syrup('FC','custom'),'Vanilla Bean Powder':new Syrup('VB','custom'),'Matcha':new Syrup('MT','custom'),'Add blueberries':new Syrup('BLB','custom'),
    'Strawberry Inclusions':new Syrup('SRI','custom'),'Mango Dragonfruit Inclusions':new Syrup('MRI','custom'),'Pineapple Inclusions':new Syrup('PRI','custom'),
    'Lemonade':new Syrup('LEM','custom'),'Mocha Drizzle':new Syrup('MD','custom'),'Caramel Drizzle':new Syrup('CD','custom'),'Strawberry Acai Refresher Base':new Syrup('SRB','custom'),
    'Dragonfruit Refresher Base':new Syrup('DRB','custom'),'Pineapple Refresher Base':new Syrup('PRB','custom'),
    'Line the Cup w/Mocha':new Syrup('Lw/M','custom'),'Line the Cup w/Caramel':new Syrup('Lw/C','custom'),'Foam':new Syrup('F','custom'),'Vanilla Sweet Cream Cold Foam':new Syrup('VSCF','custom'),
    'Salted Cream Cold Foam':new Syrup('SCCF','custom'),'Chocolate Cream Cold Foam':new Syrup('CCCF','custom'),'With Room':new Syrup('R','custom'),'Extra Hot':'XTRHOT'
}



module.exports={
    customizations: modifiers
}