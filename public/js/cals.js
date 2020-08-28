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
const odooReq = async function(){
    const after = $('.after').val().trim()
    const before = $('.before').val().trim()
    if (!dateValidate(after,'after') || !dateValidate(before,'before')){ return} 
    const urls = getUrls()
    const devs = getDevs()
    const reqLen = urls.length * devs.length
    let total_churn = 0
    let total_cont = 0
    let error = `this urls haven't install the module or incorrect urls: \n`
    let erro_urls = [] 
    $('#loadingScreen').fadeIn()
    for (author of devs){
        for(url of urls){
        try{
                let {data} = await axios.post(`${url.trim()}/churn`,{params: {before,after,author}})
                const element = `<tr>
                   <td>${author}</td>
                   <td>${data.result.contribution}</td> 
                   <td>${data.result.churn}</td>
                   <td>${url}</td>
                    </tr>
                    `
                 $('tbody').append(element)
            }catch(e){
                if (e.response.status == 404){
                    erro_urls.push(url)
                }
            }
        }
    }
    $('#loadingScreen').fadeOut(100,()=>{
        if (erro_urls.length > 0){
            const ar = [...new Set(erro_urls)]
            const str = ar.join('\n')
            error += str
            alert(error)
        }
    })
}

$('.calc').click(function (){
    $('tbody tr').each(function(){
            $(this).remove()
        })
    odooReq()
    $('.churn-table').css('display','block')
})