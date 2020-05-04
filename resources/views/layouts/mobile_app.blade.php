<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if IE 9]>         <html class="ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
    
    @include('include.css')
    @yield('page-css')
	
</head>
<body>

        @include('layouts.nav_mobile')
        
        @yield('content')        
        @include('layouts.footer')
        @include('include.script')
        @yield('page-scripts')
     
</body>

</html>