<?php

use Faker\Generator as Faker;
use Carbon\Carbon;

$factory->define(\App\Properties::class, function (Faker $faker) {
	return [
		'project_id' => 1,
		'property_type' => rand(1, 4),
		'status' => 1,
		'property_size' => 1,
		'price_per_squre_feet' => 1,
		'city' => '',
		'state' => '',
		'country' => '',
		'image' => '',
		'area' => '',
		'zipcode' => rand(100000, 999999),
		'title' => $faker->name,
		'address' => '',
		'latitude' => rand(300, 500) / 100,
		'longitude' => rand(300, 500) / 100,
		'deleted_at' => Carbon::now(),
	];
});
