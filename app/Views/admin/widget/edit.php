<div class="row">
    <div class="col-sm-12">
        <?= view('admin/includes/_messages'); ?>
    </div>
</div>
<div class="row">
    <div class="col-lg-8 col-md-12">
        <div class="box box-primary">
            <div class="box-header with-border">
                <div class="left">
                    <h3 class="box-title"><?= trans('update_widget'); ?></h3>
                </div>
                <div class="right">
                    <a href="<?= adminUrl('widgets'); ?>" class="btn btn-success btn-add-new"><i class="fa fa-bars"></i><?= trans('widgets'); ?></a>
                </div>
            </div>
            <form action="<?= base_url('Admin/editWidgetPost'); ?>" method="post">
                <?= csrf_field(); ?>
                <input type="hidden" name="id" value="<?= esc($widget->id); ?>">
                <input type="hidden" name="type" value="<?= esc($widget->type); ?>">
                <input type="hidden" name="back_url" value="<?= currentFullURL(); ?>">

                <div class="box-body">
                    <div class="form-group">
                        <label class="control-label"><?= trans('title'); ?></label>
                        <input type="text" class="form-control" name="title" placeholder="<?= trans('title'); ?>" value="<?= esc($widget->title); ?>">
                    </div>

                    <div class="form-group">
                        <label><?= trans("language"); ?></label>
                        <select name="lang_id" class="form-control max-600" onchange="showCatsByLang(this.value);">
                            <?php $latestPostsTrans = array();
                            foreach ($activeLanguages as $language):
                                $trans = getTransByLabel('latest_posts', $language->id);
                                if (!empty($trans)) {
                                    $latestPostsTrans[$language->id] = $trans->translation;
                                } else {
                                    $latestPostsTrans[$language->id] = trans('latest_posts');
                                } ?>
                                <option value="<?= $language->id; ?>" <?= $widget->lang_id == $language->id ? 'selected' : ''; ?>><?= $language->name; ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="control-label"><?= trans('order_1'); ?></label>
                        <input type="number" class="form-control max-600" name="widget_order" min="1" max="3000" placeholder="<?= trans('order_1'); ?>" value="<?= $widget->widget_order; ?>" required>
                    </div>

                    <div class="form-group" style="display:none">
                        <label><?= trans("visibility"); ?></label>
                        <?= formRadio('visibility', 1, 0, trans("show"), trans("hide"), $widget->visibility, 'col-md-4'); ?>
                    </div>

                    <?php if ($activeTheme->theme != 'classic'): ?>
                        <div class="form-group" style="display:none">
                            <label><?= trans("where_to_display"); ?></label>
                            <div class="row">
                                <div class="col-sm-12 m-b-5">
                                    <div class="custom-control custom-radio">
                                        <input type="radio" name="display_category_id" value="latest_posts" id="rd_category_latest_posts" class="custom-control-input" checked required>
                                        <label for="rd_category_latest_posts" class="custom-control-label"><?= !empty($latestPostsTrans[$widget->lang_id]) ? $latestPostsTrans[$widget->lang_id] : trans('latest_posts'); ?></label>
                                    </div>
                                </div>
                                <?php if (!empty($categories)):
                                    foreach ($categories as $category):
                                        if ($category->block_type == 'block-2' || $category->block_type == 'block-3' || $category->block_type == 'block-4'): ?>
                                            <div class="col-sm-12 m-b-5 category-row category-lang-<?= $category->lang_id; ?><?= $widget->lang_id != $category->lang_id ? ' hide' : ''; ?>" required>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" name="display_category_id" value="<?= $category->id; ?>" id="rd_category_<?= $category->id; ?>" class="custom-control-input" required <?= $widget->display_category_id == $category->id ? 'checked' : ''; ?>>
                                                    <label for="rd_category_<?= $category->id; ?>" class="custom-control-label"><?= esc($category->name); ?>&nbsp;(<small><?= trans("category"); ?></small>)</label>
                                                </div>
                                            </div>
                                        <?php endif;
                                    endforeach;
                                endif; ?>
                            </div>
                        </div>
                    <?php else: ?>
                        <input type="hidden" name="display_category_id" value="<?= $widget->display_category_id; ?>">
                    <?php endif; ?>

                    <?php if ($widget->is_custom == 1): ?>
                        <div class="form-group">
                            <div id="main_editor">
                                <label><?= trans('content'); ?></label>
                                <div class="row">
                                    <div class="col-sm-12 editor-buttons">
                                        <button type="button" class="btn btn-sm btn-success" data-toggle="modal" data-target="#file_manager_image" data-image-type="editor"><i class="fa fa-image"></i>&nbsp;&nbsp;&nbsp;<?= trans("add_image"); ?></button>
                                    </div>
                                </div>
                                <textarea class="tinyMCE form-control" name="content"><?= $widget->content; ?></textarea>
                            </div>
                        </div>
                    <?php else: ?>
                        <input type="hidden" value="" name="content">
                    <?php endif; ?>
                </div>

                <div class="box-footer">
                    <button type="submit" class="btn btn-primary pull-right"><?= trans('save_changes'); ?></button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    var arrayTrans = JSON.parse('<?= json_encode($latestPostsTrans); ?>');

    function showCatsByLang(langId) {
        $('.category-row').addClass('hide');
        $('.category-lang-' + langId).removeClass('hide');
        $('#label_latest_posts').html(arrayTrans[langId]);
        $('input[name="display_category_id"]').prop('checked', false);
    }
</script>

<?= view('admin/file-manager/_load_file_manager', ['loadImages' => true, 'loadFiles' => false, 'loadVideos' => false, 'loadAudios' => false]); ?>