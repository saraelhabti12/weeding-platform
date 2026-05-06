<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

use Illuminate\Support\Facades\DB;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);

        if (DB::connection() instanceof \Illuminate\Database\SQLiteConnection) {
            $pdo = DB::connection()->getPdo();
            $pdo->sqliteCreateFunction('acos', 'acos', 1);
            $pdo->sqliteCreateFunction('cos', 'cos', 1);
            $pdo->sqliteCreateFunction('sin', 'sin', 1);
            $pdo->sqliteCreateFunction('radians', function ($degrees) {
                return $degrees * pi() / 180;
            }, 1);
        }
    }
}
