<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Categories>
 */
class CategoriesFactory extends Factory
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
            'template'=>$this->faker->randomElement(['default','custom']),
            'title'=>$faker->text(5),
            'slug'=>$faker->unique()->slug,
            'parent_id'=>null,
            'image'=>$this->faker->imageUrl
        ];
    }
}
