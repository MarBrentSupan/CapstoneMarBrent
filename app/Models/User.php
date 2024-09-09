<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use League\CommonMark\Node\Block\Document;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'userRoleId',
        'departmentId',
        'name',
        'email',
        'username',
        'password',
        'notification',
    ];

    protected $appends = ['department_name','user_role_name'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function department()
    {
        return $this->belongsTo(Department::class, 'departmentId');
    }

    public function user_role()
    {
        return $this->belongsTo(UserRole::class, 'userRoleId');
    }

    public function getDepartmentNameAttribute()
    {
         return $this->department()->first()?->name;
    }

    public function getUserRoleNameAttribute()
    {
         return $this->user_role()->first()?->name;
    }

    public function documentseries()
    {
        return $this->hasMany(DocumentSeries::class,"originatorUserId");
    }

    public function documents()
    {
      return $this->through("documentseries")->has("documents");  
    }
}
