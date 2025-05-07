<div id="wrapper">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <nav class="nav-breadcrumb" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="<?= langBaseUrl(); ?>"><?= trans("home"); ?></a></li>
                        <li class="breadcrumb-item"><a href="<?= generateURL('settings'); ?>"><?= trans("settings"); ?></a></li>
                        <li class="breadcrumb-item active" aria-current="page"><?= esc($title); ?></li>
                    </ol>
                </nav>
                <h1 class="page-title"><?= trans("settings"); ?></h1>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-md-3">
                <div class="row-custom">
                    <?= loadView("settings/_setting_tabs"); ?>
                </div>
            </div>
            <div class="col-sm-12 col-md-9">
                <div class="row-custom">
                    <div class="profile-tab-content">
                        <?= loadView('partials/_messages'); ?>
                        <form action="<?= base_url('social-accounts-post'); ?>" method="post">
                            <?= csrf_field(); ?>
                            <input type="hidden" name="back_url" value="<?= esc(currentFullURL()); ?>">
                            <?php $socialArray = getSocialLinksArray(user());
                            foreach ($socialArray as $item):?>
                                <div class="form-group">
                                    <label class="form-label"><?= $item['text'] . ' ' . trans('url'); ?></label>
                                    <input type="text" class="form-control form-input" name="<?= $item['inputName']; ?>" placeholder="<?= $item['text'] . ' ' . trans('url'); ?>" value="<?= esc($item['value']); ?>">
                                </div>
                            <?php endforeach; ?>
                            <div class="form-group">
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
</div>