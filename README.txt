B.C. practice — WordPress block theme, version 1.6.0

Update an existing GitHub-managed theme
Apply the 1.6.0 patch to the theme repository after checking it with git apply --check. This patch expects version 1.5.1. Review, commit and deploy through your normal GitHub workflow. The companion feedback plugin is installed separately.

First installation from a complete theme package
Upload the complete bc-practice.zip through Appearance > Themes > Add New Theme > Upload Theme, then activate it. A patch file is not a complete theme package.

Open Appearance > Editor to edit the shared header, footer and site styles.

This update does not import content or rewrite saved pages. Existing pages keep their assigned template. WordPress gives saved Site Editor template customisations precedence over theme files. If you previously edited Detailed content page in the Site Editor, back up that customisation before resetting it to use the updated theme layout.

Quick links, icons and body text — version 1.6.0
- Quick actions and resources: an icon-tile pattern with eight editable entries. Its grid uses two, four or eight columns as space allows. Select each label and add its real destination with the link control. One link per tile makes the whole tile clickable on the published page.
- Quick access links: a boxed resource-link pattern. Add real links and replace sample file names/types/sizes. External-link icons do not automatically open a new tab; choose link behaviour deliberately.
- Find both patterns under B.C. components. Duplicate or remove entries as needed. Their content is manually curated; no popularity is inferred from analytics.
- The shared Component icon block now offers 44 local SVG symbols. Type in Symbol in Block settings to search. Existing icon selections remain valid across all patterns that use this block.
- The default body preset is Large body, 1.125rem. Paragraph, list, Details and table defaults use it, including accordion summaries and content. Navigation controls and secondary metadata can retain their own UI sizes.
- Existing per-block sizes and saved Global Styles can override theme defaults. In Appearance > Editor > Styles > Typography, choose Large body for body/content text where a saved customisation still supplies the previous size. Clear a block's custom font-size choice to use the default.

Optional page feedback
Install the separate B.C. page feedback plugin once through Plugins > Add New Plugin > Upload Plugin. It supplies the Page feedback block/pattern, source-page reports, the site-wide report and CSV export. Its data stays in WordPress when themes change. Open Page feedback > Settings to configure display, support and retention; automatic display is initially off. See the plugin's README and settings for data fields, access and retention controls.

Global mega menu — version 1.5.0
The default header now contains the site title, WordPress search and a Mega menu block. There are also Mega menu and Header with mega menu patterns under B.C. navigation. Existing saved header customisations remain in place; no database content is overwritten by this update.

Configure the menu
1. Open Appearance > Editor and edit the Header template part. In WordPress 6.6, find it under Patterns > Template parts > Header. Other versions may show template parts under Design > Patterns.
2. Select Mega menu in List View and open its Block settings. The initial Browse topics section uses Top-level topic pages.
3. Change its Section label to Browse HR topics, or another label that describes your site.
4. Keep Top-level topic pages to list your published topic roots, such as Benefits and Pay and compensation. The homepage and pages assigned to their own hierarchy sections are excluded from that list. Published children of the homepage are promoted into the topic list.
5. To restrict a section to one branch, choose a published Parent page instead. That page's children become the first column; the parent remains available through View all.
6. Use Add menu section for Forms, Tools and systems, Policies and agreements, or Get support. Choose the matching published parent page for each. Type in Parent page to search the site's published pages.
7. Use Move up / Move down to order the top bar. A parent with no children becomes a normal link. Direct link sections can point to another internal or external address; links open normally in the same tab.
8. Optionally fill in both Support link text and Support URL for a link in the menu footer. Enter your real support destination.
9. Save the header and preview the site. The editor shows a non-interactive bar plus a native hierarchy preview; the three-column interaction runs on the public page.

If your existing header still shows the old navigation
- WordPress saved template parts take precedence over updated theme files. Back up any header customisation you want to retain.
- Edit the Header template part and replace its contents with the Header with mega menu pattern. The site title and search use the site's current settings. Restore any custom logo or extra header content you want to keep, then configure the Mega menu block and save.
- Alternatively, remove the old Navigation block and add Mega menu as a separate full-width block below the existing brand/header group. Keep one global navigation menu per header.
- Do not reset page templates to change the header.

Menu content and page structure
- Page titles supply the link labels. Explicit Excerpts provide short branch introductions, up to 35 words, shown in the middle desktop column. Blank excerpts remain blank; body content is never copied into the menu.
- Parent and Order settings control the hierarchy and ordering, shared with the existing topic navigation and child-page cards. Pages sort by Order, title and ID.
- Use the actual page hierarchy. A separate artificial HR wrapper page is not required: Top-level topic pages works with Benefits, Pay and compensation and other existing roots.
- Published pages only. Draft, private, pending, scheduled and deleted pages are omitted. A section whose selected root is no longer published disappears rather than reverting to the whole site. A published descendant beneath an unpublished branch is not included through that branch.
- Password-protected published pages remain links, but their excerpts are omitted.
- Changes to titles, excerpts, ordering and page relationships appear on the next uncached page render. Clear hosting/page caches if old navigation remains visible.
- This update does not import sample HR pages, invent support destinations or migrate a saved WordPress Navigation menu. The Mega menu has its own section settings.
- Top-level sections are manually selected; their page hierarchies populate automatically. Navigation, topic sidebars and On this page retain their separate roles: site-wide choices, nearby pages and headings within the current page.

Interaction and accessibility
- Desktop: three columns show topics, subtopics and pages. Gold markers and pale backgrounds identify the selected branch. The first two columns keep their landing-page links at the bottom. The third column uses a compact View all link with a descriptive accessible name.
- The first three desktop levels have no additional breadcrumb strip. Selecting a deeper branch moves the three-column window forward and shows Back with the path. Back restores the previous level. The current page's branch opens when its menu section is opened.
- At 900px and below, Menu opens the main sections. Choosing a section opens one panel at a time. Back moves up one level and eventually returns to the main sections.
- Menu buttons open on click, Enter or Space; moving the pointer across a row does not change the selection. Leaf links retain normal browser actions such as opening in a new tab.
- Tab follows ordinary controls and links. Choosing a branch moves focus to the new panel's heading; Back returns it to the parent branch button. Escape or Close menu closes the whole menu and returns focus to its opening control. Tabbing or clicking outside also dismisses it.
- This is non-modal site navigation. It does not trap focus, lock page scrolling or use application-menu roles. The menu and each column have accessible names; the current page link uses aria-current.
- Long titles wrap in full. Link text retains its inherited size; compact rows have a minimum height of 44px. Lists use the available viewport height, up to 52rem, with fixed column headings and landing-page links. In very short viewports or with large text, the entire panel can scroll so headings cannot cover the links. No animation is required. Print styles omit navigation.
- If JavaScript is unavailable, a native Menu disclosure contains linked nested page lists. Content remains navigable. Search uses the standard WordPress search form and results template.

Page templates
- Topic landing page: title, excerpt, topic cards, quick access and related topics.
- Detailed content page: title, excerpt, collapsible topic sidebar, inline On this page links and reading column.
- Long reference page: title, excerpt, Browse topic disclosure, sticky On this page index and reading column.
- Standard page, post, archive, search and 404 templates remain available.

Create a page
1. Go to Pages > Add New Page and enter its title.
2. Open the + inserter > Patterns. Insert Topic landing page, Automatic topic landing page, Detailed content page or Long reference page.
3. In the page settings, choose Template and select the matching template. Automatic topic landing page uses Topic landing page.
4. Add a short introduction in the page Excerpt field. Empty excerpts produce no public introduction.
5. Replace all sample content and links, then preview before publishing.

Navigation patterns and block settings
- On this page: inline. Place below an introduction. The Detailed content template already includes it.
- On this page: sticky. Place in a sidebar. The Long reference template already includes it.
- Topic navigation. A topic tree with separately linked titles and branch-expansion buttons.
- Browse this topic. The topic tree inside a compact disclosure.
- Select an On this page or Topic navigation block and use Navigation layout in the Block settings to change its presentation.
- Use the template's supplied navigation once per page. Avoid inserting a second copy into the body.
- Editor previews show full heading lists and topic trees. Interactive responsive controls run on the public page.

Topic navigation
- Breadcrumbs and topic links follow the page Parent setting.
- The highest published ancestor identifies the topic. The tree lists published descendants to four levels below that root.
- Pages are ordered by Order, then title and ID. Edit Order through Pages > All Pages > Quick Edit.
- The current page has a blue marker, bold text and a pale background. Its ancestor branches open automatically.
- A page title is a link. Its adjacent chevron button shows or hides its children.
- On desktop, Hide topic navigation closes the sidebar and centres the reading area. Show topic navigation reopens it.
- The desktop preference is stored only in sessionStorage for that topic and browser tab. If storage is unavailable, controls still work.
- On smaller screens, the title and introduction appear first. Browse [topic] opens the topic links in the page flow.
- On the Long reference template, Browse [topic] is a native disclosure above the reference layout.
- Draft and private pages are excluded. Published password-protected pages remain normal links; their protected body content is not exposed by the index.

On this page
- Lists authored Heading 2 blocks in their document order, including ordinary published synced patterns.
- Heading 3s, headings inside Details, headings using block bindings, and headings carrying the exact bc-toc-exclude CSS class are excluded.
- Synced-pattern instances with per-page overrides keep WordPress native rendering and are omitted from the automatic index. Use ordinary Heading 2 sections for headings that need indexing in those instances.
- Fewer than two eligible headings produces no public index.
- Existing HTML anchors are retained. Missing anchors are generated when rendering, without changing saved page content. Repeated heading names receive distinct generated anchors.
- Keep author-assigned anchors unique. Assign a stable HTML anchor in the heading's Advanced settings when a section will be bookmarked or linked externally; changing an unanchored heading's wording also changes its generated address.
- Each index link updates the URL fragment and moves keyboard focus to its heading. Browser Back/Forward and ordinary link actions remain available.
- On mobile, On this page opens and closes a compact heading list. Choosing a link closes that list and moves to its heading.
- The sticky index marks the current section as readers scroll. The inline list remains a simple index.
- The index and excerpt do not expose password-protected page content before the password is supplied.
- Tables can use the reading column's full width and scroll within their container when needed. Body paragraphs keep a readable maximum width after the sidebar closes.
- The bundled header is not fixed. Anchor offsets also account for the WordPress admin bar and a fixed or sticky top-level site header.

Keyboard and fallback behaviour
- Tab reaches page links and disclosure buttons. Enter activates links. Enter or Space operates buttons.
- Escape from an expanded topic branch returns focus to its branch button. On mobile, Escape can close the top-level navigation disclosure and return focus to its control.
- The Browse topic disclosure also uses the native HTML Details/Summary controls.
- Without JavaScript, topic branches and heading lists remain visible; the native Browse topic disclosure still works.
- Navigation is omitted from print layouts. Essential instructions remain ordinary visible page content.
- No animation is required for navigation or anchor jumps.

Automatic child page cards
1. Insert Child page cards where manual cards should be replaced, or use Automatic topic landing page.
2. Set child pages' Parent to the landing page and grandchildren's Parent to the correct child.
3. Publish those pages. Each direct child becomes a linked card with links to its direct children.
4. Changes appear when the page renders again. Hosting caches may need clearing.
- Deeper descendants are excluded. Leaf pages still appear as linked card headings.
- Only published pages are listed. Password-protected pages appear as normal links; drafts, private, pending, scheduled and deleted pages are excluded.
- Empty titles display as Untitled page. Empty hierarchies show editor guidance and no public cards.
- Quick access, related topics and contact information remain manually editable.

Individual component patterns — version 1.4.0
Find these under the + inserter > Patterns > B.C. components:
- Accordion group and Accordion item.
- Numbered steps and Numbered step cards.
- Related topics and Related topic card.
- Icon and text and Icon information list.
- Information notice, Warning notice, Success notice and Error notice.
- Callout box and Contact and support.
- Last updated and Reference table.

Using components
- Patterns insert independent starter content. Edit the headings, text, table entries and links before publishing. Later changes to a pattern definition do not rewrite existing copies.
- Heading levels are editable. Most individual components begin at Heading 3 for placement within a Heading 2 section. Keep the page's heading hierarchy logical.
- Related-topic headings are deliberately plain text. Select each heading and add its real destination using the link control. No placeholder URLs are supplied.
- Icons are decorative; headings and body text carry the meaning. Select a Component icon and use Symbol in Block settings to choose from 44 local SVG icons.
- Notices are static content. They do not announce themselves as live alerts when a page loads. Application-generated live errors require application-specific behaviour.

Accordions
- Insert Accordion group for native Details sections and local Expand all / Collapse all buttons. Insert or duplicate Accordion item inside that group to add a section.
- The buttons affect only that group's top-level Details sections. Separate and nested groups remain independent.
- Individual summaries work with or without JavaScript. Bulk controls appear on the public page when JavaScript is available and the group contains at least two eligible Details sections.
- Native exclusive Details sets with a non-empty name attribute keep their single-open behaviour and do not show bulk controls.
- Keep essential instructions visible. Use Details for supplementary examples, explanations and situations.
- HTML fragment links to content inside Details open its ancestor Details when JavaScript is available.
- Printing with JavaScript temporarily opens grouped Details, then restores their previous state.
- Existing standalone Details blocks remain available. To add bulk controls to existing sections, place them inside a Group carrying the bc-accordion-group CSS class and insert Accordion controls in that group.

Numbered steps
- Each Step can contain headings, paragraphs, lists, tables and other blocks.
- Select Numbered steps in List View, then use Presentation in Block settings to switch between Connected steps and Boxed steps.
- Add, duplicate, remove or reorder Step blocks using the normal block controls. Numbers follow their order automatically, starting at 1 for each process.
- These are static instructions, with no current/completed progress state.

Last updated
- Uses the current page or post's last saved modification date and the site's date format and time zone.
- The editor preview shows the saved date. Unsaved edits appear in the date after the page is saved and rendered again.
- This field records modification, not a content review or approval. Record an actual review date separately when needed.
- The date remains page-specific when the block is reused in a template or synced pattern.

Requirements and scope
WordPress 6.6+ and PHP 7.4+. No parent theme, plugin, external font service, build tools or government hosting is required. Theme activation affects the site's appearance. There are no content imports, database migrations, analytics or external API requests. Bundled front-end JavaScript enhances the page navigation, component controls and global mega menu; search uses standard WordPress behaviour. Other plugins may add their own behaviour.

This is a custom practice theme using official B.C. design tokens and fonts. It is not the official BCEW theme and does not install the React component library. It does not claim full design-system or WCAG conformance.

Sources and licences
- @bcgov/design-tokens 5.0.0, bundled unchanged: https://github.com/bcgov/design-system — Apache-2.0.
- @bcgov/bc-sans 2.1.2, locally hosted WOFF2 fonts: https://github.com/bcgov/bc-sans — Apache-2.0 and OFL-1.1.
- See licenses/ and THIRD-PARTY-NOTICES.txt. Custom theme code: GPL-3.0-or-later.

Validation for version 1.6.0
- Installed build checked with WordPress 6.6.10 and PHP 8.3.33; PHP syntax also checked with 7.4.33.
- Checked all pattern block markup in the editor, the searchable 44-symbol picker, both quick-link layouts and native whole-tile links.
- Checked responsive layouts at 320, 390 and 768px, including 18px paragraph, list and accordion-summary defaults.
- Checked the companion feedback block, manual/automatic display and private page/site reports in the installed theme.

Validation for version 1.5.1
- Compared identical page content before and after at 1512 x 804px and 1313 x 613px, including a scaled screenshot. Link text remained 16px in both builds.
- At 1512 x 804px, fully visible root links increased from 7 to 12. At 1313 x 613px, visible links increased from 5 to 7 in the root column and from 3 to 5 in the page column.
- Checked fixed column headings, column-footer links, longer labels, large text and existing menu interactions.

Validation for version 1.5.0
- Installed builds checked with WordPress 6.6.10 and 7.1.3, using PHP 8.3.33. PHP syntax also checked with 7.4.33.
- Checked published-page filtering, protected excerpts, unavailable roots, homepage children and safe data rendering.
- Checked desktop drill-down, changing sections, deeper branches, landing links, current-page state, Back, Enter/Space, Escape, outside dismissal and focus handling.
- Checked responsive layouts at 320, 390, 768 and 1024px, including short viewports and resizing an open menu.
- Checked multiple menu instances, unique IDs, native no-JavaScript navigation and print behaviour.
- Checked integration with Detailed content sidebar/heading navigation, WordPress search results, posts and 404 pages.
- Checked header and pattern block validity, editor previews, parent-page searching, section labels and adding menu sections.
- Checked that saved title and parent changes appear in the menu without editing the menu's settings.
- Automated axe checks of the open desktop and mobile menus reported no violations for the selected WCAG 2 A/AA and 2.1 AA rules. This is a development check, not a conformance certification.

Validation for version 1.4.0
- Installed test build used WordPress 6.6.10 and PHP 8.3.33.
- PHP syntax checked with 7.4.33 and 8.3.33; JavaScript syntax and whitespace checks passed.
- Checked the 16 new patterns and all existing patterns for block validity in the actual editor.
- Checked accordion group isolation, nested groups, keyboard controls, fragment links, exclusive and single-item fallbacks, and print-state restoration.
- Checked both step layouts, rich inner content, editor layout switching and reordering.
- Checked component icon selection and server-rendered component previews.
- Checked page-specific modification dates, including a synced instance and a date close to midnight UTC.
- Checked desktop at 1440px, responsive layouts at 320, 390 and 768px, and the no-JavaScript fallback.
- Checked existing topic navigation, heading indexes and automatic child cards.
- Automated axe checks of showcase desktop/mobile and accordion main content reported no violations for the selected WCAG 2 A/AA and 2.1 AA rules.

Version history
1.6.0: Two curated quick-link patterns, 44 searchable icons, Large body defaults and optional companion feedback-plugin support.
1.5.1: Compact menu spacing, more list height, fixed column headings and overview links, simpler page-column headers, and a large-text scrolling fallback.
1.5.0: Page-driven three-column mega menu, mobile drill-down, configurable sections and support link, native fallback, shared header with search, and two navigation patterns.
1.4.0: Sixteen individual component patterns, grouped accordion controls, rich numbered steps, selectable local icons and automatic last-updated dates.
1.3.0: Collapsible topic navigation, responsive heading indexes, sticky active-section index, Long reference template and starter, four navigation patterns, and synced-pattern heading support.
1.2.0: Automatic child page cards and automatic topic landing starter.
1.1.0: Topic landing and detailed content templates, starters, breadcrumbs, excerpt introduction and automatic heading links.
1.0.0: Original practice theme and sample page.
