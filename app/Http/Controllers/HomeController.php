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

         $location = $this->locationfilterdata();

         $selectedfilter =  array();

        if(Browser::isMobile())
        {
            return View::make('mobile_app.home', ['listingdata' => $listing_data,'location_list'=>$location,'selectedfilter'=>$selectedfilter]);
        }
        else
        {
            return View::make('mobile_app.home', ['listingdata' => $listing_data,'location_list'=>$location,' '=>$selectedfilter]);
        }
        
    }
    public function postPropertyResult()
    {
        $type = Input::get('type');
        $location = '';
        $result = Properties::listingfilter($type,$location);

        

        return View::make('mobile_app.filter_tile', ['data' => $result]);
    }
    private function locationfilterdata($data=0)
    {

        $location = [''=>'Select Location','1'=>'Delhi','2'=>'Gurgaon','3'=>'Pune','4'=>'Bengaluru'];

        return $location;

    }

    public function postPropertyFilterResult()
    {

        $location = Input::get('location');
        $type = '';

        $result = Properties::listingfilter($type, $location);

        

        return View::make('mobile_app.filter_tile', ['data' => $result]);

    }

}
