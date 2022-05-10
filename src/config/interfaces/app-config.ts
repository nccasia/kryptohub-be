export interface AppConfig {
	port: number;

	auth: {
		jwt: {
			secret: string | undefined;
			expiresInSeconds: number;
		};
		github: {
			clientId: string | undefined;
			clientSecret: string | undefined;
			callbackURL: string | undefined;
		};
	};
	'auth.jwt.secret'?: string;
	'auth.jwt.expiresInSeconds'?: number;
	'auth.github.clientId'?: string;
	'auth.github.clientSecret'?: string;
	'auth.github.callbackURL'?: string;
}
