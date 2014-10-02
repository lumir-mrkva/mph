Router.configure({
	layoutTemplate: 'default'
});

Router.route('hello', {
	path: '/',
	data: function() {
		return {questions: Questions.find()};
	}
});

Router.route('create', {
	path: '/polls',
});

Router.route('vote', {
	path: '/polls/:_id',
	data: function() {
		var id = this.params._id;
		return {question: Questions.findOne(id),
			answers: Answers.find({questionId: id})};
	}
});

Router.route('results', {
	path: '/polls/:_id/results',
	data: function() {
		var id = this.params._id;
		return {question: Questions.findOne(id),
			answers: Answers.find({questionId: id},{sort: {count: -1}})};
	}
});