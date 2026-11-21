Clarity: BC Public Service Web Theme
Version 1.19.0

About Clarity
Clarity is a WordPress block theme for BC Public Service information and services. It provides page layouts, editable content patterns, page-driven navigation and locally hosted BC Sans typography, using bundled B.C. Design System tokens.

Theme-provided patterns and custom blocks use PSW followed by one space in their editor labels. Search for PSW or Clarity to find them.

Requirements
- WordPress 6.6 or later
- PHP 7.4 or later

Page layouts
- Home: the site's static front page
- Navigation page: a browsing hub with automatic child-page cards
- Pages: standard content with independently controlled page and section navigation
- Guide and reference: longer content with section navigation and guide controls

Page settings
The page settings sidebar groups controls under Page title and introduction, Page navigation, Navigation cards, and Site menu and guides. Related pages has its own panel.

Page-title appearance is separate from the page layout. Editors can choose title presentation, write an introduction, show or hide the reading menus, choose a navigation-card presentation, manage menu visibility and guide settings, and select related pages.

Content patterns
Pages and posts have 38 content patterns. The categories are:
- Cards and panels
- Text and columns
- Images and introductions
- Lists and checklists
- Links
- Tabs and accordions
- Steps and processes
- Comparisons and tables
- Notices and callouts
- News and events
- Contact and support

Patterns may appear in more than one relevant category. Search keywords describe features such as card, icon, numbered, image, column, feature, callout, box and tab.

PSW Text columns provides two columns, three columns or fit available space, with optional separators. PSW Comparison cards includes a Show icons option. Select the relevant pattern or group and use Block > Pattern layout to change these options.

PSW Card: outlined text provides a neutral bordered container with padding and a transparent background. Add ordinary headings, paragraphs, lists and optional links. It does not require a destination link.

The full categorized list, descriptions, registered identifiers and compatibility entries are in docs/pattern-catalogue.md.

Template patterns
Template and template-part editing includes the shared content patterns and seven additional structural patterns. These are grouped under Header and site navigation, Page and section navigation, and Page information.

Generated layout blocks provide functions such as breadcrumbs, page titles, automatic navigation cards, reading menus and page information. These are available for template development; ordinary page content uses the content-pattern catalogue.

Navigation page setup
On an empty page, select the Navigation page template. Open Navigation page setup in the page settings sidebar and choose Insert navigation page starter.

The template supplies automatic child-page cards. The starter adds optional manual related-link content below them. It is available only while the page body is empty and respects block locks and insertion permissions.

Headings and spacing
Main-content section H2s use 2rem text with a short yellow line above the heading. This includes headings introducing entire accordion, card, tab, table, step and text-column sections.

Navigation labels, feedback prompts, individual cards, callouts and framed introductions use their component typography without a heading line. H3 and lower headings have no yellow heading accent. Choose heading levels to reflect the content structure.

Section spacing is 4rem, reduced to 3rem at viewport widths up to 600px. The larger gap sits outside the pattern; its first section heading has no additional top margin. Component padding and ordinary pattern spacing retain their own rhythm.

Related pages and feedback
Select and order related pages in the page settings sidebar. The page-end cards use the selected pages' current titles and explicit excerpts.

The optional B.C. page feedback plugin supplies the page-linked feedback form when available. Selected related pages can display independently of feedback collection.

Site customization
Use the Site Editor for templates, template parts and Global Styles. Saved template and style customizations can override the theme's file-based defaults.

Theme details
- Installed directory: theplainanswer
- Block and pattern namespace: bc-practice
- Translation domain: bc-practice
- Theme licence: GNU General Public License v3 or later

Bundled fonts, design tokens and other assets retain their upstream licences supplied with the theme.
