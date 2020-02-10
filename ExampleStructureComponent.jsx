import React from 'react';
import {Header, SideNavigation, MainContent, Footer} from './'

/**
 ** ExampleStructureComponent is designed to be a simple container to structure a page.
 ** The contents of this component are static and stateless, leaving routing + business logic
 ** to its children.
 **/

export default function ExampleStructureComponent() {
	return (
		<main style={styles.container}>
			<div style={styles.header}>
				<Header/>
			</div>
			<div style={styles.sideNav}> 
				<SideNavigation/>
			</div>
			<div style={styles.content}>
				<MainContent/>
			</div>
			<div style={styles.footer}> 
				<Footer/>
			</div>
		</main>
	)
}

/*
  I don't usually do inline JS styles, instead using a separate scss file with more conventional
  definitions. This was a fun experiment though.
 */

const gridKeys = {
	HEADER: 'header',
	FOOTER: 'footer',
	SIDE_NAV: 'side-nav',
	CONTENT: 'content'
}

const {HEADER, FOOTER, SIDE_NAV, CONTENT} = gridKeys;

const styles = {
	container: {
		border: '1px solid red',
		display: 'grid',
		gridTemplateColumns: '120px 1fr 120px',
		gridTemplateRows: '120px 1fr 50px',
		gridTemplateAreas: `
			'${HEADER}   ${HEADER}  ${HEADER}'
			'${SIDE_NAV} ${CONTENT} .        '
			'${FOOTER}   ${FOOTER}  ${FOOTER}'
		`
	},
	header: {
		gridArea: HEADER,
		padding: '5px',
		backgroundColor: 'gray'
	},
	content: {
		gridArea: CONTENT
	},
	sideNav: {
		gridArea: SIDE_NAV
	},
	footer: {
		gridArea: FOOTER
	}
}
