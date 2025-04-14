<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function registerForm()
    {
        return view('register');
    }

    public function register(Request $request)
    {
        User::create($request->all());
        return redirect()->route('login');
    }

    public function loginForm()
    {
        return view('login');
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            session(['user_id' => $user->id]);
            return redirect('/dashboard');
        }

        return back()->with('error', 'Invalid credentials');
    }

    public function dashboard()
    {
        $user = User::find(session('user_id'));

        if (!$user) {
            return redirect()->route('login')->with('error', 'User not found');
        }

        return view('dashboard', ['user' => $user]);
    }

    public function flag()
    {
        $user = User::find(session('user_id'));

        if (!$user || !$user->is_admin) {
            abort(403, 'Unauthorized');
        }

        return view('admin');
    }
}
