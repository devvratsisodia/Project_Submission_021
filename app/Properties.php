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
    	$listing_data = DB::table('properties')
       					->leftJoin('property_type', 'properties.property_type', '=', 'property_type.id')
       					->select('properties.*','property_type.status_title')
       					->orderBy('return_target')
     					 ->get();



    	return $listing_data;

    }

//Listing filter

    public static function listingfilter($data='',$location='')
    {
    

        $query="select p.*,pt.status_title from properties p left join property_type pt on p.property_type =pt.id ";

        $where ='';

        $order_by = ' order by return_target desc';

        if($data !='')
        {
        	$where= 'where property_type ="'.$data.'"';
        }

        if($location !='' && $where !='')
        {
        	$where .= ' and city = "'.$location.'"';
        }

        //echo $query.$where;

        $result = DB::select($query.$where.$order_by);


         
    	return $result;

    }


}
