let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	_id: mongoose.Types.ObjectId,
	username: 
	{ 
		type : String
	},
	email: 
	{ 
		type : String
	},
	password: 
	{ 
		type : String
	}

});
module.exports = mongoose.model('User', userSchema);
