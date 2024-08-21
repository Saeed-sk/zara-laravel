<?php

namespace Database\Seeders;

use App\Models\attributes;
use App\Models\Banners;
use App\Models\Categories;
use App\Models\Colors;
use App\Models\Images;
use App\Models\ProductAttribute;
use App\Models\ProductCategory;
use App\Models\ProductColor;
use App\Models\Products;
use App\Models\ProductSize;
use App\Models\Sizes;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Factories\BannersFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        DB::transaction(function () {
            User::factory()->create([
                'name' => 'ادمین',
                'phone' => '09146728861',
                'password' => 1234567,
                'role' => 'admin'
            ]);
            User::factory(10)->create();
            Colors::factory(10)->create();
            Sizes::factory(20)->create();
            attributes::factory(20)->create();
            Products::factory(1000)->create();
            $categories = Categories::all();
            foreach ($categories as $category) {
                $randomColors = Products::inRandomOrder()->take(300)->pluck('id')->toArray();
                $category->products()->attach($randomColors);
                Banners::factory(6)->create(['category_id' => $category->id]);
            }
            $products = Products::all();
            foreach ($products as $product) {
                $randomColors = Colors::inRandomOrder()->take(3)->pluck('id')->toArray();
                $randomAttrs = attributes::inRandomOrder()->take(3)->pluck('id')->toArray();
                $randomSize = Colors::inRandomOrder()->take(3)->pluck('id')->toArray();
                $product->colors()->attach($randomColors);
                $product->sizes()->attach($randomSize);
                $product->attributes()->attach($randomAttrs);
            }

            $ids = Products::pluck('id')->toArray();
            foreach ($ids as $id) {
                Images::factory(5)->create(['product_id' => $id]);
            }
        });
    }
}
