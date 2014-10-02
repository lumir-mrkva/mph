Answers = new Meteor.Collection('answers');
Questions = new Meteor.Collection('questions');

if (Meteor.isClient) {
  var answers = new Meteor.Collection(null);

  Template.create.helpers({
    answers: function() {
      return answers.find();
    }
  })

  Template.create.events({
    'submit': function(e) {
      e.preventDefault();
      var question = Questions.insert({
        question: $('#question').val()
      });
      if (answers.find().count() < 2) {
        return alert('You need to have atleast 2 possible answers to create poll.')
      }
      answers.find().forEach(function(item){
        Answers.insert({answer: item.answer, 
          questionId: question, count: 0});
      });
      Router.go('vote',{_id: question});
    },
    'click #add': function() {
      var answer = $('#answer').val();
      if (answer !== '') {
        answers.insert({answer: answer});
      }
    }
  });

  Template.vote.events({
      'click button': function() {
        Answers.update(this._id, {$inc: {count: 1}});
        Router.go('results', {_id: this.questionId});
      }
  });

  Template.results.events({
      isWinner: function(answer) {
        var winner = Answers.findOne({},{sort: {count: -1}});
        return answer.count === winner.count ? "alert" : "";
      }
  });
}

if (Meteor.isServer) {
}
