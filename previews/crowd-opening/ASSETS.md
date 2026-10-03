# Crowd opening preview

Original crowd sprite: https://skiper-ui.com/images/peeps/all-peeps.png

Walking timeline adapted from Skiper39: https://skiper-ui.com/registry/skiper39.json
The crossing motion, quarter-second yoyo bounce, random timeline speed and power2 depth distribution are retained. Density and canvas resolution adapt to the visible stage. Skiper UI credit is displayed in the footer. Original illustration credit: https://www.openpeeps.com/. Original animation inspiration: https://codepen.io/zadvorsky/pen/xxwbBQV.

GSAP 3.15.0: https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js (license header retained).

Gym room background: generated with the built-in image-generation tool, saved as `assets/gym-room.png`. Original retained at `C:/Users/user/.codex/generated_images/01a0f818-7672-7532-83e6-a2aa52dab278/exec-53f2e688-1037-48c6-970c-9661132198b8.png`.

Generation prompt:

> Create a standalone wide landscape illustration background for a playful gym social app website, 1536x1024 or similar landscape. Black-and-white hand-drawn pen illustration in the simple Open Peeps aesthetic: organic confident black outlines, slightly imperfect curves, white flat fills, selective solid black accents. An EMPTY friendly contemporary gym room seen straight on, gentle architectural perspective: tall rectangular windows, a squat rack and dumbbell rack to the left, exercise bikes and hanging gym rings to the right, a wall clock and a low bench, spare simple ceiling beams. NO PEOPLE anywhere (the website will place original animated Open Peeps people in the foreground separately). Composition: gym equipment and windows occupy the upper two-thirds and left/right background, with a generous empty gym floor in the lower third for the animated crowd. Make gym equipment also visible close to the middle so a narrow mobile center crop still reads as a gym. The illustration should be simple like an editorial doodle, coherent and charming, not a detailed architectural rendering. Background pure white, no grey texture, no gradients, no shadows or photorealism. NO text, lettering, logos, interface, phones or border. This is only the background image; headline and people will be added in HTML. Match the visual spirit of original Open Peeps black-and-white canvas crowd characters.

Fonts and Gymley logo reused from the existing approved website assets.

## Colour revision

`assets/gym-room-colour.png` was edited from `gym-room.png` using the built-in image-generation tool. The original monochrome asset is retained. Crowd placement is raised by 20% of the responsive gym scene height; crowd artwork and motion are unchanged.

Edit prompt:

> Edit this exact gym illustration by adding colour ONLY. Preserve the identical composition, all original black outlines, equipment, proportions, windows, perspective and empty foreground. No people, text or additional objects. Keep the playful flat hand-drawn illustration style, no photorealism or 3D rendering. Apply cheerful tasteful flat colours suited to Gymley's golden yellow and mint palette: light mint walls, pale sky-blue window glass, leafy greens for plants and trees, warm golden-yellow upholstery on the bench, small yellow accents on equipment and planters, charcoal equipment with gentle cool grey metal, and a very light warm ivory floor. Retain crisp black lines and black structural accents. Use distinct visible colours, not an overall colour wash. Keep the floor light and clean so black-and-white animated characters will read clearly in front. Maintain original 1536x1024 landscape dimensions.

## Cinematic phone sample — 2 October 2026

The second section is a deliberately limited scroll-story sample: mutual Wave reveal, then three alternating messages. One sticky phone and the accompanying caption share a reversible, scroll-seeked GSAP timeline. The approved opening's CSS, original people sprite, background and crowd animation are unchanged.

Visual approach inspired by the user-selected Cinematic Landing Hero: https://21st.dev/@jahed/components/cinematic-landing-hero. This is an original implementation for Gymley's story; no private component source is copied.

Phone portraits reuse the fictional generated `../website/assets/profiles.webp` sheet (Ethan top-right, Mina top-left). The Wave and Add Gymate icons reuse existing app assets from the same folder. The staged conversation is illustrative, not a real user's chat.

The desktop layout places text beside the phone; mobile places it above. Scroll, touch, keyboard scrolling and four accessible moment buttons share the same progress state. Reduced-motion, missing JavaScript/GSAP, and short landscape windows show a readable completed chat in normal document flow instead of pinning or clipping the phone. No database or real app data is used.

## Full one-phone journey

The approved pacing sample is extended into seven chapters: anonymous Wave arrival in the room; independently noticing Mina and viewing her profile; sending a Wave; mutual reveal; three-message Waveie chat; both people choosing to add each other as Gymates; the same conversation continuing later that evening. Seven moment buttons navigate the same reversible timeline as scrolling.

The anonymous notice contains no name or identifying portrait. It disappears before the room highlights Mina as the viewer's choice. The temporary-chat rule is caption copy beside the Waveie conversation, not a separate departure scene. The connection card first shows only the viewer adding Mina, then Mina's independent choice, and only then the Gymate confirmation. The ending uses a retained earlier message, a later-evening timestamp and new messages to demonstrate continuity.

No new generated assets or libraries. Room icons and all four fictional portraits are reused from the existing website assets. The crowd opening remains unchanged. Short portrait phones use a wider compact phone with two room cards and reduced decorative chrome. Reduced-motion, unavailable scripting and windows too short for pinning retain a completed chat plus a normal-flow six-point transcript of the full story.

Verified in the in-app browser at desktop 1440×1000, iPad 820×1180, narrow phone 320×740 and short phone 390×667: anonymous state, profile/Wave confirmation, sequential messages, separate Gymate decisions, later messages, reverse scrolling, no horizontal overflow, card/navigation and connection-panel bounds. Script syntax and Git whitespace checks pass. This is a staged marketing journey, not a live app or backend change.

## Gym tools and neighbourhood preview — 3 October 2026

Two additional sections follow the approved opening and seven-chapter journey. Their existing CSS and JavaScript are unchanged. `playground.css` and `playground.js` provide isolated styles and interactions without new dependencies. These are illustrative marketing interactions, not app changes or real requests.

The bench's dumbbells, notebook and stopwatch are tappable, with equivalent keyboard-accessible tabs. The spot demo reveals Mina's reply; the notebook moves exercises upwards with a short transition; the stopwatch runs an eight-second sample countdown. The countdown pauses when hidden, offscreen or another tool is selected. Reduced-motion preferences disable decorative transitions.

The neighbourhood offers 2/10/20 km sample coverage, four fictional gyms and check-in counts. Tapping a gym places a small Open Peeps crowd on the map and shows its sample count below. Counts represent fictional Gymley check-ins, not total gym occupancy. No actual location, demographic data, API or backend is used. Gender/age breakdowns are not included. Map and numbers are explicitly labelled illustrative, not live, and not to scale.

### New illustration assets

Created with the image-generation skill and built-in image-generation tool, inspected visually, and used as lazy-loaded 1536×1024 PNGs. Both are original generated artwork; the moving/snapshot people remain the existing Open Peeps sprite.

- `assets/gym-bench.png` (1,328,107 bytes). Original: `C:/Users/user/.codex/generated_images/01a0f818-7672-7532-83e6-a2aa52dab278/exec-60747f86-cf4d-425e-8aff-ea66fa777c5e.png`.
- `assets/gym-neighbourhood.png` (2,005,793 bytes). Original: `C:/Users/user/.codex/generated_images/01a0f818-7672-7532-83e6-a2aa52dab278/exec-47588cce-3ae6-4309-bcc8-5f66676bbd78.png`.

Bench generation prompt:

> Create one standalone landscape editorial illustration for Gymley, a friendly gym social app. Asset will sit under three interactive HTML labels, so NO typography or interface. Wide landscape 1536x1024 composition, clean pure white background. Simple playful hand-drawn pen outlines like Open Peeps, organic black contours with flat mint green, sunny golden yellow and soft ivory fills, occasional black accents. A long low gym changing-room bench seen from slightly above, positioned across the lower-middle of the canvas. On the left end a pair of substantial charcoal dumbbells with yellow details; at the centre an open mint-covered workout notebook showing just a few abstract horizontal ink lines and a yellow pencil; at the right a large friendly yellow analogue stopwatch standing upright against a folded mint gym towel. Make these THREE main groups clearly separated horizontally, easy to recognize even scaled down. Sparse gym context only: one small potted plant behind the bench at far left and a faint locker outline at far right, lots of breathing room. Objects should be chunky and charming, not photorealistic or 3D, no gradients, no text, no people, no logos, no decorative border. The bench has pale golden timber and simple black metal legs. Objects in roughly equal visual weight. White background must blend seamlessly into white webpage.

Neighbourhood generation prompt:

> Create one standalone landscape neighbourhood map illustration for Gymley, a playful gym social app website. 1536x1024. A whimsical simplified bird's-eye/isometric hybrid neighbourhood, hand-drawn black pen outlines in the Open Peeps editorial style, flat cheerful mint parks, golden-yellow accents, warm pale ivory streets and light sky-blue waterfront in upper-left corner. Four small recognisable gym buildings distributed around the centre: one at centre around x50% y55%, one nearby at x37% y65%, one above-left x39% y28%, one right x77% y42%. Gym buildings use dumbbell pictograms ONLY, no written lettering. Connect with wide winding streets, few mint trees, small simple other buildings and a tiny cafe. Leave generous open space between the main buildings so website overlays can add circular coverage rings, clickable location labels and people. This is an illustrative fictional map, NOT a real city or precise navigation map. Entire composition readable on mobile, no microscopic detail. Background pale warm ivory #fff9eb. Flat colours, organic confident black contours, no photorealism, no 3D rendering, no gradients, no shadows, no compass, no labels, no words, no numbers, no pins, no people, no circles or coverage rings (those come from code).

### Verification

Browser-checked at 1440×1000, 820×1180, 390×844 and 320×740 without horizontal overflow. Verified illustrated notebook hotspot, spot response, exercise reordering and disabled first-row control, keyboard tab navigation, timer completion/pause, coverage totals, selected-gym crowd counts and resetting an out-of-range selection. No browser warnings/errors observed. JavaScript syntax and Git whitespace checks pass. No app build, legal-page changes or backend writes.

## Favorite Gyms Crowd Insights integration — 3 October 2026

Replaced the neighbourhood's exact sample counts with banded Crowd Insights, following the app's `FavoriteRoomsContent.tsx` and `crowdInsightsPolicy.ts`: population range, Quiet/Moderate/Busy, approximate women/men mix and peak weekday/time. There is no age breakdown. This revision supersedes the exact-count description above.

In-range gyms reveal compact callouts on the map; out-of-range gyms show only a disabled name. Desktop callouts include the mint/yellow split bar and approximate percentages. Tablet/phone callouts show range and busyness, with the full selected-gym detail card directly below the map. Selecting a gym updates its name, population band, status, split, peak and decorative crowd. Narrowing coverage resets any now-out-of-range selection. The quiet Corner Club example hides its gender split and reports insufficient peak history. All figures are fictional, and the illustrated people are decorative rather than a count visualization. Coverage controls discovery in this demonstration, not actual entitlement to Favorite Gym statistics; that distinction is stated on the page. UTC labels match the app's current peak-time presentation.

No new images, libraries, backend calls or app changes. The previously approved crowd, scroll journey and gym-tool interactions are preserved. Browser checks covered desktop 1440×1100, tablet 820×1180 and phones 390×844 / 320×740, including callout spacing, all four statistic categories, the quiet-data state, 2/10/20 km changes, out-of-range resets and Enter-key selection. Final 320px and 820px bounding checks found no overlapping or clipped gym callouts; no horizontal overflow or console warnings/errors were observed. The browser-verification checklist was run using the available in-app browser because the standalone agent-browser executable is unavailable. JavaScript syntax and Git whitespace checks pass.

## Hands-on Ask a Spot and program builder

Reviewed `app/TrainScreen.tsx` before revising the two demonstrations. Native Ask a Spot selects a station, asks the gym and assigns the first helper who accepts. Native program creation names an empty program, then selects muscle group, exercise and sets/reps/rest. The website deliberately implements a small illustrative subset rather than copying the app screens.

`tools-demo.js` and `tools-demo.css` isolate the new behaviour. Mina sends a request to six fictional same-gym recipients; notification badges arrive sequentially, then the visitor can play one recipient accepting. Other recipients become unavailable, the accepted helper is highlighted, and replay clears the prior delivery state. Reduced-motion skips the stagger; leaving the view or hiding the page settles outstanding delivery timers. Existing generated Mina portrait and Open Peeps sprites are reused. Connector lines are a functional broadcast diagram, not new artwork.

The program demo begins empty: name up to 40 characters, select a muscle group and exercise, configure sets/reps/rest, then add it to the notebook. Visitors can add up to six sample exercises, move them up/down, remove them or start a fresh program. Entries exist only in page memory, reset on reload, and are inserted with textContent rather than HTML. There are no backend calls, notifications, accounts or saved workouts. The sample exercise catalogue is intentionally small. Labels, buttons and selects support keyboard interaction, and form controls retain a 16px font on phones.

Verified naming, configured exercise values, multiple additions, up/down keyboard ordering, removal, six-exercise limit, fresh-program reset/blank validation, broadcast delivery and first-helper selection with Bench and Squat, and replay. Effective CSS viewport widths were checked at 320, 820 and 1440px (the browser's existing zoom was left unchanged); no horizontal overflow at those widths. The new browser-verification checks use the in-app browser fallback. The original rest-timer markup, CSS and logic, map, crowd opening and cinematic story are unchanged. No iPhone/app build or main legal-page changes.

## Section flow and copy refinement

Removed both arrow-link bridges and the story's extra scroll instruction. The opening flows into the Wave story through a white-to-mint background; the standalone Ask a Spot scene continues the mint and fades into the white training bench, followed by the cream neighbourhood. No new pinned-scroll sequence was added. Opening artwork and crowd motion remain untouched.

Moved the existing spot broadcast intact into `#ask-a-spot`, between the Wave journey and the bench, with “Need a hand? There’s your opening.” The spot group is no longer a tab panel, so switching training tabs does not hide it. The bench now has only program and rest tabs, initially showing program creation; the notebook and stopwatch hotspots remain. The dumbbells stay decorative. Program and spot logic are unchanged, as are the countdown's contents and behaviour.

Updated key story captions to “Someone noticed you. Wonder who?”, “Looks like you caught each other’s eye.”, “Some chemistry is worth keeping.” and “The workout’s over. This could be just starting.” Retained mutual-choice mechanics and the temporary-chat explanation. Every in-range map callout explicitly labels its range as “people”; the large detail card says “people checked in.” Peak copy is now “Peak hours”, with UTC preserved. The small explanatory note still distinguishes Gymley check-ins from total gym occupancy.

Browser-verification workflow used the available in-app browser fallback: section order and removed links, standalone spot delivery/acceptance, two-tab keyboard navigation, program creation/addition, countdown completion, revised mobile captions, population units and peak labels. Checked 320px phone and 820px tablet bounds without clipped/overlapping map cards or horizontal overflow, and visually inspected the standalone desktop scene at 1440px. No console warnings/errors observed. Syntax/whitespace checks pass. No generated assets, new dependencies, app builds or legal-page edits.
