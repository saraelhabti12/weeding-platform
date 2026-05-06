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
        Schema::table('halls', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->renameColumn('user_id', 'owner_id');
            $table->foreign('owner_id')->references('id')->on('users')->onDelete('cascade');
            $table->dropColumn(['location', 'city', 'images', 'amenities', 'status']);
        });

        Schema::table('services', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->renameColumn('user_id', 'owner_id');
            $table->foreign('owner_id')->references('id')->on('users')->onDelete('cascade');
            $table->dropColumn(['name', 'description', 'city', 'images', 'status']);
        });

        Schema::table('availabilities', function (Blueprint $table) {
            $table->dropForeign(['hall_id']);
            if (Schema::hasColumn('availabilities', 'service_id')) {
                $table->dropForeign(['service_id']);
                $table->dropColumn('service_id');
            }
            $table->dropColumn('hall_id');
            $table->morphs('entity');
        });

        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign(['hall_id']);
            if (Schema::hasColumn('bookings', 'service_id')) {
                $table->dropForeign(['service_id']);
                $table->dropColumn('service_id');
            }
            $table->dropColumn(['hall_id', 'total_price', 'start_date', 'end_date']);
            $table->morphs('entity');
            $table->date('date')->after('entity_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reverting is complex and likely not needed for this task.
    }
};
