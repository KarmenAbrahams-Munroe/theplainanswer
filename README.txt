B.C. practice — WordPress block theme, version 1.15.1



Compact image-banner follow-up — version 1.15.1
The compact image banner uses a thin neutral border. Its introduction and native paragraph blocks fill the available text column without a separate character-width cap. Page excerpts flow single saved line breaks as ordinary whitespace; blank lines still separate paragraphs. Excerpt content remains stored as entered. This applies to the shared page-title block and the earlier page-introduction block. Other banner appearances retain their existing accents.

This follow-up patch expects theme version 1.15.0. The workflow plugin does not need another update.

Validation for version 1.15.1
Installed checks passed on WordPress 6.6.10 and 7.1.3 with PHP 8.3.33. Checks covered flowing single line breaks, preserved blank-line paragraphs and stored excerpt text, escaped output, compact title widths in navigation/content/guide layouts with menus on/off, 320–1828px reflow, neutral banner borders, retained header and other-banner accents, missing-image/empty-excerpt fallbacks, print output, native editor pattern validation and selected automated WCAG 2 A/AA and 2.1 AA main-content checks. PHP syntax passed on 7.4.33 and 8.3.33.

Component refinements and navigation options — version 1.15.0
Link rows use compact spacing and aligned headings/icons. Simple steps use a stronger horizontal separator and markers aligned with their headings. Icon and checklist aligns its icons with the text. Featured update starts with Text only; Photo, Solid colour and a quieter Theme graphic remain available. Optional dates and selected images survive changes of visual style.

Select Link list: compact and open Pattern layout > Link columns to choose one or two columns. Links return to one column in narrow spaces, retaining their document order. Layout controls are available when selecting either a whole pattern or its inner collection. Introduction: image and text offers overlapping images or one image, retaining both selected images for later switching.

Four new native patterns are available: Before you start (Text, lists and tables), Link cards: image and sublinks, Link cards: icons and sublinks, and Link panels: icons (Links and cards). The preparation checklist is informational; its square bullets are ordinary list markers. Navigation patterns retain native image, heading, paragraph, list and link editing, with labelled Add controls. Select the navigation collection or its whole pattern for column choices. Enter actual link destinations before publication.

In Page presentation and navigation, Show On this page and Show In this section control the two reading menus independently. Both remain enabled by default. The section view has a distinct navy header, pale-blue surface and explanatory text; the page view identifies heading links within the current page. Existing manual tab selection, sticky positioning, heading tracking and mobile placement are retained. Disabling both menus removes their rail and gives title appearances an edge-to-edge container, with title text aligned to the reading content. Body text retains its reading width.

Navigation card style selects Standard cards, Image cards, Icon cards, Icon panels or Compact icon rows for automatic child-page cards. All retain explicit child excerpts and published grandchild links. Image cards use each child page's Featured image; missing or protected images produce no empty placeholder. Page icon selects the icon used when that page is listed by its parent. The new manual patterns support curated navigation independently of the page hierarchy.

B.C. page workflow 0.1.1 is required to save the new page settings in shared drafts. Update the plugin before or with this theme update. Older plugin versions show an upgrade message and disable the new page settings; component content remains editable. Existing 0.1.0 shared drafts/history receive compatible defaults without rewriting historical records or introducing a false live-version conflict.

Validation for version 1.15.0
Installed checks passed on WordPress 6.6.10 and 7.1.3 with PHP 8.3.33 and Playground's SQLite adapter. All 60 current and 56 earlier pattern bodies parsed without invalid-block recovery. Checks covered whole-pattern layout controls, native checklist/card additions, image retention, all featured-update visuals, saved content reopening, compact row geometry, section spacing, independent menu visibility, heading tracking, five full-width title appearances, five automatic card styles and retained child/grandchild navigation. Page settings saved privately, previewed and published through an upgraded 0.1.0 shared draft; original default hashes/history remained compatible. Existing workflow regression checks passed on WordPress 7.1.3. Narrow 320–768px reflow, desktop tab-label separation and selected automated WCAG 2 A/AA and 2.1 AA main-content checks passed. PHP syntax passed on 7.4.33 and 8.3.33; all 11 theme/workflow scripts passed JavaScript syntax checks. Real hosting, other plugins and assistive technologies still require separate testing.

Component layout corrections — version 1.14.2
Agenda controls now occupy separate rows beneath their own session/date collections. Nested content insertion buttons remain compact and reserve their own height. Horizontal step icons align with the centre of each step; the editor no longer leaves an unused grid column or draws a connector after the last step. Narrow layouts and processes with six or more steps retain the vertical arrangement.

Resource links: tabs uses matching card tracks across resource groups, with up to three columns where space permits. A group with two cards occupies two tracks instead of enlarging its cards to fill the space used by three. Images retain the existing aspect ratio, and body text can increase card height naturally. Standalone Link cards: image keeps its existing responsive grid. Existing inserted patterns receive the layout corrections through CSS; saved block content is unchanged.


Validation for version 1.14.2
Installed checks passed on WordPress 6.6.10 and 7.1.3 with PHP 8.3.33. Checks covered adding/editing agenda sessions and dates, non-overlapping insertion controls, centred five-step roadmaps, narrow/six-step vertical layouts, saved content reopening without invalid blocks, matching resource-card/image widths between two- and three-card groups, keyboard tab activation, 320–1680px page reflow, print visibility and selected automated WCAG 2 A/AA and 2.1 AA main-content checks. Current and earlier pattern markup continued to parse without invalid-block recovery.

Pattern library and editing
The template previously labelled Topic landing page is now Navigation page. Its bc-topic-landing identifier and existing assignments are retained. Saved template customizations display the new label without changing their content.

The library contains 51 insertable theme patterns: 46 for page/post content and five for template authors. Nine earlier entries remain hidden for compatibility. Existing inserted copies are not rewritten. Clear family names, task-specific keywords, earlier-name search terms and List View labels help editors find and identify patterns. Categories are Page starters; Banners and introductions; Text, lists and tables; Steps and processes; Accordions; Notices and callouts; Links and cards; News and events; Page information; and Site structure. Starter content is an additional native WordPress view of page starters.

Steps: simple, connected, cards and horizontal use the same Steps block. Select the collection to change Layout or Markers (Numbers/Icons). Switching markers retains text, links, order and selected icons. Choose each icon to change it. Add step includes an icon when appropriate. Existing saved step markup continues to validate. Icon summaries have List/Two columns controls; text/list columns have a column-count control and optional separators. Introduction: image and text offers Overlapping images or One image. Choosing one image preserves the second image for switching back. The overlapping arrangement also adapts to narrow spaces.

New patterns include Featured update, Event agenda, Link rows: icons, Icon and checklist, Text summaries: two columns, Steps: simple and Introduction: image and text. Featured update exposes directly editable title, description and optional date fields. In block settings, add its link destination, choose Text only/Photo/Solid colour/Theme graphic, select or replace the image, and choose its missing-photo fallback. Images, text and dates remain available when changing the visual. No author name is displayed. The local graphic makes no external requests. It is a decorative theme asset, not a sample photograph.

Event agenda groups sessions under one date heading. Use Add date group and Add session, edit the headings directly, and move/duplicate/remove items with their controls. Removal uses the existing confirmation dialog. Session content uses ordinary headings, paragraphs, images, lists and buttons; add a session image only when it helps. Link rows and feature checklists have labelled add controls and collection item actions. A checklist is informational, not an interactive form. Add real destinations to link-pattern headings before publishing.

Pattern names remain visible outside inserter previews, including keyboard selection. Description text is hidden in the inserter; preview names stay visible. This is scoped to editor pattern-list classes; it does not place labels inside inserted page content. Core editor markup varies by WordPress version, so future WordPress upgrades should include an inserter-label check.

Topic banner, Browse this topic, Topic navigation and the single Related topic card entry are retired from the inserter but remain registered for compatibility. General inline links use Link cards: text and its Add card control. The separate page-end Related pages selection stays in page settings. Standalone Page contents and Section contents patterns are for template authors. The shared-draft editor receives the same template-block restrictions as page/post editors.

Data table
The earlier Reference table starter is now Data table. It retains native WordPress cell editing, row/column tools, links and Undo. Select the table and open Table headings to edit its required title and optionally identify the first column as row headings. Column headings stay enabled. The title appears as a real caption on the published table, and heading cells retain column/row scope. The scroll region is keyboard focusable and preserves table semantics.

Missing or blank captions/headings, inconsistent row widths and unsupported merged/nested structures produce guidance. Drafts can be saved while work is incomplete. Publication through the normal page/post REST editor and B.C. page workflow 0.1.0 is rejected while a managed table has structural errors. Rejection keeps the live page unchanged. Older tables receive guidance and an explicit Use Data table checks action that retains their data. Classic editing, imported raw HTML, other editor integrations and direct PHP/database writes require separate review. Editors still need meaningful headings and appropriate table content; structural checks do not certify accessibility.


Validation for version 1.14.0
Installed checks covered WordPress 6.6.10 and 7.1.3 with PHP 8.3.33 and Playground's SQLite adapter. All new patterns and all 49 earlier pattern bodies parsed without invalid-block recovery. Checks covered visible native inserter labels, keyboard insertion, earlier-name search, template-only exclusions, saved Navigation page customizations, layout/marker changes without text loss, image retention/fallbacks, editable collection additions/reordering, and saved content reopening. Table checks covered ordinary cell edits, required headings/captions, row headings, added columns, explicit legacy conversion, invalid draft saves, blocked publication with unchanged live content/date, and corrected publication through both native editing and the unchanged shared-draft plugin. PHP syntax passed on 7.4.33 and 8.3.33; all ten theme scripts passed JavaScript syntax checks. New components passed 320–768px overflow checks and selected automated WCAG 2 A/AA and 2.1 AA main-content checks. Real hosting, other plugins and assistive technologies require separate testing.

Optional shared-draft workflow — version 1.13.0
Install B.C. page workflow 0.1.0 separately to test one shared draft per page, intentional Save draft checkpoints, authenticated saved-version previews, publication summaries, history/reset/restore and the Site pages editor drawer. Read the plugin's README.txt for its workflow, installation order, scope and host/cache requirements. This is a practice/staging release, not a production-readiness claim.

The integration resolves a private working record to its canonical page context for dynamic editor blocks. Preview-only hooks supply the saved template, title appearance, featured image, audience/applicability fields, guide-start flag and related-page choices. Automatic child-page cards continue using the canonical page's actual published children. Public requests retain native metadata and thumbnail behaviour. No draft values are written into shared public post caches. Feedback is disabled in draft previews. Without the plugin, normal public rendering and editing continue.

Validation for version 1.13.0
Installed workflow checks passed on WordPress 6.6.10 and 7.1.3 with PHP 8.3.33 and Playground's SQLite adapter, including published-page isolation during draft saves, intentional publication of body/settings, saved template/image previews, canonical child cards, authenticated preview access, notes/reset/history/recovery, new pages, page switching, injected failure rollback and plugin deactivation/reactivation. PHP syntax passed on 7.4.33 and 8.3.33. Selected mobile/editor accessibility checks passed. Real MySQL/MariaDB hosting, production caches, assistive technologies and third-party plugin interactions still require testing.

Update an existing GitHub-managed theme
This patch expects version 1.15.0 (the component refinements update). From the theme repository, run git apply --check on the patch, then git apply. Review, commit and deploy through the normal GitHub workflow. The patch contains theme files only and does not change functions.php. The page workflow and feedback plugins are separate installations.

First installation
Install a complete theme ZIP through Appearance > Themes > Add New Theme > Upload Theme. A patch is not an installable theme ZIP. Requirements: WordPress 6.6+ and PHP 7.4+.

Page layouts
- Home: front-page.html automatically supplies the site home layout. Choose a static home page under Settings > Reading, then edit that page's content. If Reading uses latest posts, the layout shows a posts index instead.
- Navigation page: a browsing hub that automatically lists published child pages, their explicit excerpts and grandchild links. Extra page content follows the cards. The browsing layout has no section sidebar; dates are omitted by default.
- Pages: standard content with breadcrumbs, title/introduction, explicit audience information and Last updated. The title and reading content share a column. On this page and In this section share one sticky desktop sidebar, with one view visible at a time.
- Guide and reference: the bc-long-reference template uses the same navigation framework and a narrower reading measure for long content. Explicitly ordered sections receive Previous/Next chapter links.
- Search Results, Page: 404, Single Posts, All Archives and Index remain WordPress's technical templates. There are nine template files and two custom page-template choices. Home is assigned through Reading settings; standard content uses the default Pages template.

Page title appearance
Edit a page and open Page presentation and navigation. Choose Plain, Compact image, Taller image, Compact solid colour, or Taller solid colour. This setting works independently of the page layout. Image appearances use the page's Featured image. Introductions use only an explicitly entered Excerpt. Missing images fall back to a plain title. Empty excerpts stay empty. Templates supply one H1; content patterns start at H2 or an appropriate nested level.

Earlier templates and saved customizations
Open Appearance > Theme setup to review assignments using Detailed content page or the four earlier banner-title templates. Update compatible assignments to Pages while preserving their title appearance. Earlier assignments continue resolving until reviewed. The review action records a restoration snapshot and does not change page body text or saved modification dates. The restore action skips pages whose template or title appearance subsequently changed.

A saved Site Editor customization of an earlier template is preserved and skipped by the migration. The setup screen lists saved templates and template parts. Export or back up a customization before using the Site Editor reset controls to adopt a theme-file layout. Saved customizations can keep additional templates visible until reviewed. No saved layout is deleted or reset by this update.

Shared header, notice and footer
Edit shared parts under Appearance > Editor. The header provides site identity, search and the mega menu. Site notice is an empty optional template part for one centrally managed notice. The footer provides site identity and an editable empty group for confirmed site-information links. Add real accessibility, privacy or other site links there when available. No generic support destination is supplied.

With B.C. page feedback 1.1+, eligible published pages and posts receive one feedback strip above the footer information. This includes the static home page and browsing hubs. Existing customized Footer parts also receive the strip without rewriting their content. Protected pages, archives, search results and error pages are omitted. Footer feedback uses the queried page's ID, including when the page body contains a Query Loop.

Update an existing feedback plugin by uploading bc-page-feedback-1.2.0.zip under Plugins > Add New Plugin > Upload Plugin and choosing to replace the installed version. Existing responses remain in the plugin's database table. Enable feedback collection under Page feedback > Settings. The theme manages placement; earlier inline copies are suppressed. With feedback 1.0, its earlier placement continues until the plugin is updated. Without the plugin, no feedback strip or empty container is rendered.

Audience and applicability
Administrators maintain site-specific terms under Pages > Written for and Pages > Applies to. Both lists start empty. Editors can select multiple existing terms on a page. Written for identifies the intended reader; Applies to identifies the groups covered by the content. No default group, eligibility claim or inherited applicability is assumed. The title area displays only selected values. Home omits this information by default. Labels describe content; they do not restrict access or hide content.

Last updated
Content and reference layouts display the current page's saved modification date in the site date format/time zone. It is not a review date. The standalone pattern remains available for other placements; duplicate dates on the same page are suppressed. Home and navigation layouts omit the date by default. Template authors can change these defaults in the Page title and introduction block's Page information controls.

Mega-menu visibility and guides
The menu is generated from published page hierarchies, ordered by Page order, title and ID. In each page's settings choose:
- Show page and subpages: normal automatic hierarchy.
- Show page only: retain the page as a destination and stop expanding its descendants.
- Hide page and subpages: omit that branch from automatic menu hierarchies.
A parent's boundary covers newly created descendants and also applies when a descendant is selected as a menu-section root. These settings affect the automatic mega menu. Direct links intentionally entered in the menu remain explicit links. Search, breadcrumbs, child-page listings and local guide navigation use the page hierarchy independently.

For a multi-page guide, mark the overview page This page starts a guide. Choose Show page only when the mega menu should stop there. Use Navigation page for the overview; its child-page cards are supplied automatically. Add optional body content if needed. Use Guide and reference for chapters. In this section is scoped to the closest marked guide; other content pages use their published parent’s section. Previous/next chapter links follow published pages in hierarchy and Page order, with title/ID ties resolved consistently. Draft/private chapters are omitted. Nested guides keep their own chapter sequence. Guide order is editorial page order, not publication date.

Reading navigation and page-end links — version 1.10.0
On desktop, Pages and Guide and reference use a sidebar with On this page and In this section. On this page is the default reading view when at least two eligible headings exist. The reader selects another view explicitly; scrolling updates only the current-heading marker. The tabs remain above the selected list. The section’s actual parent-page title is a clickable first link inside In this section; it is not repeated above the tabs. Long lists use the available viewport height and can scroll independently. The sidebar also respects the article height, so a long section menu does not add a large blank region below a short article. A single available view has no redundant tab selector. At very short viewport heights (420px or below), navigation remains in normal flow so all controls can be reached.

At 900px and below, On this page is a native disclosure near the introduction. In this section appears after the article and any Previous/Next links, before feedback and the footer. A small In this section link near the top opens that page-end menu. The same section-list node moves between these locations on breakpoint changes, with keyboard focus retained; duplicate link lists are not generated. Without JavaScript, native disclosures and ordinary links remain available. Print omits the navigation controls and preserves article content.

Previous/Next links show destination titles and directional arrows. They follow the published pages in a section explicitly marked This page starts a guide. They remain inside that ordered section and omit unavailable directions. Use the page Order field to establish a deliberate sequence. Unordered topics do not gain an arbitrary next-page sequence.

Automatic navigation cards — version 1.10.0
The Navigation page template supplies cards immediately after its title/introduction. An editor does not need to insert a listing block. Each child page supplies its title and explicit Excerpt; its published children supply the grandchild links. Excerpts are never copied from body content, and excerpts of password-protected pages are withheld. Draft/private pages are omitted. Titles and grandchild links have separate destinations.

Cards use existing blue/gold tokens, a pale-blue summary area, a slim gold accent, fine borders and small corners. Grandchild links sit below a separator. The grid uses two columns where space permits and one column in narrow containers. Short cards keep their natural height; empty excerpts and missing grandchild lists produce no empty regions. Older inserted child-card or section-contents blocks are suppressed when the template already provides that navigation. No saved page text is rewritten. The standalone child-card block remains available for other page layouts.

Pages, Guide and reference, and Navigation page have updated theme-file layouts in this release. Saved Site Editor overrides still take precedence. Appearance > Theme setup lists those overrides for review; export/back up an override before resetting it to use the updated layout.

Pattern library categories
- Page starters: home, navigation, standard content, and guide and reference.
- Banners and introductions: compact/tall image and solid-colour banners; split-text and image/text introductions.
- Text, lists and tables: Heading and paragraph, Icon and text, Icon summaries, Icon and checklist, text summaries, column lists, Data table, and Contact and support.
- Steps and processes: simple, connected, cards, and horizontal layouts with number/icon markers.
- Accordions: Accordion group and Accordion panel.
- Notices and callouts: information, warning, success and error notices; callouts with a heading or text only.
- Links and cards: compact lists, image/icon/text cards, icon rows, task links, and tabbed resource links.
- News and events: Featured update and Event agenda.
- Page information: Last updated and Audience information.
- Site structure: header, mega menu, Page contents and Section contents for template editing.
Patterns include descriptive search keywords and generic sample wording. Replace sample copy and add real link destinations before publishing. Hidden compatibility entries remain registered. Existing inserted copies keep their saved content.

Usability corrections — version 1.11.1
Plain reading-page introductions use the full title-column width. Body text keeps its existing reading measure. The desktop navigation starts with On this page / In this section, with single-line tab labels. In this section begins with the named, clickable parent page. Single-view navigation uses its view label in place of the tabs.

Heading tracking accounts for both the scrolling container’s padding and each target’s scroll margin, including the signed-in admin-bar offset. At the end of the page it can identify a final section whose heading cannot scroll to the top. Expand all / Collapse all use compact underlined buttons separated by a decorative pipe. Keyboard activation, focus outlines and status messages are retained.

Editing components — version 1.11.0
Unsynced patterns use normal block editing, including on WordPress 7.x. This removes the extra Edit pattern step for independent copies. Synced patterns, template parts and explicit layout locks retain WordPress controls.

Accordion panels have a dedicated Panel heading field and an always-visible native nested-block area in the editor. When the whole panel is selected, Edit panel content in its toolbar focuses an existing body block, or starts a paragraph if the body is empty. Click the heading field to replace it; click a paragraph, list or other content block to edit the body. Open when the page loads controls the published panel state. The ordinary unstyled WordPress Details block retains its native editor.

Use Add accordion panel beneath a group, Add step beneath a process, or Add resource group beneath tabbed resources. New items start with editable placeholders; resource-group headings become the tab labels. A selected panel, step or resource group has Move up, Move down, Duplicate and Remove controls. Undo can restore removals. Numbering follows step order automatically. Roadmap steps added through Add step include an icon.

Quick actions, quick links, icon/text lists, image cards, text columns and related topics have labelled Add controls beneath their collection. Select a whole card, row or column to use Item actions in the block toolbar. Edit its text with native heading/paragraph controls; use Link (Ctrl+K) to set a destination. Images retain the native Replace/upload controls. Related cards wrap into additional rows as the collection grows.

Select an icon and choose Change icon in the toolbar to search the icon library. The same picker remains in block settings. Under the Page tab, open Page presentation and navigation to edit Page introduction (excerpt). This is the existing Excerpt field, also used by automatic navigation cards.

Automatic navigation, dates, titles and page information show a source explanation when selected. Their text is edited through the page content or settings named in that explanation. Editing controls are absent from published content and pattern previews. Existing saved patterns use the improved editor without reinsertion; page text is not automatically rewritten. Structural controls respect WordPress layout locks and allowed block types.

Spacing and editing
Patterns have a shared wrapper with a 2rem outer gap, reducing to 1.5rem at 600px and below. New sections beginning with H2 use a larger 3rem gap, reducing to 2.5rem on small screens. Component-internal gaps remain compact. Heading/paragraph pairs stay closer together. No blank paragraphs or Spacer blocks are needed between patterns. Existing inserted components retain their markup and receive the shared spacing where their component classes identify them. User-set block margins can override defaults. Standard body text, lists, accordions and tables use Large body (1.125rem).

Component behaviour
- All 44 local, searchable SVG icons remain available. Icons are decorative; adjacent text supplies their meaning.
- Accordion controls affect Details blocks in their own group. Content remains readable without JavaScript.
- Resource tabs support keyboard navigation and show every group without JavaScript or in print.
- On this page links are generated from eligible H2 headings, including expanded registered patterns and synced content, and hidden when fewer than two headings qualify. Add bc-toc-exclude to omit a heading. Details content is excluded from the index. Earlier standalone topic-navigation and on-page-index patterns continue to work in custom layouts.
- Image and solid promo patterns remain editable native blocks. Replace images with Image/Cover controls and set Cover focal points as needed. Sample actions have no invented destination. Responsive layouts stack in narrow containers; decorative images and navigation are omitted from print where appropriate.
- Child page cards use published children and grandchildren, with parent assignment and Page order controlling their structure. Related destinations remain editorial choices.

Sources and licences
- @bcgov/design-tokens 5.0.0, bundled locally: https://github.com/bcgov/design-tokens — Apache-2.0.
- @bcgov/bc-sans 2.1.2, locally hosted WOFF2 fonts: https://github.com/bcgov/bc-sans — Apache-2.0 and OFL-1.1.
- See licenses/ and THIRD-PARTY-NOTICES.txt. Custom theme code: GPL-3.0-or-later.
This is a custom practice theme, not an official B.C. government theme or an accessibility certification.

Validation for version 1.11.1
Checked with WordPress 6.6.10 and 7.1.3 using PHP 8.3.33. PHP syntax passed on 7.4.33 and 8.3.33; all nine theme scripts passed JavaScript syntax checks. Installed checks covered pointer re-entry into panel paragraphs after List View and other selections, Edit panel content focus, saving/reopening and continued editing without invalid blocks. Front-end checks covered introduction width, single-line selected/unselected tabs, the parent link destination, anonymous/signed-in anchor tracking, accordion height changes, page-end tracking, compact keyboard-operated bulk controls, 320–1440px reflow, mobile section placement and native no-JavaScript navigation/disclosures. Selected automated WCAG 2 A/AA and 2.1 AA checks reported no main-content violations. The exact reported intermittent body lock was not reproduced on clean sample content; the native-body change and explicit entry action were validated with repeated editing workflows.

Earlier validation for version 1.11.0
Checked with WordPress 6.6.10 and 7.1.3 using PHP 8.3.33. All 62 theme PHP files passed syntax checks on PHP 7.4.33 and 8.3.33; all nine theme scripts passed JavaScript syntax checks. Installed editor checks covered repeated accordion-heading edits, adding/reordering/duplicating/removing panels and steps, Undo, resource-group names and order, all labelled collection appenders, keyboard Add activation, searchable icon selection, the introduction field, explicit layout locks, native pattern insertion and editable starter content. Checks also covered toolbar item duplication, new roadmap icons, clean pattern previews, saving/reopening without invalid-block recovery, public accordion/tab behaviour, editor-control exclusion and mobile reflow. Selected automated WCAG 2 A/AA and 2.1 AA checks reported no main-content violations.

Earlier validation for version 1.10.0
Checked with WordPress 6.6.10 and 7.1.3 using PHP 8.3.33. PHP syntax passed on 7.4.33 and 8.3.33; all eight theme scripts passed JavaScript syntax checks. Installed checks covered automatic cards and explicit excerpts, unpublished/protected exclusions, duplicate prevention, all title appearances and column alignment, manual sidebar tab activation, current-heading tracking, long scrollable section menus, short-article height limits, ordered Previous/Next links, mobile document order and anchor focus, breakpoint focus preservation, 320–768px reflow, short-height fallback, no-JavaScript and print output. All existing/new pattern and template markup validated in the editor, and the dynamic reading-navigation preview rendered. Existing settings, migration/restoration, saved customizations and page-linked footer feedback were retained. Selected automated WCAG 2 A/AA and 2.1 AA checks reported no main-content/feedback violations. These checks do not replace usability testing with readers or assistive-technology testing.

Earlier validation for version 1.9.0
Checked with WordPress 6.6.10 and 7.1.3 using PHP 8.3.33. PHP syntax passed on 7.4.33 and 8.3.33; all seven theme scripts passed JavaScript syntax checks. Installed checks covered editor block validity and saved page settings, template migration/restoration and saved customizations, five title appearances, audience metadata, guide contents and menu boundaries, composed-pattern heading indexes and cycle guards, responsive spacing and 320–768px reflow, keyboard controls, native feedback submission, no-JavaScript and print output. Footer checks covered default/saved footers, correct queried-page association, disabled collection, post feedback and existing reports. Selected automated WCAG 2 A/AA and 2.1 AA checks reported no main-content/feedback violations.

Version history
1.15.1: Full text-column excerpts and a neutral compact image-banner border.
1.15.0: Compact component spacing, clearer section rhythm, simpler featured updates, two-column quick links, one-image introductions, preparation/navigation patterns and optional page navigation with full-width titles.
1.14.2: In-flow nested insertion controls, aligned horizontal step markers, and consistent resource-card widths between tabs.
1.14.1: Hide pattern descriptions in inserter previews while keeping pattern names visible.
1.14.0: Organized pattern families and native inserter labels; new content/event patterns and editable variations; managed data-table heading checks; Navigation page template label.
1.13.0: Request-scoped integration with the optional B.C. page workflow plugin for private working records and saved page previews, including presentation settings, templates, images, audience fields and related-page selections.
1.12.0: Direct mega-menu heading links, removal confirmations, translucent taller image titles, editor-selected page-end related cards and refined feedback placement.
1.11.1: Native accordion-body editing and an Edit panel content action; full-width reading introductions; clearer parent links and tabs; corrected heading tracking; compact bulk accordion controls.
1.11.0: Direct accordion-heading editing, labelled collection appenders, item actions, searchable icon toolbar, clearer introduction/source fields and editor-only controls.
1.10.0: Automatic excerpt-based navigation cards, aligned reading titles, sticky two-view navigation, mobile page-end section menu and clearer ordered Previous/Next links.
1.9.0: Consolidated page layouts, independent title appearance, reviewable legacy migration, grouped/generic patterns, basic text and heading-free callout patterns, shared spacing, audience/applicability fields, guide boundaries and footer feedback integration.
1.8.0: Four promo banners and initial page-title templates; improved Help icon.
1.7.0: Content/resource patterns, resource tabs and icon roadmap; improved Tools icon.
1.6.0: Curated quick links, 44 icons, Large body defaults and companion feedback support.
1.5.1: Compact mega-menu layout and large-text scrolling fallback.
1.5.0: Page-driven drill-down mega menu.
1.4.0: Reusable content components.

Page-end refinements — version 1.12.0
Mega-menu column titles link directly to their pages. Duplicate View all controls are removed; branch buttons continue opening the next column. Taller image titles and matching banner patterns use a 94% white background behind fully opaque text.

Theme-provided Remove controls open a confirmation dialog before deleting an item and its content. Keep item, Escape and the close button cancel. Confirming removal shows a notice; native WordPress Undo remains available. WordPress’s own block menu and keyboard deletion commands retain their native behaviour.

In a page editor’s Page settings sidebar, open Related pages. Search for published pages, select them, and use Move up/Move down to order the cards. Unselect removes a relationship without deleting the page. Saving the page saves its selections. The shared footer displays one distinct Related pages section after feedback, using selected pages’ current titles and explicit excerpts. Missing excerpts leave no empty description. The current page, drafts, private, deleted and password-protected pages are omitted. No selections means no section. Related pages can still display when feedback collection is disabled or the plugin is inactive. Existing manual Related topics patterns remain in page content; unneeded copies can be removed by the editor. Saved Footer customizations receive the same page-end sections without a layout reset.

Navigation page (navigation/browsing hubs) omits Written for, including saved copies of that layout. Explicit Applies to information remains available. Content and reference pages retain their audience information.

Update B.C. page feedback to 1.2.0 for the shorter privacy hint, answer switching while the form is open, and Pages/Posts list counts restricted to New and In progress. The plugin has its own update package; a theme patch cannot change plugin files.

Validation for version 1.12.0
Checked in WordPress 6.6.10 and 7.1.3 with PHP 8.3.33, including real editor search/selection/order/save/reopen, removal confirmation and Undo, saved-footer placement, related-page exclusions and later title/excerpt updates, feedback switching and safe retry, native no-JavaScript switching, open-response report counts, plugin deactivation/reactivation, and 320–1440px layouts. Selected automated WCAG 2 A/AA and 2.1 AA checks reported no violations in the tested main content, feedback and related sections. PHP syntax passed on 7.4.33 and 8.3.33; all 11 theme/plugin scripts passed JavaScript syntax checks. These checks do not replace usability or assistive-technology testing.
