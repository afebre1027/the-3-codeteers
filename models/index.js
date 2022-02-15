const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const Score = require('./score');

User.hasMany(Post, {
    foreignKey: 'user_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

User.hasMany(Score, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// Post.hasMany(Comment,{
//     foreignKey: 'post_id',
// });

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// Comment.belongsTo(Post, {
//     foreignKey: 'post_id'
// });

Score.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports={User, Post, Comment, Score};