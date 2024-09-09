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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string("externalUrl")->nullable()->default(null);
            $table->integer("documentSeriesId");
            $table->integer("revision")->default(0);
            $table->string("dcNotes")->nullable()->default(null);
            $table->integer("dcId")->nullable()->default(0);
            $table->string("originatorNotes")->nullable()->default(null);
            $table->integer("originatorUserId");
            $table->integer("departmentId");
            $table->timestamp("RevisionDate")->nullable()->default(null);
            $table->string("ApprovedLink")->nullable()->default(null);
            $table->timestamp("ApprovalDate")->nullable()->default(null);
            // $table->timestamp("effectivityDate")->nullable()->default(null);
            $table->string("status")->default("pending");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
