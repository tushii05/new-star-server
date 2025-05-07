<?php

namespace App\Controllers;

use App\Models\AuthModel;
use CodeIgniter\Controller;



class WebStoryController extends Controller
{
    public function webStorys()
    {
        // Example content for the original webStorys method
        return view('web_story'); // Assuming 'web_story' view file exists in app/Views
    }


    // public function testPagea()
    // {
    //     checkAdmin();
    //     $data['title'] = trans("Web Story");
    //     $data['users'] = $this->authModel->getActiveUsers();
    //     echo view('admin/includes/_header', $data);
    //     echo view('admin/google_news', $data);
    //     echo view('admin/includes/_footer');
    // }

   public function webStory()
    {
        //checkAdmin();
        $data['title'] = trans("epaper");
       $data['users'] = $this->authModel->getActiveUsers();
        // Load the test_page view
        echo view('admin/includes/_header', $data);
        return view('admin/web_stroy'); // Make sure app/Views/test_page.php exists
         echo view('admin/includes/_footer');
    }
}
