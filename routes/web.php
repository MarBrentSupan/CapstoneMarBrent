<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\DocConController;
use App\Http\Controllers\OriginatorController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Middleware\DocConMiddleware;
use App\Http\Middleware\OriginatorMiddleware;
use App\Http\Middleware\SuperAdminMiddleware;
use App\Models\Department;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

Route::get('/', [AuthenticatedSessionController::class, 'create'])->name('home');

Route::middleware(['auth', SuperAdminMiddleware::class,'verified'])->prefix("SA/dashboard")->name("SA.")->group(function () {
    Route::get("/", [SuperAdminController::class, 'dashboard'])->name("dashboard");
    Route::get("/documents", [SuperAdminController::class, 'documents'])->name("documents");
    Route::get("/archive", [SuperAdminController::class, 'archive'])->name("archive");
    Route::get("/user-management", [SuperAdminController::class, 'create_user_form'])->name("user-management");
    Route::post("/create-user", [SuperAdminController::class, 'create_user'])->name("create-user");
    Route::post("/delete-user", [SuperAdminController::class, 'delete_user'])->name("delete-user");
    Route::get("/department-management", [SuperAdminController::class, 'department_management'])->name("department-management");
    Route::post("/department-management", [SuperAdminController::class, 'department_management_create'])->name("create-department");
    Route::post('/department-management2', [SuperAdminController::class, 'department_management_delete'])->name('delete-department');
    Route::get('/my-account', [SuperAdminController::class, 'my_account'])->name('profile.edit');
});

Route::middleware(['auth', OriginatorMiddleware::class,'verified'])->prefix("O/dashboard")->name("O.")->group(function () {
    Route::get("/", [OriginatorController::class, 'dashboard'])->name("dashboard");
    Route::get("/documents", [OriginatorController::class, 'documents'])->name("documents");
    Route::post("/document-create",[OriginatorController::class, 'create_document'])->name("create-document");
    Route::post("/comply_revision_notice",[OriginatorController::class, 'comply_revision_notice'])->name("comply_revision_notice");
    Route::post("/petition_archive",[OriginatorController::class, 'petition_archive'])->name("petition_archive");
    Route::get("/archive", [OriginatorController::class, 'archive'])->name("archive");
    // Route::post("/archive", [OriginatorController::class, 'archive_document'])->name("archive-document");
    Route::get('/my-account', [OriginatorController::class, 'my_account'])->name('profile.edit');
    Route::post("/add_document_revision",[OriginatorController::class, 'add_document_revision'])->name("add_document_revision");
});

Route::middleware(['auth', DocConMiddleware::class,'verified'])->prefix("DC/dashboard")->name("DC.")->group(function () {
    Route::get("/", [DocConController::class, 'dashboard'])->name("dashboard");
    Route::get("/documents", [DocConController::class, 'documents'])->name("documents");
    Route::post("/documents",[DocConController::class, 'add_revision_notice'])->name("add_revision_notice");
    Route::post("/documents2",[DocConController::class, 'approve_document'])->name("approve_document");
    Route::post("/documents3",[DocConController::class, 'archive_document'])->name("archive_document");
    Route::post("/documents4",[DocConController::class, 'reject_archive_document'])->name("reject_archive_document");
    Route::get("/archive", [DocConController::class, 'archive'])->name("archive");
    // Route::post("/archive", [OriginatorController::class, 'archive_document'])->name("archive-document");
    Route::get('/my-account', [OriginatorController::class, 'my_account'])->name('profile.edit');

});

Route::middleware('auth')->group(function () {
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->prefix("auth.")->name("auth.")->group(function () {
    Route::post("/", [PageController::class, 'clear_notification'])->name("clear_notification");
});

Route::get('/export-csv', function () {
    $user = Auth::user();
    
    $departments = Department::with(['documentseries' => function ($query) use ($user) {
        switch ($user->userRoleId) {
            case 1:
                break;
            case 2:
                $query->where('originatorUserId', $user->id);
                break;
            case 3:
                break;
        }
    }])->get();

    $response = new StreamedResponse(function() use ($departments) {
        $handle = fopen('php://output', 'w');
        
        // Add CSV headers
        fputcsv($handle, ['Department Name', 'Created At', 'Series Number and Name', 'Revision Count', 'Status']);

        // Add rows
        foreach ($departments as $department) {
            foreach ($department->documentseries as $series) {
                fputcsv($handle, [
                    $department->name,
                    $series->created_at,
                    $series->seriesNumber . ' ' . $series->name,
                    $series->revision_count,
                    $series->status,
                    $series->effectivity_date
                ]);
            }
        }

        fclose($handle);
    });

    $response->headers->set('Content-Type', 'text/csv');
    $response->headers->set('Content-Disposition', 'attachment; filename="document_series.csv"');

    return $response;
});


require __DIR__ . '/auth.php';
