const getUrls = function(){
    let urls = []
    $('.urls-cards .card-content').each(function(i,url){
        urls.push($(this).children().text().trim())
    })
    return urls
} 
const getDevs = function(){
    let devs = []
    $('.dev-cards .card-content').each(function(i,url){
        devs.push($(this).children().text().trim())
    })
    return devs
} 

const dateValidate = function(date,str){
    let dateArr = date.split('-')
    if (dateArr.length != 3){
        alert(`${str} format incorrect`)
        return false
    }
    return true
}
const odooReq = function(){
    const after = $('.after').val().trim()
    const before = $('.before').val().trim()
    if (!dateValidate(after,'after') || !dateValidate(before,'before')){ return} 
    const urls = getUrls()
    const devs = getDevs()
        devs.forEach(async author =>{
            let dev = {dev:author,cont:0,churn:0}
            urls.forEach(async url=>{
                let {data} = await axios.post(`${url.trim()}/churn`,{params: {
                    before,after,author
                }})

                const element = `<tr>
                   <td>${author}</td>
                   <td>${data.result.contribution}</td> 
                   <td>${data.result.churn}</td>
                   <td>${url}</td>
                    </tr>
                    `
                 $('tbody').append(element)
            })
        })
}

$('.calc').click(function (){
    $('tbody tr').each(function(){
            $(this).remove()
        })
    odooReq()
    $('.churn-table').css('display','block')
})