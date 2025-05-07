<?php namespace App\Models;

use CodeIgniter\Model;

class EpaperModel extends Model
{
    public function __construct()
    {
        parent::__construct();
        // Load your library or helpers here if needed
    }
    protected $table = 'epaper';  // Set the table name here
    protected $primaryKey = 'id'; // Define your primary key (optional, defaults to 'id')
    protected $allowedFields = ['epaper_group', 'epaper_date', 'image']; // Define columns that can be inserted or updated

    public function insert_epaper($data)
    {
        return $this->db->table('epaper')->insert($data);
    }
    public function getAllEpapers()
    {
        return $this->findAll(); // This will fetch all records from the 'epaper' table
    }
}
