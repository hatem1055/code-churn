//fetching data
//fetch dev
const add_devs = function (){
    axios.get('/dev').then(r=>{
        let devs = r.data
        devs.forEach(dev => {
            $('.dev-cards').find('.cards').append(card(dev.name,dev._id))
        })
    }).catch(e=>{
        return e  
    })
}

//fetch urls
const add_urls = function (){
    axios.get('/url').then(r=>{
        let urls = r.data
        urls.forEach(url => {
            $('.urls-cards').find('.cards').append(card(url.name,url._id))
        })
        $('#loadingScreen').fadeOut()
    }).catch(e=>{
        return e  
    })
}




//adding new card
$('.add-card').click(function(){
$(this).parent().find('.cards').append(newCard())
})





//edit card
$('body').on('click','.edit',function(){
    const span = $(this).parent().parent().find('span'),
          text = span.text()
          span.replaceWith(`<input type='text' class='edit-card' value='${text}'>`) 
    const input  = $(this).parent().parent().find('.edit-card')
    input.focus()
          
})

//edit card save content
$('body').on('blur','.edit-card',function(){
    const input = $(this).parent().parent().find('.edit-card'),
          value = input.val()
          input.replaceWith(`<span>${value}</span>`)    
})


add_devs()
add_urls()