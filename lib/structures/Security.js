
/**
 * Represents security
 * @prop {String} realm
 * @prop {String} hash
 */
class Security {
	constructor (security) {
		this.realm = security.realm;
		this.hash = security.hash;
	}
}

module.exports = Security;