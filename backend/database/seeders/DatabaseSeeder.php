<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Hall;
use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin Account
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@wedbliss.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Vendor (Owner) Account
        $vendor = User::create([
            'name' => 'Karim Vendor',
            'email' => 'vendor@wedbliss.com',
            'password' => Hash::make('password'),
            'role' => 'vendor',
        ]);

        // Customer (Client) Account
        User::create([
            'name' => 'Sarah Client',
            'email' => 'client@wedbliss.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
        ]);

        // Sample Halls
        Hall::create([
            'owner_id' => $vendor->id,
            'name' => 'Royal Grand Ballroom',
            'description' => 'A majestic ballroom perfect for grand weddings.',
            'capacity' => 500,
            'price' => 2500,
            'lat' => 33.5898,
            'lng' => -7.6031,
        ]);

        Hall::create([
            'owner_id' => $vendor->id,
            'name' => 'Palais Bahja',
            'description' => 'A historic riad palace in the heart of Marrakech.',
            'capacity' => 350,
            'price' => 3200,
            'lat' => 31.6295,
            'lng' => -7.9811,
        ]);

        // Sample Services
        Service::create([
            'owner_id' => $vendor->id,
            'category' => 'traiteur',
            'price' => 150,
            'lat' => 33.6000,
            'lng' => -7.6500,
        ]);
    }
}
