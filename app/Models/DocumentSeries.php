<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentSeries extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'sourceDocumentId',
        'departmentId',
        'seriesNumber',
        'status',
        'originatorUserId',
        'totalPages',
    ];

    protected $appends = [
        'originator_name',
        'revision_count',
        "latest_link",
        'notification_date',
        'effectivity_date'
    ];

    public function department()
    {
        return $this->belongsTo(Department::class, 'departmentId');
    }

    public function source_document()
    {
        return $this->belongsTo(SourceDocument::class, 'sourceDocumentId');
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('M j, Y g:i A');
    }

    public function documents()
    {
        return $this->hasMany(Document::class,"documentSeriesId")->orderBy('created_at', 'desc');
    }

    public function getOriginatorNameAttribute()
    {
        $user = User::find($this->originatorUserId);
        return $user ? $user->name : null;
    }


    public function getRevisionCountAttribute()
    {
        return $this->hasMany(Document::class,"documentSeriesId")->orderBy('created_at', 'desc')->first()?->revision;
    }

    public function getEffectivityDateAttribute()
    {
        $latestDocument = $this->hasMany(Document::class, "documentSeriesId")
                           ->orderBy('created_at', 'desc')
                           ->first();
        
        return $latestDocument && $this->status=="Approved" ? $latestDocument->ApprovalDate : null;
    }

    public function getLatestLinkAttribute()
    {
        return $this->hasMany(Document::class,"documentSeriesId")->orderBy('created_at', 'desc')->first()?->externalUrl;
    }

    public function getNotificationDateAttribute()
    {
        return Carbon::parse($this->updated_at)->diffForHumans();
    }

}
