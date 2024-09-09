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

class DocConController extends PageController
{
    public function add_revision_notice(Request $request)
    {
        $ds=DocumentSeries::find($request->id);
        if ($ds->status=="Needs Update"){
            return;
        }
        $ds->status="Needs Update";
        $ds->save();

        $prevdocument=$ds->documents->first();

        Document::create(
            [
                "externalUrl"=>null,
                "documentSeriesId" => $request->id,
                "status" => "Revision",
                "dcNotes" =>$request->notice,
                "departmentId" => $prevdocument->departmentId,
                "originatorUserId" => $prevdocument->id,
                "revision"=>$prevdocument->revision+1
            ]
        );
    }

    public function approve_document(Request $request)
    {
        $validatedData = $request->validate([
            'approveLink' => ['required', 'url', new ValidSharepointLink],
        ]);
        
        $ds=DocumentSeries::find($request->id);
        $ds->status="Approved";
        // $ds->approvedLink=$request->approveLink;
        $ds->save();

        $currentrev=$ds->documents->first();
        $currentrev->ApprovalDate=now();
        $currentrev->approvedLink=$request->approveLink;
        $currentrev->save();
    }

    public function archive_document(Request $request)
    {
        $validatedData = $request->validate([
            'archiveLink' => ['required', 'url', new ValidSharepointLink],
        ]);

        $ds=DocumentSeries::find($request->id);
        $ds->status="Archived";
        $ds->save();

        $currentrev=$ds->documents->first();
        $currentrev->ApprovalDate=now();
        $currentrev->approvedLink=$request->archiveLink;
        $currentrev->save();
    }

    public function reject_archive_document(Request $request){
        $ds=DocumentSeries::find($request->id);
        $ds->status="Approved";
        $ds->save();
        
        $currentrev=$ds->documents->first();
        $currentrev->dcNotes=$request->rejectionReason;
        $currentrev->ApprovalDate=now();
        $currentrev->save();
    }
}
