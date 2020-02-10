import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SelectedUserContext } from '../contexts';

/* 
	Note: Authorization and authentication for these API calls would be handled 
	independently and elsewhere.
*/
import { getUser, updateUser } from '../api/users';

/**
 ** The UserContextManager acts as an interface for it's children to manage the user 
 ** that is currently being viewed (like in a user management page). In this specific case,
 ** the selected user is determined by the URL parameters given by the router (this facilitates
 ** deep linking to user pages from elsewhere in the application).
 ** 
 ** Context managers are useful when you have a handful of components that all need access to the
 ** same resources, and that all need to stay in sync. We can do this with props, for sure, but
 ** that often results in prop drilling and can be much harder to follow through the code. There
 ** are use cases for both methods, but this one is more fun to demo.
**/

export default function SelectedUserContextManager({ children }) {
	const [user, setUser] = useState();
	const [isInvalid, setIsInvalid] = useState(false);
	/* 
		If we did not want this context manager to be dependent on URL params we
		could easily have it accept userId as a prop, and have its parent digest the URL
		instead. I decided to put the URL dependency here to make the example more clear.
	*/
	const { userId } = useParams();
	
	useEffect( refreshUser, [ userId ])
	
	useEffect( () => setIsInvalid( !!user ), [ user ]);
	
	function refreshUser() {
		return getUser( userId )
			.then( setUser )
			.catch( () => setIsInvalid(true) );
	}
	
	// Only tracks when changing from one user to another, or loading for the first time.
	const isLoading = !user || user.userId !== userId;
	
	function updateLoadedUser(friendlyName, isEmployee) {
		if (!isLoading) {
			return updateUser({userId, friendlyName, isEmployee}).then(refreshUser)
		} else {
			throw new NavigationException('Attempted to update user before user was loaded from API.');
		}
	}
	
	return (
		<SelectedUserContext.provider value={{ 
			user,
			updateUser: updateLoadedUser,
			isLoading,
			isInvalid
		}}/>
			{children}
		</SelectedUserContext.provider>
	)
}
