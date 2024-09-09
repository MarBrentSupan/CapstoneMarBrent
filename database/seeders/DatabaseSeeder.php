<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Document;
use App\Models\SourceDocument;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\UserRole;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Department::factory()->create([
            'name' => 'SuperAdmin'
        ]);

        UserRole::factory()->create(['name' => 'SA']);
        UserRole::factory()->create(['name' => 'O']);
        UserRole::factory()->create(['name' => 'DC']);

        // SourceDocument::factory()->create(['name' => "Policy", 'acronym' => "PO"]);
        // SourceDocument::factory()->create(['name' => "Procedure", 'acronym' => "PD"]);
        // SourceDocument::factory()->create(['name' => "Job/Position Description", 'acronym' => "JD"]);
        // SourceDocument::factory()->create(['name' => "Guidelines", 'acronym' => "GU"]);
        // SourceDocument::factory()->create(['name' => "Form", 'acronym' => "FM"]);
        // SourceDocument::factory()->create(['name' => "Test Protocol", 'acronym' => "TP"]);
        // SourceDocument::factory()->create(['name' => "Training Module", 'acronym' => "TM"]);
        // SourceDocument::factory()->create(['name' => "Legal or Applicable Laws", 'acronym' => "LW"]);
        // SourceDocument::factory()->create(['name' => "External Document", 'acronym' => "ED"]);
        // SourceDocument::factory()->create(['name' => "School Manual", 'acronym' => "MN"]);
        SourceDocument::factory()->create(['name' => "Quality Manual", 'acronym' => "QM"]);
        SourceDocument::factory()->create(['name' => "Procedures Manual", 'acronym' => "PM"]);
        SourceDocument::factory()->create(['name' => "Forms Manual", 'acronym' => "FM"]);
        SourceDocument::factory()->create(['name' => "Records Mgt. Manual", 'acronym' => "RMM"]);
        SourceDocument::factory()->create(['name' => "Documented Information", 'acronym' => "DI"]);

        User::factory()->create([
            'name' => 'Mar Brent',
            'email' => 'superadmin@hau.edu',
            'username' => 'superadmin',
            'password' => 'passwordz',
            'userRoleId' => 1,
            'departmentId' => 1,
        ]);

        User::factory()->create([
            'name' => 'Mark Furton',
            'email' => 'oop@hau.edu',
            'username' => 'oop',
            'password' => 'passwordz',
            'userRoleId' => 2,
            'departmentId' => 2,
        ]);

        User::factory()->create([
            'name' => 'Reden Gopez',
            'email' => 'oie@hau.edu',
            'username' => 'oie',
            'password' => 'passwordz',
            'userRoleId' => 3,
            'departmentId' => 4,
        ]);


        Department::factory()->create([
            'name' => 'Holy Angel University',
            'acronym' => 'HAU',
            'seriesnumberprefix'=>"000"
        ]);
        Department::factory()->create([
            'name' => 'Office of the President',
            'acronym' => 'OOP',
            'seriesnumberprefix'=>"1000"
        ]);
        Department::factory()->create([
            'name' => 'Office of Institutional Effectiveness',
            'acronym' => 'OIE',
            'seriesnumberprefix'=>"2000"
        ]);
        Department::factory()->create([
            'name' => 'Center of Kampampangan Studies',
            'acronym' => 'CKS',
            'seriesnumberprefix'=>"3000"
        ]);
        Department::factory()->create([
            'name' => 'Institute for Chirstian Formation and Social Integration',
            'acronym' => 'CFS',
            'seriesnumberprefix'=>"4000"
        ]);
        Department::factory()->create([
            'name' => 'Office of International Affairs',
            'acronym' => 'OIA',
            'seriesnumberprefix'=>"5000"
        ]);
        Department::factory()->create([
            'name' => 'Human Resource Management Office',
            'acronym' => 'HRO',
            'seriesnumberprefix'=>"6000"
        ]);
        Department::factory()->create([
            'name' => 'Finance and Resource Management Services',
            'acronym' => 'FIN',
            'seriesnumberprefix'=>"7000"
        ]);
        Department::factory()->create([
            'name' => 'Records and System Services',
            'acronym' => 'RSS',
            'seriesnumberprefix'=>"8000"
        ]);
        Department::factory()->create([
            'name' => 'Academic Affairs Cluster',
            'acronym' => 'AAC',
            'seriesnumberprefix'=>"9000"
        ]);
        Department::factory()->create([
            'name' => 'Student Services & Affairs',
            'acronym' => 'SSA',
            'seriesnumberprefix'=>"1100"
        ]);
        Department::factory()->create([
            'name' => 'Marketing (External Affairs and Corporate Communications)',
            'acronym' => 'MCS',
            'seriesnumberprefix'=>"2100"
        ]);
        Department::factory()->create([
            'name' => 'Information Technology System and Services',
            'acronym' => 'ITS',
            'seriesnumberprefix'=>"3100"
        ]);
        Department::factory()->create([
            'name' => 'Campus Services and Development Office',
            'acronym' => 'CSD',
            'seriesnumberprefix'=>"4100"
        ]);

        
        // Document::factory(20)->create();


    }
}
