<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB; 
use App\Properties;
use View;
use Response;
use Browser;
use Illuminate\Support\Facades\Input;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
         $listing_data = Properties::totallisting();
         //dd($listing_data);

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
        $type = Input::get('type');
        $result = Properties::listingfilter($type);

        

        return View::make('mobile_app.filter_tile', ['data' => $result]);
    }
}
