//adding new dev content  
$('body').on('blur','.urls-cards .new-card',async function(){
    const name = $(this).val().trim()
    try{
        const {data} = await axios.post('/url',{name})
        $(this).parent().parent().attr('data-id',data.id)
        $(this).replaceWith(`<span>${data.name}<span>`)
    }catch(e){
        console.log(e)
    }

})

//deleting url
$('body').on('click','.urls-cards .delete',async function(){
    try {
           const id = $(this).parent().parent().attr('data-id')
           const del = await axios.delete('/url',{data:{id}})
            $(this).parent().parent().fadeOut().remove()
        }catch(e){
            console.log(e)
        }
})

//edit url
$('body').on('blur','.urls-cards .edit-card',async function(){
    const input = $(this).parent().parent().find('.edit-card'),
          id = $(this).parent().parent().attr('data-id')
          name = input.val().trim()
          try {
            await axios.patch('/url',{name,id})
            input.replaceWith(`<span>${name}</span>`)    
          } catch (e) {
              console.log(e)
          }
          
})