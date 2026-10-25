B.C. practice — WordPress block theme, version 1.10.0

Update an existing GitHub-managed theme
This patch expects version 1.9.0, including the corrected mega-menu patch if that was needed. From the theme repository, run git apply --check on the patch, then git apply. Review, commit and deploy through the normal GitHub workflow. The patch contains theme files only. The feedback plugin is a separate installation.

First installation
Install a complete theme ZIP through Appearance > Themes > Add New Theme > Upload Theme. A patch is not an installable theme ZIP. Requirements: WordPress 6.6+ and PHP 7.4+.

Page layouts
- Home: front-page.html automatically supplies the site home layout. Choose a static home page under Settings > Reading, then edit that page's content. If Reading uses latest posts, the layout shows a posts index instead.
- Topic landing page: a browsing hub that automatically lists published child pages, their explicit excerpts and grandchild links. Extra page content follows the cards. The browsing layout has no section sidebar; dates are omitted by default.
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

Update an existing feedback plugin by uploading bc-page-feedback-1.1.0.zip under Plugins > Add New Plugin > Upload Plugin and choosing to replace the installed version. Existing responses remain in the plugin's database table. Enable feedback collection under Page feedback > Settings. The theme manages placement; earlier inline copies are suppressed. With feedback 1.0, its earlier placement continues until the plugin is updated. Without the plugin, no feedback strip or empty container is rendered.

Audience and applicability
Administrators maintain site-specific terms under Pages > Written for and Pages > Applies to. Both lists start empty. Editors can select multiple existing terms on a page. Written for identifies the intended reader; Applies to identifies the groups covered by the content. No default group, eligibility claim or inherited applicability is assumed. The title area displays only selected values. Home omits this information by default. Labels describe content; they do not restrict access or hide content.

Last updated
Content and reference layouts display the current page's saved modification date in the site date format/time zone. It is not a review date. The standalone pattern remains available for other placements; duplicate dates on the same page are suppressed. Home and topic landing layouts omit the date by default. Template authors can change these defaults in the Page title and introduction block's Page information controls.

Mega-menu visibility and guides
The menu is generated from published page hierarchies, ordered by Page order, title and ID. In each page's settings choose:
- Show page and subpages: normal automatic hierarchy.
- Show page only: retain the page as a destination and stop expanding its descendants.
- Hide page and subpages: omit that branch from automatic menu hierarchies.
A parent's boundary covers newly created descendants and also applies when a descendant is selected as a menu-section root. These settings affect the automatic mega menu. Direct links intentionally entered in the menu remain explicit links. Search, breadcrumbs, child-page listings and local guide navigation use the page hierarchy independently.

For a multi-page guide, mark the overview page This page starts a guide. Choose Show page only when the mega menu should stop there. Use Topic landing page for the overview; its child-page cards are supplied automatically. Add optional body content if needed. Use Guide and reference for chapters. In this section is scoped to the closest marked guide; other content pages use their published parent’s section. Previous/next chapter links follow published pages in hierarchy and Page order, with title/ID ties resolved consistently. Draft/private chapters are omitted. Nested guides keep their own chapter sequence. Guide order is editorial page order, not publication date.

Reading navigation and page-end links — version 1.10.0
On desktop, Pages and Guide and reference use a sidebar with On this page and In this section. On this page is the default reading view when at least two eligible headings exist. The reader selects another view explicitly; scrolling updates only the current-heading marker. The tabs and section title remain above the selected list. Long lists use the available viewport height and can scroll independently. The sidebar also respects the article height, so a long section menu does not add a large blank region below a short article. A single available view has no redundant tab selector. At very short viewport heights (420px or below), navigation remains in normal flow so all controls can be reached.

At 900px and below, On this page is a native disclosure near the introduction. In this section appears after the article and any Previous/Next links, before feedback and the footer. A small In this section link near the top opens that page-end menu. The same section-list node moves between these locations on breakpoint changes, with keyboard focus retained; duplicate link lists are not generated. Without JavaScript, native disclosures and ordinary links remain available. Print omits the navigation controls and preserves article content.

Previous/Next links show destination titles and directional arrows. They follow the published pages in a section explicitly marked This page starts a guide. They remain inside that ordered section and omit unavailable directions. Use the page Order field to establish a deliberate sequence. Unordered topics do not gain an arbitrary next-page sequence.

Automatic navigation cards — version 1.10.0
The Topic landing page template supplies cards immediately after its title/introduction. An editor does not need to insert a listing block. Each child page supplies its title and explicit Excerpt; its published children supply the grandchild links. Excerpts are never copied from body content, and excerpts of password-protected pages are withheld. Draft/private pages are omitted. Titles and grandchild links have separate destinations.

Cards use existing blue/gold tokens, a pale-blue summary area, a slim gold accent, fine borders and small corners. Grandchild links sit below a separator. The grid uses two columns where space permits and one column in narrow containers. Short cards keep their natural height; empty excerpts and missing grandchild lists produce no empty regions. Older inserted child-card or section-contents blocks are suppressed when the template already provides that navigation. No saved page text is rewritten. The standalone child-card block remains available for other page layouts.

Pages, Guide and reference, and Topic landing page have updated theme-file layouts in this release. Saved Site Editor overrides still take precedence. Appearance > Theme setup lists those overrides for review; export/back up an override before resetting it to use the updated layout.

Pattern library
- Page starters: Home, Topic landing, Standard content, Guide and reference. These arrange body content; the template supplies the shared page frame.
- Banners and introductions: four image/solid banner options, topic banner, split introduction.
- Cards and links: image cards, quick-access links, quick-action tiles, task links, related topics and tabbed resource cards.
- Text and reference: Heading and paragraph, icon/text groups, text/list columns, reference table and optional contextual contact panel.
- Steps and processes: numbered steps, step cards and icon roadmap.
- Accordions: individual accordion and an accordion group with Expand all / Collapse all.
- Notices and callouts: information, warning, success, error, headed callout and Callout: paragraph only.
- Page information and navigation: Last updated, Audience and applicability, In this section, topic navigation and inline/sticky On this page.
- Site structure: header and mega-menu patterns for template editing.
Patterns include descriptive search keywords and generic sample wording. Replace sample copy and add real link destinations before publishing. The five earlier page-starter slugs remain hidden compatibility aliases. Existing inserted blocks keep their saved copy; the theme does not rewrite authored pages.

Spacing and editing
New patterns have a shared wrapper with a 2rem outer gap, reducing to 1.5rem at 600px and below. Heading/paragraph pairs stay closer together. No blank paragraphs or Spacer blocks are needed between patterns. Existing inserted components retain their markup and receive the shared spacing where their component classes identify them. User-set block margins can override defaults. Standard body text, lists, accordions and tables use Large body (1.125rem).

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

Validation for version 1.10.0
Checked with WordPress 6.6.10 and 7.1.3 using PHP 8.3.33. PHP syntax passed on 7.4.33 and 8.3.33; all eight theme scripts passed JavaScript syntax checks. Installed checks covered automatic cards and explicit excerpts, unpublished/protected exclusions, duplicate prevention, all title appearances and column alignment, manual sidebar tab activation, current-heading tracking, long scrollable section menus, short-article height limits, ordered Previous/Next links, mobile document order and anchor focus, breakpoint focus preservation, 320–768px reflow, short-height fallback, no-JavaScript and print output. All existing/new pattern and template markup validated in the editor, and the dynamic reading-navigation preview rendered. Existing settings, migration/restoration, saved customizations and page-linked footer feedback were retained. Selected automated WCAG 2 A/AA and 2.1 AA checks reported no main-content/feedback violations. These checks do not replace usability testing with readers or assistive-technology testing.

Earlier validation for version 1.9.0
Checked with WordPress 6.6.10 and 7.1.3 using PHP 8.3.33. PHP syntax passed on 7.4.33 and 8.3.33; all seven theme scripts passed JavaScript syntax checks. Installed checks covered editor block validity and saved page settings, template migration/restoration and saved customizations, five title appearances, audience metadata, guide contents and menu boundaries, composed-pattern heading indexes and cycle guards, responsive spacing and 320–768px reflow, keyboard controls, native feedback submission, no-JavaScript and print output. Footer checks covered default/saved footers, correct queried-page association, disabled collection, post feedback and existing reports. Selected automated WCAG 2 A/AA and 2.1 AA checks reported no main-content/feedback violations.

Version history
1.10.0: Automatic excerpt-based navigation cards, aligned reading titles, sticky two-view navigation, mobile page-end section menu and clearer ordered Previous/Next links.
1.9.0: Consolidated page layouts, independent title appearance, reviewable legacy migration, grouped/generic patterns, basic text and heading-free callout patterns, shared spacing, audience/applicability fields, guide boundaries and footer feedback integration.
1.8.0: Four promo banners and initial page-title templates; improved Help icon.
1.7.0: Content/resource patterns, resource tabs and icon roadmap; improved Tools icon.
1.6.0: Curated quick links, 44 icons, Large body defaults and companion feedback support.
1.5.1: Compact mega-menu layout and large-text scrolling fallback.
1.5.0: Page-driven drill-down mega menu.
1.4.0: Reusable content components.
