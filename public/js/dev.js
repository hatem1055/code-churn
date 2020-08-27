//adding new dev content  
$('body').on('blur','.dev-cards .new-card',async function(){
    const name = $(this).val().trim()
    try{
        const {data} = await axios.post('/dev',{name})
        $(this).parent().parent().attr('data-id',data.id)
        $(this).replaceWith(`<span>${data.name}<span>`)
    }catch(e){
        console.log(e)
    }
})

//deleting dev
$('body').on('click','.dev-cards .delete',async function(){
    try {
           const id = $(this).parent().parent().attr('data-id')
            await axios.delete('/dev',{id})
            $(this).parent().parent().fadeOut().remove()
        }catch(e){
            console.log(e)
        }
})

//edit dev
$('body').on('blur','.dev-cards .edit-card',async function(){
    const input = $(this).parent().parent().find('.edit-card'),
          id = $(this).parent().parent().attr('data-id')
          name = input.val().trim()
          try {
            await axios.patch('/dev',{name,id})
            input.replaceWith(`<span>${name}</span>`)    
          } catch (e) {
              console.log(e)
          }
          
})