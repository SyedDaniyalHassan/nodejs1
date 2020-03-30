


const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const msg1 = document.querySelector("#msg-1")
const msg2 = document.querySelector("#msg-2")
const msg3 = document.querySelector("#msg-3")
const msg4 = document.querySelector("#msg-4")



weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const location = search.value
    msg1.textContent="Results:"

    fetch("/weather?address="+encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            msg2.textContent=data.error
        }
        else{
            console.log(data.Api)
            msg2.textContent ="Temperature is = "+data.Api.temperature
            msg3.textContent="Summary :"+data.Api.summary
            msg4.textContent="WindSpeed "+data.Api.windSpeed
            
        }
    })
})

})
