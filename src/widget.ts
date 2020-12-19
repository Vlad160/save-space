import html from './template.html';
import './styles.scss';

export interface ColorsPalette {
	textColor: string;
	bgColor: string;
	btnColor: string;
}


export class Widget {

	constructor(private root: ShadowRoot, private palette: ColorsPalette) {
	}

	init() {
		const paletteStyles = this.createStylePalette();
		this.root.appendChild(paletteStyles);
		this.root.appendChild(this.createView());
	}

	private createView() {
		const div = document.createElement('div');
		div.innerHTML = html;
		return div.firstChild;
	}

	private createStylePalette() {
		const { bgColor, textColor, btnColor } = this.palette;
		const palette = `.av-widget{
	      --color-bg: ${bgColor};
        --color-btn: ${btnColor};
        --color-text: ${textColor};
		}`
		const style = document.createElement('style');
		style.textContent = palette;
		return style;
	}
}
