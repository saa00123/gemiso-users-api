<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;

class SessionControllers{
  public function index(Request $request)
  {
    $visitCount = Session::get('visit_count',0)+1;
    Session::put('visit_count',$visitCount);

    $welcomeMessage = $request->cookie('welcome_message','Welcome to our website');

    $response = new \Illuminate\Http\Response(view('session',['visitCount'=>$visitCount]));

    $response = new \Illuminate\Http\Response(view('session', ['visitCount' => $visitCount]));
    $newWelcomeMessage = "Thanks for visiting us again!";
    $response->withCookie(cookie('welcome_message', $newWelcomeMessage, 60));

    return $response;
  }
}