<section class="section section-page">
    <div class="container-xl">
        <div class="row">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="<?= langBaseUrl(); ?>"><?= trans("home"); ?></a></li>
                    <li class="breadcrumb-item"><a href="<?= generateURL('settings'); ?>"><?= trans("settings"); ?></a></li>
                    <li class="breadcrumb-item active"><?= esc($title); ?></li>
                </ol>
            </nav>
            <h1 class="page-title"><?= esc($title); ?></h1>
            <div class="page-content">
                <div class="row">
                    <div class="col-sm-12 col-md-3">
                        <?= loadView('settings/_setting_tabs'); ?>
                    </div>
                    <div class="col-sm-12 col-md-9">
                        <?= loadView('partials/_messages'); ?>
                        <form action="<?= base_url('social-accounts-post'); ?>" method="post" class="needs-validation">
                            <?= csrf_field(); ?>
                            <input type="hidden" name="back_url" value="<?= esc(currentFullURL()); ?>">
                            <?php $socialArray = getSocialLinksArray(user());
                            foreach ($socialArray as $item):?>
                                <div class="mb-3">
                                    <label class="form-label"><?= $item['text'] . ' ' . trans('url'); ?></label>
                                    <input type="text" class="form-control form-input" name="<?= $item['inputName']; ?>" placeholder="<?= $item['text'] . ' ' . trans('url'); ?>" value="<?= esc($item['value']); ?>">
                                </div>
                            <?php endforeach; ?>
                            <div class="mb-3">
                                <label class="form-label"><?= trans('personal_website_url'); ?></label>
                                <input type="text" class="form-control form-input" name="personal_website_url" placeholder="<?= trans('personal_website_url'); ?>" value="<?= esc(user()->personal_website_url); ?>">
                            </div>
                            <button type="submit" class="btn btn-md btn-custom"><?= trans("save_changes") ?></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>