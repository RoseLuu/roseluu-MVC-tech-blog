const router =require('express').Router();
const {User, Post, Comment} =require('../../models');
const withAuth=require('../../utils/auth');

//get all post
router.get('/', async (req, res) =>{
    try{
      const postData= await Post.findAll({
        include: [{model: User, attributes:['username']}, {model: Comment}]
      })
      res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
});
//get one post
router.get('/:id', async(req,res)=>{
    try{
        const postData=await Post.findByPk(req.params.id, {
            include: [{model: User, attributes:['username']}, {model: Comment}]
        })
        if (!postData) {
            res.status(404).json({message:'No post match with the id'});
            return
            }
            res.status(200).json(postData);
        } catch (err) {
                res.status(500).json(err);
        }
})
//create a post
router.post('/', withAuth, async(req, res)=>{
    try {
        const newPost=await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});
//update post
router.put('/:id', withAuth, async(req,res)=>{
    try {
        const postData =await Post.update(req.body,{
            where: {
                id: req.params.id
            },
        }); 
        if(!postData) {
            res.status(404).json({message:'No post match with the id'});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});
//delete post
router.delete('/:id', withAuth, async(req,res)=>{
    try{
        const postData=await Post.destroy({
            where:{
                id:req.params.id,
            }
        });
        if (!postData){
            res.status(404).json({message: 'No post match with the id to be delete'});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports =router;