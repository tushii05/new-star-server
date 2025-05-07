<?php $permissions = ['admin_panel', 'add_post', 'manage_all_posts', 'navigation', 'pages', 'rss_feeds', 'categories', 'widgets', 'polls', 'gallery', 'comments_contact',
    'newsletter', 'ad_spaces', 'users', 'seo_tools', 'settings'] ?>
<div class="row">
    <div class="col-sm-12">
        <?= view('admin/includes/_messages'); ?>
    </div>
</div>
<div class="row">
    <div class="col-sm-12 col-md-6">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title"><?= trans("edit_role"); ?></h3>
            </div>
            <form action="<?= base_url('Admin/editRolePost'); ?>" method="post">
                <?= csrf_field(); ?>
                <input type="hidden" name="id" value="<?= $role->id; ?>">
                <div class="box-body">
                    <?php foreach ($activeLanguages as $language):
                        $roleName = parseSerializedNameArray($role->role_name, $language->id); ?>
                        <div class="form-group">
                            <label><?= trans("role_name"); ?> (<?= esc($language->name); ?>)</label>
                            <input type="text" class="form-control" name="role_name_<?= $language->id; ?>" value="<?= esc($roleName); ?>" placeholder="<?= trans("role_name"); ?>" maxlength="255" required>
                        </div>
                    <?php endforeach;
                    if ($role->role != 'admin'):
                        foreach ($permissions as $permission):
                            $perTxt = trans($permission);
                            if ($permission == 'comments_contact') {
                                $perTxt = trans("comments") . ', ' . trans("contact_messages");
                            } ?>
                            <div class="form-group">
                                <?= formCheckbox($permission, 1, $perTxt, $role->$permission == 1 ? '1' : '0'); ?>
                            </div>
                        <?php endforeach;
                    endif; ?>
                </div>
                <div class="box-footer">
                    <button type="submit" class="btn btn-primary pull-right"><?= trans('save_changes'); ?> </button>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
    .form-group .col-sm-2 {
        max-width: 40px;
        padding-right: 0 !important;
    }
</style>
