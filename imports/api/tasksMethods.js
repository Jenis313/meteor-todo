import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';
//  Crud operation here through Meteor methods
Meteor.methods({
  // it is a function and function inside an object will be the name of the key if we don't declare the key.
  'tasks.insert'(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.insert({
      text,
      createdAt: new Date,
      userId: this.userId,
    })
  },
  

  'tasks.remove'(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if(!task){
      throw new Meteor.Error('Access denied');
    }

    TasksCollection.remove(taskId);
  },

  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);
 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
    if(!task){
      throw new Meteor.Error('Access denied.');
    }
    TasksCollection.update(taskId, {
      $set: {
        isChecked
      }
    });
  }
});