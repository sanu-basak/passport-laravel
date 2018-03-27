<!DOCTYPE html>
<html>
<head>
	<title>Spell & Grammer Checker</title>
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<link rel="stylesheet" type="text/css" href="{{asset('css/style.css')}}">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>
<body>
   <div name="myTextArea"  id="myTextArea" class="myTextArea" contenteditable="true"></div>
   <div class="suggested"></div>
   <div id="demo"></div>
   <script type="text/javascript" src="{{asset('js/script.js')}}"></script>	
</body>
</html>