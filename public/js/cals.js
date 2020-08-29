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
const req = async function(){
    const since = $('.since').val().trim()
    const until = $('.untill').val().trim()
    if (!dateValidate(since,'since') || !dateValidate(until,'untill') ){ 
        return
    }
    $('.churn-table tbody tr').each(function(){
        $(this).remove()
    })
    $('#loadingScreen').fadeIn() 
    try {
        const {data:devs}= await axios.post('/churn',{since,until})
        for (dev of devs){
            const element = `<tr>
                    <td>${dev.dev}</td>
                    <td>${dev.repo}</td>
                    <td>${dev.branch}</td>
                    <td>${dev.churn}</td>
            <tr>`
            $('.churn-table tbody').append(element)
            $('.churn-table').fadeIn()
        }
    } catch (e) {
        console.log(e)
    }
    $('#loadingScreen').fadeOut()
}

$('.calc').click(function (){
        req()
})