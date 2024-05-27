export function delegate(
	box: HTMLElement,
	selector: string,
	eventName: string,
	handler: Function
) {
	box.addEventListener(eventName, function (e: Event) {
		if (e.target instanceof HTMLElement) {
			let elem = e.target.closest(selector)
			if (elem !== null && box.contains(elem)) {
				handler.call(elem, e)
			}
		}
	})
}
