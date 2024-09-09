<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('document_series', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("seriesNumber");
            $table->integer("sourceDocumentId");
            $table->string("status")->default("pending");
            $table->boolean("isDocumentControllerApproved")->default(false);
            $table->integer("departmentId");
            $table->integer("originatorUserId");
            $table->integer("totalPages");
            $table->string("approvedLink")->nullable()->default(null);
            $table->integer("ApprovedDocumentControllerUserId")->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document_series');
    }
};
