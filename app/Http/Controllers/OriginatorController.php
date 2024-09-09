<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDepartmentRequest;
use App\Http\Requests\CreateDocumentRequest;
use App\Http\Requests\CreateUserRequest;
use App\Models\Department;
use App\Models\Document;
use App\Models\DocumentSeries;
use App\Models\SourceDocument;
use App\Models\User;
use App\Rules\ValidSharepointLink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OriginatorController extends PageController
{
    public function create_document(CreateDocumentRequest $request)
    {
        $validatedData = $request->validate([
            'externalUrl' => ['required', 'url', new ValidSharepointLink],
        ]);

        $user = Auth::user();
        $department = $user->department()->first();

        $sourcedocument = SourceDocument::find($request->sourceDocumentId);

        $prefix = $department->seriesnumberprefix;
        $count = $prefix + DocumentSeries::where('departmentId', $department->id)
            ->where('sourceDocumentId', $request->sourceDocumentId)
            ->count() + 1;
        $seriesNumber = str_pad($count, 3, '0', STR_PAD_LEFT);

        $DocumentSeries = DocumentSeries::create([
            "name" => $request->name,
            "sourceDocumentId" => $request->sourceDocumentId,
            "departmentId" => $department->id,
            "seriesNumber" => $sourcedocument->acronym . "-" . $department->acronym . "-" . $seriesNumber,
            "status" => "In progress",
            "originatorUserId" => $user->id,
            "totalPages"=>$request->totalPages
        ]);

        Document::create(
            [
                "externalUrl" => $request->externalUrl,
                "documentSeriesId" => $DocumentSeries->id,
                "status" => "Creation",
                "departmentId" => $user->departmentId,
                "originatorUserId" => $user->id
            ]
        );

    }

    // public function archive_document(Request $request)
    // {
    //     $ds = DocumentSeries::find($request->id);
    //     $ds->status = "Archived";

    //     $document = $ds->documents->first();
    //     $document->status = "Archived";

    //     $document->save();
    //     $ds->save();
    // }

    public function comply_revision_notice(Request $request)
    {
        $validatedData = $request->validate([
            'externalLink' => ['required', 'url', new ValidSharepointLink],
        ]);

        $ds=DocumentSeries::find($request->id);
        // if ($ds->status=="In progress"){
        //     return;
        // }
        $ds->status="In progress";
        $ds->save();

        $currentdocument=$ds->documents->first();
        $currentdocument->originatorNotes=$request->modification;
        $currentdocument->externalUrl=$request->externalLink;
        $currentdocument->RevisionDate=now();
        $currentdocument->save();
    }

    public function petition_archive(Request $request)
    {
        $ds=DocumentSeries::find($request->id);
        $ds->status="In progress";
        $ds->save();
        
        $prevdocument=$ds->documents->first();

        Document::create(
            [
                "documentSeriesId" => $ds->id,
                "status" => "Archive Petition",
                "originatorNotes"=>$request->reason,
                "departmentId" => $ds->departmentId,
                "revision"=>$prevdocument->revision,
                "originatorUserId" => $ds->originatorUserId
            ]
        );
    } 

    public function add_document_revision(Request $request)
    {
        $validatedData = $request->validate([
            'revisionLink' => ['required', 'url', new ValidSharepointLink],
        ]);

        $ds=DocumentSeries::find($request->id);
        $ds->status="In progress";
        $ds->save();
        
        $prevdocument=$ds->documents->first();

        $d=Document::create(
            [
                "externalUrl"=>$request->revisionLink,
                "documentSeriesId" => $request->id,
                "status" => "Revision",
                "originatorNotes" =>$request->originatorNotes,
                "departmentId" => $prevdocument->departmentId,
                "originatorUserId" => $prevdocument->id,
                "revision"=>$prevdocument->revision+1,
                // "RevisionDate"=>now(),
            ]
        );
        $d->RevisionDate=now(); 
        $d->save();
    } 
}