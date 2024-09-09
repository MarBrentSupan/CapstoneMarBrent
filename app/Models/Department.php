<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'acronym',
        'seriesnumberprefix',
    ];

    protected $appends = [
        'user_count',
        'document_series_count',
        'allow_deletion'
    ];

    public function Users()
    {
        return $this->hasMany(User::class, "departmentId");
    }

    public function getUserCountAttribute()
    {
         return $this->Users->Count();
    }

    public function DocumentSeries()
    {
        return $this->through("Users")->has("documentseries");
    }

    public function getDocumentSeriesCountAttribute()
    {
        return $this->DocumentSeries->Count();
    }

    public function getAllowDeletionAttribute()
    {
        if ($this->document_series_count > 0){
            return false;
        }
        if ($this->user_count> 0){
            return false;
        }
        if ($this->id == 0){
            return false;
        }

        return true;
        
    }

}
