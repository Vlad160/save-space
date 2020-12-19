import { ColorsPalette, Widget } from './widget';

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

function bootstrap(config: Partial<Config> = {}) {
	console.log(config);
	const finalConfig: Config = { ...DEFAULT_CONFIG, ...config };

	const root = document.querySelector(`${finalConfig.root}`) as HTMLElement;
	if (!root) {
		return;
	}
	root.style.display = 'inline';
	const shadowRoot = root.attachShadow({ mode: 'open' });
	const style = document.createElement('style');
	style.textContent = `@import url(${finalConfig.host}/styles.css)`;
	shadowRoot.appendChild(style);
	const widget = new Widget(shadowRoot, finalConfig.palette);
	widget.init();
}

function getConfigFromWindow(): Partial<Config> {
	return window.$$avWidgetConfig || {} as Partial<Config>;
}

bootstrap(getConfigFromWindow());
