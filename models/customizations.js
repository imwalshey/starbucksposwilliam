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
class Custom{
    constructor(ABB,TYPE,MenuName){
        this.type=TYPE
        this.abbr=ABB
        this.menuName = MenuName
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
    'No':new Custom('NO','button'),'Sub':new Custom('SUB','button'),'Extra':new Custom('XTR','button'),'Light':new Custom('LT','button'),
    'Ice':new Custom('ICE','custom','Ice'),'Water':new Custom('H2O','custom','Water'),'Whipped Cream':new Custom('WC','custom','Whip Cream'),'Vanilla Sweet Cream':new Custom('VSC','custom','Van Swt Crm'),'Agave':new Custom('AGV','packet','Agave'),
    'Splenda':new Custom('SPL','packet','Splenda'),'Sugar':new Custom('SUG','packet','Sugar'),'Stevia':new Custom('STV','packet','Stevia'),'Honey':new Custom('HN','packet','Honey'),'Raw Sugar':new Custom('RAW','packet','Raw Sugar'),'Strawberry Puree':new Custom('SP','custom','Strwbrry Puree'),
    'Frappuccino Chips':new Custom('FC','custom','Frapp Chips'),'Vanilla Bean Powder':new Custom('VB','custom','Van Bean Pwder'),'Matcha':new Custom('MT','custom','Matcha'),'Add blueberries':new Custom('BLB','custom','Blueberries'),
    'Strawberry Inclusions':new Custom('SRI','custom','Strwbrry Incl'),'Mango Dragonfruit Inclusions':new Custom('MRI','custom','Drgn Frt Incl'),'Pineapple Inclusions':new Custom('PRI','custom','Pnepple Incl'),
    'Lemonade':new Custom('LEM','custom','Lemonade'),'Mocha Drizzle':new Custom('MD','custom','Mocha Drizzle'),'Caramel Drizzle':new Custom('CD','custom','Caramel Drizzle'),'Strawberry Acai Refresher Base':new Custom('SRB','custom','Strwbrry Base'),
    'Dragonfruit Refresher Base':new Custom('DRB','custom','Drgn Frt Base'),'Pineapple Refresher Base':new Custom('PRB','custom','Pineapple Base'),
    'Line the Cup w/Mocha':new Custom('Lw/M','custom','Line Cup Mocha'),'Line the Cup w/Caramel':new Custom('Lw/C','custom','Line Cup Caramel'),'Foam':new Custom('F','custom','Foam'),'Vanilla Sweet Cream Cold Foam':new Custom('VSCF','custom','Sweet Cream CF'),
    'Salted Cream Cold Foam':new Custom('SCCF','custom','Slted Crm CF'),'Chocolate Cream Cold Foam':new Custom('CCCF','custom','Choc Crm CF'),'With Room':new Custom('R','custom','Room'),'Extra Hot':'XTRHOT'
}



module.exports={
    customizations: modifiers
}