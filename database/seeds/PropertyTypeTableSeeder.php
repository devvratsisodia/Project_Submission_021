<?php

use Illuminate\Database\Seeder;

class PropertyTypeTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('property_type')->delete();
        
        \DB::table('property_type')->insert(array (
            0 => 
            array (
                'id' => 1,
                'status_title' => 'commercial',
            ),
            1 => 
            array (
                'id' => 2,
                'status_title' => 'residential',
            ),
            2 => 
            array (
                'id' => 3,
                'status_title' => 'alternative',
            ),
            3 => 
            array (
                'id' => 4,
                'status_title' => 'warehouses',
            ),
        ));
        
        
    }
}