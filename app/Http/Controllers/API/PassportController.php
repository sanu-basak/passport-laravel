<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Validator;
use Illuminate\Support\Facades\Auth;
class PassportController extends Controller
{
    public $succesStatus = 200;

    public function login(Request $request){
        if(Auth::attempt(['email' => $request->email,'password' => $request->password])){
               $user = Auth::user();
               $success['token'] = $user->createToken('myapi')->accessToken;
               return response()->json(['success' => $success],$this->succesStatus);
        }else{
            return response()->json(['error' => 'UnAuthorized User'],401);
        }
    }

    public function register(Request $request){
   
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'cpassword' => 'required|same:password',

        ]);

        if($validator->fails()){
               return response()->json(['error' => $validator->errors()],401);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] = $user->createToken('myapi')->accessToken;
        $success['name'] = $user->name;
        return response()->json(['success' => $success],$this->succesStatus);
     }


     public function getDetails(){
        $user = Auth::user();
        return response()->json(['success' => $user],$this->succesStatus);
     }
}
