<div class="box">
    <div class="box-header with-border">
        <div class="left">
            <h3 class="box-title"><?= trans('category'); ?></h3>
        </div>
    </div>
    <div class="box-body">
        <?php if (!empty($post)): ?>
            <!-- Language selection -->
            <div class="form-group">
                <label><?= trans("language"); ?></label>
                <select name="lang_id" class="form-control" onchange="getParentCategoriesByLang(this.value);">
                    <?php foreach ($activeLanguages as $language): ?>
                        <option value="<?= $language->id; ?>" <?= $post->lang_id == $language->id ? 'selected' : ''; ?>><?= $language->name; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <!-- Category selection -->
            <div class="form-group">
                <label class="control-label"><?= trans('category'); ?></label>
                <select id="categories" name="category_id" class="form-control" autocomplete="off" onchange="getSubCategories(this.value);" required>
                    <option value=""><?= trans('select_category'); ?></option>
                    <?php if (!empty($categories)):
                        foreach ($categories as $item): ?>
                            <option value="<?= $item->id; ?>" <?= $item->id == $parentCategoryId ? 'selected' : ''; ?>><?= esc($item->name); ?></option>
                        <?php endforeach;
                    endif; ?>
                </select>
            </div>

            <!-- Subcategory selection -->
            <div class="form-group m-0">
                <label class="control-label"><?= trans('subcategory'); ?></label>
                <select id="subcategories" name="subcategory_id" class="form-control" autocomplete="off">
                    <option value="0"><?= trans('select_category'); ?></option>
                    <?php if (!empty($subCategories)):
                        foreach ($subCategories as $item): ?>
                            <option value="<?= esc($item->id); ?>" <?= $item->id == $subCategoryId ? 'selected' : ''; ?>><?= esc($item->name); ?></option>
                        <?php endforeach;
                    endif; ?>
                </select>
            </div>

            <!-- Child Category (sub_parent_id) -->
            <div class="form-group">
                <label>Child Category</label>
                <select id="sub_parent_id" class="form-control" name="sub_parent_id">
                    <option value=""><?= trans('none'); ?></option>
                    <?php if (!empty($subParentCategories)):
                        foreach ($subParentCategories as $subParent): ?>
                            <option value="<?= $subParent->id; ?>" <?= isset($post) && $post->sub_parent_id == $subParent->id ? 'selected' : ''; ?>>
                                <?= esc($subParent->name); ?>
                            </option>
                        <?php endforeach;
                    endif; ?>
                </select>
            </div>
        <?php else: ?>
            <!-- Language selection (when no post exists) -->
            <div class="form-group">
                <label><?= trans("language"); ?></label>
                <select name="lang_id" class="form-control" onchange="getParentCategoriesByLang(this.value);" autocomplete="off">
                    <?php foreach ($activeLanguages as $language): ?>
                        <option value="<?= $language->id; ?>" <?= $activeLang->id == $language->id ? 'selected' : ''; ?>><?= $language->name; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <!-- Category selection (when no post exists) -->
            <div class="form-group">
                <label class="control-label"><?= trans('category'); ?></label>
                <select id="categories" name="category_id" class="form-control" autocomplete="off" onchange="getSubCategories(this.value);" required>
                    <option value=""><?= trans('select_category'); ?></option>
                    <?php if (!empty($parentCategories)):
                        foreach ($parentCategories as $item):
                            if ($item->id == old('category_id')): ?>
                                <option value="<?= $item->id; ?>" selected><?= esc($item->name); ?></option>
                            <?php else: ?>
                                <option value="<?= $item->id; ?>"><?= esc($item->name); ?></option>
                            <?php endif;
                        endforeach;
                    endif; ?>
                </select>
            </div>

            <!-- Subcategory selection (when no post exists) -->
            <div class="form-group m-0">
                <label class="control-label"><?= trans('subcategory'); ?></label>
                <select id="subcategories" name="subcategory_id" class="form-control" autocomplete="off">
                    <option value="0"><?= trans('select_category'); ?></option>
                </select>
            </div>

            <!-- Child Category (sub_parent_id) -->
            <div class="form-group">
                <label>Child Category</label>
                <select id="sub_parent_id" class="form-control" name="sub_parent_id">
                    <option value=""><?= trans('none'); ?></option>
                </select>
            </div>
        <?php endif; ?>
    </div>
</div>

<script type="text/javascript">
    $(document).ready(function() {
        // Handle subcategory change
        $('body').on('change', '#subcategories', function() {
            var subCategoryId = $(this).val();
            var token = $('input[name=csrf_token]').val(); // CSRF token for security
            var dataString = {
                "parent_id": subCategoryId,
                "csrf_token": token
            };

            // Make AJAX request to fetch child categories (sub_parent_id options)
            $.ajax({
                type: 'POST',
                url: '<?php echo base_url("Category/getCityCategories"); ?>',
                data: dataString,
                beforeSend: function() {
                    // Show a loading spinner if needed
                },
                success: function(data) {
                    // Populate the sub_parent_id dropdown with the returned data
                    $('#sub_parent_id').html(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                    $('#ajaxloading').modal('hide');
                }
            });
        });

        // Optionally, if you need to load sub_parent_id during the edit view
        var selectedSubCategoryId = $('#subcategories').val();
        if (selectedSubCategoryId) {
            $('#subcategories').trigger('change');
        }
    });
</script>
