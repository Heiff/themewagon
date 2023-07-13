const pg = require('../db/pg');
const { v4:uuid } = require('uuid')

const GetAllMessage = async(req,res) => {
    try {
        const data = await pg("select * from message");
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({message:error})
    }
}

const PostMessage = async(req,res) => {
    try {
        const { name,email,subject,messages} = req.body;  
       const data = await pg("insert into message(name,email,subject,messages) values($1,$2,$3,$4) returning *",name,email,subject,messages);
       res.status(201).json({data})
    } catch (error) {
        res.status(404).json({error})
    }
}

const DeleteMessage = async(req,res) => {
    try {
        const { id } = req.params;
        const data = await pg("delete from message where id = $1 returning *",id);
        res.status(200).json({data})
    } catch (error) {
        res.status(404).json({error})
    }
}


const GetOne = async(req,res) => {
    try {
        const { id } = req.params;
        const data = await pg("select * from blog where id = $1",id);
        await pg("update blog set view = view + 1 where id = $1",id)
        res.status(200).json({data})
    } catch (error) {
        res.status(404).json({error})
    }
}



const GetAll = async(req,res) => {
    try {
        const data = await pg("select * from blog");
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({message:error})
    }
}

const PostBlog = async(req,res) => {
    try {
        const { cotegory_id,title,descr} = req.body;
        const { image } = req.files;
        console.log(image);
        console.log(req.body);
        const blog = await pg("select * from blog");
       if (blog.length) {
        for (let i = 0; i < blog.length; i++) {
            if (blog[i].title == title) {
                res.status(404).json({message:"error"})
            }
        }
       }
       const imageName = `${uuid()}.${
        image.name.split(".")[image.name.split(".").length - 1]
      }`;
      image.mv(process.cwd() + `/uploads/${imageName}`);
       const data = await pg("insert into blog(cotegory_id,title,descr,image,view,date) values($1,$2,$3,$4,$5,$6) returning *",cotegory_id,title,descr,imageName,0,new Date());
       res.status(201).json({data})
    } catch (error) {
        res.status(404).json({error})
    }
}

const UpdateBlog = async(req,res) => {
    try {
        const { title,descr,id} = req.body;
        const { image } = req.files;
        const blog = await pg("select * from blog");
        const findBlog = blog.find((el)=> el.id == id)
        if (findBlog) {
            const imageName = `${uuid()}.${
                image.name.split(".")[image.name.split(".").length - 1]
              }`;
           if (title && descr && image) {
            const data = await pg("update blog set title = $1,descr = $2,image = $3 where id = $4 returning *",title,descr,imageName,id)
            image.mv(process.cwd() + `/uploads/${imageName}`);
            res.status(200).json({data})
           }
            else if(!title && descr && image){
                const data = await pg("update blog set descr = $1,image = $2 where id = $3 returning *",descr,imageName,id)
                image.mv(process.cwd() + `/uploads/${imageName}`);
                res.status(200).json({data})
            }
            else if(title && !descr && image){
                const data = await pg("update blog set title = $1,image = $2 where id = $3 returning *",title,imageName,id)
                image.mv(process.cwd() + `/uploads/${imageName}`);
                res.status(200).json({data})
            }
            else if(title && descr && !image){
                const data = await pg("update blog set descr = $1,title = $2 where id = $3 returning *",descr,title,id)
                res.status(200).json({data})
            }
        }
    } catch (error) {
        res.status(404).json({error})
    }
}

const DeleteBlog = async(req,res) => {
    try {
        const { id } = req.params;
        const data = await pg("delete from blog where id = $1 returning *",id);
        res.status(200).json({data})
    } catch (error) {
        res.status(404).json({error})
    }
}


const PopularBlog = async(req,res) => {
    try {
       const data = await pg("select * from blog")
       const sorted = data.sort((a,b)=>b.view - a.view).slice(0,3);
       res.status(200).json(sorted)
    } catch (error) {
        res.status(404).json({error})
    }
}


const Search = async(req,res) => {
    try {
       const { name }  = req.params;
        const data = await pg("select * from blog where title = $1",name);
        res.status(200).json(data)
    } catch (error) {
       res.status(200).json({error}) 
    }
}


module.exports = {
    GetAll,
    PostBlog,
    UpdateBlog,
    DeleteBlog,
    GetOne,
    GetAllMessage,
    PostMessage,
    DeleteMessage,
    PopularBlog,
    Search
}