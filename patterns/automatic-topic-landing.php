<?php
/**
 * Title: Automatic topic landing page
 * Slug: bc-practice/automatic-topic-landing
 * Categories: featured, pages
 * Block Types: core/post-content
 * Post Types: page
 * Description: Child page cards populated from the page hierarchy, with editable quick access and related topics. Use the Topic landing page template.
 * Viewport Width: 1440
 * Inserter: yes
 */
?>
<!-- wp:columns {"className":"bc-hub-columns"} -->
<div class="wp-block-columns bc-hub-columns"><!-- wp:column {"width":"75%"} -->
<div class="wp-block-column" style="flex-basis:75%"><!-- wp:bc-practice/child-page-cards /--></div>
<!-- /wp:column -->
<!-- wp:column {"width":"25%"} -->
<div class="wp-block-column" style="flex-basis:25%"><!-- wp:group {"className":"bc-quick-access","layout":{"type":"default"}} -->
<div class="wp-block-group bc-quick-access"><!-- wp:heading {"className":"bc-toc-exclude"} -->
<h2 class="wp-block-heading bc-toc-exclude">Quick access</h2>
<!-- /wp:heading -->
<!-- wp:paragraph --><p>Add links to frequently used pages and tools.</p><!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->
<!-- wp:group {"className":"bc-related-topics","layout":{"type":"default"}} -->
<div class="wp-block-group bc-related-topics"><!-- wp:heading {"className":"bc-toc-exclude"} -->
<h2 class="wp-block-heading bc-toc-exclude">Related topics</h2>
<!-- /wp:heading -->
<!-- wp:paragraph --><p>Add links to related information outside this topic.</p><!-- /wp:paragraph --></div>
<!-- /wp:group -->
