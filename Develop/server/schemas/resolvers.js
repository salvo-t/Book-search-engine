const { User, Matchup } = require('../models');

const resolvers = {
  Query: {
    getSingleUser: async ({ user = null, params }, res) => {
        const foundUser = await User.findOne({
            $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
          });
      
          if (!foundUser) {
            return res.status(400).json({ message: 'Cannot find a user with this id!' });
          }
      
          res.json(foundUser);
    },
    matchups: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Matchup.find(params);
    },
  },
  Mutation: {
    createMatchup: async (parent, args) => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
    createVote: async (parent, { _id, techNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
    createUser: async ({ body }, res) => {
      const user = await User.create(body);
  
      if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
      }
      const token = signToken(user);
      res.json({ token, user });
    },
  },
};

module.exports = resolvers;
