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