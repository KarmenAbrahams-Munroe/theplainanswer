Clarity: BC Public Service Web Theme — version 1.18.6

Content section headings and component typography — version 1.18.6
This follow-up applies after patch 5 (Clarity 1.18.5) and supersedes its all-H2 visual rule. It updates the theme to 1.18.6 without changing heading levels or saved content.

Unboxed main-content section headings remain 2rem with a short yellow line. This includes ordinary content H2s and headings introducing accordion groups, card groups, tabs, tables, steps and text-column sections. The line follows native heading alignment and uses the system foreground in forced-colour mode.

Navigation, feedback, individual cards, callouts, framed introductions and other enclosed components receive no heading line. Their existing component typography is restored, including compact On this page and section navigation titles, navigation cards and mobile variants. Heading levels remain semantic; H3 and lower rules are unchanged.

The section gap is 4rem, reduced to 3rem at viewport widths up to 600px. Patterns receive the gap on their outer container; their first section heading has no extra top margin. Ordinary section H2s use the same gap. Legacy standalone section wrappers, accordion groups and content following automatic navigation cards are covered. Component padding and ordinary pattern spacing are retained.

Section recognition uses the existing content/section wrapper classes, unboxed native Group blocks and the editor root. Enclosing navigation, cards, panels and native Group blocks with background or border colours suppress the section treatment. The patch edits CSS and release notes only; no pattern reinsertion or content migration is required. Individual block styles and saved Global Styles can still override theme defaults and require review on the installed site.

Static verification: all 66 pattern files and all PHP, JavaScript, template and theme.json files are unchanged. The 28 section-pattern H2s and nine enclosed-pattern H2s follow the revised role rules; 11 additional markup cases cover navigation, feedback, native Groups and nested patterns. Earlier component typography and H3–H6 rules are preserved. CSS delimiter/nested-:has checks pass, original file line endings are retained, and the diff adds no whitespace errors. Installed WordPress, narrow-screen/zoom and editor/published visual checks remain pending, including saved style overrides.

Consistent H2 headings — version 1.18.5
H2 headings share a 2rem font size, 700 weight and 1.25 line height, with a short yellow line above the text. This applies to ordinary headings and H2s inside patterns, cards, tabs, navigation and templates. H3 and lower headings receive no yellow heading accent.

The decorative line is 2rem wide and 3px high, with a .75rem gap below it. It sits in normal flow inside the heading, following component padding. Native left/centre/right heading-alignment classes align the line with the text. In forced-colour mode, the line uses the system foreground colour.

Conflicting component and mobile H2 size rules and the older line-suppression rules are removed. Existing component colours, backgrounds, surrounding spacing, H1 typography, H3/lower heading rules, step markers and card borders are retained. The common CSS targets the themed site and editor content canvas rather than WordPress administration headings.

This patch applies after patches 1–4 to Clarity 1.18.4 and updates the version to 1.18.5 to refresh the styles. It sets theme defaults and shared CSS. Individually styled heading blocks and saved Global Styles may require review on the installed site; this patch does not rewrite stored styles or content.

Source verification: theme.json is valid and changes only H2 typography; CSS delimiter and conflicting-heading-rule checks pass; all 66 pattern files, PHP, JavaScript and template markup are unchanged. Original file line endings are retained and the patch adds no trailing spaces or tabs. Installed WordPress, narrow-screen/zoom and editor/published visual checks remain to be completed, including review of saved style overrides.

Pattern availability and navigation setup — version 1.18.4
The page and post pattern catalogue contains 38 individual content patterns. These patterns are also available for template and template-part editing. Template editing adds seven patterns: PSW Header with mega menu, PSW Mega menu, PSW Page contents: inline, PSW Page contents: sidebar, PSW Section contents: automatic, PSW Audience information and PSW Last updated.

The Navigation page starter is available through Navigation page setup in the page settings sidebar. Select the Navigation page template on an empty page, then choose Insert navigation page starter. The action adds optional related-link content below the template’s automatic child-page cards. It does not insert a second automatic card group. The button is hidden once the page has content and rechecks the page before inserting. Normal insertion permissions and block locks are respected.

Home, Standard content and Guide/reference starters and all four banner patterns are retired from new selection. Page-title banner styles remain available in Page title style. Page starters and Banners are removed from the category list. Earlier registered pattern bodies and their identifiers remain available to resolve saved references, including the old starter aliases.

Generated page-structure blocks are reserved for template development. Existing saved instances remain registered and render normally. This includes breadcrumbs, page title/introduction, automatic child-page cards, page metadata, reading/section/guide navigation, mega menu, home content and footer feedback. Content blocks such as steps, tabs, icons and accordion controls remain available on pages.

This patch applies after patches 1–3 to Clarity 1.18.3 and updates the version to 1.18.4. The shared H2 treatment follows in patch 5.

Validation for version 1.18.4
The metadata audit confirmed 38 content patterns for pages/posts and 45 for template/template-part editing, including seven additional template patterns. All 66 registered pattern bodies and identifiers matched version 1.18.3; hidden entries still resolve their earlier includes. There are 21 hidden registered patterns and 14 active categories. The availability filter reserves 15 generated theme block types for template authors while keeping their registrations and rendering code.

The actual page-settings script passed JavaScript syntax checks and 26 WordPress API-stub cases covering empty pages/paragraphs, navigation-template and post-type gates, permission and removal locks, restricted block lists, stale clicks, repeat clicks, invalid content, custom page-editor types and excluding duplicate automatic child-page cards. No existing page content was overwritten in these cases. Structural delimiter checks passed for the changed PHP files.

Installed WordPress, PHP runtime and browser checks remain pending. On staging, verify the setup button, native Undo, save/reopen, pattern availability and existing generated blocks; include the shared-workflow draft editor if it is installed.

Pattern catalogue and search — version 1.18.3
The content catalogue uses Cards and panels; Text and columns; Images and introductions; Lists and checklists; Links; Tabs and accordions; Steps and processes; Comparisons and tables; Notices and callouts; News and events; and Contact and support.

Template-oriented patterns are grouped under Header and site navigation; Page and section navigation; and Page information. Page starters and Banners remain available at this stage; their availability is handled in patch 4.

Related patterns now use consistent names such as PSW Cards: image links, PSW Links: icon rows, PSW Tabs: audience guidance, PSW Tabs: resource cards, PSW Accordion: group and PSW Checklist: before you start. Navigation is named PSW Navigation page starter. Text columns and Comparison cards keep their single configurable entries.

Patterns can appear in more than one category. Link cards also appear under Links, image link cards under Images and introductions, and tabbed resource cards under Tabs and accordions, Cards and panels, and Links. Step cards, comparison cards and featured updates also appear under Cards and panels.

Search metadata includes component characteristics and available options, with singular/plural forms and synonyms for cards, icons, numbers, images, columns, features, callouts and tabs. PSW, Clarity and the full theme name identify the collection. Earlier names remain as search aliases where useful.

This patch applies to Clarity 1.18.2 after patches 1 and 2. It changes discovery metadata and category registration, with editor group names following renamed patterns. Stored identifiers, insertion contexts, hidden compatibility patterns and rendered content are retained.

Validation for version 1.18.3
A metadata audit checked all 53 visible patterns, 16 renamed entries and their editor group labels, category memberships, unique identifiers and descriptions. The 16 categories each have at least one visible member across the supported contexts at this stage. Checks covered 149 required feature/theme search cases and seven aliases for the retired summary/comparison names. The 13 hidden pattern files were byte-identical to version 1.18.2. Pattern bodies matched after accounting for editor-name changes. JavaScript, CSS, templates, block registrations and rendering code matched the baseline, and page/post/template availability sets were identical.

PHP runtime and installed WordPress inserter/search checks require staging. This release has metadata and editor-name checks; no installed editor or browser validation is claimed.

Text columns, comparison cards and outlined text card — version 1.18.2
Insert PSW Text columns, PSW Comparison cards or PSW Card: outlined text from Text, lists and tables. Search by PSW, Clarity or the component features. The category reorganization follows in patch 3.

PSW Text columns combines the earlier two-column and three-column summary starters. Select the pattern, then use Block > Pattern layout to choose two columns, three columns or Fit available space and to show separators above items. The default is two columns without separators. Its introduction and item headings/text use ordinary blocks.

PSW Comparison cards combines the earlier two comparison starters. Select the pattern and use Block > Pattern layout > Show icons. Icons start hidden and are retained when hidden. Headings, paragraphs and lists remain editable with ordinary blocks.

PSW Card: outlined text is a standalone neutral bordered container with padding and the surrounding page background. Its heading can be removed or its level changed using the normal editor controls. Add paragraphs, lists and optional links with the normal inserter. The card has natural height and does not require a destination link.

This patch applies after patch 1 to Clarity 1.18.1 and updates the version to 1.18.2 to refresh the edited styles. The earlier four summary/comparison pattern entries are hidden from new selection while their original pattern bodies and identifiers remain registered for saved references.

The shared H2 size and yellow-line treatment follow in patch 5.

Validation for version 1.18.2
The 46 blocks in the three new pattern bodies passed balanced block-comment, JSON-attribute, heading-level and saved group-class checks. A WordPress API-stub harness exercised the existing Pattern layout controls with the new pattern structures: column changes, separator toggles, icon toggles and restoring a missing icon retained the surrounding content and order. All 66 pattern slugs were unique, with 53 visible entries at this stage. Each retired pattern body matched version 1.18.1 byte for byte; only its Inserter header changed. Theme block scripts, registrations, templates and existing saved identifiers were retained.

Installed WordPress save/reopen and PHP runtime checks require staging. The local Chromium process could not start in the build environment, so visual, responsive and browser-interaction checks remain pending.

Clarity identity and editor labels — version 1.18.1
The theme is named Clarity: BC Public Service Web Theme. Visible theme patterns and theme-owned blocks use PSW followed by a space in their editor titles. The theme block category is Clarity components. Pattern group labels and the theme Data table variation use the same prefix.

This patch applies to version 1.18.0. Its version bump refreshes the theme editor assets. Existing block and pattern identifiers, template slugs, translation domain, stored settings and author attribution are retained. The prefix identifies editor components; it is not added to published headings or page text.

Pattern consolidation, categories, insertion availability and heading appearance are covered by later patches in the implementation plan.

Validation for version 1.18.1
All three changed scripts passed Node.js syntax checks. A registration comparison using WordPress API stubs confirmed one PSW prefix on all 27 theme block types and the theme Data table variation; block identifiers, attributes, supports and edit/save callback sources matched the baseline after removing the intended label changes. All 54 visible pattern titles were checked; the nine hidden pattern files were unchanged. Pattern-body changes were limited to editor metadata names. Templates, template parts and theme.json matched the baseline byte for byte. PHP changes were restricted to display-label string contents.

PHP runtime and installed WordPress editor checks were not run in this build environment. On staging, check the theme name, pattern and block inserters, and saving/reopening an existing page.

Audience tabs — version 1.18.0
Insert Audience tabs from Text, lists and tables in the pattern library, or insert the Audience tabs block. In Block settings, Tab appearance offers Underlined (the default) and Framed. Changing appearance preserves labels, content and order. The pattern uses generic Applicants and Reviewers examples that should be renamed for the page's audiences.

Each Audience tab has a directly editable Tab label and an ordinary block area. Add text, lists, headings, callouts, steps, tables, accordions or other existing patterns using the normal inserter. All panels remain open in the editor. Add tab inserts a new panel and selects its label. The selected tab's controls move, duplicate or remove the whole panel; removal asks for confirmation and Undo remains available. Duplicating removes copied anchor identifiers. Use H3 headings inside panels, keep shared guidance above the tab group, and avoid putting tab groups inside other tab groups.

Published tabs support pointer and keyboard input. Tab enters the active tab; arrow keys move focus, Home/End move to the first/last tab, and Enter/Space select it. Tab then moves into the selected panel. Narrow containers stack the labels above the content and use Up/Down keys. A single panel stays a normal content section. Fragment links into inactive panels reveal the relevant tab. Print output and pages without JavaScript show every panel with its label. Multiple groups remain independent. Styles and the frontend script are registered with the block; no background task or database table is added.

This patch expects theme version 1.17.3. Existing Resource links: tabs and their saved blocks retain their markup and behaviour. No workflow-plugin update or template migration is needed.

Validation for version 1.18.0
Installed upgrades passed on WordPress 6.6.12 and 7.1.5 with PHP 8.3.33. Existing resource-tab markup, shared drafts and history survived the update. All 63 theme pattern bodies parsed as valid editor blocks. Editor checks covered directly editing labels and body text, returning to edit body text again, changing appearances without changing inner content, adding/reordering/duplicating tabs, cleared duplicate anchors, removal confirmation/cancellation, Undo, inserting and editing an existing callout pattern inside a panel, and the native content inserter. Shared workflow draft save/preview/reopen and native WordPress saving without the workflow plugin passed.

Front-end checks passed for both styles, active panels and ARIA relationships, manual keyboard activation and focus, independent groups with unique IDs, initial and changed fragment links, one-panel and JavaScript-disabled fallbacks, 18px labels, nested callout/steps/accordion/table patterns, selected automated WCAG 2 A/AA and 2.1 AA checks, print output and restored screen selection. Reflow checks covered 320, 390 and 768px viewports, a 280px container, long labels, vertical keyboard movement and forced-colour visibility. The view script was absent on a page without the component. PHP syntax passed on 7.4.33 and 8.3.33; all changed scripts passed JavaScript syntax checks. These checks do not replace testing with assistive technology and the production hosting environment.

Mega-menu memory refinement — version 1.17.3
The mega menu uses the same native published-page hierarchy query as section and guide navigation. WordPress can reuse the cached query IDs and complete page objects, avoiding a second full-page query in the same response. Page bodies remain intact in the normal object cache. Visibility metadata is loaded in one batch so menu items do not each require a separate metadata query. Ordering, excerpts, visibility boundaries, links and browser behaviour are retained.

The menu's request-local cache is scoped to the site, user, locale and WordPress post-change marker. Saved page changes refresh its records within the same request. There is no persistent rendered-menu cache or new background task. Normal WordPress query, title, metadata and permalink filters remain in use. This focused release does not change editor controls, templates or the workflow plugin. It is a performance improvement; it does not establish or fix the cause of a hosting out-of-memory event.

This patch expects theme version 1.17.2.

Validation for version 1.17.3
Installed upgrade checks passed on WordPress 6.6.11 and 7.1.4 with PHP 8.3.33. Checks covered identical menu data with plain and pretty permalinks, hidden pages and guide boundaries, protected excerpts, native query/title/metadata/URL filters, shared hierarchy-query reuse, complete cached page bodies, changes within a request, an external-cache code-path simulation, retained drafts and history, authenticated saved previews and public content after previewing. Browser checks passed for desktop drill-down, Escape/focus return, 390px reflow, the native no-JavaScript fallback and selected automated menu accessibility checks. PHP syntax passed on 7.4.33 and 8.3.33.

A paired local public-page benchmark on WordPress 7.1.4/PHP 8.3.33 with SQLite, approximately 25 KB of content and eight small metadata fields per sample page, recorded peak PHP allocations of 46.5 to 46.5 MiB at 30 pages, 62.5 to 54.5 MiB at 300 pages, and 112.5 to 84.5 MiB at 1,000 pages. Repeat requests recorded 22 to 21 database queries. These are whole-request allocations for the old and new menu functions in the same fixture, not theme-only memory or pod measurements. Actual host memory use, concurrency, MySQL and production cache integrations require host-side validation. This release still loads the published-page index; it removes duplicate loading instead of introducing a persistent rendered-menu cache.


Icon selectors — version 1.17.2
The shared icon library is ordered alphabetically by its displayed labels. Page icons, component icon sidebars and Change icon menus use the same searchable picker, with a small decorative SVG beside each option. Text labels, keyboard navigation and existing saved icon identifiers are retained. This patch expects theme version 1.17.1.

Validation for version 1.17.2
Installed checks passed on WordPress 6.6.10 and 7.1.3 for all 44 alphabetized icons, SVG option previews, search, keyboard selection, block and toolbar pickers, retained saved icons, private saving/reopening, disabled controls, valid block parsing, mobile reflow and selected automated accessibility checks. The picker adds an aria-controls relationship where older core controls supply aria-owns alone. Unsupported disabled comboboxes fall back to a disabled native select. PHP syntax passed on 7.4.33 and 8.3.33; JavaScript syntax passed.

Theme sidebar — version 1.17.1
Page settings are grouped into Page title and introduction, Page navigation, Navigation cards, and Site menu and guides. Related pages remains a separate group. The controls use sentence-case labels, compact help text and consistent spacing. Image-title guidance appears when an image title style is selected. WordPress handles the panels’ expand/collapse preferences.

This patch expects theme version 1.17.0. It changes the editor sidebar and the theme version/documentation. Saved page settings, metadata names and front-end rendering remain compatible. No template migration or workflow-plugin update is required.

Validation for version 1.17.1
Installed editor checks passed on WordPress 6.6.10 and 7.1.3. Checks covered all title styles, introduction editing, all four navigation-switch combinations, five card styles, icon selection, menu visibility, guide settings and related-page selection. Existing drafts, history and live content survived the update. Settings saved and reopened privately through B.C. page workflow 0.2.1 and saved normally with that plugin inactive. Draft preview, phone-width reflow and selected sidebar WCAG 2 A/AA and 2.1 AA checks passed. JavaScript syntax passed. This is an editor presentation update; PHP rendering and page metadata registration are unchanged.

Reading navigation — version 1.17.0
The desktop sidebar has a pale-blue In this section disclosure button above a separate On this page panel with a navy heading bar. The section menu opens temporarily over the index and closes through its disclosure button, Close menu, Escape, an outside pointer action, or keyboard focus leaving the menu. The index keeps its scroll position and current-heading tracker while covered. No tabs or instructional paragraphs are displayed.

The named parent page is a larger, bold, underlined heading link. Branch controls have a compact chevron and a 44px target. Long section menus keep the parent heading visible, reveal the current page when opened, and scroll within the available viewport. The close control remains reachable. Menus can open upward when space below is limited. At very short desktop heights they use normal document flow. Opening a menu does not stretch an article in the regular desktop layout.

At 900px and below, On this page remains a native disclosure near the introduction. In this section moves after the article and Previous/Next links. The small top link opens that page-end disclosure. The same section node moves between locations; focused links and controls remain reachable. Native disclosures and ordinary links work without JavaScript. Page settings can still turn either menu off independently. Section-only pages use the same compact menu control; page-only pages show the index alone.

This patch expects theme version 1.16.0. Saved template customizations continue to use the existing dynamic blocks; no template migration or companion plugin update is needed.

Validation for version 1.17.0
Installed checks passed on WordPress 6.6.10 and 7.1.3 with PHP 8.3.33. Checks covered the separate page-index panel and section disclosure; linked parent headings; compact 44px branch controls; keyboard opening, Escape, Close menu, outside-pointer and Tab-out behaviour; stable reading position and current-heading tracking; long scrollable indexes and 40-page guides; current-page visibility under the sticky parent heading; article-height preservation; independent visibility settings; mobile document order and breakpoint focus; 320–901px reflow; short-height fallback; no-JavaScript disclosures/links; print; saved template preservation; existing pattern/template parsing; dynamic editor previews; and selected automated WCAG 2 A/AA and 2.1 AA main-content checks. Additional WordPress 7.1.3 checks covered upward menu placement, sticky-sidebar keyboard position, focus visibility below the parent heading and a customized layout missing the section block. PHP syntax passed on 7.4.33 and 8.3.33; JavaScript syntax passed. These checks do not replace usability or assistive-technology testing.


Comparison cards — version 1.16.0
Find Comparison: two options and Comparison: with icons under Text, lists and tables. Both use the same paired-card layout. Each card contains a heading, paragraph, subheading and list, all editable with ordinary WordPress blocks. Add, remove or rearrange content inside a card using the native editor. Sample content is generic and should be replaced before publication.

Select the whole pattern or Comparison cards group, then open Block > Pattern layout > Show icons. Turning icons off retains the selected icons; turning them on restores a missing icon when it can be inserted. Select each visible icon to change it. Headings explain the meaning independently of the icons. Cards have equal widths, align their heading areas where subgrid is supported, and expand with their content. They stack in containers at or below 42rem, keeping the first card before the second. These are content comparisons; no eligibility calculation or whole-card link is added.

This patch expects theme version 1.15.2.

Validation for version 1.16.0
Installed checks passed on WordPress 6.6.10 and 7.1.3 with PHP 8.3.33. All 62 theme pattern bodies validated. Checks covered pattern categories, paired widths/heights, aligned headers with unequal content, optional icons, 18px body text, 320–768px reflow and reading order, print visibility, selected automated WCAG 2 A/AA and 2.1 AA main-content checks, whole-pattern and collection settings, searchable icon selection, retained/restored icons, native paragraph/list additions, and saving/reopening without invalid-block recovery. PHP syntax passed on 7.4.33 and 8.3.33; the modified editor script passed JavaScript syntax checks.

Tall image-title panel — version 1.15.2
Desktop tall image titles and tall image promo banners size their white text panel to its content, capped at 46rem and the available container width. Disabling both reading menus keeps this cap. Narrow layouts still use the full available panel width and place the image above the text. The existing translucent surface, gold side accent and title alignment are retained.

This follow-up patch expects theme version 1.15.1.

Validation for version 1.15.2
Installed checks passed on WordPress 6.6.10 and 7.1.3. Checks covered the MyHR home-page example, navigation/content/guide titles with menus on/off, long text, title-only panels, the 46rem desktop cap, 320–1828px reflow, full-width mobile panels, image stacking, retained translucent backgrounds and side accents, print output, native editor rendering and pattern validation, and selected automated WCAG 2 A/AA and 2.1 AA main-content checks. This release changes CSS and theme documentation/version only.

Compact image-banner follow-up — version 1.15.1
The compact image banner uses a thin neutral border. Its introduction and native paragraph blocks fill the available text column without a separate character-width cap. Page excerpts flow single saved line breaks as ordinary whitespace; blank lines still separate paragraphs. Excerpt content remains stored as entered. This applies to the shared page-title block and the earlier page-introduction block. Other banner appearances retain their existing accents.

This follow-up patch expects theme version 1.15.0. The workflow plugin does not need another update.

Validation for version 1.15.1
Installed checks passed on WordPress 6.6.10 and 7.1.3 with PHP 8.3.33. Checks covered flowing single line breaks, preserved blank-line paragraphs and stored excerpt text, escaped output, compact title widths in navigation/content/guide layouts with menus on/off, 320–1828px reflow, neutral banner borders, retained header and other-banner accents, missing-image/empty-excerpt fallbacks, print output, native editor pattern validation and selected automated WCAG 2 A/AA and 2.1 AA main-content checks. PHP syntax passed on 7.4.33 and 8.3.33.

Component refinements and navigation options — version 1.15.0
Link rows use compact spacing and aligned headings/icons. Simple steps use a stronger horizontal separator and markers aligned with their headings. Icon and checklist aligns its icons with the text. Featured update starts with Text only; Photo, Solid colour and a quieter Theme graphic remain available. Optional dates and selected images survive changes of visual style.

Select Link list: compact and open Pattern layout > Link columns to choose one or two columns. Links return to one column in narrow spaces, retaining their document order. Layout controls are available when selecting either a whole pattern or its inner collection. Introduction: image and text offers overlapping images or one image, retaining both selected images for later switching.

Four new native patterns are available: Before you start (Text, lists and tables), Link cards: image and sublinks, Link cards: icons and sublinks, and Link panels: icons (Links and cards). The preparation checklist is informational; its square bullets are ordinary list markers. Navigation patterns retain native image, heading, paragraph, list and link editing, with labelled Add controls. Select the navigation collection or its whole pattern for column choices. Enter actual link destinations before publication.

In Page presentation and navigation, Show On this page and Show In this section control the two reading menus independently. Both remain enabled by default. The current desktop design uses a separate section-menu control and navy-headed page index; see Reading navigation above. Sticky positioning, heading tracking and mobile placement are retained. Disabling both menus removes their rail and gives title appearances an edge-to-edge container, with title text aligned to the reading content. Body text retains its reading width.

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

The library contains 53 insertable theme patterns: 48 for page/post content and five for template authors. Nine earlier entries remain hidden for compatibility. Existing inserted copies are not rewritten. Clear family names, task-specific keywords, earlier-name search terms and List View labels help editors find and identify patterns. Categories are Page starters; Banners and introductions; Text, lists and tables; Steps and processes; Accordions; Notices and callouts; Links and cards; News and events; Page information; and Site structure. Starter content is an additional native WordPress view of page starters.

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
This patch expects version 1.16.0 (the comparison cards update). From the theme repository, run git apply --check on the patch, then git apply. Review, commit and deploy through the normal GitHub workflow. The patch contains theme files only and does not change functions.php. The page workflow and feedback plugins are separate installations.

First installation
Install a complete theme ZIP through Appearance > Themes > Add New Theme > Upload Theme. A patch is not an installable theme ZIP. Requirements: WordPress 6.6+ and PHP 7.4+.

Page layouts
- Home: front-page.html automatically supplies the site home layout. Choose a static home page under Settings > Reading, then edit that page's content. If Reading uses latest posts, the layout shows a posts index instead.
- Navigation page: a browsing hub that automatically lists published child pages, their explicit excerpts and grandchild links. Extra page content follows the cards. The browsing layout has no section sidebar; dates are omitted by default.
- Pages: standard content with breadcrumbs, title/introduction, explicit audience information and Last updated. The title and reading content share a column. On this page and In this section share one sticky desktop sidebar, with a separate section-menu control and a navy-headed page index.
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
On desktop, Pages and Guide and reference use a sticky sidebar with a compact In this section control and a separate On this page panel. Section pages open in a temporary overlay; the index returns when it closes. Scrolling updates the current-heading marker independently. The parent-page title is a prominent linked heading inside the section menu. Long lists scroll within the viewport. The sidebar respects article height; its menu overlay does not add a blank region below a short article. At viewport heights of 420px or below, navigation uses normal flow so all controls remain reachable.

At 900px and below, On this page is a native disclosure near the introduction. In this section appears after the article and any Previous/Next links, before feedback and the footer. A small In this section link near the top opens that page-end menu. The same section-list node moves between these locations on breakpoint changes, with keyboard focus retained; duplicate link lists are not generated. Without JavaScript, native disclosures and ordinary links remain available. Print omits the navigation controls and preserves article content.

Previous/Next links show destination titles and directional arrows. They follow the published pages in a section explicitly marked This page starts a guide. They remain inside that ordered section and omit unavailable directions. Use the page Order field to establish a deliberate sequence. Unordered topics do not gain an arbitrary next-page sequence.

Automatic navigation cards — version 1.10.0
The Navigation page template supplies cards immediately after its title/introduction. An editor does not need to insert a listing block. Each child page supplies its title and explicit Excerpt; its published children supply the grandchild links. Excerpts are never copied from body content, and excerpts of password-protected pages are withheld. Draft/private pages are omitted. Titles and grandchild links have separate destinations.

Cards use existing blue/gold tokens, a pale-blue summary area, a slim gold accent, fine borders and small corners. Grandchild links sit below a separator. The grid uses two columns where space permits and one column in narrow containers. Short cards keep their natural height; empty excerpts and missing grandchild lists produce no empty regions. Older inserted child-card or section-contents blocks are suppressed when the template already provides that navigation. No saved page text is rewritten. The standalone child-card block remains available for other page layouts.

Pages, Guide and reference, and Navigation page have updated theme-file layouts in this release. Saved Site Editor overrides still take precedence. Appearance > Theme setup lists those overrides for review; export/back up an override before resetting it to use the updated layout.

Pattern library categories
- Page starters: home, navigation, standard content, and guide and reference.
- Banners and introductions: compact/tall image and solid-colour banners; split-text and image/text introductions.
- Text, lists and tables: Heading and paragraph, Icon and text, Icon summaries, Icon and checklist, text summaries, column lists, Comparison cards, Data table, and Contact and support.
- Steps and processes: simple, connected, cards, and horizontal layouts with number/icon markers.
- Accordions: Accordion group and Accordion panel.
- Notices and callouts: information, warning, success and error notices; callouts with a heading or text only.
- Links and cards: compact lists, image/icon/text cards, icon rows, task links, and tabbed resource links.
- News and events: Featured update and Event agenda.
- Page information: Last updated and Audience information.
- Site structure: header, mega menu, Page contents and Section contents for template editing.
Patterns include descriptive search keywords and generic sample wording. Replace sample copy and add real link destinations before publishing. Hidden compatibility entries remain registered. Existing inserted copies keep their saved content.

Usability corrections — version 1.11.1
Plain reading-page introductions use the full title-column width. Body text keeps its existing reading measure. The desktop sidebar uses a section-menu disclosure and a separate navy-headed page index. The named parent page is a prominent link inside the menu. Page settings can show either menu independently.

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
Clarity is a project-developed WordPress theme for BC Public Service information and services. This package does not establish a government-wide standard or certify a site’s accessibility.

Validation for version 1.11.1
Checked with WordPress 6.6.10 and 7.1.3 using PHP 8.3.33. PHP syntax passed on 7.4.33 and 8.3.33; all nine theme scripts passed JavaScript syntax checks. Installed checks covered pointer re-entry into panel paragraphs after List View and other selections, Edit panel content focus, saving/reopening and continued editing without invalid blocks. Front-end checks covered introduction width, single-line selected/unselected tabs, the parent link destination, anonymous/signed-in anchor tracking, accordion height changes, page-end tracking, compact keyboard-operated bulk controls, 320–1440px reflow, mobile section placement and native no-JavaScript navigation/disclosures. Selected automated WCAG 2 A/AA and 2.1 AA checks reported no main-content violations. The exact reported intermittent body lock was not reproduced on clean sample content; the native-body change and explicit entry action were validated with repeated editing workflows.

Earlier validation for version 1.11.0
Checked with WordPress 6.6.10 and 7.1.3 using PHP 8.3.33. All 62 theme PHP files passed syntax checks on PHP 7.4.33 and 8.3.33; all nine theme scripts passed JavaScript syntax checks. Installed editor checks covered repeated accordion-heading edits, adding/reordering/duplicating/removing panels and steps, Undo, resource-group names and order, all labelled collection appenders, keyboard Add activation, searchable icon selection, the introduction field, explicit layout locks, native pattern insertion and editable starter content. Checks also covered toolbar item duplication, new roadmap icons, clean pattern previews, saving/reopening without invalid-block recovery, public accordion/tab behaviour, editor-control exclusion and mobile reflow. Selected automated WCAG 2 A/AA and 2.1 AA checks reported no main-content violations.

Earlier validation for version 1.10.0
Checked with WordPress 6.6.10 and 7.1.3 using PHP 8.3.33. PHP syntax passed on 7.4.33 and 8.3.33; all eight theme scripts passed JavaScript syntax checks. Installed checks covered automatic cards and explicit excerpts, unpublished/protected exclusions, duplicate prevention, all title appearances and column alignment, manual sidebar tab activation, current-heading tracking, long scrollable section menus, short-article height limits, ordered Previous/Next links, mobile document order and anchor focus, breakpoint focus preservation, 320–768px reflow, short-height fallback, no-JavaScript and print output. All existing/new pattern and template markup validated in the editor, and the dynamic reading-navigation preview rendered. Existing settings, migration/restoration, saved customizations and page-linked footer feedback were retained. Selected automated WCAG 2 A/AA and 2.1 AA checks reported no main-content/feedback violations. These checks do not replace usability testing with readers or assistive-technology testing.

Earlier validation for version 1.9.0
Checked with WordPress 6.6.10 and 7.1.3 using PHP 8.3.33. PHP syntax passed on 7.4.33 and 8.3.33; all seven theme scripts passed JavaScript syntax checks. Installed checks covered editor block validity and saved page settings, template migration/restoration and saved customizations, five title appearances, audience metadata, guide contents and menu boundaries, composed-pattern heading indexes and cycle guards, responsive spacing and 320–768px reflow, keyboard controls, native feedback submission, no-JavaScript and print output. Footer checks covered default/saved footers, correct queried-page association, disabled collection, post feedback and existing reports. Selected automated WCAG 2 A/AA and 2.1 AA checks reported no main-content/feedback violations.

Version history
1.17.0: Separate page-index panel and section-menu disclosure, prominent parent links, bounded menu scrolling and keyboard/mobile focus handling.
1.16.0: Paired comparison cards with optional icons and native text/list editing.
1.15.2: Content-sized tall image-title panels with a desktop width cap and full-width mobile layout.
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
