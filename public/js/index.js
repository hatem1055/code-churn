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
const add_branches = async function (){
    try{
    const {data} = await axios.get('/branch')
    data.forEach(branch=>{
        const element = branchRow(branch._id,branch.name,branch.owner,branch.repo)
        $('.branches-cards tbody').append(element)
    })
    $('#loadingScreen').fadeOut()
    }catch (e){
        console.log(e)
    }
}

//adding new card
$('.add-dev').click(function(){
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
add_branches()
