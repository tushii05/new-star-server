<?php

namespace App\Models;

use CodeIgniter\Model;

class WebStoryModel extends Model
{
    protected $table = 'web_stories';
    protected $primaryKey = 'id'; // Assuming 'id' is your primary key
    protected $allowedFields = ['title', 'slug', 'content', 'cover_image', 'meta_title', 'meta_description']; // Add other fields as needed

    // Optional: Add validation rules here if needed
}
