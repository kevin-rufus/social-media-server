import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../services/db.js';

class Comment extends Model {
}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  post_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Comment',
});

export default Comment;