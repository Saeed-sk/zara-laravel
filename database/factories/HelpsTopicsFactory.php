<?php

namespace Database\Factories;

use App\Models\Help;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HelpsTopics>
 */
class HelpsTopicsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = \Faker\Factory::create('fa_IR');
        $ids = Help::pluck('id')->toArray();
        return [
            'title'=>$faker->text(5),
            'body' => $faker->text,
            'slug'=>$faker->unique()->slug,
            'image' => $faker->imageUrl,
            'help_id' => $this->faker->randomElement($ids),
        ];
    }
}
