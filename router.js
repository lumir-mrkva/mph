Router.configure({
	layoutTemplate: 'default'
});

Router.route('hello', {
	path: '/'
});

Router.route('create', {
	path: '/polls',
});

Router.route('vote', {
	path: '/polls/:_id',
	data: function() {
		return {id: this.params._id};
	}
});

Router.route('results', {
	path: '/polls/:_id/results'
});