<?php

namespace App\Http\Controllers;
use App\Models\Department;
use App\Models\Document;
use App\Models\DocumentSeries;
use App\Models\SourceDocument;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PageController extends Controller
{

    public function dashboard()
    {
        $user = Auth::user();
        $user->lastlogin=now();
        $user->save();
        $topnav = $this->topnav($user);//waiting for notification information ui
        $sidenav = $this->sidenav($user);
        
        $dashboardcards = [];
        $query = DocumentSeries::with(['department', 'source_document', 'documents'])
        ->orderBy('updated_at', 'desc');

        switch ($user->userRoleId) {
            case 1:
                break;
            case 2:
                $query->where('originatorUserId', $user->id);
                break;
            case 3:
                break;
        }
        
        // Total documents
        $totaldocuments=(clone $query)->count();
        $dashboardcards['totaldocument'] = $totaldocuments;

        // Total approved documents
        $approvedDocumentsCount = (clone $query)->where('status',"=", 'Approved')->count();
        $dashboardcards['approveddocument'] = $approvedDocumentsCount;

        $needsUpdateCount = (clone $query)->where('status',"=", 'Needs Update')->count();
        $dashboardcards['needsupdate'] = $needsUpdateCount;

        $inProgressCount = (clone $query)->where('status',"=", 'In progress')->count();
        $dashboardcards['inprogress'] = $inProgressCount;

        $archiveCount = (clone $query)->where('status',"=", 'Archived')->count();
        $dashboardcards['archived'] = $archiveCount;

        $departmentCount =Department::count();
        $dashboardcards['departmentcount'] = $departmentCount;
        if($user->userRoleId!=2){
            $Departments = Department::with(['documentseries' => function ($query) {
                $query->limit(10);
            }])->get();
        } else {
            $Departments = $user->department()->with(['documentseries' => function ($query) {
                $query->limit(10); // Adjust the limit or other query constraints as needed
            }])->get();
        }
        $table = ["departments"=>$Departments];
    
        $data = compact('topnav', 'sidenav', 'dashboardcards', 'table');
        return Inertia::render('Dashboard', ["pagedata"=>$data]);
    }

    public function documents(Request $request)
    {
        $user = Auth::user();

        $topnav = $this->topnav($user);
        $sidenav = $this->sidenav($user);
        $sourcedocument=SourceDocument::all();
        
        $query = DocumentSeries::whereNot('status', 'Archived')
        ->with(['department', 'source_document', 'documents'])
        ->orderBy('updated_at', 'desc');

        switch ($user->userRoleId) {
            case 1:
                break;
            case 2:
                $query->where('originatorUserId', $user->id);
                break;
            case 3:
                break;
        }

        if ($request->has('search')) {   
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('seriesNumber', 'like', "%{$search}%");
            });
        }

        if ($request->has('filterStatus') && $request->filterStatus!=null) {   
            $status = $request->filterStatus;
            $query->where(function ($query) use ($status ) {
                $query->where('status', '=', $status);
            });
        }
        
        if ($request->has('filterSourceDocuments') && $request->filterSourceDocuments!=null) {   
            $fsd = $request->filterSourceDocuments;
            $query->where(function ($query) use ($fsd) {
                $query->where('sourceDocumentId', '=', $fsd);
            });
        }

        if ($request->has('filterDepartments') && $request->filterDepartments!=null) {   
            $fd = $request->filterDepartments;
            $query->where(function ($query) use ($fd) {
                $query->where('departmentId', '=', $fd);
            });
        }

        $documents = $query->paginate(10)->appends([
            'search' => $request->search,
            'filterStatus' => $request->filterStatus,
            'filterSourceDocuments' => $request->filterSourceDocuments,
            'filterDepartments' => $request->filterDepartments,
        ]);
        
        $content=["sourcedocument"=>$sourcedocument,"documents"=>$documents];
        $sd=SourceDocument::all();
        $dep=Department::all();
        
        $filter=["sourcedocument"=>$sd,"department"=>$dep];
        
        $data = compact('topnav', 'sidenav', 'content','filter');
        return Inertia::render('Documents',["pagedata"=>$data]);
    }

    public function my_account(Request $request)
    {
        $user = Auth::user();
        
        $topnav = $this->topnav($user);
        $sidenav = $this->sidenav($user);
        $data = compact('topnav', 'sidenav');
        
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            "pagedata"=>$data
        ]);
    }

    public function archive()
    {
        $user = Auth::user();

        $topnav = $this->topnav($user);
        $sidenav = $this->sidenav($user);
        $sourcedocument=SourceDocument::all();

        $query = DocumentSeries::where('status', 'Archived')
        ->with(['department', 'source_document', 'documents'])
        ->orderBy('updated_at', 'desc');

        switch ($user->userRoleId) {
            case 1:
                break;
            case 2:
                $query->where('originatorUserId', $user->id);
                break;
            case 3:
                break;
        }

        $documents = $query->paginate(10);
            
        $content=["sourcedocument"=>$sourcedocument,"documents"=>$documents];
        $data = compact('topnav', 'sidenav', 'content');
        return Inertia::render('Archive',["pagedata"=>$data]);
    }

    protected function topnav($user)
    {
        if($user->userRoleId==1){
            $documents = DocumentSeries::where('updated_at', '>', $user->notification)
                ->orderBy('updated_at', 'desc')->get()
                ->filter(function ($document) {
                    return true;
                })
                ->values()
                ->toArray();   
        }
        if($user->userRoleId==2){
            $documents = $user->documentseries()
            ->where('document_series.updated_at', '>', $user->notification)
            ->orderBy('document_series.updated_at', 'desc')->get();;
            $documents=$documents->filter(function ($document) {
                return $document->status === 'Approved' || $document->status === 'Needs Update';
                })->values()->toArray();    
        }
        if($user->userRoleId==3){
            $documents = DocumentSeries::where('updated_at', '>', $user->notification)
                ->orderBy('updated_at', 'desc')->get()
                ->filter(function ($document) {
                    return $document->status === 'In progress';
                })
                ->values()
                ->toArray();   
        }
       
        return ["notification"=>$documents];
    }


    protected function sidenav($user)
    {
        $department = Department::find($user->departmentId);
        return ["user" => $user,"department"=>$department];
    }

    public function clear_notification()
    {
        $user = Auth::user();
        
        $user->notification=now();
        $user->save();
    }
}
