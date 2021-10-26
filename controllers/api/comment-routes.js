const router =require('express').Router();
const {User, Post, Comment} =require('../../models');
const withAuth=require('../../utils/auth');

router.get('/', async(req, res)=>{
    try{
        const commentData= await Comment.findAll({
            include: [{model: User, attributes:['username']}, {model: Post}]
        });
        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get('/:id', async(req, res)=>{
    try {
        const commentData= await Comment.findByPk(req.params.id,{
            include: [{model: User, attributes:['username']}, {model: Post}]
        });
        if (!commentData) {
            res.status(404).json({message:'No comment match with the id'});
            return
            }
            res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err);
    }
})
router.post('/', withAuth, async(req, res)=>{
    //make sure that user only can comment when login and in the session
    if(req.session) {
        try {
            const newComment =await Comment.create({
                user_comment: req.body.user_comment,
                user_id: req.body.user_id,
                post_id: req.body.post_id,
            })
            res.status(200).json(newComment);
        } catch (err) {
            res.status(500).json(err)
        }  
    }
})
router.delete('/:id', withAuth, async(req,res)=>{
    try {
        const commentData=await Comment.destroy({
            where:{
                id:req.params.id,
            }
        })
        if (!commentData) {
            res.status(404).json({message: 'No comment match with the id to be delete'});
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports =router;