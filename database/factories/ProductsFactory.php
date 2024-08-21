<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Products>
 */
class ProductsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = \Faker\Factory::create('fa_IR');
        return [
            'template'=>$faker->randomElement(['collection','single']),
            'title'=>$faker->text(5),
            'parent_id'=>null,
            'description'=>$faker->text,
            'maintenance'=>$faker->text,
            'slug'=>$faker->unique()->slug,
            'discount'=>$faker->numberBetween(0, 100),
            'price'=>$faker->numberBetween(1000,9999)
        ];
    }
}
