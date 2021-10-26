const router =require('express').Router();
const {User, Post, Comment} =require('../../models');
// const withAuth=require('../../utils/auth');

router.get('/', async(req, res)=>{
    try{
        const postData= await Post.findAll({
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
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    }catch(err) {
        res.status(500).json(err);
    }
});
router.get('/post/:id', withAuth, async (req, res) =>{
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
        res.render('homepage-one-post', {
            post,
            logged_in:req.session.logged_in
        });
    }catch (err) {
        res.status(500).json(err);
    }
})
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
});
router.get('/signup', (req, res)=>{
    if (req.session.logged_in) {
        res.redirect('/');
        return;
      }
    res.render('signup');
})
module.exports =router;