const router =require('express').Router();
const {User, Post, Comment} =require('../models/');
const withAuth=require('../../utils/auth');

router.get('/', withAuth, async(req, res)=>{
    try{
        const postData= await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['id', 'title', 'content', 'create_at'
            ],
            include: [{
                model: Comment,
                attributes:[ 'id', 'user_comment', 'user_id', 'post_id', 'create_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
            model: User,
            attributes: ['username']
            }]
        }); const posts = postData.map((post)=> post.get({plain: true}));
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        });
    }catch(err) {
        res.status(500).json(err);
    }
});
router.get('/edit/:id', withAuth, async (req, res) =>{
    try {
        const postData =await Post.findByPk(req.params.id, {
            attributes:['id', 'title', 'content', 'create_at'],
            include:[{
                model: Comment,
                attributes: ['id', 'user_comment', 'user_id', 'post_id', 'create_at'],
                include:{
                    model: User,
                    attributes: ['username']
                }
            },
        {
            model: User,
            attributes:['username']
        }]
        }); const post= postData.get({plain: true});
        res.render('edit', {
            post,
            logged_in:req.session.logged_in
        });
    }catch (err) {
        res.status(500).json(err);
    }
})
router.get('/new', (req,res)=>{
    res.render('new-post');
})

module.exports =router;