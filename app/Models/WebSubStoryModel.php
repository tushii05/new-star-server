<?php

namespace App\Models;

use CodeIgniter\Model;

class WebSubStoryModel extends Model
{
    protected $table = 'web_sub_stories';
    protected $primaryKey = 'id'; // Assuming 'id' is your primary key
    protected $allowedFields = ['title', 'web_id', 'slug', 'content', 'cover_image']; // Add other fields as needed

    // Optional: Add validation rules here if needed
}
