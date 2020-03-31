export abstract class APIService {
	public baseUrl = 'https://project-dev.adapsys.ru/#!/';
	public options = { withCredentials: true };

	public xsrf(): string {

		const matches = document.cookie.match(new RegExp(
			"(?:^|; )" + "_xsrf".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));

		return '_xsrf=' + (matches ? decodeURIComponent(matches[1]) : "");
	}

	public time(): string {
		return '_='+(new Date).getTime();
	}
}