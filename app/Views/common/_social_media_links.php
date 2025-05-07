<?php $socialLinks = getSocialLinksArray($baseSettings);
if (!empty($socialLinks)):
    foreach ($socialLinks as $socialLink):
        if (!empty($socialLink['value'])):?>
            <li><a class="<?= esc($socialLink['name']); ?>" href="<?= $socialLink['value']; ?>" target="_blank" aria-label="<?= esc($socialLink['name']); ?>"><i class="icon-<?= esc($socialLink['name']); ?>"></i></a></li>
        <?php endif;
    endforeach;
endif;
if (!empty($generalSettings->show_rss) && $rssHide == false) : ?>
    <li><a class="rss" href="<?= generateURL('rss_feeds'); ?>" aria-label="rss"><i class="icon-rss"></i></a></li>
<?php endif; ?>