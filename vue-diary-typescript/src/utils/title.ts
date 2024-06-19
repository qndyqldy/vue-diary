export const setPageTitle = (title: string): void => {
	const $title: HTMLTitleElement = document.getElementsByTagName('title')[0] as HTMLTitleElement;
	$title.innerText = title;
}