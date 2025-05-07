<div class="row">
    <div class="col-sm-12 title-section">
        <h3><?= trans('reward_system'); ?></h3>
    </div>
</div>
<div class="row">
    <div class="col-sm-12">
        <?= view('admin/includes/_messages'); ?>
    </div>
</div>
<div class="row">
    <div class="col-lg-6 col-md-12">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title"><?= trans('settings'); ?></h3>
            </div>
            <form action="<?= base_url('Reward/updateSettingsPost'); ?>" method="post">
                <?= csrf_field(); ?>
                <div class="box-body">
                    <div class="form-group">
                        <label><?= trans("status"); ?></label>
                        <?= formRadio('reward_system_status', 1, 0, trans("enable"), trans("disable"), $generalSettings->reward_system_status); ?>
                    </div>

                    <div class="form-group">
                        <label class="control-label"><?= trans('reward_amount'); ?></label>
                        <div class="input-group">
                            <div class="input-group-addon"><b><?= $generalSettings->currency_symbol; ?></b></div>
                            <input type="text" class="form-control price-input" name="reward_amount" value="<?= $generalSettings->reward_amount; ?>" placeholder="E.g. 1.5" required>
                        </div>
                    </div>
                </div>

                <div class="box-footer">
                    <button type="submit" class="btn btn-primary pull-right"><?= trans('save_changes'); ?></button>
                </div>
            </form>
        </div>

        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title"><?= trans('payout_methods'); ?></h3>
            </div>
            <form action="<?= base_url('Reward/updatePayoutPost'); ?>" method="post">
                <?= csrf_field(); ?>
                <div class="box-body">
                    <div class="form-group">
                        <label><?= trans("paypal"); ?></label>
                        <?= formRadio('payout_paypal_status', 1, 0, trans("enable"), trans("disable"), $generalSettings->payout_paypal_status); ?>
                    </div>
                    <div class="form-group">
                        <label><?= trans("iban"); ?></label>
                        <?= formRadio('payout_iban_status', 1, 0, trans("enable"), trans("disable"), $generalSettings->payout_iban_status); ?>
                    </div>
                    <div class="form-group">
                        <label><?= trans("swift"); ?></label>
                        <?= formRadio('payout_swift_status', 1, 0, trans("enable"), trans("disable"), $generalSettings->payout_swift_status); ?>
                    </div>
                </div>

                <div class="box-footer">
                    <button type="submit" class="btn btn-primary pull-right"><?= trans('save_changes'); ?></button>
                </div>
            </form>
        </div>
    </div>

    <div class="col-lg-6 col-md-12">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title"><?= trans('currency'); ?></h3>
            </div>
            <form action="<?= base_url('Reward/updateCurrencyPost'); ?>" method="post">
                <?= csrf_field(); ?>
                <div class="box-body">
                    <div class="form-group">
                        <label class="control-label"><?= trans('currency_name'); ?></label>
                        <input type="text" class="form-control" name="currency_name" value="<?= $generalSettings->currency_name; ?>" placeholder="E.g. US Dollar" required>
                    </div>
                    <div class="form-group">
                        <label class="control-label"><?= trans('currency_symbol'); ?></label>
                        <input type="text" class="form-control" name="currency_symbol" value="<?= esc($generalSettings->currency_symbol); ?>" placeholder="E.g. $, USD or <?= esc('&#36;') ?>" required>
                    </div>
                    <div class="form-group">
                        <label><?= trans("currency_format"); ?></label>
                        <?= formRadio('currency_format', 'us', 'european', '1,234,567.89', '1.234.567,89', $generalSettings->currency_format); ?>
                    </div>
                    <div class="form-group">
                        <label><?= trans("currency_symbol_format"); ?></label>
                        <?= formRadio('currency_symbol_format', 'left', 'right', '$100 (' . trans("left") . ')', '100$ (' . trans("right") . ')', $generalSettings->currency_symbol_format); ?>
                    </div>
                </div>

                <div class="box-footer">
                    <button type="submit" class="btn btn-primary pull-right"><?= trans('save_changes'); ?></button>
                </div>
            </form>
        </div>
    </div>
</div>