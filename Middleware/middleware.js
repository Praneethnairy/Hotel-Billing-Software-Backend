import Joi from 'joi';
import jwt from 'jsonwebtoken'

export const validateAuthToken = (req, res, next) => {
	try{
		const auth_token = req.header('auth_token');
		const userId = req.params.id

		const decoded = jwt.verify(auth_token, userId);

		if(!decoded){
			res.status(401).json({ message : "Invalid auth token" });
		}
		next();
	} catch(e) {
		res.status(500).json({error : e.message});
	}
}

export const validateNewUser = (req, res, next) => {
	const userJoi = Joi.object({
		username: Joi
			.string()
			.min(3)
			.required()
			.messages({
				'string.min': 'User name must be at least 3 characters long.',
				'string.empty': 'User name cannot be empty.',
				'any.required': 'User name is required.'
			}),
		hotelname: Joi
			.string()
			.min(3)
			.required()
			.messages({
				'string.min': 'Hotel name must be at least 3 characters long.',
				'string.empty': 'Hotel name cannot be empty.',
				'any.required': 'Hotel name is required.'
			}),
		email: Joi
			.string()
			.email()
			.required()
			.messages({
				'string.email': 'Email should be of format xyz@abc.com.',
				'string.empty': 'Email cannot be empty.',
				'any.required': 'Email is required.'
			}),
		password: Joi
			.string()
			.min(8)
			.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
			.required()
			.messages({
				'string.min': 'Password must be at least 8 characters long.',
				'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
				'string.empty': 'Password cannot be empty.',
				'any.required': 'Password is required.'
			}),

	}).options({ abortEarly: false });

	const { error, value } =  userJoi.validate(req.body);
	if (error) {
		const errors = error.details.map(detail => detail.message).join(', ');
		return res.status(400).json({ message: "Validation failed", errors });
	}
	req.value = value;

	next();
}