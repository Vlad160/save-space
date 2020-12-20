import html from './views/template.html';
import './styles/index.scss';
import flatpickr from 'flatpickr';
import Instance = flatpickr.Instance;

export interface ColorsPalette {
	textColor: string;
	bgColor: string;
	btnColor: string;
}


export class Widget {
	private fromPicker: Instance;
	private endPicker: Instance;
	private pickerRoot: HTMLElement;

	constructor(private root: ShadowRoot,
	            private palette: ColorsPalette) {
	}

	init() {
		this.pickerRoot = this.root.ownerDocument.createElement('div');
		this.root.appendChild(this.pickerRoot);
		this.pickerRoot.classList.add('av-picker-root');
		const paletteStyles = this.createStylePalette();
		this.root.appendChild(paletteStyles);
		const view = this.createView();
		this.root.appendChild(view);
		this.bindPickers(view)
	}

	private bindPickers(view: HTMLElement) {
		this.fromPicker = this.bindPicker(view, '#av-date-picker-start',
			{ onChange: ([selectedDate]) => this.endPicker.set('minDate', selectedDate) });
		this.endPicker = this.bindPicker(view, '#av-date-picker-end');
	}

	private createView() {
		const div = document.createElement('div');
		div.innerHTML = html;
		return div.firstChild as HTMLElement;
	}

	private bindPicker(view: HTMLElement, selector: string, options = {}) {
		const dateFrom = view.querySelector(selector);
		return flatpickr(dateFrom, {
			dateFormat: 'd.m.Y',
			minDate: 'today',
			appendTo: this.pickerRoot,
			...options
		});
	}

	private createStylePalette() {
		const { bgColor, textColor, btnColor } = this.palette;
		const palette = `.av-widget{
	      --color-bg: ${bgColor};
        --color-btn: ${btnColor};
        --color-text: ${textColor};
		}`
		const style = this.root.ownerDocument.createElement('style');
		style.textContent = palette;
		return style;
	}
}
