import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../services/db.js';
import Comment from './comment.js';

class Post extends Model {
}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Post',
});

Post.hasMany(Comment);

export default Post;