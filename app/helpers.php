<?php

use Carbon\Carbon;
use Carbon\CarbonPeriod;

function calculatedays($date)
{

	$created = new Carbon($date);
		$now = Carbon::now();
		$difference = ($created->diff($now)->days < 1)
		    ? 'today'
		    : $created->diffInDays($now);
		    return $difference;
}


?>