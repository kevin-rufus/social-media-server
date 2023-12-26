
import { GraphQLError } from "graphql";
import User from "../models/user.js";
import { sequelize } from "../services/db.js";
import { compareSync } from "bcrypt";
import Post from "../models/post.js";
import Comment from "../models/comment.js";
import { signToken } from "../utils/token.js";

const root = {
  Post: {
    async user({user_id}){
      return await User.findByPk(user_id);
    },
    async comments({id}) {
      return await Comment.findAll({where: {post_id: id}})
    }
  },
  Comment: {
    async user({user_id}){
      return await User.findByPk(user_id);
    },
    async post({post_id}){
      return await Post.findByPk(post_id);
    },
  },
  Query: {
    getPosts: async (parent, {user_id}, context, info) => {
      if(user_id) {
        return Post.findAll({ where: { user_id }});
      } else {
        return await Post.findAll();
      }
    },
    getCurrentUser: (parent, args, {user}, info) => {
      if (!user) {
        return new GraphQLError("User not available");
      }
      return user;
    },
    getPostComments: async (parent, {post_id}, context, info) => {
      return await Comment.findAll({where: {post_id}})
    },
  },
  Mutation: {
    addComment: async (parent, {text, post_id}, {user}, info) => {
      return await Comment.create({text, post_id, user_id: user.id})
    },
    addPost: async (parent, {title, description}, {user}, info) => {
      console.log("UserId: ", user.id)
      return await Post.create({title, description, user_id: user.id})
    },
    deletePost: async (parent, {id}, context, info) => {
      return await Post.destroy({where: {id}})
    },
    deleteComment: async (parent, {id}, context, info) => {
      return await Comment.destroy({where: {id}})
    },
    login: async (parent, {email, password}, context, info) => {
     
      const user = await User.findOne({
        where: sequelize.where(
          sequelize.fn('lower', sequelize.col('email')),
          sequelize.fn('lower', email),
        ),
      }).catch(err => console.error('User lookup failed.', err));

      // Ensure the user exists. If not, return an error.
      if (!user) {
        return new GraphQLError("Invalid username/password");
      }

      // Ensure the password is correct. If not, return an error.
      if (!compareSync(password, user.dataValues.password)) {
        return new GraphQLError("Invalid username/password");
      }

      // We now know the user is valid so it's time to create a new token.
      const payload = {user_id: user.dataValues.id}
      return {token: signToken(payload)}
    }
  }
}

export default root;