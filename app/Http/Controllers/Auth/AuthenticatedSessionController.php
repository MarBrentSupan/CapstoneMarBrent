<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create()
    {
        $user = Auth::user();
        if ($user) {
            if ($user->userRoleId === 1) {
                return redirect()->intended(route('SA.dashboard', absolute: false));
            }
            if ($user->userRoleId === 2) {
                return redirect()->intended(route('O.dashboard', absolute: false));
            }

            if ($user->userRoleId === 3) {
                return redirect()->intended(route('DC.dashboard', absolute: false));
            }
        }

        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = $request->user();

        if ($user->userRoleId === 1) {
            return redirect()->intended(route('SA.dashboard', absolute: false));
        }
        if ($user->userRoleId === 2) {
            return redirect()->intended(route('O.dashboard', absolute: false));
        }

        if ($user->userRoleId === 3) {
            return redirect()->intended(route('DC.dashboard', absolute: false));
        }

    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
