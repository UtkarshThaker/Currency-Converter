const BaseUrl=
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropDowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector("#msg");

for(let select of dropDowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText= currCode;
        newOption.value= currCode;
        // console.log(currCode);
        
        if(select.name === "from" && currCode === "USD"){
            newOption.selected="selected";  
        }
        else if(select.name==="to" && currCode === "INR"){
            newOption.selected="selected";  
        }
        select.append(newOption);
        
      
    }

    select.addEventListener("click",(evt)=>{
        updateFlag(evt.target);
    })
}   

const updateFlag=(Element)=>{
    // console.log(Element)
    let currCode=Element.value;
    console.log(currCode);

    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= Element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    // console.log(amtval);
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }
    // console.log(fromCurr.value,toCurr.value);

    const URL=`${BaseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch (URL);
    let Data= await response.json();
    let Rate=Data[toCurr.value.toLowerCase()]
    // console.log(Rate); 
    let finalAmount=amtval * Rate ;
    msg.innerText=`${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

})


