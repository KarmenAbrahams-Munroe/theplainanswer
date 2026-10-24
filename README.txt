B.C. practice — WordPress block theme, version 1.4.0

Install or update
1. Keep bc-practice.zip zipped.
2. Go to Appearance > Themes > Add New Theme > Upload Theme.
3. Choose bc-practice.zip and click Install Now.
4. For an update, choose Replace current with uploaded. For a first install, Activate.
5. Open Appearance > Editor to edit the shared header, footer and site styles.

This update does not import content or rewrite saved pages. Existing pages keep their assigned template. WordPress gives saved Site Editor template customisations precedence over theme files. If you previously edited Detailed content page in the Site Editor, back up that customisation before resetting it to use the updated theme layout.

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
- Icons are decorative; headings and body text carry the meaning. Select a Component icon and use Symbol in Block settings to choose from nine local SVG icons.
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
WordPress 6.6+ and PHP 7.4+. No parent theme, plugin, external font service, build tools or government hosting is required. Theme activation affects the site's appearance. There are no content imports, database migrations, analytics or external API requests. Bundled front-end JavaScript enhances the page navigation; standard WordPress supplies the site header's navigation behaviour. Other plugins may add their own behaviour.

This is a custom practice theme using official B.C. design tokens and fonts. It is not the official BCEW theme and does not install the React component library. It does not claim full design-system or WCAG conformance. The three-column interactive menu from earlier examples remains a separate feature.

Sources and licences
- @bcgov/design-tokens 5.0.0, bundled unchanged: https://github.com/bcgov/design-system — Apache-2.0.
- @bcgov/bc-sans 2.1.2, locally hosted WOFF2 fonts: https://github.com/bcgov/bc-sans — Apache-2.0 and OFL-1.1.
- See licenses/ and THIRD-PARTY-NOTICES.txt. Custom theme code: GPL-3.0-or-later.

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
1.4.0: Sixteen individual component patterns, grouped accordion controls, rich numbered steps, selectable local icons and automatic last-updated dates.
1.3.0: Collapsible topic navigation, responsive heading indexes, sticky active-section index, Long reference template and starter, four navigation patterns, and synced-pattern heading support.
1.2.0: Automatic child page cards and automatic topic landing starter.
1.1.0: Topic landing and detailed content templates, starters, breadcrumbs, excerpt introduction and automatic heading links.
1.0.0: Original practice theme and sample page.
