<?php

use Illuminate\Database\Seeder;
use App\Properties;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call(PropertiesTableSeeder::class);
        $this->call(PropertyTypeTableSeeder::class);
        //factory(\App\Properties::class, 10)->create();
    }
}
