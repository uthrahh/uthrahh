# Profile README assets

Custom SVGs behind the profile README at [github.com/uthrahh](https://github.com/uthrahh). Every file ships in a `-dark` and a `-light` variant, picked with `<picture>` + `prefers-color-scheme`, and uses the same palette as [uthrahrk.vercel.app](https://uthrahrk.vercel.app).

| File | What it is |
|---|---|
| `gen.py`, `fonts.py` | Generate the static SVGs (hero, section headers, about terminal, stack, project cards, footer). Fonts are subset per image and embedded, so text renders identically everywhere. Needs `fonttools` and Poppins / Lora / Noto Sans Mono installed locally. |
| `build_stats.py`, `stats-fonts.json` | Stdlib-only script that renders the activity card from the GitHub GraphQL API. Runs in `.github/workflows/contribution-graph.yml` every 12 hours and publishes to the `output` branch with the Pac-Man graph. `python3 build_stats.py --sample` renders demo data locally. |

Regenerate the static set:

```bash
cd readme-assets && python3 gen.py && mv out/*.svg . && rmdir out
```
