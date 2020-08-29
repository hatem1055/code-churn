const newCard = ()=>{
    return `<div class='card d-felx flex-row' data-id=''>
    <div class="card-content" align='left' title="">
        <input type='text' class='new-card'/>
    </div>
    <div class="card-controllers">
        <button class="btn btn-warning controller edit"><i class="fas fa-pen"></i></button> 
        <button class="btn btn-danger controller delete"><i class="fas fa-trash"></i></button>
    </div>
</div>`
}

const card = (content,id)=>{
    return `<div class='card d-felx flex-row' data-id="${id}">
    <div class="card-content" align='left' title="${content}">
        <span> ${content} </span>
    </div>
    <div class="card-controllers">
        <button class="btn btn-warning controller edit"><i class="fas fa-pen"></i></button> 
        <button class="btn btn-danger controller delete"><i class="fas fa-trash"></i></button>
    </div>
</div>`
}

const branchRow = (id,name,owner,repo)=>{
    return`<tr data-id="${id}">
        <td class='name-td'>${name}</td>
        <td class='repo-td'>${repo}</td>
        <td class='owner-td'>${owner}</td>
        <td class='d-flex'>
        <button class="btn btn-warning controller edit-branch" style='margin-right:15px;' data-toggle="modal" data-target="#editBranch">
        <i class="fas fa-pen"></i>
        </button> 
        <button class="btn btn-danger controller delete-branch"><i class="fas fa-trash"></i></button>
        </td>
        </tr>`
    
}