const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create the Post model

class Post extends Model {
    static comments(body, models) {
        return models.Comment.create({
          user_id: body.user_id,
          post_id: body.post_id
        }).then(() => {
          return Post.findOne({
            where: {
              id: body.post_id
            },
            order: [['created_at', 'DESC']],
            attributes: [
              'id',
              'title',
              'body',
              'created_at',
              [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = comment.post_id)')]
            ],
            include: [
              {
                model: models.Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                  model: models.User,
                  attributes: ['username']
                }
              }
            ]
          });
        });
      }
}

// create fields/columns for the Post model
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;