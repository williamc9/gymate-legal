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
