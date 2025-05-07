<div class="row">
    <div class="col-sm-12">
        <?= view('admin/includes/_messages'); ?>
    </div>
</div>

<div class="row">
    <div class="col-lg-6">
        <div class="card overflow-hidden">
            <div class="card-header pb-2 pt-3" style="background: #00073B;color: #fff;">
                <h6 class="mb-0 pb-0" style="padding: 9px 9px;">Manage E-Paper<h6>
            </div>
            <div class="card-body pt-2">
                <div class="row">
                    <div class="col-lg-12">
                        <form action="<?= base_url('admin/addEpapers') ?>" method="post" enctype="multipart/form-data">
                            <?= csrf_field() ?>
                            <div class="card overflow-hidden cal-card">
                                <div class="card-body pt-2">
                                    <div class="row">
                                        <div class="col-lg-12 col-sm col-12 mt-2 px-2">
                                            <label>Select City<span class="text-danger required-text">*</span></label>
                                            <select name="epaper_group" class="form-control" required>
                                                <option>--select--</option>
                                                <option value="Bhopal">Bhopal</option>
                                                <option value="chhindwara">Chhindwara</option>
                                                <option value="jabalpur">Jabalpur</option>
                                                <option value="mandla">Mandla</option>
                                                <option value="balaghat">Balaghat</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row" style="margin-top:10px;">
                                        <div class="col-lg-4 col-sm col-12 mt-2 px-2">
                                            <label>Select Date<span class="text-danger required-text">*</span></label>
                                            <input class="form-control" name="epaper_date" type="date" required>
                                        </div>
                                        <div class="col-lg-8 col-sm col-12 mt-2 px-2">
                                            <label>Select PDF<span class="text-danger required-text">*</span></label>
                                            <input class="form-control" name="image" type="file" required>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4 px-2 pt-2 mt-1">
                                            <button name="submit" value="submit" type="submit" class="btn btn-success bg-success mb-3 mt-4 px-5" style="padding: 7px 30px;margin-top: 15px;">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-6">
        <div class="card overflow-hidden">
            <div class="card-header pb-2 pt-3" style="background: #00073B;color: #fff;">
                <h6 class="mb-0 pb-0" style="padding: 9px 9px;">List<h6>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead style="background: #3d3d3d; color: #fff;">
                        <tr>
                            <th>S.no</th>
                            <th>Date</th>
                            <th>City</th>
                            <th>File</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (isset($epaper) && !empty($epaper)): ?>
                            <?php $serial = 1; ?>
                            <?php foreach ($epaper as $item): ?>
                                <tr>
                                    <td><?= $serial++; ?></td>
                                    <td><?= date('d-m-Y', strtotime($item['epaper_date'])); ?></td>
                                    <td><?= ucfirst($item['epaper_group']); ?></td>
                                    <td>
                                        <!-- <a href="<?= base_url('uploads/epaper/'.$item['image']); ?>" target="_blank"> -->
                                             <a href="<?= base_url($item['image']); ?>" target="_blank">
                                            <img src="<?= base_url('assets/img/pdf-icon.png'); ?>" alt="PDF" style="width: 24px;">
                                        </a>
                                    </td>

                                </tr>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <tr>
                                <td colspan="4">No e-papers available</td>
                            </tr>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
