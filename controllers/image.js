const Clarifai = require('clarifai');

// For the face detection provided by Clarifai
const app = new Clarifai.App({
  apiKey: '933b51752c1e45f4acab9c65180bbfaf'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (db) => (req, res) => {
	const { id } = req.body;
	db('users').where( 'id', '=', id )
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}