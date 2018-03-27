<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;


class SpellCheckProofController extends Controller
{
    public function index(){
    	return view('index');
    }

    public function guzzle(Request  $text){
        $body['title'] = "Body Title";
	    $body['content'] = "Body Description";


	    $client = new \GuzzleHttp\Client();
	    $url = "https://api.textgears.com/check.php?text=".$text."&key=HpOD3AqdtWYxmkTP";


	    $response = $client->createRequest("POST", $url, ['auth' => ['root','root'],'body'=>$body]);


	    $response = $client->send($response);


	    print_r($response);
	    die;
	    
	     return $response;
         
    }
}
