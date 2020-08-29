//adding branch  
$('.add-branch').click(function(){
    $('.save-branch').removeClass('edit-branch-modal')
    $('.save-branch').addClass('new-branch')
})

$('body').on('click','.new-branch',async function (){
    const name = $('#branch-name').val().trim(),
          repo = $('#branch-repo').val().trim(),
          owner = $('#branch-owner').val().trim()

    try{
    const {data:req}  = await axios.post('/branch',{
        name,repo,owner
    })
    const element = branchRow(req._id,req.name,req.owner,req.repo)
    $('.branches-cards tbody').append(element)

    }catch (e){
        console.log(e)
    }
})

//edit branch 
$('body').on('click','.edit-branch',function(){
    $('.save-branch').removeClass('new-branch')
    $('.save-branch').addClass('edit-branch-modal')
    $(this).parent().parent().addClass('editing')
    const id = $(this).parent().parent().attr('data-id')
    const name = $(this).parent().siblings()[0].innerText
    const repo = $(this).parent().siblings()[1].innerText
    const owner = $(this).parent().siblings()[2].innerText
    $('.edit-branch-modal').attr('data-id',id)
    $('#branch-name').val(name)
    $('#branch-repo').val(repo)
    $('#branch-owner').val(owner)
})

$('body').on('click','.edit-branch-modal',async function(){
    const name = $('#branch-name').val().trim(),
          repo = $('#branch-repo').val().trim(),
          owner = $('#branch-owner').val().trim()
          id = $(this).attr('data-id')
    try{
        const req = await axios.patch('/branch',{
            name,owner,repo,id
        })
        $('.editing .name-td').text(name)
        $('.editing .repo-td').text(repo)
        $('.editing .owner-td').text(owner)
        $('.editing').removeClass('editing')
        $('#branch-name').val('')
        $('#branch-repo').val('')
        $('#branch-owner').val('')
    }catch (e){
        console.log(e)
    }
})

//delete branch
$('body').on('click','.delete-branch',async function(){
    try{
        const id = $(this).parent().parent().attr('data-id')
        const req = await axios.delete('/branch',{data:{id}})
        $(this).parent().parent().remove()
    }catch(e){
        console.log(e)
    }
})




