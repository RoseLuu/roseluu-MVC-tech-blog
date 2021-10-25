const User = require('./user');
const Post= require('./post');
const Comment= require('./comment');

//user can have many post
User.hasMany(Post,{
    foreignKey:'user_id'
})
//user can have many comment
User.hasMany(Comment,{
    foreignKey:'user_id'
})
//post belong to one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});
//Post can have many comment
Post.hasMany(Comment,{
    foreignKey: 'post_id'
});
//comment belong to one user
Comment.belongsTo(User,{
    foreignKey:'user_id'
});
//comment belong to one post
Comment.belongsTo(Post,{
    foreignKey:'post_id'
});

module.exports= {User, Post, Comment};
