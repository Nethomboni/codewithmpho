# Icon system

One inline SVG sprite, built from `js/icons.js`. No emoji, no icon font, no framework, no network requests.

| Kind | Source | Symbol id | Licence |
|---|---|---|---|
| UI icons | [Lucide](https://lucide.dev) | `#i-NAME` (e.g. `#i-mail`) | ISC |
| Technology logos | [Simple Icons](https://simpleicons.org), [Devicon](https://devicon.dev) | `#t-NAME` (e.g. `#t-react`) | CC0 / MIT |

`icons.js` is loaded as the first thing inside `<body>` on every page, so the sprite exists before any icon is parsed.

## Use in HTML

```html
<!-- decorative icon next to a text label (the normal case) -->
<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-mail"></use></svg>

<!-- technology logo in its brand colour -->
<svg class="icon tech-icon" aria-hidden="true" focusable="false"><use href="#t-react"></use></svg>

<!-- logo that follows the text colour (use on dark surfaces where a brand colour would vanish) -->
<svg class="icon tech-icon tech-mono" aria-hidden="true" focusable="false"><use href="#t-github"></use></svg>

<!-- icon that carries meaning on its own: give it a name -->
<svg class="icon" role="img" aria-label="Close" focusable="false"><use href="#i-x"></use></svg>
```

Icon-only buttons and links keep their accessible name on the control itself (`aria-label="Close menu"`), and the icon inside stays `aria-hidden`.

## Use in JavaScript

```js
Icons.icon('arrow-right')                  // decorative, aria-hidden
Icons.icon('x', { label: 'Close' })        // role="img" + aria-label
Icons.icon('check', { class: 'icon-sm' })  // extra classes
Icons.tech('react')                        // brand logo
Icons.has('mail'); Icons.hasTech('react')  // existence checks
```

`js/projects.js` maps each project tag to a logo (`TECH_LOGO`) and falls back to a Lucide icon (`TECH_FALLBACK`).

## Sizing and colour (css/style.css)

| Class | Effect |
|---|---|
| `.icon` | 1.25em square, stroke follows `currentColor` |
| `.icon-sm` / `.icon-lg` | 1rem / 1.5rem |
| `.icon-card` | 44px rounded square used by feature, service, contact and FAQ rows |
| `.tech-icon` | filled logo, brand colour via `--tech-color` |
| `.tech-mono` | sets `--tech-color: currentColor` |

Check marks and the lock in the privacy line are CSS-only (`--icon-check`, `--icon-lock` in `:root`) so list markup stays clean.

## Add an icon

1. **UI icon:** open the icon on lucide.dev, copy the inner SVG markup (the shapes, not the outer `<svg>`) and add it to the `UI` map in `js/icons.js` under the icon name.
2. **Logo:** take the `<path d="...">` from simpleicons.org and add `'name': ['0 0 24 24', '#BRANDHEX', '<path d="..."/>']` to the `TECH` map.
3. Use it as `#i-name` / `#t-name`.

Unused icons are worth deleting from `icons.js` now and then; the file is cached after the first visit, so size only matters on that first load.
