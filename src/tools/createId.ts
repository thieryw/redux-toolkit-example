export function createId(): string{
	const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

	const out: string[] = [];

	while(out.length < alphabet.length){
		out.push(alphabet[Math.floor(Math.random() * alphabet.length - 1)])
	};

	return out.join("");

}