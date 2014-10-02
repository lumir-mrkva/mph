Answers = new Meteor.Collection('answers')

if (Meteor.isClient) {

  Template.hello.helpers({
    answers: function() {
      return Answers.find();
    },
    isWinner: function(answer) {
      var winner = Answers.findOne({},{sort: {count: -1}});
      return answer.count === winner.count ? "alert" : "";
    }
  }); 

  Template.hello.events({
    'click button': function() {
      Answers.update(this._id, {$inc: {count: 1}});
    }
  });

}

if (Meteor.isServer) {
  var items = ["caj","kafe","zen"];

  Meteor.startup(function () {
    if (Answers.find().count() === 0) {
      items.forEach(function(item) {
        Answers.insert({answer: item, count: 0});
      });
    }
  });
}
