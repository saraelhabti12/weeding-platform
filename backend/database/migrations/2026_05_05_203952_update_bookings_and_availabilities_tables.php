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
        Schema::table('bookings', function (Blueprint $table) {
            $table->foreignId('service_id')->nullable()->constrained()->onDelete('set null')->after('hall_id');
        });

        Schema::table('availabilities', function (Blueprint $table) {
            $table->foreignId('hall_id')->nullable()->change();
            $table->foreignId('service_id')->nullable()->constrained()->onDelete('cascade')->after('hall_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropConstrainedForeignId('service_id');
        });

        Schema::table('availabilities', function (Blueprint $table) {
            $table->foreignId('hall_id')->nullable(false)->change();
            $table->dropConstrainedForeignId('service_id');
        });
    }
};
