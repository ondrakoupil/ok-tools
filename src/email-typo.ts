const typos: {[key: string]: string} = {
	'gmail.cz': 'gmail.com',
	'gmial.cz': 'gmail.com',
	'gmial.com': 'gmail.com',
	'gmail.sk': 'gmail.com',
	'gmail.con': 'gmail.com',
	'cmail.com': 'gmail.com',
	'fmail.com': 'gmail.com',
	'gemail.com': 'gmail.com',
	'gmai.com': 'gmail.com',
	'seynam.cz': 'seznam.cz',
	'g-mail.cz': 'email.cz',
	'g-mail.com': 'gmail.com',
	'emai.cz': 'email.cz',
	'e-mail.cz': 'email.cz',
	'sznam.cz': 'seznam.cz',
	'seznam.ct': 'seznam.cz',
	'seznam.com': 'seznam.cz',
	'seznam.cu': 'seznam.cz',
	'seznam.cx': 'seznam.cz',
	'sezanm.cz': 'seznam.cz',
	'seznam.c': 'seznam.cz',
	'seznam.z': 'seznam.cz',
	'aeznam.cz': 'seznam.cz',
	'sezmam.cz': 'seznam.cz',
	'saznam.cz': 'seznam.cz',
	'seznem.cz': 'seznam.cz',
	'seznsm.cz': 'seznam.cz',
	'srznam.cz': 'seznam.cz',
	'seznan.cz': 'seznam.cz',
	'senam.cz': 'seznam.cz',
	'sezam.cz': 'seznam.cz',
	'seznm.cz': 'seznam.cz',
	'sezna.cz': 'seznam.cz',
	'eznam.cz': 'seznam.cz',
	'sezbam.cz': 'seznam.cz',
	'seznam.cy': 'seznam.cz',
	'seynam.cy': 'seznam.cz',
	'entrum.cz': 'centrum.cz',
	'centrun.cz': 'centrum.cz',
	'cemtrum.cz': 'centrum.cz',
	'cetrum.cz': 'centrum.cz',
	'centrum.c': 'centrum.cz',
	'centrum.z': 'centrum.cz',
	'centrum.cx': 'centrum.cz',
	'centrum.ct': 'centrum.cz',
	'centrum.cu': 'centrum.cz'
};

const domainRegexp = new RegExp('@(.+)$');

export function emailTypo(email: string): string {

	let basematch = email.match(domainRegexp);
	if (!basematch) {
		return '';
	}

	let domain = basematch[1].toLowerCase();
	let typo = typos[domain];
	if (typo) {
		return email.replace('@' + domain, '@' + typo);
	}
	return '';

}
