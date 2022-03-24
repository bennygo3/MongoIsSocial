const { User } = require('../models');

module.exports = {
    async getUser(req,res){
        try {
            const usersData = await Users.find();
            res.status(200).json(usersData);
          } catch (error) {
            res.status(500).json(error);
          }
        },
    }