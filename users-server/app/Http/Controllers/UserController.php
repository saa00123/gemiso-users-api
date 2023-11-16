<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    private $users = [
        [
            "id" => 1,
            "name" => "User1",
            "email" => "user1@example.com",
        ],
        [
            "id" => 2,
            "name" => "User2",
            "email" => "user2@example.com",
        ]
    ];

    public function index()
    {
        return response()->json($this->users);
    }

    public function read($id)
    {
        $user = collect($this->users)->firstWhere('id', $id);

        if (!$user) {
            return response()->json(['error' => 'User not found.'], 404);
        }

        return response()->json($user);
    }

    public function create(Request $request)
    {
      $newUser = [
        'id' => count($this->users) + 1,
        'name' => $request->name,
        'email' => $request->email,
    ];

    $this->users[] = $newUser;

    return response()->json($newUser, 201);
    }

    public function update(Request $request, $id)
    {
      $userIndex = array_search($id, array_column($this->users, 'id'));

      if ($userIndex === false) {
          return response()->json(['error' => 'User not found.'], 404);
      }

      $this->users[$userIndex]['name'] = $request->name ?? $this->users[$userIndex]['name'];
      $this->users[$userIndex]['email'] = $request->email ?? $this->users[$userIndex]['email'];

      return response()->json($this->users[$userIndex]);
    }

    public function delete($id)
    {
      $userIndex = array_search($id, array_column($this->users, 'id'));

      if ($userIndex === false) {
          return response()->json(['error' => 'User not found.'], 404);
      }

      unset($this->users[$userIndex]);

      return response()->json(null, 204);
    }
}
