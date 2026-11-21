# Clarity 1.19.0 release notes

## Changes

Clarity: BC Public Service Web Theme uses **Clarity** as its short name and **PSW** followed by one space for theme-owned pattern and block labels. It is a project-developed theme for BC Public Service information and services.

The release provides 38 page/post content patterns and seven additional template patterns, grouped under 14 categories. Pattern names, secondary categories and search keywords describe their visible features and available options. Text columns and Comparison cards replace duplicate starting layouts with configurable entries. Card: outlined text adds a neutral bordered container.

The only retained starter action is Navigation page setup on an empty Navigation page. The general picker omits starters, promotional banners and template-only patterns. Hidden compatibility registrations remain. Fifteen generated layout block types are reserved for template editing in normal page/post contexts; their registrations and rendering remain available for saved content.

Main content section H2s use 2rem text with a short yellow line. Enclosed components retain their own typography without a heading line. Section spacing is 4rem, reduced to 3rem at viewport widths up to 600px. H3 and lower heading rules remain unchanged.

Patch 6 updates documentation and the version only. CSS, JavaScript, PHP, templates, theme.json and all 66 pattern files are byte-identical to version 1.18.6 after patch 5b. The full catalogue is in `docs/pattern-catalogue.md`.

## Patch sequence

| File | Base → result | Change |
| --- | --- | --- |
| `01-clarity-branding.patch` | 1.18.0 → 1.18.1 | Theme identity and PSW editor labels |
| `02-canonical-patterns-and-text-card.patch` | 1.18.1 → 1.18.2 | Canonical text/comparison layouts and outlined card |
| `03-pattern-catalogue-and-search.patch` | 1.18.2 → 1.18.3 | Names, categories, cross-listing and search keywords |
| `04-pattern-availability.patch` | 1.18.3 → 1.18.4 | Page/template availability and Navigation page setup |
| `05-consistent-h2-styling.patch` | 1.18.4 → 1.18.5 | Initial shared heading rule |
| `05b-content-section-headings.patch` | 1.18.5 → 1.18.6 | Section-specific heading treatment, component sizing and spacing |
| `06-release-docs-and-version.patch` | 1.18.6 → 1.19.0 | Final catalogue, release notes and version |
| `06b-readme-theme-details.patch` | 1.19.0 → 1.19.0 | Theme-focused README and documentation corrections |

Patch 5b supersedes the all-H2 visual rule in patch 5. The heading guidance in this release and the catalogue describes the current behaviour. Patch 6b changes documentation only; the theme version remains 1.19.0.

## Source baseline and package identity

- Original source archive `theplainanswer (2).zip`, theme version 1.18.0
- Source ZIP SHA-256 `c8a0f51d256e46b676508fe5ea244bb66329f8dd95afa5a90ff7e7493a0bf837`
- Installed theme directory remains `theplainanswer`
- Block/pattern namespace, translation domain, PHP names, template identifiers and saved page-setting keys retain their existing identifiers
- Original author attribution, licences, bundled BC Sans and upstream design tokens are retained
- The release ZIP contains the `theplainanswer/` theme root and excludes Git internals and inspection/test files

The source archive's working files are the baseline; its embedded Git history is not substituted for those files.

## Applying this release

For an installation already updated through patch 5b, save patch 6 in Downloads and run:

```powershell
$themePath = "$env:USERPROFILE\Downloads\theplainanswer"
$patchPath = "$env:USERPROFILE\Downloads\06-release-docs-and-version.patch"

git -C $themePath -c core.whitespace=cr-at-eol apply --check $patchPath
if ($LASTEXITCODE -eq 0) {
    git -C $themePath -c core.whitespace=cr-at-eol apply $patchPath
}
```

For an installation already at 1.19.0 after patch 6, use the same commands with `06b-readme-theme-details.patch`. For the incremental route from 1.18.6, apply 6 followed by 6b.

The original LF/CRLF line endings are preserved. The whitespace setting recognises the existing CRLF files. The existing asset registration code reads the theme Version for CSS/JavaScript cache keys; version 1.19.0 updates those keys without changing the registration code.

`clarity-1.19.0-combined.patch` is an alternative for the exact original 1.18.0 working files. It contains the whole sequence, including 5b, 6 and 6b. Apply it once to that baseline, using the same check/apply commands with its filename. It is not an incremental update for a partially patched checkout.

`clarity-1.19.0.zip` contains the complete final theme for installation or review. The incremental sequence, combined patch and ZIP represent the same final files.

Saved content, Global Styles and Site Editor overrides are not rewritten. The final patch requires no pattern reinsertion, template reset, database migration or companion-plugin update. Existing site-specific style or template overrides remain subject to deliberate review.

## Rollback

Reverse the incremental patches in this order: **6b, 6, 5b, 5, 4, 3, 2, 1**. Use the following commands with $patchPath set to the patch being reversed:

```powershell
git -C $themePath -c core.whitespace=cr-at-eol apply --check --reverse $patchPath
if ($LASTEXITCODE -eq 0) {
    git -C $themePath -c core.whitespace=cr-at-eol apply --reverse $patchPath
}
```

For an installation made using the combined patch, check and reverse that combined patch instead. Review a failed applicability check before making changes. Patch reversal restores theme files; it does not undo content edits or settings made in WordPress.

## Verification

| Area | Evidence and status |
| --- | --- |
| Documentation correction | Patch 6b changes documentation only; all functional files match 1.18.6 |
| Catalogue | 66 unique registrations, 45 selectable patterns, 38 page/post patterns, seven additional template patterns, 21 hidden registrations and 14 active categories |
| Pattern metadata and references | Visible names have one PSW prefix; categories and include/pattern references resolve; block-comment nesting and JSON attributes pass source checks |
| JavaScript | All 11 theme scripts pass Node syntax checks |
| JSON | theme.json parses successfully and is unchanged by patch 6 |
| Existing controls | Earlier patch checks exercised columns, dividers and comparison-icon controls with API stubs; navigation starter checks covered 26 stubbed cases; these are not installed WordPress tests |
| Heading source checks | Patch 5b checked 28 section-pattern H2s, nine enclosed-pattern H2s, 11 additional role cases, CSS structure and preserved H3–H6 rules |
| User-reported heading test | User confirmed improved presentation after 5b and correct yellow-line behaviour when switching pattern headings between H2 and H3 |
| Data-table safeguard | Server-side safeguard functions are byte-identical to the original baseline; installed publication validation remains pending |
| Apply/reverse and packaging | The sequence, combined patch and ZIP are compared against the same final file contents; clean reversal restores the previous snapshots and original source |
| PHP syntax | Not run in this workspace because PHP is unavailable |
| Installed WordPress and visual coverage | Full editor save/reopen, native Undo, block validation, template overrides, keyboard/assistive technology, print, narrow-screen and 200% zoom checks remain pending |

The user's targeted heading test does not establish coverage of every layout or control. Source and API-stub checks do not replace the remaining installed checks.

## Remaining installed checks

1. Confirm page/post and template pattern availability, category memberships and keyword search; check existing content that references hidden patterns
2. Insert, save and reopen the three canonical/new patterns; exercise column/divider/icon options, existing steps/tabs/accordions/cards/events and native Undo without content loss or invalid-block recovery
3. Verify Navigation page setup on empty content, rejection after content exists, permission/lock handling, and absence of duplicate automatic child-page cards
4. Inspect Home, Pages, Navigation page and Guide/reference layouts, including saved template and Global Styles overrides
5. Check main-content H2/H3 changes, compact navigation/feedback/cards, section gaps, long linked headings, anchors, keyboard focus, narrow-screen/zoom, forced colours and print
6. Run PHP lint on the hosting PHP versions and verify valid/invalid managed data-table publication paths on staging
