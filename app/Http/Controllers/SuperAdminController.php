<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDepartmentRequest;
use App\Http\Requests\CreateUserRequest;
use App\Models\Department;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SuperAdminController extends PageController
{
    public function create_user_form()
    {
        $user = Auth::user();
        
        $topnav = $this->topnav($user);
        $sidenav = $this->sidenav($user);
        $departments=Department::get(["id","name"]);
        $users=User::paginate(10);
        $dc_count=User::where("userRoleId","=",3)->count();
        $content = ["departments"=>$departments,
                    "users"=>$users,
                    "dc_count"=>$dc_count
                    ];
        $data = compact('topnav', 'sidenav','content');
        return Inertia::render('SuperAdmin/UserManagement',["pagedata"=>$data]);
    }

    public function create_user(CreateUserRequest $request)
    {
        if ($request->userRoleId==3){
            User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'username'=>$request->username,
                'password'=>$request->password,
                'userRoleId'=>$request->userRoleId,
                'departmentId'=>4,
                'notification'=>now()
            ]);
        }
        else{
            User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'username'=>$request->username,
                'password'=>$request->password,
                'userRoleId'=>$request->userRoleId,
                'departmentId'=>$request->departmentId,
                'notification'=>now()
            ]);
        }
       
    }

    public function delete_user(Request $request)
    {
        $user = User::find($request->id);
        $user->delete();
    }

    public function department_management()
    {
        $user = Auth::user();

        $topnav = $this->topnav($user);
        $sidenav = $this->sidenav($user);
        $department = Department::paginate(5);
        $content = ["department"=>$department];

        $data = compact('topnav', 'sidenav','content');

        return Inertia::render('SuperAdmin/DepartmentManagement',["pagedata"=>$data]);
    }

    public function department_management_create(CreateDepartmentRequest $request)
    {
       Department::create([
        "name"=>$request->name,
        "acronym"=>$request->acronym,
        "seriesnumberprefix"=>$request->seriesnumberprefix
       ]);
    }

    public function department_management_delete(Request $request){
        $department = Department::find($request->id);
        $department->delete();
    }
}
