export const setPageTitle = (title) => {
	const $title = document.getElementsByTagName('title')[0];
	$title.innerText = title;
}