
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/leaderboard" | "/api/scores" | "/leaderboard";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/api": Record<string, never>;
			"/api/leaderboard": Record<string, never>;
			"/api/scores": Record<string, never>;
			"/leaderboard": Record<string, never>
		};
		Pathname(): "/" | "/api" | "/api/" | "/api/leaderboard" | "/api/leaderboard/" | "/api/scores" | "/api/scores/" | "/leaderboard" | "/leaderboard/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/android-chrome-192x192.png" | "/android-chrome-512x512.png" | "/apple-touch-icon.png" | "/browserconfig.xml" | "/favicon-16x16.png" | "/favicon-32x32.png" | "/favicon.ico" | "/favicon.png" | "/mstile-150x150.png" | "/safari-pinned-tab.svg" | "/site.webmanifest" | "/thumb.png" | string & {};
	}
}