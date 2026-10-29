# Commit City: build decisions and tests

Part of the spec (ref/spec.md owns the product decisions, this file owns the build and test decisions). Approved by Lincoln 2026-10-27.

## Implementation Decisions


Hosting and delivery
- New public repo lstuek.github.io, deployed by a GitHub Actions Pages workflow (not branch deploy), so the asset pipeline runs in CI.
- Pages gives no custom headers: 10-minute cache and gzip only, no cross-origin isolation. All asset files get content-hashed names. No library may need SharedArrayBuffer. No Git LFS.
- Static HTML carries title, description and an absolute og:image URL.

Data (the PC job in the lstuek profile repo)
- The PC job writes a new city data file next to its existing data. Shape (keys, not names):
  - generated_at (UTC timestamp of the job run)
  - totals: tokens, commits (all repos, all time), top_language
  - landmarks: per landmark key: commits_total, commits_30d, pushed_this_week (true or false), last_push_date (date only, no clock time), language
  - locked: activity_30d (one combined number for all non-landmark repos)
- Landmark keys: portfolio, new-era, bionic-wave, ka-tech, ka-ops, aios, crm, systemselect. The key-to-repo map lives only in the PC job's local config, never uploaded.
- "Last push" means the date of the newest non-bot commit on the default branch. The spec names it "last commit date" in code; the panel may say "last update".
- The lstuek.github.io repo is excluded from all counts.
- The privacy guard allows the 8 landmark keys as exact schema keys only; the whole-word repo-name check still runs for every other repo name. Commit counts per non-landmark repo never leave the PC.
- The existing AI ledgers upload prompt counts per hour (a schedule leak). They change to counts per day in the upload; per-hour detail stays on the PC. History already on GitHub stays as it is.
- A failed or incomplete GitHub request is not an empty repo. On any fetch failure the job keeps the previous city data and its generated_at, and writes nothing new for that run.
- The page reads the city data file from the profile repo at load time; on fetch failure it uses the copy bundled at deploy, and the stats bar shows its "as of" date. Data older than 36 hours shows the stale state (dimmed "as of" date), never zeros.

Page modules (deep modules, small interfaces)
- City data loader: input a URL and a bundled fallback; output a validated city data object with missing values as null. The only module that touches the network for data.
- Landmark registry: the 8 landmarks with name, one line, site link (or none), hologram symbol and district. Static, in the page. Panel lines approved by Lincoln.
- World streamer: loads the city in waves by distance from the camera. Wave 1 (target about 5 MB) is the start street, sky, stats bar and pre-compiled shaders; wave 2 is other districts nearest first; wave 3 is audio on click and radio music on demand. Decoding (meshopt, KTX2) runs in workers. Each chunk is decoded, uploaded to the GPU and its shaders compiled before it becomes visible, with a per-frame work budget, and prefetch runs far enough ahead to stay in front of drive mode at top speed.
- Quality governor: picks a tier at start (GPU tier detection, coarse pointer, WebGPU adapter), then lowers or raises it from measured 95th-percentile frame time, with a guard against flip-flopping. Phone lite: device pixel ratio 1, no live shadow, baked reflection probe, rendering capped at 30 fps by elapsed time (not by skipping every second callback, which gives 60 fps on a 120 Hz screen); movement runs on real time, independent of render rate. Phone memory budget (allocation, replaced by measurement): resident textures 256 MB or less, total GPU memory 400 MB or less; districts out of range are disposed.
- Movement controller: one interface (enter, update, exit, camera) with five implementations behind the switch. Default mode is set by Lincoln after the first-block review.
- Landmark interaction: proximity and click detection; opens the panel; holds the panel state. The panel is in the world: curved hologram screens with light rings unfold around the visitor, and the site button is a glowing tile. Its text is real text drawn in 3D (an SDF text library), not baked into images, so the approved lines can change. A flat HTML copy of the same panel shows on phones and for screen readers, and tests read that copy.
- Look references: the local plan folder, brief.md "Look references" (images local only, never in this repo). Holograms are wireframe line drawings with light ribbons; the character is a rigged cyborg (armor plates, blue and orange seams).
- Audio: ambient bed after the Enter click, radio stream on demand, mute always visible.
- Benchmark mode: a URL flag that flies a fixed camera path per movement mode and reports p50, p95, p99 and max frame time, draw calls, triangles and the GPU renderer string.

Rendering plan (the optimization research in the local plan folder)
- three.js r186. Renderer choice (WebGPURenderer with TSL or WebGLRenderer with pmndrs postprocessing) is decided by measurement at the first block: the same first-block scene, plus a stress copy with the draw-call count of the full city, runs on both, and the one with the lower p95 total frame time wins, provided its WebGL2 phone path also passes the phone bar. Renderer-specific materials are written only after this choice.
- Geometry: city chunks merged per material; repeats as InstancedMesh or BatchedMesh with per-instance emissive values for data-driven windows; 3 LOD levels; impostors for the far skyline, faded into fog; distance chunk culling.
- Detail: normal maps baked from high-poly bevels; about 4 shared trim sheets; one emissive window atlas; decals.
- Lights: baked light and AO; emissive plus HDR bloom; instanced additive light cards; one key light. Clustered point lights and screen-space reflection are not in v1; they come back only if Lincoln's visual review finds the baseline lacking.
- Shadows: baked for still geometry, one live key shadow (2 cascades or a follow map, updated every second frame), blob contact shadows. No point-light shadows.
- Wet streets: half-resolution planar reflection of a reduced layer set, roughness blur, puddle mask, ripple normals, over a cube probe.
- Rain: instanced streaks moved on the GPU in one draw call; ripples from the puddle mask. Fog: exponential height fog; light shafts as cards.
- Post: HDR mip bloom at 0.5 to 0.7 scale, one tone map, SMAA (FXAA on phone), half-res AO, render scale 0.85 with sharpening, 8-sample speed blur in drive mode only. No TAA by default.
- Shader warm-up (compileAsync) completes behind the menu or fly-in, so no first-use stall appears in play.
- Budgets (allocations, replaced by first-block measurements): desktop 16.6 ms GPU per frame by the budget below; download (cold cache, counting scripts, decoders, textures, models and audio): first playable 15 MB or less, full city visit 40 MB or less, phone lite 15 MB or less.
- Smoothness pass: the benchmark route for each movement mode lasts 60 seconds, starts from a cold cache so streaming is included, and runs at 1920x1080 on the desktop full tier. Pass: desktop p95 frame time 16.7 ms or less and max 50 ms; phone lite p95 33.3 ms or less and max 50 ms.

Assets
- Background buildings, signs, car, character, palms: CC-BY and CC0 models from the asset research in the local plan folder, ranked picks first. Every author goes in a credits file and the on-page credits panel.
- Street prop kit (about 15: AC units, vents, antennas, cables, street lights, vending machines, barriers): modeled by the design realm, owned by Lincoln.
- Landmarks and holograms: custom, by the design realm.
- No NC, ND or SA licensed files. No fan models of film or game IP. No file from threejspunk.vercel.app. No paid or store-licensed raw file in the public repo.
- Pipeline: source models to glTF to gltf-transform (meshopt, KTX2) in CI.

Profile
- The stats card SVG and its render workflow move to the profile repo's archive with a recovery note. The PC job keeps uploading data.
- The profile README shows a 4 to 6 second looping clip of the city in rain (animated GIF or WebP, 8 MB or less; GitHub documents images and GIFs up to 10 MB) that links to lstuek.github.io, with a still image under 3 MB as backup. File names are versioned. The Camo size cap and cache time are unverified, so the loop is proven on the real profile before the swap (Lincoln 2026-10-29).

Art production
- Owned art (props, trim sheets, landmarks, holograms, character and car fixes) is built by deterministic Blender Python scripts run headless with portable Blender 5.2.3, keeping each editable .blend and its script in the repo. The local blender-to-web guide covers the export handoff; its files never enter this repo (no license).
- Every look ticket renders fixed camera shots next to the matching look references and checks silhouettes, surface detail, shadow contact, reflection alignment, neon spill and text readability; desktop and phone lite are approved separately.

Order of work: the tickets on GitHub (#2 to #20) and their blocking links own it; PLAN.md summarizes it.

Desktop frame budget (GPU ms per frame, allocations from the optimization research, replaced by first-block measurements): shadow 1.2, main city pass 4.5, wet-street reflection 1.6, rain, light cards and holograms 1.2, fog and light shafts 0.8, AO 0.8, bloom 1.0, drive-mode speed blur 0.6, tone map, SMAA and upscale 0.9, UI and compositor 0.5, reserve 3.5; total 16.6.

## Testing Decisions

- A good test checks what a visitor or Lincoln's privacy depends on, through the outside of the system, never inner parts. Looks are judged by Lincoln on still frames and the live page, not by tests.
- Gate 1, city data (pytest in the profile repo; prior art: its existing update and publish tests with fixtures, including the staged-file check): fake repo lists in, city data out. Checks: the 8 landmark keys pass; a private repo name placed in any permitted string field (such as top_language) stops the job; an unknown key stops the job; an unsafe staged file stops publication; the locked zone is one number; dates carry no clock time; uploaded AI ledgers hold per-day counts only; generated_at is present; the city repo is excluded; a failed GitHub request keeps the previous data and generated_at.
- Gate 2, the page (headless Playwright with a fixture city data file; prior art: the verify-browser scripts in Lincoln's other projects): the stats bar shows the fixture numbers; a null shows a dash; stale data shows the stale state; a failed or malformed data fetch falls back to the bundled copy; each of the 5 modes switches and moves the camera under keyboard and touch input; movement stops at a building wall and at the locked zone wall; clicking each landmark opens the right panel and the right link (no button for no-site landmarks); a forced graphics context loss recovers to a drawing scene; no console errors; mute works; reduced motion turns off the fly-in and blur; the benchmark mode completes its path and writes its report.
- Budget check (CI on every build): measures cold-cache transfer for first playable, a full city visit and phone lite, and fails the build when over budget; proven once with an oversized fixture that fails.
- Frame-time proof: the benchmark mode logs the renderer string every run. A headless run on a software renderer is a regression check only. The 60 fps bar is proven on Lincoln's own browser with the benchmark link, unless the headless probe shows his real GPU. The phone bar needs one run on a real iPhone.
- Headless runs only, one browser-test agent at a time, every run closes its browser; 3D pages are checked with a few still frames, never long software-GL runs.

