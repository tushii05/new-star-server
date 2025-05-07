<?php $totalTime = !empty($dataRecipe) && !empty($dataRecipe['prep_time']) ? $dataRecipe['prep_time'] : 0;
$totalTime += !empty($dataRecipe) && !empty($dataRecipe['cook_time']) ? $dataRecipe['cook_time'] : 0;
$recipeCategory = getCategory($post->category_id, $baseCategories); ?>
<script type="application/ld+json">
{
"@context": "https://schema.org/",
"@type": "Recipe",
"name": "<?= escSls($postJsonLD->title); ?>",
"image": {"@type": "ImageObject","url": "<?= getPostImage($postJsonLD, 'big'); ?>","width": 750,"height": 500},
"author": {"@type": "Person","name": "<?= escSls($postJsonLD->author_username); ?>"},
"datePublished": "<?= date(DATE_ISO8601, strtotime($postJsonLD->created_at)); ?>",
"description": "<?= escSls($postJsonLD->summary); ?>"
"prepTime": "PT<?= !empty($dataRecipe) && !empty($dataRecipe['prep_time']) ? $dataRecipe['prep_time'] : ''; ?>M",
"cookTime": "PT<?= !empty($dataRecipe) && !empty($dataRecipe['cook_time']) ? $dataRecipe['cook_time'] : ''; ?>M",
"totalTime": "PT<?= $totalTime; ?>M",
"keywords": "<?= escSls($keywords); ?>",
"recipeYield": "<?= !empty($dataRecipe) && !empty($dataRecipe['serving']) ? $dataRecipe['serving'] : 1; ?> servings",
"recipeCategory": "<?= !empty($recipeCategory) ? escSls($recipeCategory->name) : ''; ?>",
<?php if (!empty($dataRecipe) && !empty($dataRecipe['nInfo'])): ?>
"nutrition": {"@type": "NutritionInformation",<?php foreach ($dataRecipe['nInfo'] as $itemInfo): ?>"<?= !empty($itemInfo) && !empty($itemInfo['n']) ? escSls($itemInfo['n']) : ''; ?>": "<?= !empty($itemInfo) && !empty($itemInfo['v']) ? escSls($itemInfo['v']) : ''; ?>",<?php endforeach; ?>},
<?php endif;
if (!empty($dataRecipe) && !empty($dataRecipe['ingredients'])): ?>"recipeIngredient": [<?php foreach ($dataRecipe['ingredients'] as $itemIngredient): ?>"<?= escSls($itemIngredient); ?>",<?php endforeach; ?>],
<?php endif;
if(!empty($post->video_embed_code)):?>
"video": {
"@type": "VideoObject",
"name": "<?= escSls($postJsonLD->title); ?>",
"description": "<?= escSls($postJsonLD->summary); ?>",
"thumbnailUrl": ["<?= getPostImage($postJsonLD, 'big'); ?>"],
"contentUrl": "<?= escSls($postJsonLD->video_url); ?>",
"embedUrl": "<?= escSls($postJsonLD->video_embed_code); ?>"
"uploadDate": "<?= date(DATE_ISO8601, strtotime($postJsonLD->created_at)); ?>"},
<?php endif; ?>
}
</script>