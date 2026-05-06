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
        Schema::table('users', function (Blueprint $table) {
            $table->string('status')->default('active')->after('role'); // active, pending, blocked
        });

        Schema::table('halls', function (Blueprint $table) {
            $table->string('status')->default('pending')->after('price'); // pending, approved, rejected
        });

        Schema::table('services', function (Blueprint $table) {
            $table->string('status')->default('pending')->after('price'); // pending, approved, rejected
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('halls', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
