<?php

namespace App;
use DB;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Properties extends Model
{
	use SoftDeletes;

    //
     protected $table = 'properties';
     protected $guarded = array('id');


    public static function totallisting()
    {
    	$listing_data = DB::table('properties')->get();
    	return $listing_data;

    }

    
}
