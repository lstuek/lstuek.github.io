# Spec: Commit City

Status: approved by Lincoln 2026-10-27. This file owns the decisions; the spec issue on GitHub is a snapshot for the tickets. Build decisions and tests: ref/build.md. The grill notes, all three research reports and the look-reference images stay in Lincoln's local workspace (aios plans/2026-10-27-commit-city), never in this public repo; local agents read them there. Terms: GLOSSARY.md.

## Problem Statement

Lincoln's GitHub profile shows a stats card. It reads as a list of numbers and shows nothing of what he builds: sites, games and 3D. He wants a visitor to walk into his work as a place: a night cyberpunk city where his real projects stand as landmarks, his real activity lights the windows, and the city itself shows the level of 3D craft he can deliver. Most of his repos are private partner work, so the city must show activity without leaking names, counts of secret projects or his daily schedule.

## Solution

A single hosted page at lstuek.github.io: a compact, dense cyberpunk city at night, in rain, built in three.js with game-studio optimization. Eight landmarks stand for his main projects; each has a hologram and opens a panel with a plain description, real numbers and, where one exists, a link to the live site. A stats bar shows lifetime AI tokens, total commits and top language. Visitors move in one of five modes behind a switch. The data comes from Lincoln's existing PC job, which uploads numbers only. The city replaces the stats card on the GitHub profile; a still image of the city links to the page.

## User Stories

Visitor, arrival
1. As a visitor, I want the page to show progress while it loads, so that I know it works and how long to wait.
2. As a visitor, I want a cinematic fly-in over the skyline in the rain, so that my first look shows the whole city (only if it holds the smoothness bar; else see 3).
3. As a visitor, I want a menu screen that loads straight into first person when the fly-in is not used, so that I start fast.
4. As a visitor, I want one "Enter" click to start sound and control, so that nothing plays before I choose.
5. As a visitor, I want the first street ready to move in before the rest of the city finishes loading, so that I do not wait for the whole download.
6. As a visitor on a slow connection, I want the far districts to load in while I move, so that I never see a frozen screen.

Visitor, movement
7. As a visitor, I want to walk in first person with mouse look and WASD, so that I see the street at eye level.
8. As a visitor, I want to walk a third-person character with a follow camera, so that I see myself in the city.
9. As a visitor, I want to drive a hover-car through the streets with speed blur and light trails, so that the city feels fast and alive.
10. As a visitor, I want to fly a drone between towers, so that I see the skyline and rooftops.
11. As a visitor, I want a guided orbit where the camera glides and I drag to turn, so that I can look without game controls.
12. As a visitor, I want a visible switch for the movement modes, so that I can try each.
13. As a phone visitor, I want touch controls (a stick and drag to look), so that I can move without a keyboard or pointer lock.
14. As a visitor, I want collisions with buildings and the city edge, so that I cannot fall out of the world.

Visitor, landmarks and data
15. As a visitor, I want each landmark visible from far away by its hologram, so that I can find Lincoln's projects.
16. As a visitor, I want a panel to open when I get close to or click a landmark, so that I learn what the project is.
17. As a visitor, I want every landmark's panel to show the name, one plain line, commits, "pushed this week" or a date, and main language, so that I see real activity. (Panel fields are the same for all 8; only the site button differs.)
18. As a visitor, I want a button to the live site on landmarks that have one, so that I can see the real work.
19. As a visitor, I want landmarks without a site to show a name and line only, so that nothing links to a private repo.
20. As a visitor, I want lit windows and hologram brightness to follow recent commits, so that busy projects look busy.
21. As a visitor, I want a roof beacon on landmarks pushed this week, so that I see what is active now.
22. As a visitor, I want to see a walled locked zone that glows from combined private activity, so that I know more work exists without seeing what it is.
23. As a visitor, I want the stats bar to show AI tokens, total commits and top language, so that I see the scale of the work.
24. As a visitor, I want an "as of" date on the stats, so that I know how fresh the numbers are.
25. As a visitor, I want a dash, never a zero, when a number is missing, so that I am not misled.

Visitor, look and sound
26. As a visitor, I want rain, wet streets that mirror the neon, fog and light beams, so that the city feels like a night cyberpunk world.
27. As a visitor, I want every building and prop to have rounded edges, panels and real surface detail, so that nothing looks like default shapes.
28. As a visitor, I want accurate-looking shadows (baked for buildings, live for moving things, soft contact shadows), so that objects sit in the world.
29. As a visitor, I want rain, traffic and city hum after the first click, so that the city sounds alive.
30. As a visitor, I want a synth radio I can switch on, so that I can add music.
31. As a visitor, I want a mute button always visible, so that I can stop sound at once.
32. As a visitor who prefers reduced motion, I want the fly-in, speed blur and camera shake turned off, so that the page does not make me ill.
33. As a visitor, I want a credits panel naming every model, sound and music author, so that the licenses are honored.

Visitor, devices
34. As a desktop visitor, I want 60 fps with no frame over 50 ms, so that movement feels smooth.
35. As a phone visitor, I want a lighter version at 30 fps that does not crash the tab, so that the city works on my phone.
36. As a visitor whose graphics drop, I want the page to lower quality by itself, so that it stays smooth.
37. As a visitor, I want the page to recover if the graphics context is lost, so that the city does not stay black.

Visitor, sharing
38. As a person who shares the link, I want a title, description and preview image in the link card, so that the link looks good in chat and social apps.

Lincoln
39. As Lincoln, I want the city data to update from my existing PC job, so that I run no new process.
40. As Lincoln, I want only the 8 landmark keys and aggregate numbers to leave my PC, so that no private repo name or count leaks.
41. As Lincoln, I want landmark names, lines and site links kept in the page, not in the uploaded data, so that the data file holds numbers only.
42. As Lincoln, I want to approve all 8 panel lines on one screen before launch, so that nothing public says more than I want.
43. As Lincoln, I want the 5 movement modes behind a switch, so that I can pick the winner and set the default.
44. As Lincoln, I want to see the first block at full quality before the rest is built, so that a wrong direction is caught early.
45. As Lincoln, I want hologram symbol options shown at the first-block review, so that I pick them by eye.
46. As Lincoln, I want a speed-test link that reports frame times per movement mode, so that smoothness is measured, not guessed.
47. As Lincoln, I want the old stats card archived and ready to restore, so that I can go back.
48. As Lincoln, I want my GitHub profile to show a still image of the city that links to it, so that profile visitors enter the city.
49. As Lincoln, I want a paid asset only after I say yes to one specific kit and price, and never as a raw file in the public repo, so that I control spend and licenses.

## Out of Scope

- Other visitors, chat, ghosts or multiplayer (the movement controller and world are built so they can be added later).
- Rooms inside landmarks.
- Live data from the browser (no GitHub API calls from visitors).
- Paid assets unless Lincoln approves one specific kit.
- Any link to a repo.
- The live postcard.

## Further Notes

- Open (facts for the build agent, not Lincoln): which repo backs the bionic-wave and new-era landmarks (the PC job's owner list decides); exact triangle counts and texture sizes of the picked models; whether the Quaternius free tier includes the animation clips.
- Lincoln still sends look references (street level, hologram style, sign language, color, menu and panel style, car, character, anti-references). They feed the first block, not this spec.
- Partner landmarks: Lincoln confirms the partners are fine with names, links and numbers (2026-10-27).

## Review log

Codex devil's-advocate review, read-only, 2026-10-27, verdict "revise". Taken: 1 (hourly AI ledgers become daily in the upload), 2 (privacy test at the real boundary), 3 (failed fetch keeps previous data), 4 (renderer chosen by total frame time on both), 5 (smoothness pass defined), 6 (download budget check in CI), 7 (phone memory budget, iPhone run at the first block), 8 (per-chunk warm-up before reveal), 9 (30 fps by elapsed time), 10 (gates for touch, collisions, context loss, bad data), 11 (fly-in provisional until the full route passes), 13 (clustered lights and screen-space reflection out of v1). Dropped: 12 (panel conflict): Lincoln's answer was that a no-site landmark shows a name and description in place of a link, not in place of its numbers; story 17 now says this plainly.
