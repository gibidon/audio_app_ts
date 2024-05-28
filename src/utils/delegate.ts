export function delegate(
	box: HTMLElement,
	selector: string,
	eventName: string,
	handler: (e: Event) => void
) {
	box.addEventListener(eventName, function (e: Event) {
		if (e.target instanceof HTMLElement) {
			const elem = e.target.closest(selector)
			if (elem !== null && box.contains(elem)) {
				handler.call(elem, e)
			}
		}
	})
}
