<div class="row">
    <div class="col-sm-12">
        <?= view('admin/includes/_messages'); ?>
    </div>
</div>

<?php if (isset($validation)): ?>
        <div style="color: red;">
            <?= $validation->listErrors(); ?>
        </div>
    <?php endif; ?>



<!-- <h2>Web Stories</h2> -->
<div class="row">
    <div class="col-lg-6">
        <div class="card overflow-hidden">
            <div class="card-header pb-2 pt-3" style="background: #00073B;color: #fff;">
                <h6 class="mb-0 pb-0" style="padding: 9px 9px;">Sub Web Stories</h6>
            </div>
            <div class="card-body pt-2">
                <div class="row">
                    <div class="col-lg-12">
							<form action="<?= base_url('admin/webSubStory') ?>" method="post" enctype="multipart/form-data">
							    <?= csrf_field() ?>
							    
							   		<div class="form-group">
							            <label class="control-label">Title:</label>
							            <input type="text" id="title" class="form-control" name="title" placeholder="Title" value="" required="" autocomplete="off">
							            <input type="hidden" value="<?php echo $webstory_id; ?>" name="web_id">
							        </div>

                                    

							        <div class="form-group">
							            <label class="control-label">Slug:</label>
							            <input type="text" class="form-control" name="slug" placeholder="Slug" value="" autocomplete="off">
							        </div>

									<div class="form-group">
							            <label class="control-label">Description:</label>
							            <textarea class="form-control text-area" name="content" placeholder="Description"></textarea>
							        </div>

							       	<div class="form-group">
							        <label for="cover_image">Cover Image</label>
							        <input type="file" name="cover_image" id="cover_image" required>
							       
							    	</div>

							    	<!-- <div class="form-group">
							            <label class="control-label">Meta Title:</label>
							            <input type="text" id="meta_title" class="form-control" name="meta_title" placeholder="Meta Title" value="" required="" autocomplete="off">
							        </div>

							        <div class="form-group">
							            <label class="control-label"> Meta Description:</label>
							            <textarea class="form-control text-area" name="meta_description" placeholder=" Meta Description"></textarea>
							        </div> -->
							    <button type="submit">Submit</button>
							</form>
					</div>
                </div>
            </div>
        </div>
    </div>


<div class="col-lg-6">
        <div class="card overflow-hidden">
            <div class="card-header pb-2 pt-3" style="background: #00073B;color: #fff;">
                <h6 class="mb-0 pb-0" style="padding: 9px 9px;">Sub Web Stories List<h6>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead style="background: #3d3d3d; color: #fff;">
                        <tr>
                            <th>S.no</th>
                            <th>Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
	                    <tbody>
                            <?php if (!empty($webStories)): ?>
                                <?php $i = 1; ?>
                                <?php foreach ($webStories as $story): ?>
                                    <tr>
                                        <td><?= $i++; ?></td>
                                        <td><?= esc($story['title']); ?></td>
                                       
                                        <td>
                                        	<a href="<?= base_url('admin/add-sub-web/' . $story['id']); ?>" class="btn btn-warning btn-sm">Add Sub Web</a>
                                            <!-- <a href="<?= base_url('admin/edit_web_story/' . $story['id']); ?>" class="btn btn-warning btn-sm">Edit</a> -->
                                            <a href="<?= base_url('admin/delete_web_story/' . $story['id']); ?>" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure?');">Delete</a>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <tr>
                                    <td colspan="4">No Web Stories found.</td>
                                </tr>
                            <?php endif; ?>
                        </tbody>
                </table>
            </div>
        </div>
    </div>
</div>