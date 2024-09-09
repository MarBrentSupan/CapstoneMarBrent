<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'externalUrl',
        'documentSeriesId',
        'status',   
        'departmentId',
        'originatorUserId',
        'revision',
        'dcNotes',
        'originatorNotes', 
        'revisionDate',
    ];
    
    protected $appends = ['notification_date','name',"series","sourcedocumentname","department"];

    public function getNotificationDateAttribute()
    {
    return Carbon::parse($this->updated_at)->diffForHumans();
    }

    public function documentseries()
    {
        return $this->belongsTo(DocumentSeries::class, 'documentSeriesId');
    }

    public function getNameAttribute()
    {
        return $this->documentseries()->first()->name;
    }

    public function getSeriesAttribute()
    {
        return $this->documentseries()->first()->seriesNumber;
    }


    public function getSourcedocumentnameAttribute()
    {
        $ds=$this->documentseries;
        $sourcedocument=SourceDocument::find($ds->sourceDocumentId);
        return $sourcedocument->name;
    }

    public function getDepartmentAttribute()
    {
        $department=$this->documentseries->department;
        return $department->name;
    }
}
