const express=require("express");
const app=express()
app.use(express.json())

// add array have some genre
const genres=[
    {id:1,name:"comedy"},
    {id:2,name:"scary"},
]

//  add get to say hello to customer
app.get(`/api`,(req,res)=>res.send("hello customer") )


// add get 
app.get(`/api/genres`,(req,res)=>{
    // all the genres
    res.send(genres);
})

// to get especific id
app.get(`/api/genres/:id`,(req,res)=>{
    const genre=genres.find(x=>x.id===parseInt(req.params.id))
    FindeOrNot(genre,res)
    // if genre is valid
    if(FindeOrNot!= null){
        res.send(genre);
    }
})

// let add new genre
app.post(`/api/genres`,(req,res)=>{
    // if send it flase handel validation
    const valid=Validation(req.body)
    if(valid===false){
    return res.status(400).send("name is require and shuld over 3 letter")
    }
    // if send it true make new genre
    const add_genre={
    id:genres.length+1,
    name:req.body.name
    }
    genres.push(add_genre)
    // then show to customer
    res.send(add_genre)
})


// let s update api
app.put(`/api/genres/:id`,(req,res)=>{
    const genre=genres.find(x=>x.id===parseInt(req.params.id))
    FindeOrNot(genre,res)

    // if name should have 2 items like lenght and is not null
    const valid=Validation(req.body)
    if(valid===false){
    return res.status(400).send("name is require and shuld over 3 letter")
    }

    // then update genres
    genre.name=req.body.name
    // then show
    res.send(genre)
})

// let s add delete api
app.delete(`/api/genres/:id`,(req,res)=>{
    const genre=genres.find(x=>x.id===parseInt(req.params.id))
    FindeOrNot(genre,res)

    // then delete this genre
    const index=genres.indexOf(genre)
    genres.splice(index,1);
    // then show delete genre
    res.send(genre)
})



function FindeOrNot(genre,res){
    // if genre is not valid
    if(!genre){return res.status(404).send("this genre is not found...")}
    // if genre is not != null
    if(genre != null){return true}
}

function Validation(x){
    if(!x.name || x.name.length<3){
       return false
    }
}


 const port=process.env.PORT || 3000
 app.listen(port,console.log(`we are listening ${port}...`))