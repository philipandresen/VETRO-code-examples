// Assume we are using Express routing - routes/indes.js might have the following content:
/* 
	app.route(`${ROUTES.USERS}/:userId`)
		.put(userController.updateUser)
		.get(userController.getUser);
*/

// Could be any database interface. Would have been written separately.
import dbUsers from '../db/actions/users';
import { HTTP } from '../constants';
import { NotFoundException, BadRequestException } from '../exceptions';

export async function updateUser(req, res, next) {
	const { userId } = req.params;
	const { friendlyName, isEmployee } = req.body;
	/* 
		We might provide an organization as part of a security middleware, post-authentication.
		Auth is a bit out of scope (and pretty involved) for this example, so lets pretend it's there!
		We'll assume that everyone at an organization can update users at their organization.
		Also: Our 401s and 403s would be handled in the auth middleware, not here.
	*/
	const { organization } = req.securityContext;
	
	if (!friendlyName && !isEmployee) {
		return next(new BadRequestException('isEmployee or friendlyName must be defined');
	}
	
	try {
		const existingUser = await dbUsers.getUser(organization.id, userId)
		if (!existingUser) {
			throw new NotFoundException(`User ${userId} does not exist!`));
		}
		await dbUsers.updateUser({
			organizationId: organization.id, 
			userId, 
			friendlyName, 
			isEmployee
		})
		res.sendStatus(HTTP.OK);
	} catch( err ) {
		// Assume we have middleware that will handle exceptions from the DB and controller.
		next(err);
	}
}

export async function getUser(req, res, next) {
	const { userId } = req.params;
	const { organization } = req.securityContext;
	
	// We don't need to validate that userId has been provided because without it we wouldn't reach this code.
	
	await dbUsers.getUser(organization.id, userId)
		.then(user => {
			res.status(HTTP.OK).send(user);
		}).catch(next);
};
