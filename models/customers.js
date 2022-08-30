const drinkController = require('../controllers/drinkController')
const customizationsModel = require('../models/customizations')
const customizations = customizationsModel.customizations
const coreDrinks =drinkController.customerDrinks
const DrinkBuild = drinkController.drinkBuild
const customers = []
const customerCorrectAnswers = []
class CustomerMaker{
    constructor(ID,Name,Phrase){
        this.id=ID
        this.name=Name
        this.phrase = Phrase
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
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
'Max', 'Chester', 'Ronnie', 'Brendan (Bran)', 'Mohammed', 'Euan', 'Laurence (Larry)', 'Eliza', 'Umar', 'Tobias', 'Musa', 'Xander',
'William', 'Daniel (Dan)', 'John (Jax)', 'Thomas', 'Dewey', 'Jacob', 'Christopher (Chris)', 'Joseph (Joe)', 'Ethan', 'Charles (Charley)',
'Benjamin (Ben)', 'Callum', 'Mohammed', 'Luke', 'Oliver (Ollie)', 'Harry', 'Adam', 'Jake', 'Harrison', 'Samuel (Sami)', 'Nathan', 'Jack',
'Matthew (Mate)', 'Robert (Bob)', 'Henry (Hank)', 'David (Dave)', 'Liam (Bill)', 'Joshua (Joss)', 'Louis', 'Edward', 'Aaron',
'Michael (Mickey)', 'Richard (Ricky)', 'Muhammad', 'James (Jamie)', 'Haider', 'Euan', 'Elmer', 'Haroon', 'Jenson (Jack)', 'Gethin',
'Bernard', 'Zack', 'Maximillian', 'Dexter', 'Kian', 'Hugh', 'Jackson', 'Georgie (Gorka)', 'Jakob (Jake)', 'Mark', 'Saif', 'Kyron',
'Mohamed', 'Anika', 'Ronan', 'Zach', 'Ibrahim', 'Jean (Gino)', 'Martin (Marty)', 'Chester', 'Warren', 'Conner', 'Tommy (Tomek)',
'Vincent', 'Jessie', 'Melvin', 'Kelly', 'Lukas', 'Tia', 'Russell (Rusty)', 'Eric', 'Umar', 'Tanya', 'Austin', 'Victor', 'Donald',
'Bailey', 'Byron', 'Arjun', 'Mitchell', 'Patrick', 'Jeremy (Jere)', 'Ebony', 'Harmony', 'Farhan', 'Stefan (Stevie)',
'Elena', 'Ismail', 'Sebastian', 'Hassan', 'Cain', 'Harvey', 'Zakariya', 'Shaun', 'Fergus', 'Lucas', 'Albert (Al)', 'Hugo', 'Lorenzo (Larry)',
'Alfie', 'Aidan', 'Travis', 'Jimmy (Jim)', 'Leo', 'Raphael', 'Leon', 'Ebony', 'Ernest', 'Ioan', 'Eric', 'Jamie (Jim)', 'Roman', 'Aadam', 'Jim',
'Hashim', 'Eugene (Gene)', 'Jodie', 'Jeremy (Jere)', 'Jared', 'Solomon', 'Arran', 'Declan', 'Matteo (Matt)', 'Khalid', 
'Harold (Harry)', 'Ismail', 'Fabian', 'Hamzah', 'Shane', 'Esme', 'Herman', 'Julia', 'Karl', 'Frazer', 'Adam', 'Zakaria', 'Mohammad', 
'Angus (Gus)', 'Leroy', 'Thomas', 'Albert (Al)', 'Austin', 'Hugh', 'Franklin (Frank)', 'Bernard', 'Nicolas (Nicolo)', 'Ahmed', 'Tony', 
'Harmony', 'Grover', 'Edgar', 'Hector', 'Warren', 'Bilal', 'Leonardo (Lenard)', 'Ted', 'Homer', 'Muhammad', 'Rebekah', 'Callum', 
'Martin (Marty)', 'Amir', 'Darren', 'Georgie (Gorka)', 'Theo', 'Andre (Dru)', 'Allen', 'Hasan', 'Brandon', 'Frankie (Paquito)', 
'Chester', 'Jak', 'Adrian', 'Paul', 'Abraham (Abe)', 'Saif', 'Spencer', 'Ronan', 'Eden', 'Joseph (Joe)', 'Marcus', 'Tomos', 'Imran', 
'Freddy (Frici)', 'Miles', 'Jeffrey', 'Kira', 'Rafael', 'Claudia', 'Jasper', 'Lee', 'Nora', 'Ronnie', 'Xander', 'Ciaran (Kierce)', 
'Layton', 'Dean', 'Terry', 'Bryan', 'Kane', 'Lee', 'Zack', 'Calvin', 'Ralph', 'Yusuf', 'Daniel (Dan)', 'Eden', 'Theo', 'Gethin',
'Keith', 'Connor', 'Rebekah', 'Claudia', 'Leroy', 'Steven (Stevie)', 'Gary', 'Amaan', 'Jackson', 'Zakariya', 'Lorenzo (Renzo)', 
'Maxwell (Max)', 'Mathew (Mate)', 'Maxim', 'Patrick', 'Mohammed', 'Carlos', 'Tanya', 'Lucas', 'Rafael', 'Aadam', 'Ted', 'Chris', 'Darren', 
'Ronald (Ronny)', 'Arjun', 'Justin', 'Jasper', 'Martin (Marty)', 'Jamal', 'Pearl', 'Oscar', 'Sam', 'Ibrahim', 'Frankie (Paquito)', 
'Hussain', 'Shaun', 'Jay', 'Phillip', 'Alfred (Freddy)', 'Ruben', 'Herbert', 'Will', 'Marc', 'Freddy (Frici)', 'Dean', 'Louis', 
'Howard', 'Thomas', 'Owain', 'Clayton', 'Peter (Pete)', 'Max', 'Walter', 'Haroon', 'Aaron', 'Dennis (Dion)', 'Allen', 'Paul', 'Tristan', 
'Kyron', 'Euan', 'Jenson (Gino)', 'Saif', 'Vincent', 'Khalid', 'Alan (Al)', 'Owen', 'Harley', 'Yasin', 'Elena', 'Erik', 'Zak', 'Sonny', 
'Frank', 'Keaton', 'Marco', 'Ieuan', 'Billy (Bill)', 'Mark', 'Jared', 'Ben', 'Reuben', 'Ajay', 'Ismail', 'Maya', 'Marcel', 'Junior', 
'Georgie (Gorka)', 'Sana','Leia', 'Sadie', 'Jose', 'Liberty', 'Bella', 'Caitlin', 'Sara', 'Sinead', 'Priya', 'Ray', 'Matilda',
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
'Max', 'Chester', 'Ronnie', 'Brendan (Bran)', 'Mohammed', 'Euan', 'Laurence (Larry)', 'Eliza', 'Umar', 'Tobias', 'Musa', 'Xander',
'William', 'Daniel (Dan)', 'John (Jax)', 'Thomas', 'Dewey', 'Jacob', 'Christopher (Chris)', 'Joseph (Joe)', 'Ethan', 'Charles (Charley)',
'Benjamin (Ben)', 'Callum', 'Mohammed', 'Luke', 'Oliver (Ollie)', 'Harry', 'Adam', 'Jake', 'Harrison', 'Samuel (Sami)', 'Nathan', 'Jack',
'Matthew (Mate)', 'Robert (Bob)', 'Henry (Hank)', 'David (Dave)', 'Liam (Bill)', 'Joshua (Joss)', 'Louis', 'Edward', 'Aaron',
'Michael (Mickey)', 'Richard (Ricky)', 'Muhammad', 'James (Jamie)', 'Haider', 'Euan', 'Elmer', 'Haroon', 'Jenson (Jack)', 'Gethin',
'Bernard', 'Zack', 'Maximillian', 'Dexter', 'Kian', 'Hugh', 'Jackson', 'Georgie (Gorka)', 'Jakob (Jake)', 'Mark', 'Saif', 'Kyron',
'Mohamed', 'Anika', 'Ronan', 'Zach', 'Ibrahim', 'Jean (Gino)', 'Martin (Marty)', 'Chester', 'Warren', 'Conner', 'Tommy (Tomek)',
'Vincent', 'Jessie', 'Melvin', 'Kelly', 'Lukas', 'Tia', 'Russell (Rusty)', 'Eric', 'Umar', 'Tanya', 'Austin', 'Victor', 'Donald',
'Bailey', 'Byron', 'Arjun', 'Mitchell', 'Patrick', 'Jeremy (Jere)', 'Ebony', 'Harmony', 'Farhan', 'Stefan (Stevie)',
'Elena', 'Ismail', 'Sebastian', 'Hassan', 'Cain', 'Harvey', 'Zakariya', 'Shaun', 'Fergus', 'Lucas', 'Albert (Al)', 'Hugo', 'Lorenzo (Larry)',
'Alfie', 'Aidan', 'Travis', 'Jimmy (Jim)', 'Leo', 'Raphael', 'Leon', 'Ebony', 'Ernest', 'Ioan', 'Eric', 'Jamie (Jim)', 'Roman', 'Aadam', 'Jim',
'Hashim', 'Eugene (Gene)', 'Jodie', 'Jeremy (Jere)', 'Jared', 'Solomon', 'Arran', 'Declan', 'Matteo (Matt)', 'Khalid', 
'Harold (Harry)', 'Ismail', 'Fabian', 'Hamzah', 'Shane', 'Esme', 'Herman', 'Julia', 'Karl', 'Frazer', 'Adam', 'Zakaria', 'Mohammad', 
'Angus (Gus)', 'Leroy', 'Thomas', 'Albert (Al)', 'Austin', 'Hugh', 'Franklin (Frank)', 'Bernard', 'Nicolas (Nicolo)', 'Ahmed', 'Tony', 
'Harmony', 'Grover', 'Edgar', 'Hector', 'Warren', 'Bilal', 'Leonardo (Lenard)', 'Ted', 'Homer', 'Muhammad', 'Rebekah', 'Callum', 
'Martin (Marty)', 'Amir', 'Darren', 'Georgie (Gorka)', 'Theo', 'Andre (Dru)', 'Allen', 'Hasan', 'Brandon', 'Frankie (Paquito)', 
'Chester', 'Jak', 'Adrian', 'Paul', 'Abraham (Abe)', 'Saif', 'Spencer', 'Ronan', 'Eden', 'Joseph (Joe)', 'Marcus', 'Tomos', 'Imran', 
'Freddy (Frici)', 'Miles', 'Jeffrey', 'Kira', 'Rafael', 'Claudia', 'Jasper', 'Lee', 'Nora', 'Ronnie', 'Xander', 'Ciaran (Kierce)', 
'Layton', 'Dean', 'Terry', 'Bryan', 'Kane', 'Lee', 'Zack', 'Calvin', 'Ralph', 'Yusuf', 'Daniel (Dan)', 'Eden', 'Theo', 'Gethin',
'Keith', 'Connor', 'Rebekah', 'Claudia', 'Leroy', 'Steven (Stevie)', 'Gary', 'Amaan', 'Jackson', 'Zakariya', 'Lorenzo (Renzo)', 
'Maxwell (Max)', 'Mathew (Mate)', 'Maxim', 'Patrick', 'Mohammed', 'Carlos', 'Tanya', 'Lucas', 'Rafael', 'Aadam', 'Ted', 'Chris', 'Darren', 
'Ronald (Ronny)', 'Arjun', 'Justin', 'Jasper', 'Martin (Marty)', 'Jamal', 'Pearl', 'Oscar', 'Sam', 'Ibrahim', 'Frankie (Paquito)', 
'Hussain', 'Shaun', 'Jay', 'Phillip', 'Alfred (Freddy)', 'Ruben', 'Herbert', 'Will', 'Marc', 'Freddy (Frici)', 'Dean', 'Louis', 
'Howard', 'Thomas', 'Owain', 'Clayton', 'Peter (Pete)', 'Max', 'Walter', 'Haroon', 'Aaron', 'Dennis (Dion)', 'Allen', 'Paul', 'Tristan', 
'Kyron', 'Euan', 'Jenson (Gino)', 'Saif', 'Vincent', 'Khalid', 'Alan (Al)', 'Owen', 'Harley', 'Yasin', 'Elena', 'Erik', 'Zak', 'Sonny', 
'Frank', 'Keaton', 'Marco', 'Ieuan', 'Billy (Bill)', 'Mark', 'Jared', 'Ben', 'Reuben', 'Ajay', 'Ismail', 'Maya', 'Marcel', 'Junior', 
'Georgie (Gorka)', 'Sana',
'Leia', 'Sadie', 'Jose', 'Liberty', 'Bella', 'Caitlin', 'Sara', 'Sinead', 'Priya', 'Ray', 'Matilda',
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
'Max', 'Chester', 'Ronnie', 'Brendan (Bran)', 'Mohammed', 'Euan', 'Laurence (Larry)', 'Eliza', 'Umar', 'Tobias', 'Musa', 'Xander',
'William', 'Daniel (Dan)', 'John (Jax)', 'Thomas', 'Dewey', 'Jacob', 'Christopher (Chris)', 'Joseph (Joe)', 'Ethan', 'Charles (Charley)',
'Benjamin (Ben)', 'Callum', 'Mohammed', 'Luke', 'Oliver (Ollie)', 'Harry', 'Adam', 'Jake', 'Harrison', 'Samuel (Sami)', 'Nathan', 'Jack',
'Matthew (Mate)', 'Robert (Bob)', 'Henry (Hank)', 'David (Dave)', 'Liam (Bill)', 'Joshua (Joss)', 'Louis', 'Edward', 'Aaron',
'Michael (Mickey)', 'Richard (Ricky)', 'Muhammad', 'James (Jamie)', 'Haider', 'Euan', 'Elmer', 'Haroon', 'Jenson (Jack)', 'Gethin',
'Bernard', 'Zack', 'Maximillian', 'Dexter', 'Kian', 'Hugh', 'Jackson', 'Georgie (Gorka)', 'Jakob (Jake)', 'Mark', 'Saif', 'Kyron',
'Mohamed', 'Anika', 'Ronan', 'Zach', 'Ibrahim', 'Jean (Gino)', 'Martin (Marty)', 'Chester', 'Warren', 'Conner', 'Tommy (Tomek)',
'Vincent', 'Jessie', 'Melvin', 'Kelly', 'Lukas', 'Tia', 'Russell (Rusty)', 'Eric', 'Umar', 'Tanya', 'Austin', 'Victor', 'Donald',
'Bailey', 'Byron', 'Arjun', 'Mitchell', 'Patrick', 'Jeremy (Jere)', 'Ebony', 'Harmony', 'Farhan', 'Stefan (Stevie)',
'Elena', 'Ismail', 'Sebastian', 'Hassan', 'Cain', 'Harvey', 'Zakariya', 'Shaun', 'Fergus', 'Lucas', 'Albert (Al)', 'Hugo', 'Lorenzo (Larry)',
'Alfie', 'Aidan', 'Travis', 'Jimmy (Jim)', 'Leo', 'Raphael', 'Leon', 'Ebony', 'Ernest', 'Ioan', 'Eric', 'Jamie (Jim)', 'Roman', 'Aadam', 'Jim',
'Hashim', 'Eugene (Gene)', 'Jodie', 'Jeremy (Jere)', 'Jared', 'Solomon', 'Arran', 'Declan', 'Matteo (Matt)', 'Khalid', 
'Harold (Harry)', 'Ismail', 'Fabian', 'Hamzah', 'Shane', 'Esme', 'Herman', 'Julia', 'Karl', 'Frazer', 'Adam', 'Zakaria', 'Mohammad', 
'Angus (Gus)', 'Leroy', 'Thomas', 'Albert (Al)', 'Austin', 'Hugh', 'Franklin (Frank)', 'Bernard', 'Nicolas (Nicolo)', 'Ahmed', 'Tony', 
'Harmony', 'Grover', 'Edgar', 'Hector', 'Warren', 'Bilal', 'Leonardo (Lenard)', 'Ted', 'Homer', 'Muhammad', 'Rebekah', 'Callum', 
'Martin (Marty)', 'Amir', 'Darren', 'Georgie (Gorka)', 'Theo', 'Andre (Dru)', 'Allen', 'Hasan', 'Brandon', 'Frankie (Paquito)', 
'Chester', 'Jak', 'Adrian', 'Paul', 'Abraham (Abe)', 'Saif', 'Spencer', 'Ronan', 'Eden', 'Joseph (Joe)', 'Marcus', 'Tomos', 'Imran', 
'Freddy (Frici)', 'Miles', 'Jeffrey', 'Kira', 'Rafael', 'Claudia', 'Jasper', 'Lee', 'Nora', 'Ronnie', 'Xander', 'Ciaran (Kierce)', 
'Layton', 'Dean', 'Terry', 'Bryan', 'Kane', 'Lee', 'Zack', 'Calvin', 'Ralph', 'Yusuf', 'Daniel (Dan)', 'Eden', 'Theo', 'Gethin',
'Keith', 'Connor', 'Rebekah', 'Claudia', 'Leroy', 'Steven (Stevie)', 'Gary', 'Amaan', 'Jackson', 'Zakariya', 'Lorenzo (Renzo)', 
'Maxwell (Max)', 'Mathew (Mate)', 'Maxim', 'Patrick', 'Mohammed', 'Carlos', 'Tanya', 'Lucas', 'Rafael', 'Aadam', 'Ted', 'Chris', 'Darren', 
'Ronald (Ronny)', 'Arjun', 'Justin', 'Jasper', 'Martin (Marty)', 'Jamal', 'Pearl', 'Oscar', 'Sam', 'Ibrahim', 'Frankie (Paquito)', 
'Hussain', 'Shaun', 'Jay', 'Phillip', 'Alfred (Freddy)', 'Ruben', 'Herbert', 'Will', 'Marc', 'Freddy (Frici)', 'Dean', 'Louis', 
'Howard', 'Thomas', 'Owain', 'Clayton', 'Peter (Pete)', 'Max', 'Walter', 'Haroon', 'Aaron', 'Dennis (Dion)', 'Allen', 'Paul', 'Tristan', 
'Kyron', 'Euan', 'Jenson (Gino)', 'Saif', 'Vincent', 'Khalid', 'Alan (Al)', 'Owen', 'Harley', 'Yasin', 'Elena', 'Erik', 'Zak', 'Sonny', 
'Frank', 'Keaton', 'Marco', 'Ieuan', 'Billy (Bill)', 'Mark', 'Jared', 'Ben', 'Reuben', 'Ajay', 'Ismail', 'Maya', 'Marcel', 'Junior', 
'Georgie (Gorka)', 'Sana','Leia', 'Sadie', 'Jose', 'Liberty', 'Bella', 'Caitlin', 'Sara', 'Sinead', 'Priya', 'Ray', 'Matilda',
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
'Max', 'Chester', 'Ronnie', 'Brendan (Bran)', 'Mohammed', 'Euan', 'Laurence (Larry)', 'Eliza', 'Umar', 'Tobias', 'Musa', 'Xander',
'William', 'Daniel (Dan)', 'John (Jax)', 'Thomas', 'Dewey', 'Jacob', 'Christopher (Chris)', 'Joseph (Joe)', 'Ethan', 'Charles (Charley)',
'Benjamin (Ben)', 'Callum', 'Mohammed', 'Luke', 'Oliver (Ollie)', 'Harry', 'Adam', 'Jake', 'Harrison', 'Samuel (Sami)', 'Nathan', 'Jack',
'Matthew (Mate)', 'Robert (Bob)', 'Henry (Hank)', 'David (Dave)', 'Liam (Bill)', 'Joshua (Joss)', 'Louis', 'Edward', 'Aaron',
'Michael (Mickey)', 'Richard (Ricky)', 'Muhammad', 'James (Jamie)', 'Haider', 'Euan', 'Elmer', 'Haroon', 'Jenson (Jack)', 'Gethin',
'Bernard', 'Zack', 'Maximillian', 'Dexter', 'Kian', 'Hugh', 'Jackson', 'Georgie (Gorka)', 'Jakob (Jake)', 'Mark', 'Saif', 'Kyron',
'Mohamed', 'Anika', 'Ronan', 'Zach', 'Ibrahim', 'Jean (Gino)', 'Martin (Marty)', 'Chester', 'Warren', 'Conner', 'Tommy (Tomek)',
'Vincent', 'Jessie', 'Melvin', 'Kelly', 'Lukas', 'Tia', 'Russell (Rusty)', 'Eric', 'Umar', 'Tanya', 'Austin', 'Victor', 'Donald',
'Bailey', 'Byron', 'Arjun', 'Mitchell', 'Patrick', 'Jeremy (Jere)', 'Ebony', 'Harmony', 'Farhan', 'Stefan (Stevie)',
'Elena', 'Ismail', 'Sebastian', 'Hassan', 'Cain', 'Harvey', 'Zakariya', 'Shaun', 'Fergus', 'Lucas', 'Albert (Al)', 'Hugo', 'Lorenzo (Larry)',
'Alfie', 'Aidan', 'Travis', 'Jimmy (Jim)', 'Leo', 'Raphael', 'Leon', 'Ebony', 'Ernest', 'Ioan', 'Eric', 'Jamie (Jim)', 'Roman', 'Aadam', 'Jim',
'Hashim', 'Eugene (Gene)', 'Jodie', 'Jeremy (Jere)', 'Jared', 'Solomon', 'Arran', 'Declan', 'Matteo (Matt)', 'Khalid', 
'Harold (Harry)', 'Ismail', 'Fabian', 'Hamzah', 'Shane', 'Esme', 'Herman', 'Julia', 'Karl', 'Frazer', 'Adam', 'Zakaria', 'Mohammad', 
'Angus (Gus)', 'Leroy', 'Thomas', 'Albert (Al)', 'Austin', 'Hugh', 'Franklin (Frank)', 'Bernard', 'Nicolas (Nicolo)', 'Ahmed', 'Tony', 
'Harmony', 'Grover', 'Edgar', 'Hector', 'Warren', 'Bilal', 'Leonardo (Lenard)', 'Ted', 'Homer', 'Muhammad', 'Rebekah', 'Callum', 
'Martin (Marty)', 'Amir', 'Darren', 'Georgie (Gorka)', 'Theo', 'Andre (Dru)', 'Allen', 'Hasan', 'Brandon', 'Frankie (Paquito)', 
'Chester', 'Jak', 'Adrian', 'Paul', 'Abraham (Abe)', 'Saif', 'Spencer', 'Ronan', 'Eden', 'Joseph (Joe)', 'Marcus', 'Tomos', 'Imran', 
'Freddy (Frici)', 'Miles', 'Jeffrey', 'Kira', 'Rafael', 'Claudia', 'Jasper', 'Lee', 'Nora', 'Ronnie', 'Xander', 'Ciaran (Kierce)', 
'Layton', 'Dean', 'Terry', 'Bryan', 'Kane', 'Lee', 'Zack', 'Calvin', 'Ralph', 'Yusuf', 'Daniel (Dan)', 'Eden', 'Theo', 'Gethin',
'Keith', 'Connor', 'Rebekah', 'Claudia', 'Leroy', 'Steven (Stevie)', 'Gary', 'Amaan', 'Jackson', 'Zakariya', 'Lorenzo (Renzo)', 
'Maxwell (Max)', 'Mathew (Mate)', 'Maxim', 'Patrick', 'Mohammed', 'Carlos', 'Tanya', 'Lucas', 'Rafael', 'Aadam', 'Ted', 'Chris', 'Darren', 
'Ronald (Ronny)', 'Arjun', 'Justin', 'Jasper', 'Martin (Marty)', 'Jamal', 'Pearl', 'Oscar', 'Sam', 'Ibrahim', 'Frankie (Paquito)', 
'Hussain', 'Shaun', 'Jay', 'Phillip', 'Alfred (Freddy)', 'Ruben', 'Herbert', 'Will', 'Marc', 'Freddy (Frici)', 'Dean', 'Louis', 
'Howard', 'Thomas', 'Owain', 'Clayton', 'Peter (Pete)', 'Max', 'Walter', 'Haroon', 'Aaron', 'Dennis (Dion)', 'Allen', 'Paul', 'Tristan', 
'Kyron', 'Euan', 'Jenson (Gino)', 'Saif', 'Vincent', 'Khalid', 'Alan (Al)', 'Owen', 'Harley', 'Yasin', 'Elena', 'Erik', 'Zak', 'Sonny', 
'Frank', 'Keaton', 'Marco', 'Ieuan', 'Billy (Bill)', 'Mark', 'Jared', 'Ben', 'Reuben', 'Ajay', 'Ismail', 'Maya', 'Marcel', 'Junior', 
'Georgie (Gorka)', 'Sana']

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

names.forEach((name,i)=>{
    //console.log(name.split('(')[0])
    names[i]= name.split('(')[0]
})
shuffle(names)

function repeatThisSoManyTimes(amount, callback){
    if(typeof callback == 'function'){
        for(i=0;i<amount;i++){
            callback()
        }
    }
}

let temparray=[]
function sizeGenerator(length){
    let tempsize = ['small','tall','small','tall','small','tall','grande','medium','grande','medium','grande','medium','grande','medium','grande','medium','grande','medium','venti','large','venti','large','venti','large','venti','large','venti','large','short']
    
    for(i=0;i<length;i++){
        let randomNum = Math.floor(Math.random() * tempsize.length)
        temparray.push(tempsize[randomNum])
    }
}
sizeGenerator(100)

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

function customerMaker(drinkType,hotOrIced,wantToNotInclude,tagLine,modifies,methods,byAmount){
    if(typeof drinkType === 'string' && typeof hotOrIced === 'string'){
        coreDrinks[drinkType].forEach((element,i)=>{
            elem = JSON.parse(JSON.stringify(element))
            // checks whether an element name includes the unincluded words
            let even 
            
            if(wantToNotInclude.length>=2){
                even = (value) => elem.name.includes(value)
            }else{
                even = (value) => !elem.name.includes(value)
            }
            //console.log(wantToNotInclude.some(even))
            if(!wantToNotInclude.some(even)){
                
                if(elem[hotOrIced]===true || drinkType==='blended'){
                    if(drinkType==='blended'){
                        customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[1 + Number(customers[customers.length-1].id)]}`,`${sizes[i]}${tagLine[0]}${tagLine[1]} ${elem.name} ${tagLine[2]}`))
                    }else{
                        customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[1 + Number(customers[customers.length-1].id)]}`,`${sizes[i]}${tagLine[0]} ${hotOrIced}${tagLine[1]} ${elem.name} ${tagLine[2]}`))
                    }

                    //changes Drink Contents
                    elem[`menuBuild${capitalizeFirstLetter(hotOrIced)}`].size = translateSize(sizes[i]) //Changes Drink Size
                    if(Array.isArray(modifies) && modifies.length === methods.length && byAmount.length === methods.length){
                        modifies.forEach((notImportant, i)=>{
                            if(methods[i]==='push'){
                                elem[`menuBuild${capitalizeFirstLetter(hotOrIced)}`][modifies[i]].push(byAmount[i])
                            }
                            if(methods[i]==='change'){
                                elem[`menuBuild${capitalizeFirstLetter(hotOrIced)}`][modifies[i]] = (byAmount[i])
                            }
                            if(methods[i]==='changeMilk'){
                                elem[`menuBuild${capitalizeFirstLetter(hotOrIced)}`][modifies[i]][0] = (byAmount[i])
                            }
                        })
                    }


                    // if(method1==='push'){
                    // elem[`menuBuild${capitalizeFirstLetter(hotOrIced)}`][modifies].push(amount1)
                    // }
                    // if(method1==='change'){
                    //     elem[`menuBuild${capitalizeFirstLetter(hotOrIced)}`][modifies] = amount1
                    // }
                    // if(method1==='changeMilk'){
                    //     elem[`menuBuild${capitalizeFirstLetter(hotOrIced)}`][modifies][0] = amount1
                    // }


                    customerCorrectAnswers.push(elem[`menuBuild${capitalizeFirstLetter(hotOrIced)}`])
                    
                }
            }
            
    })
}
}

Object.keys(customizations.milk).forEach((data)=>{
    let milk =customizations.milk[data]
    if(milk.type==='milk'){
        if(!data.includes('1')){
            if(milk.abbr.includes('/') || milk.abbr.includes('CRM')){
                customerMaker('brewed','hot',['Coffee','Decaf','Pour Over','Misto'],['','',`with a splash of ${data.split('with ')[1]}`],['milk'],['push'],[milk.abbr])
                customerMaker('brewed','hot',['Coffee','Decaf','Pour Over','Misto'],['','',`with a splash of ${data.split('with ')[1]} and 3 blonde shots`],['milk','shots','decaf'],['push','change','push'],[milk.abbr,[3,3,3,3,null],'B'])
                customerMaker('brewed','iced',['w/','Cream','Refill','Decaf'],['','',`with a splash of ${data.split('with ')[1]}`],['milk'],['push'],[milk.abbr])
                customerMaker('espresso','hot',['Americano'],['','',`with a splash of ${data.split('with ')[1]}`],['milk'],['push'],[milk.abbr])
                customerMaker('brewed','iced',['Roast','Misto','Iced','Decaf','w/','Refill','Cream'],['','',`with a splash of ${data.split('with ')[1]}`],['milk'],['push'],[milk.abbr])
            }else{
                customerMaker('espresso','hot',['Con Panna','Espresso','Americano'],['','',`with ${data}`],['milk'],['changeMilk'],[milk.abbr])
                customerMaker('espresso','iced',['Con Panna','Espresso','Americano'],['',' quad',`with ${data}`],['milk','shots'],['changeMilk','change'],[milk.abbr,[null,4,4,4,null]])
                customerMaker('espresso','iced',['Con Panna','Espresso','Americano'],['','',`with ${data}`],['milk'],['changeMilk'],[milk.abbr])
                customerMaker('blended','iced',['Lemonade', '****'],['','',`with ${data}`],['milk'],['changeMilk'],[milk.abbr])
                customerMaker('brewed','hot',['Misto'],['','',`with ${data}`],['milk'],['changeMilk'],[milk.abbr])
                customerMaker('brewed','hot',['Misto'],['','',`with ${data} and add 3 shots`],['milk','shots'],['changeMilk','change'],[milk.abbr,[3,3,3,3,null]])
                customerMaker('brewed','hot',['Misto'],['','',`with ${data} and add 3 blonde shots`],['milk','shots','decaf'],['changeMilk','change','push'],[milk.abbr,[3,3,3,3,null],'B'])
                
                //customerMaker('tea','hot',['Latte'],`with ${data}`,'milk','changeMilk',milk.abbr)
            }
        }
    }
})



coreDrinks.espresso.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.hot===true && elem.name!=='Espresso Con Panna' && elem.name!=='Espresso' && elem.name!=='Espresso Macchiatto'){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[1 + Number(customers[customers.length-1].id)]}`,`${sizes[i]} hot ${elem.name}`))
    //console.log(i)
    //console.log(elem)
    elem.menuBuildHot.size = translateSize(sizes[i])
    
    customerCorrectAnswers.push(elem.menuBuildHot)
    
}
})
coreDrinks.espresso.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.hot===true && elem.name!=='Espresso Con Panna' && elem.name!=='Espresso' && elem.name!=='Espresso Macchiatto'){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[1 + Number(customers[customers.length-1].id)]}`,`${sizes[i]} triple hot ${elem.name}`))
    elem.menuBuildHot.size = translateSize(sizes[i])
    
    elem.menuBuildHot.shots= [3,3,3,3,null]
    customerCorrectAnswers.push(elem.menuBuildHot)
    
}
})
coreDrinks.espresso.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.hot===true && elem.name!=='Espresso Con Panna' && elem.name!=='Espresso' && elem.name!=='Espresso Macchiatto'){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[1 + Number(customers[customers.length-1].id)]}`,`${sizes[i]} triple hot blonde ${elem.name}`))
    elem.menuBuildHot.size = translateSize(sizes[i])
    
    if(!elem.menuBuildHot.decaf.includes('B')){
        elem.menuBuildHot.decaf.push('B')
    }
    elem.menuBuildHot.shots= [3,3,3,3,null]
    customerCorrectAnswers.push(elem.menuBuildHot)
    
}
})
coreDrinks.espresso.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.hot===true && elem.name!=='Espresso Con Panna' && elem.name!=='Espresso' && elem.name!=='Espresso Macchiatto'){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[1 + Number(customers[customers.length-1].id)]}`,`${sizes[i]} quad hot blonde ${elem.name}`))
    elem.menuBuildHot.size = translateSize(sizes[i])
    
    if(!elem.menuBuildHot.decaf.includes('B')){
        elem.menuBuildHot.decaf.push('B')
    }
    elem.menuBuildHot.shots= [4,4,4,4,null]
    customerCorrectAnswers.push(elem.menuBuildHot)
    
}
})
coreDrinks.espresso.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.hot===true && elem.name!=='Espresso Con Panna' && elem.name!=='Espresso' && elem.name!=='Espresso Macchiatto'){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[1 + Number(customers[customers.length-1].id)]}`,`${sizes[i]} quad hot decaf ${elem.name}`))
    elem.menuBuildHot.size = translateSize(sizes[i])
    
    elem.menuBuildHot.decaf.push('D')
    elem.menuBuildHot.shots= [4,4,4,4,null]
    customerCorrectAnswers.push(elem.menuBuildHot)
    
}
})
coreDrinks.espresso.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.hot===true && elem.name!=='Espresso Con Panna' && elem.name!=='Espresso' && elem.name!=='Espresso Macchiatto'){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[1 + Number(customers[customers.length-1].id)]}`,`${sizes[i]} hot half-decaf ${elem.name}`))
    elem.menuBuildHot.size = translateSize(sizes[i])
    
    elem.menuBuildHot.decaf.push('1/2 D')
    customerCorrectAnswers.push(elem.menuBuildHot)
    
}
})
coreDrinks.espresso.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.iced===true && elem.menuBuildIced!==undefined){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[1 + Number(customers[customers.length-1].id)]}`,`${sizes[i]} iced ${elem.name}`))
    elem.menuBuildIced.size = translateSize(sizes[i])
    customerCorrectAnswers.push(elem.menuBuildIced)
    
    }
})
coreDrinks.espresso.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.iced===true && elem.menuBuildIced!==undefined){
        customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[1 + Number(customers[customers.length-1].id)]}`,`${sizes[i]} triple iced ${elem.name}`))
        elem.menuBuildIced.size = translateSize(sizes[i])
        elem.menuBuildIced.shots= [null,3,3,3,null]
        customerCorrectAnswers.push(elem.menuBuildIced)
    }
})
coreDrinks.brewed.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.iced===true && elem.menuBuildIced!==undefined){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[1 + Number(customers[customers.length-1].id)]}`,`${sizes[i]} ${elem.name}`))
    elem.menuBuildIced.size = translateSize(sizes[i])
    customerCorrectAnswers.push(elem.menuBuildIced)
    
    }
})
coreDrinks.blended.forEach((element,i)=>{
    
    elem = JSON.parse(JSON.stringify(element))
    if(elem.hot===false && elem.menuBuildIced!==undefined){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[1 + Number(customers[customers.length-1].id)]}`,`${sizes[i]} ${elem.name}`))
    elem.menuBuildIced.size = translateSize(sizes[i])
    customerCorrectAnswers.push(elem.menuBuildIced)
    
    }
})
//make hot brewed coffee customers
coreDrinks.brewed.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.hot===true && elem.name!=='Espresso Con Panna' && elem.name!=='Espresso' && elem.name!=='Espresso Macchiatto'){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[1 + Number(customers[customers.length-1].id)]}`,`${sizes[i]} hot ${elem.name}`))
    elem.menuBuildHot.size = translateSize(sizes[i])
    
    customerCorrectAnswers.push(elem.menuBuildHot)
}
})









coreDrinks.tea.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.hot===true && ! elem.name.includes('Custom') && elem.name!=='Espresso' && elem.name!=='Espresso Macchiatto'){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[1 + Number(customers[customers.length-1].id)]}`,`${sizes[i]} hot ${elem.name}`))
    elem.menuBuildHot.size = translateSize(sizes[i])
    
    customerCorrectAnswers.push(elem.menuBuildHot)
}
})
coreDrinks.tea.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.iced===true && elem.menuBuildIced!==undefined){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[1 + Number(customers[customers.length-1].id)]}`,`${sizes[i]} ${elem.name}`))
    if(elem.name.toLowerCase().includes('latte')){
        //console.log('latte')
        customers[Number(customers[customers.length-1].id)].phrase = `${sizes[i]} iced ${elem.name}`
    }
    //console.log(customers[Number(customers[customers.length-1].id)].phrase)
    elem.menuBuildIced.size = translateSize(sizes[i])
    customerCorrectAnswers.push(elem.menuBuildIced)
    
    }
})
coreDrinks.blended.forEach((element,i)=>{
    
    elem = JSON.parse(JSON.stringify(element))
    if(elem.hot===false && elem.menuBuildIced!==undefined && !elem.name.includes('Strawberry')){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[1 + Number(customers[customers.length-1].id)]}`,`${sizes[i]} ${elem.name} with a shot`))
    elem.menuBuildIced.size = translateSize(sizes[i])
    elem.menuBuildIced.shots =[null,1,1,1,null]
    customerCorrectAnswers.push(elem.menuBuildIced)
    
    }
})

coreDrinks.other.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.hot===true && elem.name!=='Espresso Con Panna' && elem.name!=='Espresso' && elem.name!=='Espresso Macchiatto'){
        customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[1 + Number(customers[customers.length-1].id)]}`,`${sizes[i]} hot ${elem.name}`))
        elem.menuBuildHot.size = translateSize(sizes[i])

        
        
        customerCorrectAnswers.push(elem.menuBuildHot)
        
    }
})
repeatThisSoManyTimes(1, ()=> coreDrinks.other.forEach((element,i)=>{
    elem = JSON.parse(JSON.stringify(element))
    if(elem.iced===true && elem.menuBuildIced!==undefined){
    customers.push(new CustomerMaker(`${Number(customers[customers.length-1].id) +1}`,`${names[1 + Number(customers[customers.length-1].id)]}`,`${sizes[i]} ${elem.name}`))
    elem.menuBuildIced.size = translateSize(sizes[i])
    if(elem.name.includes('Refresher') && !elem.name.includes('Lemonade')){
        customers[Number(customers[customers.length-1].id)].phrase = `${sizes[i]} ${elem.name} with water`
    }
    customerCorrectAnswers.push(elem.menuBuildIced)
    
    }
}))





console.log(`There ${customers.length} customers made. ${names.length}  unique names. ${sizes.length} sizes. This ${customers.length <= names.length && customers.length<=sizes.length ? 'is' : "isn't"} generatable`)


module.exports={
    correct: customerCorrectAnswers,
    customer: customers,
    customerNames: names,
}