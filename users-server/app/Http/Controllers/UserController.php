<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function read()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function create(Request $request)
    {
        $user = User::create($request->only(['name', 'email']));
        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return $this->userNotFoundResponse();
        }

        $user->update($request->only(['name', 'email']));
        return response()->json($user);
    }

    public function delete($id)
    {
        $user = User::find($id);
        if (!$user) {
            return $this->userNotFoundResponse();
        }

        $user->delete();
        return response()->json(null, 204);
    }

    private function userNotFoundResponse()
    {
        return response()->json(['error' => 'User not found.'], 404);
    }
}
