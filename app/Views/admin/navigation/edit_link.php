<div class="row">
    <div class="col-sm-12">
        <?= view('admin/includes/_messages'); ?>
    </div>
</div>
<div class="row">
    <div class="col-sm-6">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title"><?= trans("update_link"); ?></h3>
            </div>
            <form action="<?= base_url('Admin/editMenuLinkPost'); ?>" method="post">
                <?= csrf_field(); ?>
                <input type="hidden" name="id" value="<?= $page->id; ?>">
                <div class="box-body">
                    <div class="form-group">
                        <label><?= trans("title"); ?></label>
                        <input type="text" class="form-control" name="title" placeholder="<?= trans("title"); ?>" value="<?= $page->title; ?>" maxlength="200" required>
                    </div>

                    <div class="form-group">
                        <label><?= trans("link"); ?></label>
                        <input type="text" class="form-control" name="link" placeholder="<?= trans("link"); ?>" value="<?= $page->link; ?>">
                    </div>

                    <div class="form-group">
                        <label><?= trans('order'); ?></label>
                        <input type="number" class="form-control" name="page_order" placeholder="<?= trans('order'); ?>" value="<?= $page->page_order; ?>" min="0" max="99999">
                    </div>

                    <div class="form-group">
                        <label><?= trans("language"); ?></label>
                        <select name="lang_id" class="form-control" onchange="getMenuLinksByLang(this.value);">
                            <?php foreach ($activeLanguages as $language): ?>
                                <option value="<?= $language->id; ?>" <?= $page->lang_id == $language->id ? 'selected' : ''; ?>><?= $language->name; ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="control-label"><?= trans('parent_link'); ?></label>
                        <select id="parent_links" name="parent_id" class="form-control">
                            <option value="0"><?= trans('none'); ?></option>
                            <?php if (!empty($menuLinks)):
                                foreach ($menuLinks as $item):
                                    if ($item->item_type != "category" && $item->item_location == "main" && $item->item_parent_id == "0" && $item->item_id != $page->id):
                                        if ($item->item_id == $page->parent_id): ?>
                                            <option value="<?= $item->item_id; ?>" selected><?= $item->item_name; ?></option>
                                        <?php else: ?>
                                            <option value="<?= $item->item_id; ?>"><?= $item->item_name; ?></option>
                                        <?php endif;
                                    endif;
                                endforeach;
                            endif; ?>
                        </select>
                    </div>

                    <div class="form-group">
                        <label><?= trans("show_on_menu"); ?></label>
                        <?= formRadio('visibility', 1, 0, trans("yes"), trans("no"), $page->visibility); ?>
                    </div>
                </div>

                <div class="box-footer">
                    <button type="submit" class="btn btn-primary pull-right"><?= trans('save_changes'); ?></button>
                </div>
            </form>
        </div>
    </div>
</div>