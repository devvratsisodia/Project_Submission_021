<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB; 
use App\Properties;
use View;
use Browser;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
         $listing_data = Properties::totallisting();
         
        if(Browser::isMobile())
        {
            return View::make('mobile_app.home', ['listingdata' => $listing_data]);
        }
        else
        {
            return View::make('mobile_app.home', ['listingdata' => $listing_data]);
        }
        
    }
    public function postPropertyResult()
    {
         dd(1);
        return Response::json(array('status' => 1, 'data' => $data));
    }
}
