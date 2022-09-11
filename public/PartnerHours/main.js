



//cal.addEvent('Demo Event', 'This is an all day event', 'Nome, AK', '8/7/2013', '8/7/2013');
var cal = ics(); // yes, you can have multiple events :-)\

document.querySelector('.submit').addEventListener('click',()=>{
  
  let words = document.querySelector('.textarea').innerText
  convertTextToCalendar(words)
})
//beforeText = document.querySelector('.textarea').innerText

const d = new Date();
let month = d.getMonth() + 1;
let year = d.getFullYear();
let monthAdjusted = month
if(month.toString().length<2){
  monthAdjusted= `0${month}`
}
document.querySelector('.monthSelect').value = `${year}-${monthAdjusted}`  

function convertTextToCalendar(input){
  
  input = input.replace(/(\r\n|\n|\r)/gm, " ");
  console.log(input)
  let textStrings =[]
  let beforeText = input
  beforeText = beforeText.replace(/[^a-zA-Z0-9,: ]/g, '')
  //beforeText = beforeText.replace(/(\r\n|\n|\r)/gm, ' ')
  let indexes = []
  month = Number(document.querySelector('.monthSelect').value.split('-')[1])
  beforeText.split(' ').forEach((elem,i)=>{
    //console.log(elem)
      if(elem.toLowerCase()==='mon' || elem.toLowerCase()==='tue' || elem.toLowerCase()==='wed' || elem.toLowerCase()==='thu'|| elem.toLowerCase()==='fri'|| elem.toLowerCase()==='eri'|| elem.toLowerCase()==='sat'|| elem.toLowerCase()==='sun'){
          indexes.push(i)
      }
  })
  console.log(indexes)
  indexes.forEach((num,i)=>{
      let indexSize = indexes[i+1] -num
      if(isNaN(indexSize)){
          indexSize=100
      }
      textStrings.push(beforeText.split(' ').splice(indexes[i],indexSize).join(' '))
  })
  console.log(textStrings)
    let datesArray = []
  textStrings.forEach((string,s)=>{
    let date
    let startTime
    let endTime

    let times = []
    let amPm = []
    //console.log(string)
    string.split(' ').forEach((elem,i)=>{
      //console.log(Number(elem))
      if(elem==='Mon' || elem==='Tue' || elem==='Wed'|| elem==='Eri'|| elem==='Thu'|| elem==='Fri'|| elem==='Sat'|| elem==='Sun'){
        // console.log(elem)
        // console.log(string.split(' ')[i+2])
      }
      if(Number(elem)<=31 && !isNaN(Number(elem)) && elem != ''){
        //console.log(elem)
        date = elem
      }
      if(elem.includes(':')){
        times.push(elem)
        if(string.split(' ')[i+1].toLowerCase() ==='am'){
          startTime =`${elem} ${string.split(' ')[i+1]}`
        }
        if(string.split(' ')[i+1].toLowerCase() ==='pm'){
          endTime =`${elem} ${string.split(' ')[i+1]}`
        }
      }
      if(elem.includes('AM')||elem.includes('PM')){
        amPm.push(elem)
      }
      
    })
    startTime =`${times[0]} ${amPm[0]}`
    endTime =`${times[1]} ${amPm[1]}`
    //console.log(string.toLowerCase().includes('off'))
    //console.log(`${month}/${date}/${year} ${startTime}`, `${month}/${date}/${year} ${endTime}`)
    //cal.addEvent('Demo Event', 'This is thirty minute event', 'Nome, AK', '8/7/2013 5:30 pm', '8/7/2013 6:00 pm');
    datesArray.push(date)
    if(Number(datesArray[s])<datesArray[s-1]){
      month = month + 1
    }
    if(!string.toLowerCase().includes('off') && !string.toLowerCase().includes('shift')){
      console.log(`${month}/${date}/${year} ${startTime}`, `${month}/${date}/${year} ${endTime}`)
      cal.addEvent('Work', '', 'Work', `${month}/${date}/${year} ${startTime}`, `${month}/${date}/${year} ${endTime}`)
    }
    
    //console.log(datesArray[s])
  })
  //cal.download('Work Schedule');
}
//convertTextToCalendar(beforeText)





