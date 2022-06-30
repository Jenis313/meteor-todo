import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from "meteor/accounts-base";
Meteor.methods({
  'user.insert'(user){
    Meteor.startup(() => {
        if (!Accounts.findUserByUsername(user['username'])) {
          Accounts.createUser({
            username: user['username'],
            password: user['password'],
            email: user['email']
          });
        }
      })
  }
});