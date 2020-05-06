<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePropertiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('project_id');
            $table->integer('property_type');
            $table->integer('status');
            $table->double('property_size',10,2);
            $table->double('price_per_squre_feet',20,2);
            $table->string('city');
            $table->string('state');
            $table->string('country');
            $table->string('image')->nullble();
            $table->string('area');
            $table->integer('zipcode');
            $table->text('title');
            $table->text('address');
            $table->float('latitude',18,15);
            $table->float('longitude',18,15);
            $table->float('return_target',4,2);
            $table->float('rental_yeild',4,2);
            $table->float('investment',20,2);
            $table->dateTime('deleted_at')->nullble();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('properties');
    }
}
