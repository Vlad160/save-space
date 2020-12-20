import { ColorsPalette, Widget } from './widget';
import { mergeDeep } from './util';

declare global {
	interface Window {$$avWidgetConfig: any;}
}

export interface Config {
	host: string;
	root: string;
	palette: ColorsPalette;
}

export const DEFAULT_PALETTE: ColorsPalette = {
	textColor: '#fff',
	bgColor: '#4A90E2',
	btnColor: '#F5A623'
}

export const DEFAULT_CONFIG = {
	host: 'http://localhost:3000',
	root: '.av-root',
	palette: DEFAULT_PALETTE
}

function index(config: Partial<Config> = {}) {
	const finalConfig: Config = mergeDeep(DEFAULT_CONFIG, config);
	// Yes, it expects bootstrap root. Easy to change.
	const root = document.querySelector(`${finalConfig.root}`) as HTMLElement;
	if (!root) {
		return;
	}
	root.style.display = 'inline';
	// For styles encapsulation
	const shadowRoot = root.attachShadow({ mode: 'open' });
	const style = document.createElement('style');
	// Load styles
	style.textContent = `@import url(${finalConfig.host}/styles.css)`;
	shadowRoot.appendChild(style);
	const widget = new Widget(shadowRoot, finalConfig.palette);
	// You should have questions :) I'm lazy AF. Of course I have plenty of options but....
	style.addEventListener('load', () => widget.init(), { once: true });
}

function getConfigFromWindow(): Partial<Config> {
	return window.$$avWidgetConfig || {} as Partial<Config>;
}

index(getConfigFromWindow());
