const fromText=document.querySelector('.from-text');
const toText=document.querySelector('.to-text');
const selectTag=document.querySelectorAll('select');
translateBtn=document.querySelector('button')
exchange=document.querySelector('.change')
icons=document.querySelectorAll('.rar i')





selectTag.forEach((tag,id)=>{

    // for(key in object)
      for(const contry_code in countries){

           //selecting english and arabic as a default
            let selected;
           if(id==0 &contry_code=="en-GB"){
            selected="selected";
         }     
             else if(id==1 &contry_code=="ar-SA"){
           selected="selected";
       }
              let option=` <option value="${contry_code}" ${selected}>${countries[contry_code]}</option>`;

             tag.insertAdjacentHTML('beforeend',option);//adding options tag inside select tag


           }
      })
//exchanging textarea and select tag values
exchange.addEventListener('click',()=>{

    let tempLang=selectTag[0].value;
    selectTag[0].value=selectTag[1].value;
    selectTag[1].value=tempLang;
let tempText=fromText.value;
fromText.value=toText.value;
toText.value=tempText;
});
translateBtn.addEventListener("click",()=>{
    let text=fromText.value;
    translateFrom=selectTag[0].value; //getting fromselect tag value
    translateTo=selectTag[1].value;//getting toselect tag value
    if(!text)return;
    toText.setAttribute("placeholder","Translating...")
    let apiUrl=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    //fetching api response and returnig it with parsing into js obj
    //and in another then method receiving that obj
    fetch(apiUrl).then(res=>res.json()).then(data=>{
        
        toText.value=data.responseData.translatedText;
        toText.setAttribute("placeholder","Translating...")

    });

});



    icons.forEach(icon=>{
        icon.addEventListener("click",({target})=>{
        if(target.classList.contains('fa-copy')){
          //if clicked icon has form id , copy fromtextarea value else the totextarea value
            if(target.id=='from'){

           navigator.clipboard.writeText(fromText.value)

            }else{
                navigator.clipboard.writeText(toText.value)
            }

          }else{
              let utterance;
               //if clicked icon has form id , copy fromtextarea value else the totextarea value
            if(target.id=='from'){
                    utterance=new SpeechSynthesisUtterance(fromText.value);
                    
                    utterance.lang=selectTag[0].value;//setting utterance language to fromselect tag value
               
     
                 }else{
                    utterance=new SpeechSynthesisUtterance(toText.value);
                    utterance.lang=selectTag[1].value;//setting utterance language to toselect tag value
                     
                 }
                 speechSynthesis.speak(utterance) //speak the passed autterance
           
          }
       });
    })